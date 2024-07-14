import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function TextPara({Items}) {
    const items = [...Items];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Function to show the next item after 2.5 seconds
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 2000); // Change item every 3 seconds
    
        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
      });

  return (
    <><span className='intro-changing-words' key={items[currentIndex].key}>{items[currentIndex].content}</span></>
  )
}
