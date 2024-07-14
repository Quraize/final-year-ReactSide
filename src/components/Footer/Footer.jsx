import './FooterStyles.css';
import { Link } from "react-router-dom";
// Importing necessary React and icon components
import {
  FaLinkedin,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from 'react-icons/fa';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import {motion} from 'framer-motion'
 

export default function Footer() {
    useEffect(() => {
        AOS.init({
          duration : 1300,
          easing: 'ease-in-out-back'
        });
      }, []);
  return (
    <div>
    <div className='footer-main-sec'>
      {/* Left section with brand and social icons */}
      <div>
        <h1 className='footer-main-heading' data-aos="slide-up">Voxalyze</h1>
        <p className='footer-main-para' data-aos="slide-up">
        Voxalyze offers advanced text analysis tools for businesses, enabling deeper insights, streamlined multilingual communication, and customized workflows for maximum impact.       </p>
        <div className='footer-social-icons'>
             <a href="" data-aos="slide-up"><FaFacebookSquare size={30} className="icon-faceboook"/></a>
              <a href="" data-aos="slide-up"><FaTwitterSquare  size={30}  className="icon-twitter"/></a>
              <a href="" data-aos="slide-up"><FaLinkedin size={30} className="icon-linkedin"/></a>
              <a href="" data-aos="slide-up"><FaYoutubeSquare size={30} className="icon-Youtube"/></a>
             <a href="" data-aos="slide-up"> <FaInstagramSquare size={30} className="icon-Insta"/></a>
        </div>
      </div>
      {/* Right section with footer content organized in sections */}
      <div className='footer-content-list'>
        {/* Mapping over sections and rendering content */}
             <div>
              <h6 className="content-list-heading" data-aos="slide-up">Evaluation</h6>
              <div>
                  <Link to=''><motion.h3 className='content-list-items' data-aos="slide-up">
                    Summarize</motion.h3></Link>
                  <Link to=''><h3 className='content-list-items' data-aos="slide-up">
                    Language Scoring</h3></Link>
                  <Link to=''><h3 className='content-list-items' data-aos="slide-up">
                    Topic Tagging</h3></Link>
              </div>
            </div>
            <div>
              <h6 className="content-list-heading" data-aos="slide-up">Analysis</h6>
              <div>
                  <Link to=''><h3 className='content-list-items' data-aos="slide-up">Language Detection</h3></Link>
                  <Link to=''><h3 className='content-list-items' data-aos="slide-up">Sentiment Analysis</h3></Link>
              </div>
            </div>
            <div>
              <h6 className="content-list-heading" data-aos="slide-up">Conversion</h6>
              <div>
                  <Link to=""><h3 className='content-list-items' data-aos="slide-up">Translation/NLP</h3></Link>
                  <Link to=""><h3 className='content-list-items' data-aos="slide-up">Text-to-Speech</h3></Link>
                  <Link to=""><h3 className='content-list-items' data-aos="slide-up">Text-to-Image</h3></Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
