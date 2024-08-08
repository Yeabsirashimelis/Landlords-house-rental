import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo.jpg";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-8 mt-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8 items-center">
        <div className="flex gap-4">
          <img src={logo} className="w-20 h-20 rounded-full" />
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-gray-700">
              LandLords rental platform
            </h3>
            <p className="text-gray-600">
              Your go-to place for finding rental homes.
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="text-gray-500 hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="text-gray-500 hover:text-blue-400"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="text-gray-500 hover:text-pink-500"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="text-gray-500 hover:text-blue-700"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
        <div className="text-gray-600">
          <p className="font-bold">Contact Us</p>
          <p>Email: contact@landlords.com</p>
          <p>Phone: +251942110161</p>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-8 pt-4 text-center text-gray-600">
        <p>&copy; {currentYear} Land Lords. All rights reserved.</p>
      </div>
      <img
        src="https://s.zillowstatic.com/pfs/static/footer-art.svg"
        className="mt-8 "
      />
    </footer>
  );
}

export default Footer;
