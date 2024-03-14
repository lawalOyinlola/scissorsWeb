import LogoBlack from "../images/logo-black.svg";
import SocialsX from "../images/socials-x.svg";
import SocialsIg from "../images/socials-instagram.svg";
import SocialsLn from "../images/socials-linkedin.svg";
import SocialsFb from "../images/socials-facebook.svg";
import LineVector from "../images/line-vector.svg";
import FooterLeft from "../images/footer-left.svg";
import FooterRight from "../images/footer-right.svg";
import "../css/footer.css";

interface FooterDataItem {
  category: string;
  items: string[];
}

interface FooterProps {
  footerData: FooterDataItem[];
}

const Footer: React.FC<FooterProps> = ({ footerData }) => {
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
        <a href="#">
          <p>Terms of Service</p>
        </a>
        <img src={LineVector} alt="horizontal line vector" />
        <a href="#">
          <p>Security</p>
        </a>
        <img src={LineVector} alt="horizontal line vector" />
        <a href="#">
          <p>Scissor 2023</p>
        </a>
      </aside>
      <img className="bg-footer-left" src={FooterLeft} alt="abstract" />
      <img className="bg-footer-right" src={FooterRight} alt="abstract" />
    </footer>
  );
};

export default Footer;
