import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { getFeed, createPost, likePost, unLikePost } from "../services/post.api";

export const usePost = () => {
    const context = useContext(PostContext);

    const { loading, setLoading, post, setPost, feed, setFeed } = context;

    async function handleGetFeed() {
        setLoading(true);
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    async function handleCreatePost(imageFile, caption) {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([data.post, ...feed]);
        setLoading(false);
    }

    async function handleLike(postId) {
        const data = await likePost(postId)
        await handleGetFeed();
    }
    async function handleUnLike(postId) {
        const data = await unLikePost(postId)
        await handleGetFeed();
    }

    useEffect(() => {
        handleGetFeed()
    }, [])

    return { loading, post, feed, handleGetFeed, handleCreatePost, handleLike, handleUnLike }

}