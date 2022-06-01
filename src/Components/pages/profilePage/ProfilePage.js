import { useState, useEffect, useId, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as SlickCarousel} from 'react-responsive-carousel';
import arrDivide from "../../../utils/divideArray";
import useApi from '../../../api';


import './profilePage.scss';

const ProfilePage = () => {
  const id = useId();
  const isMounted = useRef();
  const {userId} = useParams();
  const [data, setData] = useState({user: false, posts: []});
  const [active, setActive] = useState(false)

  const {getUser, getUserPosts} = useApi();

  const fetchData = async () => {
    setData({
      user: await getUser(userId),
      posts: [...await getUserPosts(userId)]
    })
  }

  useEffect(() => {
    // для React 18, чтобы не было по 2 fetch запроса в network
    if (isMounted.current) return;
    isMounted.current = true;

    fetchData()
  }, [userId])

  return(
    <>
        <div className='profile'>
          <div className='profile__header flex'>
            <div className='profile__space'></div>
            <h2 className='profile__name'>{data.user.username}</h2>
            <div className='profile__space'></div>
          </div>
          <div className='profile__data flex'>
            <div className='profile__data-space'></div>
            <div className='profile__data-item'>{data.user.name}</div>
            <div className='profile__data-item'>{data.user.email}</div>
            <div className='profile__data-item'>{data.user.phone}</div>
            <div className='profile__data-item'>{data.user.website}</div>
            <div className='profile__data-item'>
              <div>{data.user.company}</div>
              <div>{data.user.bs}</div>
            </div>
            <div className='profile__data-space'></div>
          </div>
              <ul className={active ? 'profile__data-posts--active' : 'profile__data-posts'} onClick={() => setActive(!active)}>
                {/* как в задании, список из 3-х превью */}
                {data.posts.map(el => <li key={el.id}>{el.title}</li>)}
              </ul>
          <div className='post'>
            <h2 className='post__title'>Посты</h2>
              <SlickCarousel showStatus={false}
                             showIndicators={false}
                             showThumbs={false}
              >
                {/* разбито на группы для разделения элементов по слайдам */}
                {arrDivide(data.posts, 2).map(group => {
                  return <div className='post__slide' key={id}>
                            {group.map((post) => (
                              <div className='post__item' key={post.id}>
                                <h6 className='post__item-title'>{post.title}</h6>
                                <div className='post__item-date'>12.01.22</div>
                                <p id='post-item' className='post__item-body'>{post.body}</p>
                                <Link to={`/posts/${post.id}`} className='post__item-link'></Link>
                              </div>
                            ))}
                          </div>
                })}
              </SlickCarousel>
          </div>
        </div>
    </>

  )
}

export default ProfilePage