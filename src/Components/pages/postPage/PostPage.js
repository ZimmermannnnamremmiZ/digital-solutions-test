import { useEffect, useRef, useState, useId } from 'react';
import { useParams } from 'react-router-dom';

import useApi from '../../../api';
import './postPage.scss';

const PostPage = () => {
    const id = useId();
    const isMounted = useRef();
    const {postId} = useParams();
    const [data, setData] = useState({post: {}, comments: []});
    // const [post, setPost] = useState({})
    // const [comments, setComments] = useState([])
    const [form, setForm] = useState(true)
    const [comEmail, setComEmail] = useState('')
    const [comName, setComName] = useState('')
    const [comBody, setComBody] = useState('')
    const {getPostComments, getPost, postComment} = useApi();

    useEffect(() => {
    // для React 18, чтобы не было по 2 fetch запроса в network
        if (isMounted.current) return;
        isMounted.current = true;

        fetchData()
    }, [postId])

    const fetchData = async () => {
        setData({
          post: await getPost(postId),
          comments: [...await getPostComments(postId)]
        })
      }

    const onAddComment = () => {
        setForm(!form)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        postComment(id, comName, comBody, comEmail, postId)
    }

    console.log('render')

    return(
        <div className='container'>
            {form
            ? <>
                <div className='postSingle'>
                    <div className='postSingle__header'>Название поста</div>
                    <h4 className='postSingle__title'>{data.post.title}</h4>
                    <div className='postSingle__header'>Содержимое поста</div>
                    <p className='postSingle__body'>{data.post.body}</p>
                </div>
                <div className='comments'>
                    <div className='comments__header'>Комментарии</div>
                    {data.comments.map(comment => {
                        return(
                            <div className='comments__item' key={comment.id}>
                                <div className='comments__item-owner'>{comment.email}</div>
                                <h4 className='comments__item-header'>Название комментария</h4>
                                <p className='comments__item-title'>{comment.name}</p>
                                <h4 className='comments__item-header'>Содержимое комментария</h4>
                                <p className='comments__item-body'>{comment.body}</p>
                            </div>
                        )
                    })}
                </div>
                <button className='comments__add' onClick={onAddComment}>Добавить комментарий</button>
              </>
            : <form className='form' onSubmit={handleSubmit}>
                <div className='form__item'>
                    <label className='form__item-label' htmlFor="email">Введите ваш email</label>
                    <input className='form__item-input'
                           type="email"
                           name='email'
                           placeholder='Ваш Email'
                           value={comEmail}
                           onChange={(e) => {setComEmail(e.target.value)}}/>
                </div>
                <div className='form__item'>
                    <label className='form__item-label' htmlFor="comment-name">Введите название комментария</label>
                    <input className='form__item-input'
                           type="text"
                           name='comment-name'
                           placeholder='Название комментария'
                           value={comName}
                           onChange={(e) => {setComName(e.target.value)}}/>
                </div>
                <div className='form__item'>
                    <label className='form__item-label' htmlFor="comment-name">Введите содержимое комментария</label>
                    <textarea className='form__item-textarea'
                              type="text"
                              name='comment-name'
                              placeholder='Содержание комментария'
                              value={comBody}
                              onChange={(e) => {setComBody(e.target.value)}}/>
                </div>
                <button className='form__submit' type='submit'>Отправить / Send</button>
              </form>
            }
        </div>
    )
}

export default PostPage