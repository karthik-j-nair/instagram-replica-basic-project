import React from 'react'

const User = ({user, handleFollowUser}) => {
  return (
    <div className='user-card'>
        <img src={user.profilePicture} alt="" />
        <p>{user.username}</p>
        <button onClick={()=>{handleFollowUser(user.username)}}  className='button'>Follow</button>
    </div>
  )
}

export default User