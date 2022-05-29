import { useId } from "react";
import { Link } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as SlickCarousel} from 'react-responsive-carousel';
import arrDivide from "../../utils/divideArray";
import './users.scss';

const Users = ({users}) => {

    const id = useId();

    return (
        <>
            <SlickCarousel showStatus={false}
                           showIndicators={false}
                           showThumbs={false}
                           emulateTouch={true}
                           swipeable={true}
            >
                    {arrDivide(users, 4).map(group => {
                        return <div className="flex" key={id}>{
                            group.map(user => (
                                <div className="user" key={user.id}>
                                    <div className="user__name">{user.fullName}</div>
                                    <div className="user__city">{user.city}</div>
                                    <Link to={`/users/${user.id}`} href={user.homepage}>Смотреть профиль</Link>
                                </div>
                    ))}</div>})}
            </SlickCarousel>
        </>
    )
}

export default Users;