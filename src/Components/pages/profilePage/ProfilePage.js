import { useState, useEffect, useId, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Carousel as SlickCarousel} from 'react-responsive-carousel';
import arrDivide from "../../../utils/divideArray";
import useApi from '../../../api';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import './profilePage.scss';

const ProfilePage = () => {
  const id = useId();
  const {userId} = useParams();
  const [data, setData] = useState({user: false, posts: []});
  const {getUser, getUserPosts} = useApi();

  const fetchData = async () => {
    const userData = await getUser(userId)
    const postsData = await getUserPosts(userId)
    setData({user: userData, posts: [...postsData]})
  }

  useEffect(() => {
    fetchData()
  }, [userId])

  
  console.log('ssss')

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
              <ul className='profile__data-posts'>
                {/* как в задании, список из 3-х превью */}
                {data.posts.map((el, i) => i<3 ? <li key={el.id}>{el.title}</li> : null)}
              </ul>
          <div className='post'>
            <h2 className='post__title'>Посты</h2>
              <SlickCarousel showStatus={false}
                             showIndicators={false}
                             showThumbs={false}
                             emulateTouch={true}
                             swipeable={true}
              >
                {arrDivide(data.posts, 2).map(group => {
                  return <div className='flex' key={id}>
                            {group.map(post => (
                              <div className='post__item' key={post.id}>
                                <h6 className='post__item-title'>{post.title}</h6>
                                <p className='post__item-body'>{post.body}</p>
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

// {arrDivide(users, 4).map(group => {
//   return <div className="flex" key={id}>{
//       group.map(user => (
//           <div className="user" key={user.id}>
//               <div className="user__name">{user.fullName}</div>
//               <div className="user__city">{user.city}</div>
//               <Link to={`/users/${user.id}`} href={user.homepage}>Смотреть профиль</Link>
//           </div>
// ))}</div>})}