import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const {id} = useParams()

  return(
    <div className="container">
      Id юзера: {id}
    </div>
  )
}

export default ProfilePage