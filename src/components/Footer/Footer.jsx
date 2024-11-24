import "./FooterStyles.css";
import { Link } from "react-router-dom";
import {
  FaLinkedin,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function Footer() {
  useEffect(() => {
    AOS.init({
      duration: 1300,
      easing: "ease-in-out-back",
    });
  }, []);

  // Function to handle social media click
  const handleSocialMediaClick = (e) => {
    e.preventDefault(); // Prevent navigation
    toast.info("Under Development", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
      <div className="footer-main-sec">
        {/* Left section with brand and social icons */}
        <div>
          <h1 className="footer-main-heading" data-aos="slide-up">
            Voxalyze
          </h1>
          <p className="footer-main-para" data-aos="slide-up">
            Voxalyze offers advanced text analysis tools for businesses,
            enabling deeper insights, streamlined multilingual communication,
            and customized workflows for maximum impact.
          </p>
          <div className="footer-social-icons">
            {/* Adding click handlers for social icons */}
            <a href="#" data-aos="slide-up" onClick={handleSocialMediaClick}>
              <FaFacebookSquare size={30} className="icon-faceboook" />
            </a>
            <a href="#" data-aos="slide-up" onClick={handleSocialMediaClick}>
              <FaTwitterSquare size={30} className="icon-twitter" />
            </a>
            <a href="#" data-aos="slide-up" onClick={handleSocialMediaClick}>
              <FaLinkedin size={30} className="icon-linkedin" />
            </a>
            <a href="#" data-aos="slide-up" onClick={handleSocialMediaClick}>
              <FaYoutubeSquare size={30} className="icon-Youtube" />
            </a>
            <a href="#" data-aos="slide-up" onClick={handleSocialMediaClick}>
              <FaInstagramSquare size={30} className="icon-Insta" />
            </a>
          </div>
        </div>

        {/* Right section with footer content organized in sections */}
        <div className="footer-content-list">
          {/* Mapping over sections and rendering content */}
          <div>
            <h6 className="content-list-heading" data-aos="slide-up">
              Evaluation
            </h6>
            <div>
              <Link to="/summarization">
                <motion.h3 className="content-list-items" data-aos="slide-up">
                  Summarize
                </motion.h3>
              </Link>
              <Link to="/scoring">
                <h3 className="content-list-items" data-aos="slide-up">
                  Language Scoring
                </h3>
              </Link>
              <Link to="/scoring">
                <h3 className="content-list-items" data-aos="slide-up">
                  Topic Tagging
                </h3>
              </Link>
            </div>
          </div>
          <div>
            <h6 className="content-list-heading" data-aos="slide-up">
              Analysis
            </h6>
            <div>
              <Link to="/languagedetect">
                <h3 className="content-list-items" data-aos="slide-up">
                  Language Detection / Score
                </h3>
              </Link>
              <Link to="/sentimentanalysis">
                <h3 className="content-list-items" data-aos="slide-up">
                  Sentiment Analysis
                </h3>
              </Link>
            </div>
          </div>
          <div>
            <h6 className="content-list-heading" data-aos="slide-up">
              Conversion
            </h6>
            <div>
              <Link to="/texttospeech">
                <h3 className="content-list-items" data-aos="slide-up">
                  Text-to-Speech
                </h3>
              </Link>
              <Link to="/texttoimage">
                <h3 className="content-list-items" data-aos="slide-up">
                  Text-to-Image
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
