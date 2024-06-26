import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";
import PostEditForm from "./PostEditForm";


jest.mock("../../services/postService", () => ({
    fetchPost: jest.fn(),
    updatePost: jest.fn(),
}));

describe("PostEditForm component", () => {
    const mockPost = {
        title: "Original Post Title",
        body: "Original Post Body",
    };

    const renderForm = () => 
        render(
            <MemoryRouter initialEntries={["/posts/1/edit"]}>
                <Routes>
                    <Route path="/posts/:id/edit" element={<PostEditForm />} />
                    <Route path="/posts/:id" element={<div>Post Detail</div>} />
                </Routes>
            </MemoryRouter>
        );

    beforeEach(() => {
        fetchPost.mockResolvedValue(mockPost);
        updatePost.mockResolvedValue();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should render the PostEditForm component", async () => {
        renderForm();
        await waitFor(() => {
           expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockPost.body)).toBeInTheDocument();
        
    });

    test(" successfully updates the post and redirects", async () => {
        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        const newPost = {   
            title: "New Post Title",
            body: "New Post Body",
        };

        fireEvent.change(screen.getByLabelText(/title/i), {
            target: { value: newPost.title },
        });

        fireEvent.change(screen.getByLabelText(/body/i), {
            target: { value: newPost.body },
        });

        await waitFor( async () => {
            fireEvent.click(screen.getByText(/Update Post/i));
        });

        await waitFor(() => {
            expect(updatePost).toHaveBeenCalledTimes(1);
            expect(updatePost).toHaveBeenCalledWith("1", newPost);    
        });

        expect(screen.getByText("Post Detail")).toBeInTheDocument();
    });

    test("shows a console error on update failure", async () => {
        const expectedError = new Error("Update failed");
        updatePost.mockRejectedValueOnce(expectedError);

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderForm();

        await waitFor(() => {
            fireEvent.click(screen.getByText(/Update Post/i));
        });

        await waitFor(() => {
            expect(updatePost).toHaveBeenCalledTimes(1);
        });
        expect(consoleSpy).toHaveBeenCalledWith("Failed to update the post: ", expectedError);

    });

    test("handles error when fetching the post", async () => {
        const expectedError = new Error("Fetch failed");
        fetchPost.mockRejectedValueOnce(expectedError);

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch the post: ", expectedError);
    });
 
});