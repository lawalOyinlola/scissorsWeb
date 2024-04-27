import { useState, useRef } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabase";
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

    // Set loading state true to when starting trim function
    setLoading(true);
    // trim url
    let url = "";
    let aliasKey = "alias";
    // if emojify domain is selected
    if (formData.domain === "emojify") {
      url = import.meta.env.VITE_EMOJIFY_URL as string;
      aliasKey = "emojies";
    } else {
      // else by default(i.e user selected none or spoo.me)
      url = import.meta.env.VITE_SPOO_ME_URL as string;
    }

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY as string,
        "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST as string,
      },
      body: new URLSearchParams({
        url: formData.url,
        [aliasKey]: formData.alias,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const urlArray = JSON.parse(result);
      const shortenedUrl = urlArray.short_url;

      // check if short url was generated, if not update user of error/ solution
      if (!shortenedUrl) {
        // if selected domain is emojify
        if (formData.domain === "emojify") {
          // update the user with this error
          setUrlDetails({
            shortLink: "Alias(Emoji) is already taken, or not supported",
            longLink:
              "Try a different emoji and or emoji combination, or leave it blank for random url slug",
            qrCodeImage: "",
          });
        } else {
          // else update the user with this error
          setUrlDetails({
            shortLink: "Alias(Text) is already taken",
            longLink:
              "Try a different text and or text combination, or leave it blank for random url slug",
            qrCodeImage: "",
          });
        }

        // turn off loading state, provide user with shortened url details or error information
        setLoading(false);
        openUrlDetails();
        return;
      }

      // generate qrCode from shortened url
      const baseUrl = import.meta.env.VITE_QRCODE_URL as string;
      const dynamicUrl = baseUrl + encodeURIComponent(shortenedUrl);

      const fetchQrCode = async () => {
        const qrCodeUrl = dynamicUrl;
        const qrCodeOptions = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY as string,
            "X-RapidAPI-Host": import.meta.env.VITE_QRCODE_HOST as string,
          },
        };

        try {
          const qrCodeResponse = await fetch(qrCodeUrl, qrCodeOptions);
          const qrCodeImageBlob = await qrCodeResponse.blob();
          const qrCodeImageUrl = URL.createObjectURL(qrCodeImageBlob);

          setUrlDetails({
            shortLink: shortenedUrl,
            longLink: formData.url,
            qrCodeImage: qrCodeImageUrl,
          });

          // save to database if user is signed in
          if (session) {
            await supabase.from("links").insert({
              long_link: formData.url,
              short_link: shortenedUrl,
              qrcode: qrCodeImageUrl,
            });
          }
        } catch (error) {
          console.error("Error fetching QR code:", error);
        }
      };

      fetchQrCode();
      openUrlDetails();
      setLoading(false);
    } catch (error) {
      console.error(error);
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
