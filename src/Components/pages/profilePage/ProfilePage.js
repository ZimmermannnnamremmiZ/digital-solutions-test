import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import setContent from '../../../utils/setContent';
import useApi from '../../../api';

import './profilePage.scss'

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const [userLoading, setUserLoading] = useState(false) ;
  const {id} = useParams();
  const {process, setProcess, getUser} = useApi();

  useEffect(() => {
    onRequest(true);
    console.log(elements)
    // eslint-disable-next-line
  }, [])

  const onUserLoaded = (newUser) => {
    setUser(newUser)
    setUserLoading(() => false)
  }

  const onRequest = (initial) => {
    getUser(id)
        .then(onUserLoaded)
        .then(() => setProcess('confirmed'))
  }


  const elements = useMemo(() => {
    return setContent(process, user, null, userLoading)
  }, [process])

  return(
    <>
        <div className='user'>
          <div className='user__header flex'>
            <div className='user__space'></div>
            <h2 className='user__name'>{user.name}</h2>
            <div className='user__space'></div>
          </div>
          <div className='user__data flex'>
            <div className='user__data-space'></div>
            <div className='user__data-item'>{user.city}</div>
            <div className='user__data-item'>{user.email}</div>
            <div className='user__data-item'>{user.phone}</div>
            <button className='user__message-btn'>Написать сообщение</button>
            <button className='user__offer-btn'>Предложить сходить на концерт</button>
            <div className='user__data-space'></div>
          </div>
        </div>
        Id юзера: {id}
    </>

  )
}

export default ProfilePage