import RightText from "./ReusebleComp/RightText"
import AnimationComp from "./ReusebleComp/AnimationComp"
import AnimationData from '../../../assets/detect.json';
import './FuncStyles.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import {useMediaQuery} from "react-responsive";

const items = [
  {
    subHeading: "Summarize-Text",
    key:1,
    detail:`It streamlines the process of condensing lengthy passage into concise summaries, perserving key information.
      By employing techniques such as`,
    button: "Summarize",
    link:"/summarization",
    material: [{key: 1, content:'extractive summarization'}, {key:2, content: 'abstractive summarization'}]
  },
  {
    subHeading: "Language Scoring",
    key:2,
    detail:`It provides users with insights into quality and proficiency of written content. It invloves the assessment and
      evaluation of text based on various linguistic criteria such as`,
    button: "Score",
    link:"/scoring",
    material: [{key: 1, content:'readability'}, {key:2, content: 'complexity'}, {key:3, content: 'grammatical correctness'}]
  },
  {
    subHeading: "Topic Tagging",
    key:3,
    detail:`It invloves the process of automatically assigning descriptive tags or labels to text document or content based on
      their thematic content. Topic tagging algorithm algorithms uses`,
    button: "Topic Tag",
    link:"/scoring",
    material: [{key: 1, content:'context analyzing'}, {key:2, content: 'semantic analyzing'}]
  }
]
 
export default function Evaluation() {
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
      {isDesktopOrLaptop &&  
        <div className="func-main-sec">
        <div className="func-anime-area" data-aos="fade-up"  style={{paddingTop: '3rem', paddingLeft: '5rem', paddingRight: '3rem', paddingBottom: '3rem'}}><AnimationComp Data={AnimationData}/></div>
        <div className="func-text-area" data-aos="fade-down"><RightText heading={'Evaluation'} Items={items}/></div>
        </div>
      }
      {isTabletOrMobile &&
          <div className="func-main-sec">
          <div className="func-text-area" data-aos="fade-down"><RightText heading={'Evaluation'} Items={items}/></div>
          <div className="func-anime-area" data-aos="fade-up"  style={{paddingTop: '3rem', paddingLeft: '3rem', paddingRight: '3rem', paddingBottom: '3rem'}}><AnimationComp Data={AnimationData}/></div>
          </div>
      } 
    </>
  )
}
