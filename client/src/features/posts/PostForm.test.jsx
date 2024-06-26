import { render, fireEvent } from "@testing-library/react";
import PostForm from "./PostForm";
import { act } from "react";

describe("PostForm Component", () => {
    //Post is null by default, for the instance when a new post is being created
    test("renders default inputs when no post prop is passed", () => {
        // Because headertext is required, we cant render the component without it
        const mockSubmit = jest.fn();
        const buttonText = "Submit"

        const { getByLabelText } = render(
        <PostForm headerText="New Post" 
                  onSubmit={mockSubmit} 
                  buttonText={buttonText} />);

        expect(getByLabelText(/title/i)).toBeInTheDocument();    
        expect(getByLabelText(/body/i)).toBeInTheDocument();
    });
    test("renders passed in post data", () => {
        const mockPost = {
            title: "Test Post",
            body: "This is a test post.",
        };
        const mockSubmit = jest.fn();
        const buttonText = "Submit"
        const { getByLabelText } = render(

        <PostForm headerText="New Post" 
                  onSubmit={mockSubmit} 
                  buttonText={buttonText}
                  post={mockPost} />);

        expect(getByLabelText(/title/i)).toBeInTheDocument();
        expect(getByLabelText(/body/i)).toBeInTheDocument();
        expect(getByLabelText(/title/i).value).toBe(mockPost.title);
        expect(getByLabelText(/body/i).value).toBe(mockPost.body);
    });
    test("Update the input value on change", () => {
        const mockSubmit = jest.fn();
        const buttonText = "Submit";
        const headerText = "New Post";
        const { getByLabelText } = render(
            <PostForm headerText={headerText} 
                      onSubmit={mockSubmit} 
                      buttonText={buttonText} />
        );
        const titleInput = getByLabelText(/title/i);
        const newTitle = "Test Post";
        fireEvent.change(titleInput, { target: { value: "Test Post" } });
        expect(titleInput.value).toBe(newTitle);
    });
    test("calls onSubmit with the form data when submitted", async () => {
        const mockSubmit = jest.fn();
        const buttonText = "Submit";
        const headerText = "New Post";
        const { getByLabelText, getByRole } = render(
            <PostForm headerText={headerText} 
                      onSubmit={mockSubmit} 
                      buttonText={buttonText} />
        );
        const titleInput = getByLabelText(/title/i);
        const newTitle = "Test Post";
        const bodyInput = getByLabelText(/body/i);
        const newBody = "This is a test post.";
        fireEvent.change(titleInput, { target: {value: newTitle} });
        fireEvent.change(bodyInput, { target: {value: newBody} });
        await act(async () => {
            fireEvent.click(getByRole("button", { name: /Submit/i }));
        });
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith({
            title: newTitle,
            body: newBody,
            image: "",
        });
    });
});