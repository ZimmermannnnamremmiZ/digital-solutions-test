import { useState } from "react";
import { Link } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as SlickCarousel} from 'react-responsive-carousel';
import './users.scss';

const Users = ({users, onUserSelected}) => {


    const [currentSlide, setCurrentSlide] = useState(0)

    const arrowStyles = {
        position: 'absolute',
        border: 'none',
        zIndex: 3,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 30,
        height: '100%',
        background: 'rgba(0,0,0,0.2)',
        cursor: 'pointer',
        right: 0,
    };

    const getItem = (el) => {
            setCurrentSlide(el)
    }

    return (
        <>
            <SlickCarousel showStatus={false}
                           showIndicators={false}
                           showThumbs={false}
                           onChange={getItem}
                           selectedItem={currentSlide}
                           renderArrowNext={(onClickHandler, hasNext, label) =>
                            (currentSlide+1)*4 < users.length
                                ? hasNext && (
                                    <button className='nextSlides' onClick={onClickHandler} title={label} style={{ ...arrowStyles}} />
                                )
                                : null
                            }
            >
                {users.map((item) => (
                        <div
                            className="user"

                            key={item.id}
                        >
                            <div className="user__name">{item.name}</div>
                            <div className="user__city">{item.city}</div>
                            <Link to={`/users/${item.id}`}
                                  href={item.homepage}
                                  onClick={() => onUserSelected(item.id)}  // удалить если не понадобится
                                  onKeyPress={(el) => {
                                        if (el.key === ' ' || el.key === 'Enter') {
                                            onUserSelected(item.id);
                                        }
                                    }}>Смотреть профиль</Link>
                        </div>
                ))}
            </SlickCarousel>
        </>
    )
}

export default Users;