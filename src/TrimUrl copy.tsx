import { useState } from "react";
import MagicWand from "./assets/images/magic-wand.svg";
import MagicWandBlue from "./assets/images/magic-wand-blue.svg";
import FormLeft from "./assets/images/form-left.svg";
import FormRight from "./assets/images/form-right.svg";
import "./assets/css/cta.css";

const TrimURL: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>("");

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

        //console.log(urlResult);
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
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="cta-form" id="cta-form">
      <form className="form" onSubmit={handleTrimUrl}>
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
            selectedDomain === "emojify" ? "Type Emoji here" : "Type Alias here"
          }
          onChange={handleInputChange}
        />
        <button
          className="trim-url button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
          <strong>Terms of Service, Privacy Policy</strong> and Use of Cookies.
        </p>
      </form>
      <img className="form-left" src={FormLeft} alt="abstract" />
      <img className="form-right" src={FormRight} alt="abstract" />
      {/* <img src={response.data} alt="" /> */}
    </section>
  );
};

export default TrimURL;
