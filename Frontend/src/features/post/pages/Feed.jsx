import Post from "../components/Post";
import "../styles/feed.scss";
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";

const Feed = () => {

    const {handleGetFeed, loading, setLoading, feed} = usePost();

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
      <div className="feed">
        <div className="posts">
          {/* <Post /> */}
          {feed.map((post, idx)=>{
            return <Post key={idx} user={post.user} post={post}/>
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
