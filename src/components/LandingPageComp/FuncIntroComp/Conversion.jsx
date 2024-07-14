import RightText from "./ReusebleComp/RightText"
import AnimationComp from "./ReusebleComp/AnimationComp"
import AnimationData from '../../../assets/conversion.json';
import './FuncStyles.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import {useMediaQuery} from "react-responsive";

const items = [
  {
    subHeading: "Text-to-Speech",
    key:1,
    detail:`Allowing users to convert written text into spoken audio output. catering to those prefferring auditory content consumption.
    It ensures a personalized experience by customizing`,
    button: "Get Speech",
    material: [{key: 1, content:'language'}, {key:2, content: 'accent'}, {key:3, content: 'voice preferences'}]
  },
  {
    subHeading: "Translation / NLP",
    key:2,
    detail:`It involves converting text from one language to another and analyzing text for meaningful insights
     respectively.Translation enables users to overcome barriers and `,
    button: "Translate",
    material: [{key: 1, content:'communicate across different languages'}, {key:2, content: 'foster global reach'}, {key:3, content: 'be inclusive'}]
  },
  {
    subHeading: "Text-to-Image",
    key:3,
    detail:`It enables users to create visual content directly from prompt, enhancing communication and expression.
      It empowers users to dynamically convert text into images for`,
    button: "Get Image",
    material: [{key: 1, content:'social media'}, {key:2, content: 'presentaions'}, {key:3, content: 'graphic design'}]
  },
]

export default function Conversion() {
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
      <>
        {isDesktopOrLaptop && <div className="func-main-sec">
        <div className="func-anime-area" data-aos="fade-up" style={{paddingTop: '4rem', paddingLeft: '4rem', paddingRight: '4rem', paddingBottom: '4rem'}}><AnimationComp Data={AnimationData}/></div>
        <div className="func-text-area" data-aos="fade-down"><RightText heading={'Conversion'} Items={items}/></div>
        </div>
        }
         {isTabletOrMobile && <div className="func-main-sec">
         <div className="func-text-area" data-aos="fade-down"><RightText heading={'Conversion'} Items={items}/></div>
        <div className="func-anime-area" data-aos="fade-up" style={{paddingTop: '2rem', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem'}}><AnimationComp Data={AnimationData}/></div>
        </div>
        }

      </>
  )
}
