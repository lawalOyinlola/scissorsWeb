import { useState } from "react";
import UrlDetails from "./UrlDetails";
import MagicWand from "../images/magic-wand.svg";
import MagicWandBlue from "../images/magic-wand-blue.svg";
import FormLeft from "../images/form-left.svg";
import FormRight from "../images/form-right.svg";
import "../css/trimurl.css";

const TrimURL: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>("");

  const closeUrl = () => {
    setIsOpen(false);
    document.body.classList.remove("auth-open");
  };

  const openUrl = () => {
    setIsOpen(true);
    document.body.classList.add("auth-open");
  };

  const [formData, setFormData] = useState({
    url: "",
    domain: "",
    alias: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "domain") {
      setSelectedDomain(value);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTrimUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const { data, error } = await supabase.auth.signInWithPassword({
    //   url: formData.url,
    //   domain: formData.domain,
    //   alias: formData.alias,
    // });

    // if (error) {
    //   throw error;
    // }

    if (formData.domain === "spoo.me") {
      const url = "https://spoo-me-url-shortener.p.rapidapi.com/";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "X-RapidAPI-Key":
            "9bdbb17e96msha66477146363d67p17b8f4jsne2b47f46bca8",
          "X-RapidAPI-Host": "spoo-me-url-shortener.p.rapidapi.com",
        },
        body: new URLSearchParams({
          url: formData.url,
          alias: formData.alias,
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);

        const urlArray = JSON.parse(result);

        const shortenedUrl = urlArray.short_url;

        //Constructing the URL string dynamically
        const baseUrl = "https://easy-qr-code.p.rapidapi.com/generate?content=";
        const dynamicUrl = baseUrl + encodeURIComponent(shortenedUrl);

        setUrl(formData.url);
        setShortUrl(shortenedUrl);
      } catch (error) {
        console.error(error);
      }
    } else if (formData.domain === "emojify") {
      const url = "https://spoo-me-url-shortener.p.rapidapi.com/emoji";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "X-RapidAPI-Key":
            "9bdbb17e96msha66477146363d67p17b8f4jsne2b47f46bca8",
          "X-RapidAPI-Host": "spoo-me-url-shortener.p.rapidapi.com",
        },
        body: new URLSearchParams({
          url: formData.url,
          emojies: formData.alias,
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);

        const urlArray = JSON.parse(result);

        const shortenedUrl = urlArray.short_url;

        //Constructing the URL string dynamically
        const baseUrl = "https://easy-qr-code.p.rapidapi.com/generate?content=";
        const dynamicUrl = baseUrl + encodeURIComponent(shortenedUrl);

        setUrl(formData.url);
        setShortUrl(shortenedUrl);
      } catch (error) {
        console.error(error);
      }
    } else {
      const url = "https://spoo-me-url-shortener.p.rapidapi.com/";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "X-RapidAPI-Key":
            "9bdbb17e96msha66477146363d67p17b8f4jsne2b47f46bca8",
          "X-RapidAPI-Host": "spoo-me-url-shortener.p.rapidapi.com",
        },
        body: new URLSearchParams({
          url: formData.url,
          alias: formData.alias,
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);

        const urlArray = JSON.parse(result);

        const shortenedUrl = urlArray.short_url;

        //Constructing the URL string dynamically
        const baseUrl = "https://easy-qr-code.p.rapidapi.com/generate?content=";
        const dynamicUrl = baseUrl + encodeURIComponent(shortenedUrl);

        setUrl(formData.url);
        setShortUrl(shortenedUrl);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <UrlDetails
          isOpen={isOpen}
          closeUrl={closeUrl}
          shortUrl={shortUrl}
          url={url}
        />
      )}
      <section className="trim-url" id="trim-url">
        <form className="url-form" onSubmit={handleTrimUrl}>
          <input
            className="url"
            type="url"
            name="url"
            value={formData.url}
            placeholder="Paste URL here"
            onChange={handleInputChange}
          />

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

          <input
            type="text"
            name="alias"
            value={formData.alias}
            placeholder={
              selectedDomain === "emojify"
                ? "Type Emoji here"
                : "Type Alias here"
            }
            onChange={handleInputChange}
          />
          <button
            className="url-btn button"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={openUrl}
          >
            Trim URL
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
        {/* <img src={response.data} alt="" /> */}
      </section>
    </>
  );
};

export default TrimURL;
