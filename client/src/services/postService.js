import { POSTS_API_URL, SEARCH_API_URL } from "../constants";

async function fetchAllPosts(page = 1){
    const response = await fetch(`${POSTS_API_URL}?page=${page}`);
    if(!response.ok){
        throw new Error(response.statusText);
    }
    return response.json();
}

async function fetchPost(id){
    const response = await fetch(`${POSTS_API_URL}/${id}`);
    if(!response.ok){
        throw new Error(response.statusText);
    }
    return response.json();
}

async function createPost(postData){
    const response = await fetch(`${POSTS_API_URL}`, {
        method: "POST",
        //Does not need headers because its a formData
        // headers: {
        //     "Content-Type": "application/json",
        // },

        body: postData,
    });
    if(!response.ok){
        throw new Error(response.statusText);
    }
    return response.json();
}

async function updatePost(id, postData){
    const response = await fetch(`${POSTS_API_URL}/${id}`, {
        method: "PUT",
        body: postData,
    });
    if(!response.ok){
        throw new Error(response.statusText);
    }
    return response.json();
}

async function deletePost(id){
    const response = await fetch(`${POSTS_API_URL}/${id}`, {
        method: "DELETE",
    });

    
// 204 is no content error code
    if (response.status === 204){
        return null;
    } 
        throw new Error(response.statusText);
}

async function searchPosts(query, page = 1){
    // api/v1/search + /posts/?q=...
    const response = await fetch(`${SEARCH_API_URL}/posts/?q=${query}&page=${page}`);
    if(!response.ok){
        throw new Error(response.statusText);
    }
    return response.json();
}

export { updatePost, createPost, fetchPost, deletePost, fetchAllPosts, searchPosts};
