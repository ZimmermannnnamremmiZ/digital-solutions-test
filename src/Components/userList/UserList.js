import { useState, useEffect, useMemo, useRef } from 'react';
import useApi from '../../api';
import setContent from '../../utils/setContent';
import Users from '../users/Users';

import './userList.scss';

const UserList = () => {

  const [users, setUsers] = useState(null);
  const isMounted = useRef();
  const {process, setProcess, getAllUsers} = useApi();

  useEffect(() => {
    // для React 18, чтобы не было по 2 fetch запроса в network
    if (isMounted.current) return;
    isMounted.current = true;

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