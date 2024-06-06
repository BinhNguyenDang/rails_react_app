import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import PostForm from "./PostForm";
import { objectToFormData } from "../../utils/formDataHelper";

function NewPostForm(){ 
    const navigate = useNavigate();

    const handleCreateSubmit = async (rawData) => {
        // // create the Formdata object
        // const formData = new FormData();
        // //cant just be the raw fields 
        // // needs to be wrapped in a post[field_name]
        // formData.append("post[title]", rawData.title);
        // formData.append("post[body]", rawData.body);
        // formData.append("post[image]", rawData.image);
        try {
            const formData = objectToFormData({post: rawData});
            const response = await createPost(formData);
            navigate(`/posts/${response.id}`);
        } catch (e) {
            console.error("Failed to create post: ", e);
        }
    };

    return (
       <PostForm 
            headerText="Create a New Post"
            onSubmit={handleCreateSubmit}
            buttonText="Create Post"
       />
    );
}

export default NewPostForm;