import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as SlickCarousel} from 'react-responsive-carousel';
import './users.scss';

const Users = ({users, onUserSelected}) => {

    return (
        <>
            <SlickCarousel showStatus={false}
                           showIndicators={false}
                           showThumbs={false}
                           swipeable={true}
                           emulateTouch={true}
            >
                {users.map((item) => (
                        <div
                            className="user"
                            onClick={() => onUserSelected(item.id)}
                            onKeyPress={(el) => {
                                if (el.key === ' ' || el.key === 'Enter') {
                                    onUserSelected(item.id);
                                }
                            }}
                            key={item.id}
                        >
                            <div className="user__name">{item.name}</div>
                            <div className="user__city">{item.city}</div>
                            <button>Смотреть профиль</button>
                        </div>
                ))}
            </SlickCarousel>
        </>
    )
}

export default Users;