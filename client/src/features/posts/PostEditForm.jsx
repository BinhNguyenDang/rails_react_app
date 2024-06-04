import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";
import PostForm from "./PostForm";

function EditPostForm() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        //Fetch the current pist by id
        const fetchCurrentPost = async () => {
            try {
                const json = await fetchPost(id);
                setPost(json);
            } catch (err) {
                console.error("Failed to fetch the post: ", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentPost();
    }, [id]);

    const handleUpdateSubmit = async (formData) => {
        try {
            await updatePost(id, formData);
            
            navigate(`/posts/${id}`);

        } catch(e){
            console.error("Failed to update the post: ", e);

        }
       
    };
    if (!post) return <h2>Loading ...</h2>;
    return (
       <PostForm 
        post={post}
        onSubmit={handleUpdateSubmit}
        headerText="Edit Post"
        buttonText="Update Post"
       />
    );
}

export default EditPostForm