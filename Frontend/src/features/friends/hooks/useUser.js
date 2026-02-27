import { useContext, useEffect } from "react";
import { UserContext } from "../user.context.jsx";
import { fetchUsers, followerFollowing, followUser } from "../services/user.api.js";

export function useUser() {
  const context = useContext(UserContext);

  const { users, setUsers, loading, setLoading, followers, followings, setFollowers, setFollowings } = context;

  const handleFetchUsers = async () => {
    const data = await fetchUsers();
    setUsers(data.users);
  }

  const handleFollow = async () => {
    const data = await followerFollowing()
    setFollowers(data.followers);
    setFollowings(data.followings);
  }

  // this function is to follow user 
  const handleFollowUser = async (username) => {
    const data = await followUser(username);
    await handleFollow();
  }

  return { loading, handleFetchUsers, users, handleFollow, followers, followings, handleFollowUser };
}
