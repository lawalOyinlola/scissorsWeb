import { useState, useRef } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UrlDetails from "./UrlDetails";
import MagicWand from "../images/magic-wand.svg";
import MagicWandBlue from "../images/magic-wand-blue.svg";
import FormLeft from "../images/form-left.svg";
import FormRight from "../images/form-right.svg";
import "../css/trimurl.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.defaults({ ease: "sine.inOut", duration: 1 });

interface TrimUrlProps {
  session: Session | null;
}

const TrimURL: React.FC<TrimUrlProps> = ({ session }) => {
  const [formData, setFormData] = useState({
    url: "",
    domain: "",
    alias: "",
  });
  const [urlDetails, setUrlDetails] = useState({
    shortLink: "",
    longLink: "",
    qrCodeImage: "",
  });
  const [UrlDetailsIsOpen, setUrlDetailsIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [qrCodeError, setQrCodeError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [parent] = useAutoAnimate();
  const container = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const closeUrlDetails = () => {
    setUrlDetailsIsOpen(false);
    document.body.classList.remove("auth-open");
  };

  const openUrlDetails = () => {
    setUrlDetailsIsOpen(true);
    document.body.classList.add("auth-open");
  };

  // Trim Url and Generate QR Code
  const trimUrl = async () => {
    // Check if user input a url to be shortened
    if (!formData.url.trim()) {
      setErrorMessage(
        `Enter a valid URL starting with "http://" or "https://"`
      );
      return;
    }
    // Url Regex checker, if url  starts with https/http
    const urlRegex = /^(http|https):\/\//;
    if (!urlRegex.test(formData.url)) {
      setErrorMessage(`URL must start with "http://" or "https://"`);
      return;
    }

    // Validate environment variables
    const spooMeApiKey = import.meta.env.VITE_SPOO_ME_API_KEY;

    // Set loading state true to when starting trim function
    setLoading(true);
    setErrorMessage("");

    // Determine API endpoint and request format based on selected domain
    let apiEndpoint = "";
    let requestOptions: RequestInit;
    
    if (formData.domain === "emojify") {
      // Emoji URLs use v0 API endpoint (form-urlencoded)
      apiEndpoint = "https://spoo.me/emoji";
      const headers: HeadersInit = {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      };
      
      // Add API key if available (optional but recommended)
      if (spooMeApiKey) {
        headers["Authorization"] = `Bearer ${spooMeApiKey}`;
      }

      requestOptions = {
        method: "POST",
        headers,
        body: new URLSearchParams({
          url: formData.url,
          ...(formData.alias && { emojies: formData.alias }),
        }),
      };
    } else {
      // Regular URLs use v1 API endpoint (JSON)
      apiEndpoint = "https://spoo.me/api/v1/shorten";
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      
      // Add API key if available (optional but recommended for higher rate limits)
      if (spooMeApiKey) {
        headers["Authorization"] = `Bearer ${spooMeApiKey}`;
      }

      requestOptions = {
        method: "POST",
        headers,
        body: JSON.stringify({
          long_url: formData.url,
          ...(formData.alias && { alias: formData.alias }),
        }),
      };
    }

    try {
      const response = await fetch(apiEndpoint, requestOptions);

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Failed to shorten URL";
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // If parsing fails, use status text
          errorMessage = `API Error: ${response.status} ${response.statusText}`;
        }

        setErrorMessage(errorMessage);
        setLoading(false);
        return;
      }

      // Parse response
      let urlData;
      
      try {
        const responseText = await response.text();
        urlData = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse API response:", parseError);
        setErrorMessage("Invalid response from API. Please try again.");
        setLoading(false);
        return;
      }

      // Handle different response formats (v1 vs v0 API)
      const shortenedUrl = urlData.short_url || urlData.shortUrl;

      // Check if short url was generated
      if (!shortenedUrl) {
        const errorMessage = formData.domain === "emojify"
          ? "Alias(Emoji) is already taken, or not supported"
          : "Alias(Text) is already taken";
        
        const errorSolution = formData.domain === "emojify"
          ? "Try a different emoji and or emoji combination, or leave it blank for random url slug"
          : "Try a different text and or text combination, or leave it blank for random url slug";

        setUrlDetails({
          shortLink: errorMessage,
          longLink: errorSolution,
          qrCodeImage: "",
        });

        setLoading(false);
        openUrlDetails();
        return;
      }

      // Generate QR code from shortened URL
      const fetchQrCode = async () => {
        setQrCodeError(""); // Clear any previous QR code errors

        try {
          // Use a CORS-friendly QR code API
          // Option 1: api.qrserver.com (free, no API key needed, CORS enabled)
          const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shortenedUrl)}`;

          const qrCodeResponse = await fetch(qrCodeUrl, {
            method: "GET",
            mode: "cors",
          });

          if (!qrCodeResponse.ok) {
            throw new Error(`QR Code generation failed: ${qrCodeResponse.status} ${qrCodeResponse.statusText}`);
          }

          const qrCodeBlob = await qrCodeResponse.blob();
          
          // Verify it's actually an image
          if (!qrCodeBlob.type.startsWith("image/")) {
            throw new Error("Invalid QR code response format");
          }

          const qrCodeImageUrl = URL.createObjectURL(qrCodeBlob);

          setUrlDetails({
            shortLink: shortenedUrl,
            longLink: formData.url,
            qrCodeImage: qrCodeImageUrl,
          });

          // Save to database if user is signed in
          if (session) {
            try {
              const { error } = await supabase
                .from("short_links")
                .insert([
                  {
                    long_link: formData.url,
                    short_link: shortenedUrl,
                    qrcode: qrCodeImageUrl,
                  },
                ])
                .select();

              if (error) {
                console.error("Error saving to database:", error);
                // Don't fail the whole operation if DB insert fails
                // User still gets their shortened URL
              }
            } catch (dbError) {
              console.error("Database error:", dbError);
              // Continue even if database save fails
            }
          }

          openUrlDetails();
        } catch (qrError) {
          console.error("Error generating QR code:", qrError);
          
          const errorMsg = qrError instanceof Error 
            ? qrError.message 
            : "Failed to generate QR code. The shortened URL is still available.";
          
          setQrCodeError(errorMsg);
          
          // Still show the shortened URL even if QR code fails
          setUrlDetails({
            shortLink: shortenedUrl,
            longLink: formData.url,
            qrCodeImage: "",
          });
          openUrlDetails();
        } finally {
          setLoading(false);
        }
      };

      await fetchQrCode();
    } catch (error) {
      console.error("Error shortening URL:", error);
      
      let errorMessage = "An unexpected error occurred. Please try again.";
      
      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase();
        
        // Provide user-friendly error messages
        if (errorMsg.includes("network") || errorMsg.includes("fetch")) {
          errorMessage = "Network error: Please check your internet connection and try again.";
        } else if (errorMsg.includes("401") || errorMsg.includes("unauthorized")) {
          errorMessage = "Authentication failed: Please check your API key in the environment variables.";
        } else if (errorMsg.includes("429") || errorMsg.includes("rate limit")) {
          errorMessage = "Rate limit exceeded: Please wait a moment and try again.";
        } else if (errorMsg.includes("400") || errorMsg.includes("bad request")) {
          errorMessage = "Invalid request: Please check that your URL is valid and try again.";
        } else if (errorMsg.includes("cors")) {
          errorMessage = "CORS error: Please contact support if this persists.";
        } else {
          errorMessage = `Failed to shorten URL: ${error.message}`;
        }
      }
      
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  };

  // Handle the Trim Url operation
  const handleTrimUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // initialize data
    setErrorMessage("");
    setUrlDetails({
      shortLink: "",
      longLink: "",
      qrCodeImage: "",
    });
    await trimUrl();
  };

  // GSAP Animation
  useGSAP(
    () => {
      gsap.from(".url-form", {
        opacity: 0.7,
        scale: 0.9,
        scrollTrigger: {
          trigger: ".url-form",
          start: "top 95%",
          end: "top center",
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={parent}>
      {UrlDetailsIsOpen && (
        <UrlDetails
          UrlDetailsIsOpen={UrlDetailsIsOpen}
          closeUrlDetails={closeUrlDetails}
          shortLink={urlDetails.shortLink}
          longLink={urlDetails.longLink}
          qrCodeImage={urlDetails.qrCodeImage}
          qrCodeError={qrCodeError}
        />
      )}
      <section id="trim-url" ref={container}>
        <div className="trim-url">
          <form className="url-form" onSubmit={handleTrimUrl}>
            <input
              className="url"
              type="text"
              name="url"
              value={formData.url}
              placeholder="Paste URL here"
              onChange={handleInputChange}
            />
            {errorMessage && <p className="error">{errorMessage}</p>}

            <select
              name="domain"
              id="domain"
              value={formData.domain}
              onChange={handleInputChange}
            >
              <option>Choose Domain</option>
              <option value="spoo.me">spoo.me</option>
              <option value="emojify">emojify</option>
            </select>

            <div className="alias">
              <input
                type="text"
                name="alias"
                value={formData.alias}
                placeholder={
                  formData.domain === "emojify"
                    ? "Type Emoji here"
                    : "Type Alias here"
                }
                disabled={session === null}
                onChange={handleInputChange}
              />
              {!session && <p className="alias-error">* login to use alias</p>}
            </div>

            <button
              className="url-btn button"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={loading}
            >
              {loading ? "Triming Url..." : "Trim URL"}
              <img
                className="magic-wand"
                src={isHovered ? MagicWandBlue : MagicWand}
                alt="arrow down icon"
              />
            </button>

            <p>
              By clicking TrimURL, I agree to the
              <strong>Terms of Service, Privacy Policy</strong> and Use of
              Cookies.
            </p>
          </form>

          <img className="form-left" src={FormLeft} alt="abstract" />
          <img className="form-right" src={FormRight} alt="abstract" />
        </div>
      </section>
    </div>
  );
};

export default TrimURL;
