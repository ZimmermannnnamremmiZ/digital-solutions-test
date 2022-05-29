import { useState, useEffect, useMemo } from 'react';
import useApi from '../../api';
import setContent from '../../utils/setContent';
import Users from '../users/Users';

import './userList.scss';

const UserList = () => {

  const [users, setUsers] = useState(null)
  const {process, setProcess, getAllUsers} = useApi();

  useEffect(() => {
    setProcess('loading');
    getAllUsers()
      .then(users => setUsers(users))
      .then(() => setProcess('confirmed'))
  }, [])
  
  return (
    <div className="users__list">
        {useMemo(() => setContent(process, Users, {users}), [process])}
    </div>
  )
}

export default UserList