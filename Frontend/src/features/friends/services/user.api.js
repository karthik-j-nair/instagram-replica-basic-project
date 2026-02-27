import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api/user",
    withCredentials: true
});

export async function fetchUsers() {
    const response = await api.get("/fetch-users")
    return response.data
    
}

export async function followerFollowing() {
    const response = await api.get("/follower-followee")
    return response.data
}

export async function followUser(username) {
    const response = await api.post("/follow/" + username)
    return response.data
}