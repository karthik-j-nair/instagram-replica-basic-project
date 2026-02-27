import Post from "../components/Post";
import "../styles/feed.scss";
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";
import Navbar from "../../Shared/Navbar";

const Feed = () => {

    const {handleGetFeed, loading, setLoading, feed, handleLike, handleUnLike} = usePost();

    useEffect(()=>{
        handleGetFeed()
    }, [])

    if(loading || !feed){
        return (
            <main><h2>Loading....</h2></main>
        )
    }
  return (
    <main className="feed-page">
      <Navbar />
      <div className="feed">
        <div className="posts">
          {feed.map((post, idx)=>{
            return <Post key={idx} user={post.user} post={post} handleLike={handleLike} handleUnLike={handleUnLike}/>
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
