import MagicWand from "./assets/images/magic-wand.svg";
import FormLeft from "./assets/images/form-left.svg";
import FormRight from "./assets/images/form-right.svg";
import "./assets/css/cta.css";

function CtaForm() {
  return (
    <section className="cta-form" id="cta-form">
      <form className="form">
        <input
          className="url"
          type="url"
          name="url"
          placeholder="Paste URL here"
        />
        <select name="domain" id="domain" placeholder="Choose Domain">
          <option value=".com">Choose Domain</option>
        </select>
        <input type="text" name="alias" placeholder="Type Alias here" />
        <button className="trim-url">
          Trim URL
          <img className="magic-wand" src={MagicWand} alt="magic wand" />
        </button>
        <p>
          By clicking TrimURL, I agree to the
          <strong>Terms of Service, Privacy Policy</strong> and Use of Cookies.
        </p>
      </form>
      <img className="form-left" src={FormLeft} alt="abstract" />
      <img className="form-right" src={FormRight} alt="abstract" />
    </section>
  );
}

export default CtaForm;
