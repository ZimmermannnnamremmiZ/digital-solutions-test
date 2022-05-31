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
  const postsRefs = useRef([]);
  const {userId} = useParams();
  const [data, setData] = useState({user: false, posts: []});
  const [active, setActive] = useState(false)

  const {getUser, getUserPosts} = useApi();

  // при клике на элемент с ref, добавит класс selected
  const onPostClick = (id) => {
    postsRefs.current.forEach(item => item.classList.remove('post__item_selected'))
    postsRefs.current[id].classList.add('post__item_selected')
    postsRefs.current[id].focus()
  }

  const onPostOver = () => {
    postsRefs.current.forEach(item => item.classList.remove('post__item_selected'))
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
                {arrDivide(data.posts, 2).map(group => {
                  return <div className='post__slide' key={id}>
                            {group.map((post) => (
                              <div className='post__item'
                                   key={post.id}
                                   ref= {el => postsRefs.current[post.id] = el}
                                   onClick={() => {onPostClick(post.id)}}
                                   onMouseOver={onPostOver}
                              >
                                <h6 className='post__item-title'>{post.title}</h6>
                                <div className='post__item-date'>12.01.22</div>
                                <p id='post-item' className='post__item-body'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolores nemo commodi soluta omnis repellendus neque perferendis pariatur eum? Veritatis hic, quod reprehenderit soluta quas facere unde numquam error minus?
                                Ducimus placeat incidunt suscipit voluptates voluptatum blanditiis provident repellat numquam, quia dignissimos harum corrupti ipsa ab? Fugit laborum excepturi aliquam esse dolorem similique quod magnam reiciendis, eos incidunt architecto ad!
                                Doloremque, veniam provident laudantium repudiandae odit quidem nihil quas id, velit vitae aspernatur quisquam. Blanditiis ullam, harum sapiente quo dolor qui? Tempore quaerat totam fugiat dolorum maxime omnis sapiente consequuntur!
                                Culpa molestiae minus iure odio nulla rerum qui ipsa ipsum reprehenderit molestias illum, numquam voluptatum possimus ad sint distinctio assumenda, in tempore praesentium impedit quo nemo accusamus. Dolore, accusamus quidem?
                                Illum ipsa possimus animi autem nam. Magnam laboriosam necessitatibus ducimus accusamus possimus culpa temporibus fugiat harum corporis suscipit porro voluptate quibusdam optio quos recusandae, placeat nobis repellendus ratione non animi.
                                Perspiciatis, culpa. A mollitia beatae optio vero ea dolores possimus amet officia quaerat earum maiores, repudiandae, dignissimos asperiores molestias nihil ad animi totam ducimus ab veniam accusamus! Optio, quibusdam nulla.
                                Animi modi obcaecati debitis iure minus iste corrupti ad error. Minus in atque ratione repellat sunt fuga velit, laboriosam, iusto dolores voluptatibus nihil voluptatem minima dignissimos magnam dolorum pariatur est!
                                Non in error quia iusto, quam quas impedit ullam nulla et veritatis similique earum libero ipsum voluptates deserunt cumque vero ex nisi ut natus! Consectetur minima quia ut sit deleniti?
                                Doloremque doloribus quos, corporis tenetur quae odio voluptatum aliquam voluptatibus perspiciatis, minima incidunt architecto nisi fugit ducimus harum quis, laborum ab officia mollitia repudiandae minus. Quisquam fugiat eligendi vero unde.
                                Eveniet obcaecati nostrum officiis consequatur vel voluptates commodi saepe natus, sequi explicabo doloribus odio asperiores ipsum et molestias inventore, quam deleniti distinctio cum aperiam quos labore dolores! Tempore, perspiciatis eos!</p>
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