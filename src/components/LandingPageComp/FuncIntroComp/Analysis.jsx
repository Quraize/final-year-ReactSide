import RightText from "./ReusebleComp/RightText";
import AnimationComp from "./ReusebleComp/AnimationComp"
import AnimationData from '../../../assets/senti.json';
import './FuncStyles.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import {useMediaQuery} from "react-responsive";

const items = [
  {
    subHeading: "Language Detection",
    key:1,
    detail:`It automatically identifies the language of a given text input. It enables users to process and multilingual
    content effectively. Ensuring the services like these, it can facilitates`,
    button: "Detect",
    link:"/languagedetect",
    material: [{key: 1, content:'globalization'}, {key:2, content: 'localization'}]
  },
  {
    subHeading: "Sentiment Analysis",
    key:2,
    detail:`It involves the automated process of analyzing text data to determine the tone expressed within it.
      This functionality enables users to understand the underlying tones such as`,
    button: "Analyze",
    link:"/sentimentanalysis",
    material: [{key: 1, content:'positive'}, {key:2, content: 'negative'}, {key:3, content: 'neutral'}]
  }
]


export default function Analysis() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isDesktopOrLaptop = useMediaQuery({
      query: '(min-width: 1224px)'
    });

    useEffect(() => {
      AOS.init({
          duration : 1300,
          easing: 'ease-out-quart'
        });
    }, []);
  
    return (
      <div className="func-main-sec">
          <div className="func-text-area" data-aos="fade-down"><RightText heading={'Analysis'} Items={items}/></div>
        {isDesktopOrLaptop && <div className="func-anime-area" data-aos="fade-up" style={{paddingTop: '7rem', paddingLeft: '7rem', paddingRight: '7rem', paddingBottom: '7rem'}}><AnimationComp Data={AnimationData}/></div>}
        {isTabletOrMobile &&  <div className="func-anime-area" data-aos="fade-up" style={{paddingTop: '2rem', paddingLeft: '4rem', paddingRight: '3rem', paddingBottom: '4rem'}}><AnimationComp Data={AnimationData}/></div>}
      </div>
    )
  
}
