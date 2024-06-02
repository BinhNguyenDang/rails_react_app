// standard
import { fireEvent, render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react";
//Custom
import { createPost } from "../../services/postService";
import NewPostForm from "./NewPostForm";

jest.mock("../../services/postService", () => ({
    // return an Id, title, body
    createPost: jest.fn(() => {
        return {
            id: 1,
            title: "Test Post",
            body: "This is a test post."
        }
    }),

}));

describe("NewPostForm", () => {

    const renderForm = () => {
        render(
            <Router>
                <NewPostForm />
            </Router>
        );
    }   

    afterEach(() => {
        jest.clearAllMocks();
    });
    test("renders NewPostForm and allows typing", () => {

        renderForm();

        const titleInput = screen.getByLabelText(/Title:/i);
        const bodyInput = screen.getByLabelText(/Body:/i);
        const submitButton = screen.getByRole("button", { name: /Create Post/i });

        const expectedTitle = "Test Post"
        const expectedBody = "This is a test post."

        fireEvent.change(titleInput, { target: { value: expectedTitle } });
        fireEvent.change(bodyInput, { target: { value: expectedBody } });
        
        expect(titleInput.value).toBe(expectedTitle);
        expect(bodyInput.value).toBe(expectedBody);
        expect(submitButton).toBeInTheDocument();
    });

    test("submits form and redirects to the post page", async () => {
        renderForm();

        const titleInput = screen.getByLabelText(/Title:/i);
        const bodyInput = screen.getByLabelText(/Body:/i);
        const submitButton = screen.getByRole("button", { name: /Create Post/i });

        const expectedTitle = "Test Post"
        const expectedBody = "This is a test post."

        fireEvent.change(titleInput, { target: { value: expectedTitle } });
        fireEvent.change(bodyInput, { target: { value: expectedBody } });
        await act(async () => {
            fireEvent.click(submitButton);
        });
        expect(createPost).toHaveBeenCalledTimes(1);
    });

    test("Displays error message when post creation fails", async () => {
        createPost.mockRejectedValue(new Error("Failed to create post"));

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderForm();

        const titleInput = screen.getByLabelText(/Title:/i);
        const bodyInput = screen.getByLabelText(/Body:/i);
        const submitButton = screen.getByRole("button", { name: /Create Post/i });

        const expectedTitle = "Test Post"
        const expectedBody = "This is a test post."

        
        fireEvent.change(titleInput, { target: { value: expectedTitle } });
        fireEvent.change(bodyInput, { target: { value: expectedBody } });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(consoleSpy).toHaveBeenCalledWith(
            "Failed to create post: ",
            new Error("Failed to create post")
        );
    });
});
