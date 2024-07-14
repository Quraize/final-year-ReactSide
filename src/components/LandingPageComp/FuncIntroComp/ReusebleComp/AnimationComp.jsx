import Lottie from 'lottie-react';
import './AnimeStyles.css';

// eslint-disable-next-line react/prop-types
function AnimationComp({Data}) {
  return (
    <div className='func-anime-sec'>
        <Lottie animationData={Data}/>
    </div>
  )
}

export default AnimationComp;