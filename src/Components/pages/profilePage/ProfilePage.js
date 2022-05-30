import { useState, useEffect, useId, useRef } from 'react';
import { useParams } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as SlickCarousel} from 'react-responsive-carousel';
import arrDivide from "../../../utils/divideArray";
import useApi from '../../../api';


import './profilePage.scss';

const ProfilePage = () => {
  const id = useId();
  const isMounted = useRef();
  const PostsRefs = useRef([]);
  const {userId} = useParams();
  const [data, setData] = useState({user: false, posts: []});
  const {getUser, getUserPosts} = useApi();

  // при клике на элемент с ref, добавит класс selected
  const onPostClick = (id) => {
    PostsRefs.current.forEach(item => item.classList.remove('post__item_selected'))
    PostsRefs.current[id].classList.add('post__item_selected')
    PostsRefs.current[id].focus()
  }

  const onPostOver = () => {
    PostsRefs.current.forEach(item => item.classList.remove('post__item_selected'))
  }

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
              <ul className='profile__data-posts'>
                {/* как в задании, список из 3-х превью */}
                {data.posts.map((el, i) => i<3 ? <li key={el.id}>{el.title}</li> : null)}
              </ul>
          <div className='post'>
            <h2 className='post__title'>Посты</h2>
              <SlickCarousel showStatus={false}
                             showIndicators={false}
                             showThumbs={false}
              >
                {arrDivide(data.posts, 2).map(group => {
                  return <div className='post__slide' key={id}>
                            {group.map((post) => (
                              <div className='post__item'
                                   key={post.id}
                                   ref= {el => PostsRefs.current[post.id] = el}
                                   onClick={() => {onPostClick(post.id)}}
                                   onMouseOver={onPostOver}
                              >
                                <h6 className='post__item-title'>{post.title}</h6>
                                <p id='post-item' className='post__item-body'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima corporis, unde consequatur dolores quibusdam magnam a! Repellendus facilis debitis alias aliquam, impedit modi velit maxime eveniet cum aperiam ullam repudiandae. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio maiores vero iure officiis expedita cumque neque minima soluta in, quis quam, nobis odio culpa praesentium debitis temporibus itaque quasi illum!
                                Obcaecati laborum aperiam repudiandae! Cum dicta quam dolores laborum quia suscipit omnis maiores magnam quas incidunt totam, deleniti consequatur quasi provident repellendus harum voluptate! Voluptas vel illum reprehenderit exercitationem dolorem.
                                Fugit animi quam ad, labore eius modi repellat veniam fuga reprehenderit illo quas eligendi ipsum eos officia sunt praesentium neque quia. Assumenda voluptas ea voluptatem numquam consectetur! Iure, blanditiis praesentium?
                                Consequuntur reprehenderit totam consequatur dignissimos fugiat. Reprehenderit corrupti totam illum, pariatur sed quasi doloremque commodi facere, nulla vero voluptas quod minus a perferendis error ipsa, id odio alias. Odio, adipisci.
                                Id rem asperiores sint vitae error magnam, pariatur nobis quibusdam soluta minima? Unde adipisci laborum ipsum quod, aut asperiores tempora quos deserunt quis dolore, odio voluptatibus ut, ratione tenetur possimus.
                                Labore nulla dolorem nam quod cum repellat facilis. A eos, consequatur, rem ut neque quae velit totam porro similique corporis quos fugit illo rerum delectus! Perspiciatis pariatur quisquam assumenda itaque.
                                Velit non obcaecati eligendi ipsum eveniet laborum quod itaque voluptatum delectus ad temporibus a fuga inventore in, neque placeat doloribus error nobis ea cupiditate quis. Deserunt distinctio itaque repellendus dolorem?
                                Ducimus, optio! Corrupti voluptate obcaecati fuga debitis deleniti esse sed sequi! Quidem veritatis fuga ea culpa voluptatem in. Ipsum aut vel dolores laborum sequi amet ratione perferendis obcaecati quisquam. Aspernatur?
                                Sed doloremque consectetur eveniet repellat unde error, reiciendis possimus iste! Numquam voluptas rem, est exercitationem mollitia ex nesciunt quasi. Nisi aspernatur doloribus eum quibusdam, porro minus minima deserunt impedit natus.</p>
                                {/* {post.body} */}
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