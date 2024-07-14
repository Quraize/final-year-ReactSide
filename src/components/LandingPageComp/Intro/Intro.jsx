import './IntroStyles.css';
import TextComp from './IntroComp/TextComp';
import IntroAnimationComp from './IntroComp/IntroAnimationComp';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

function Intro() {

  useEffect(() => {
    AOS.init({
        duration : 1300,
        easing: 'ease-out-quart'
      });
  }, []);

  return (
    <div className='intro-main-sec'>
        <div className='intro-text-area' data-aos="fade-right"><TextComp/></div>
        <div className='intro-anime-area' data-aos="fade-left"><IntroAnimationComp/></div>
    </div>
  )
}

export default Intro;