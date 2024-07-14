import './SuggestionsStyles.css';
import Carousel from 'react-bootstrap/Carousel';
import TextPara from '../../../LandingPageComp/FuncIntroComp/ReusebleComp/TextPara';


// eslint-disable-next-line react/prop-types
export default function Suggestions({Items}) {
    const items = [...Items];
  return (
    <div className='suggestion-main-sec'>
        <Carousel data-bs-theme="dark" className='suggestion-carousel-self' controls={false} indicators={true}  slide touch={true}>
            {items.map((item) => (
                <Carousel.Item key={item.key}>
                    <p className='suggestion-carousel-text'>{item.content}{item.material ? <span><TextPara Items={item.material}/></span> : ''}</p>
                </Carousel.Item>
            ))}
        </Carousel>
    </div>
  )
}
