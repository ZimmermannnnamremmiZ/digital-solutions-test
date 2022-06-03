import { useId } from "react";
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as SlickCarousel} from 'react-responsive-carousel';
import arrDivide from "../../utils/divideArray";
import './users.scss';

const Users = ({users}) => {

    const id = useId();

    // для изменения количества слайдов при изменении размера окна или разрешения экрана
    const minWidth1024px = useMediaQuery({ minWidth: 1024 })
    const minWidth849px = useMediaQuery({ minWidth: 849 })
    const minWidth601px = useMediaQuery({ minWidth: 601 })
    const widthForSlider = () => {
        if (minWidth1024px) {
            return 4
        } else if (minWidth849px) {
            return 3
        } else if (minWidth601px) {
            return 2
        } else {
            return 1
        }
    }


    return (
        <>
            <SlickCarousel showStatus={false}
                           showIndicators={false}
                           showThumbs={false}
                           emulateTouch={true}
                           swipeable={true}
            >
                    {arrDivide(users, widthForSlider()).map(group => {
                        return <div className="slideUser" key={id}>{
                                    group.map(user => (
                                        <div className="user" key={user.id}>
                                            <div className="user__name">{user.fullName}</div>
                                            <div className="user__city">{user.city}</div>
                                            <Link to={`/users/${user.id}`} href={user.homepage}>Смотреть профиль</Link>
                                        </div>
                                    ))}
                                </div>
                    })}
            </SlickCarousel>
        </>
    )
}

export default Users;