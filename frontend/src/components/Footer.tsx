import { FaGithub } from "react-icons/fa";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        A <span className="brand-mayo"></span> project by{" "}
        <a
          href="https://victormayowa.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="brand-name"
        >
          Agu Ebuka
        </a>
      </p>
    </footer>
  );
};

export default Footer;
