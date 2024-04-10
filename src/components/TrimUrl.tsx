import { useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import UrlDetails from "./UrlDetails";
import MagicWand from "../images/magic-wand.svg";
import MagicWandBlue from "../images/magic-wand-blue.svg";
import FormLeft from "../images/form-left.svg";
import FormRight from "../images/form-right.svg";
import "../css/trimurl.css";

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
  const [urlIsOpen, setUrlIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [parent] = useAutoAnimate();

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
    setUrlIsOpen(false);
    document.body.classList.remove("auth-open");
  };

  const openUrlDetails = () => {
    setUrlIsOpen(true);
    document.body.classList.add("auth-open");
  };

  // Trim Url and Generate QR Code
  const trimUrl = async () => {
    if (!formData.url.trim()) {
      setErrorMessage(
        `Enter a valid URL starting with "http://" or "https://"`
      );
      return;
    }

    const urlRegex = /^(http|https):\/\//;
    if (!urlRegex.test(formData.url)) {
      setErrorMessage(`URL must start with "http://" or "https://"`);
      return;
    }

    setLoading(true);
    // trim url
    let url = "";
    let aliasKey = "alias";
    if (formData.domain === "emojify") {
      url = "https://spoo-me-url-shortener.p.rapidapi.com/emoji";
      aliasKey = "emojies";
    } else {
      url = "https://spoo-me-url-shortener.p.rapidapi.com/";
    }

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "X-RapidAPI-Key": "9bdbb17e96msha66477146363d67p17b8f4jsne2b47f46bca8",
        "X-RapidAPI-Host": "spoo-me-url-shortener.p.rapidapi.com",
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

      // check if short url was generated, if not update user
      if (!shortenedUrl) {
        setUrlDetails({
          shortLink: "Alias is already taken / not supported",
          longLink:
            "Try a different emoji (emojify) or text (spoo.me) alias, or leave it blank for random url slug",
          qrCodeImage: "",
        });
        setLoading(false);
        openUrlDetails();
        return;
      }

      // generate qrCode from shortened url
      const baseUrl = "https://easy-qr-code.p.rapidapi.com/generate?content=";
      const dynamicUrl = baseUrl + encodeURIComponent(shortenedUrl);

      const fetchQrCode = async () => {
        const qrCodeUrl = dynamicUrl;
        const qrCodeOptions = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "9bdbb17e96msha66477146363d67p17b8f4jsne2b47f46bca8",
            "X-RapidAPI-Host": "easy-qr-code.p.rapidapi.com",
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
              qrcode: qrCodeImageUrl, // Use the fetched URL directly
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

  return (
    <div ref={parent}>
      {urlIsOpen && (
        <UrlDetails
          urlIsOpen={urlIsOpen}
          closeUrlDetails={closeUrlDetails}
          shortLink={urlDetails.shortLink}
          longLink={urlDetails.longLink}
          qrCodeImage={urlDetails.qrCodeImage}
        />
      )}
      <section className="trim-url" id="trim-url">
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
      </section>
    </div>
  );
};

export default TrimURL;
