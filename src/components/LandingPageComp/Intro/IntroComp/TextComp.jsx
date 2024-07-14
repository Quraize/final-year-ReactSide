import './TextCompStyles.css';
import { useEffect, useState } from 'react';



const items = [
    {
        key: 1,
        content: 'essays'
    },
    {
        key: 2,
        content: 'pdfs'
    },
    {
        key: 3,
        content: 'reports'
    },
    {
        key: 3,
        content: 'emails'
    },
]
export default function TextComp() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Function to show the next item after 2.5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000); // Change item every 3 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='text-area-main-sec'>
      <h1 className='heading'>Seamless, scalable insight for your <span className='intro-changing-words' key={items[currentIndex].key}>{items[currentIndex].content}</span></h1>
        <br />
        <div  className='detail'><p>Voxalyze offers advanced text analysis tools for businesses, enabling deeper insights, streamlined multilingual communication, and customized workflows for maximum impact.</p></div>
    </div>
    );
}
