import './RightTextStyles.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import TextPara from './TextPara';

// eslint-disable-next-line react/prop-types
export default function RightText({heading, Items}) {
  const items = [...Items]

  return (
    <div className='right-func-main-sec'>
        <h1 className='func-text-main-heading'>{heading}</h1>
        <div className='func-text-carousel'>
          <Carousel data-bs-theme="dark" className='func-text-carousel-self' indicators  slide touch={true}>
            {items.map((item) => (
                    <Carousel.Item key={item.key}>
                    <h3 className='func-text-sub-heading'><i>{item.subHeading}</i></h3>
                    <p className='func-text-para'>{item.detail}<span><TextPara Items={item.material}/></span></p>
                    <div className='func-text-button-sec'><Button  className='func-text-button-self'>
                      {item.button}
                    </Button></div>
                    </Carousel.Item>
            ))}
          </Carousel>
        </div>
    </div>
  )
}
