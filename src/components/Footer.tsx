import { footerData } from "../data/data";
import {
  GithubLogo,
  TwitterLogo,
  TelegramLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import LogoBlack from "../images/logo-black.svg";
import LineVector from "../images/line-vector.svg";
import FooterLeft from "../images/footer-left.svg";
import FooterRight from "../images/footer-right.svg";
import "../css/footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="documentation">
        <div className="socials-block">
          <img src={LogoBlack} alt="scissors logo" />
          <div className="socials">
            <a
              href="https://github.com/lawalOyinlola/ScissorsWeb-AltschoolProject"
              target="_blank"
            >
              <GithubLogo className="socials-btn" weight="duotone" />
            </a>
            <a href="https://twitter.com/HoneyzRich" target="_blank">
              <TwitterLogo className="socials-btn" weight="duotone" />
            </a>
            <a href="https://t.me/DLV_Yero" target="_blank">
              <TelegramLogo className="socials-btn" weight="duotone" />
            </a>
            <a
              href="https://www.instagram.com/direct/t/100255291380317"
              target="_blank"
            >
              <InstagramLogo className="socials-btn" weight="duotone" />
            </a>
            <a>
              <LinkedinLogo className="socials-btn" weight="duotone" />
            </a>
          </div>
        </div>
        <div className="documents-block">
          {footerData.map((category, index: number) => (
            <ul key={index} className="documents">
              {category.items.map((item: string, itemIndex: number) => (
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
