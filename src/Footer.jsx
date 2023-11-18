import LogoBlack from "./assets/images/logo-black.svg";
import SocialsX from "./assets/images/socials-x.svg";
import SocialsIg from "./assets/images/socials-instagram.svg";
import SocialsLn from "./assets/images/socials-linkedin.svg";
import SocialsFb from "./assets/images/socials-facebook.svg";
import LineVector from "./assets/images/line-vector.svg";
import FooterLeft from "./assets/images/footer-left.svg";
import FooterRight from "./assets/images/footer-right.svg";
import footerData from "./assets/data/footerData";
import "./assets/css/footer.css";

function Footer() {
  return (
    <footer>
      <div className="documentation">
        <div className="socials-block">
          <img src={LogoBlack} alt="scissors logo" />
          <div className="socials">
            <a href="">
              <img src={SocialsX} alt="X icon" />
            </a>
            <a href="">
              <img src={SocialsIg} alt="instagram icon" />
            </a>
            <a href="">
              <img src={SocialsLn} alt="linkedin icon" />
            </a>
            <a href="">
              <img src={SocialsFb} alt="facebook icon" />
            </a>
          </div>
        </div>
        <div className="documents-block">
          {footerData.map((category, index) => (
            <ul key={index} className="documents">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <aside className="tos">
        <p>Terms of Service</p>
        <img src={LineVector} alt="horizontal line vector" />
        <p>Security</p>
        <img src={LineVector} alt="horizontal line vector" />
        <p>Scissor 2023</p>
      </aside>
      <img className="bg-footer-left" src={FooterLeft} alt="abstract" />
      <img className="bg-footer-right" src={FooterRight} alt="abstract" />
    </footer>
  );
}

export default Footer;
