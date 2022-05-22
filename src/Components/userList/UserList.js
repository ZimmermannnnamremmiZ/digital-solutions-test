import { useState, useEffect, useMemo } from 'react';
import useApi from '../../api';
import Spinner from '../spinner/Spinner';
import Page404 from '../errorMessage/ErrorMessage';
import Users from '../users/Users';

import './userList.scss';

const setContent = (process, Component, props, newItemLoading) => {
  switch (process) {
      case 'waiting':
          return <Spinner />;
      case 'loading':
          return newItemLoading ? <Component {...props}/> : null;
      case 'confirmed':
          return <Component {...props}/>;
      case 'error':
          return <Page404 />;
      default:
          throw new Error('Unexpected process state')
  }
}


const UserList = ({onUserSelected}) => {

  const [users, setUsers] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const {process, setProcess, getAllUsers} = useApi();

  useEffect(() => {
    onRequest(true);
    // eslint-disable-next-line
  }, [])

  const onUsersLoaded = (newCharacters) => {

    setUsers(characters => [...characters, ...newCharacters])
    setNewItemLoading(() => false)
  }

  const onRequest = (initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)
    getAllUsers()
        .then(onUsersLoaded)
        .then(() => setProcess('confirmed'))
  }

  const data = {onUserSelected, users}

  const elements = useMemo(() => {
    return setContent(process, Users, data, newItemLoading)
}, [process])

  return (
    <div className="users__list">
        {elements}
    </div>
  )
}

export default UserList