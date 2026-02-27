import User from "../components/User";
import "../style/style.scss";
import { useUser } from "../hooks/useUser.js";
import { useEffect } from "react";
import UserFollower from "../components/UserFollower.jsx";

const FriendRequests = () => {

    const{users, loading, handleFetchUsers, handleFollow, followers, followings, handleFollowUser} = useUser();

    useEffect(()=>{
        handleFetchUsers(),
        handleFollow()
    },[])

    // console.log(users);
    // console.log(followers);
    // console.log(followings);
    
    

  return (
    <main className="friend-request-page">
      <div className="layout">
        <div className="left">
          <div className="box small">
            <h2>Followers</h2>
            <div className="all-followers">
              {followers.map((follower, idx)=>{
                return <UserFollower key={idx} follower={follower} />
              })}
            </div>
          </div>
          <div className="box small">
            <h2>Following</h2>
            <div className="all-followers">
              {followings.map((follower, idx)=>{
                return <UserFollower key={idx} follower={follower} />
              })}
            </div>
          </div>
        </div>

        <div className="right">
          <div className="box large">
            <h2>Users</h2>
            <div className="all-users">
                {users.map((user, idx)=>{
                    return <User key={idx} user={user} handleFollowUser={handleFollowUser} />
                })}
            </div>
          </div>
          <div className="box large">
            <h2>Requests</h2>

          </div>
        </div>
      </div>
    </main>
  );
};

export default FriendRequests;
