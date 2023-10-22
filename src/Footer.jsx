import LogoBlack from "./assets/images/logo-black.svg";
import SocialsX from "./assets/images/socials-x.svg";
import SocialsIg from "./assets/images/socials-instagram.svg";
import SocialsLn from "./assets/images/socials-linkedin.svg";
import SocialsFb from "./assets/images/socials-facebook.svg";
import LineVector from "./assets/images/line-vector.svg";
import "./assets/footer.css";

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
          <ul className="documents">
            <li>Why Scissor ?</li>
            <li>Scissor 101</li>
            <li>Integrations &amp; API</li>
            <li>Pricing</li>
          </ul>
          <ul className="documents">
            <li>Solutions</li>
            <li>Social Media</li>
            <li>Digital Marketing</li>
            <li>Customer Service</li>
            <li>For Developers</li>
          </ul>
          <ul className="documents">
            <li>Products</li>
            <li>Link Management</li>
            <li>QR Codes</li>
            <li>Link-in-bio</li>
          </ul>
          <ul className="documents">
            <li>Company</li>
            <li>About Scissor</li>
            <li>Careers</li>
            <li>Partners</li>
            <li>Press</li>
            <li>Contact</li>
            <li>Reviews</li>
          </ul>
          <ul className="documents">
            <li>Resources</li>
            <li>Blog</li>
            <li>Resource Library</li>
            <li>Developers</li>
            <li>App Connectors</li>
            <li>Support</li>
            <li>Trust Center</li>
            <li>Browser Extension</li>
            <li>Mobile App</li>
          </ul>
          <ul className="documents">
            <li>Features</li>
            <li>Branded Links</li>
            <li>Mobile Links</li>
            <li>Campaign</li>
            <li>Management &amp;</li>
            <li>Analytics</li>
            <li>QR Code generation</li>
          </ul>
          <ul className="documents">
            <li>Legal</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Terms of Service</li>
            <li>Acceptable Use Policy</li>
            <li>Code of Conduct</li>
          </ul>
        </div>
        {/* <img
          className="bg-footer-left"
          src="images/footer-left.svg"
          alt="footer background"
        />
        <img
          className="bg-footer-right"
          src="images/footer-right.svg"
          alt="footer background"
        /> */}
      </div>
      <aside className="tos">
        <p>Terms of Service</p>
        <img src={LineVector} alt="horizontal line vector" />
        <p>Security</p>
        <img src={LineVector} alt="horizontal line vector" />
        <p>Scissor 2023</p>
      </aside>
    </footer>
  );
}

export default Footer;
