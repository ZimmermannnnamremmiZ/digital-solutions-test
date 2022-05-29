import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as SlickCarousel} from 'react-responsive-carousel';

import './carousel.scss'
import slide from '../../resources/img/slide.png'

const Carousel = () => {
  return(
    <div className="carousel">
      <SlickCarousel showStatus={false}
                     showIndicators={false}
                     showThumbs={false}
                     infiniteLoop={true}
                     dynamicHeight={true}
                     >
        <div className="carousel__img-container">
            <img className="carousel__img" src={slide} />
        </div>
        <div className="carousel__img-container">
            <img className="carousel__img" src={slide} />
        </div>
        <div className="carousel__img-container">
            <img className="carousel__img" src={slide} />
        </div>
      </SlickCarousel>
    </div>
  )
}

export default Carousel

