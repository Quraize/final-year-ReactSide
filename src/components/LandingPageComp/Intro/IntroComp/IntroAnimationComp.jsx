import './AnimationStyles.css';
import Lottie from 'lottie-react';
import AnimationData from '../../../../assets/penbulb.json';
import { useRef } from 'react';
import {useMediaQuery} from "react-responsive";



function IntroAnimationComp() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isDesktopOrLaptop = useMediaQuery({
      query: '(min-width: 1224px)'
    });

    const animeRef = useRef(null);

    const handleAnimationComplete = () => {
        animeRef.current?.goToAndPlay(15, true);
    }

  return (
    <div className='animations-main-sec'>
      {isDesktopOrLaptop && <Lottie onComplete={handleAnimationComplete} loop={false} lottieRef={animeRef} animationData={AnimationData} height={100} width={100}/>}
        {isTabletOrMobile && <Lottie onComplete={handleAnimationComplete} loop={false} lottieRef={animeRef} animationData={AnimationData}/>}
    </div>
  )
}

export default IntroAnimationComp;