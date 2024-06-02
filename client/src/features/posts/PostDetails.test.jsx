import { MemoryRouter, Route, Routes } from "react-router-dom";
import PostDetail from "./PostDetails";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as postService from "../../services/postService";


jest.mock("../../services/postService",() => ({
    fetchPost: jest.fn(),
    deletePost: jest.fn(),
}));

describe("postDetails component", () =>{
    const mockPost = {
        id: 1,
        title: "Test Post Title",
        body: "Test Post Body",
    };

    const renderComponent = () => {
        render(
            <MemoryRouter initialEntries={[`/posts/${mockPost.id}`]}>
                <Routes>
                    <Route path="/posts/:id" element={<PostDetail post={mockPost} />} />
                    <Route path="/" element={<div>Posts List</div>} />
                </Routes>
            </MemoryRouter>
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("displays the fetched post data", async () => {
        postService.fetchPost.mockResolvedValue(mockPost);

        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(mockPost.title)).toBeInTheDocument();
            expect(screen.getByText(mockPost.body)).toBeInTheDocument();
        });
    });

    test("handles error when fetching the post data", async () => {

        const error = new Error("Failed to fetch");
        postService.fetchPost.mockRejectedValue(error);

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderComponent();

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(
                "Failed to fetch the post: ",
                error
            );
        });
        consoleSpy.mockRestore();
    });

    test("deletes the post and redirects to the posts list", async () => {
        postService.fetchPost.mockResolvedValue(mockPost);
        postService.deletePost.mockResolvedValue();

        renderComponent();

        await waitFor(() => {
            fireEvent.click(screen.getByText("Delete"));
        });

        await waitFor(() => {
           expect(screen.getByText("Posts List")).toBeInTheDocument();
        });
    });

    test("handles error when deleting the post", async () => {
        const error = new Error("Failed to delete post");
        postService.fetchPost.mockResolvedValue(mockPost);
        postService.deletePost.mockRejectedValue(error);
        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderComponent();

        await waitFor(() => {
            fireEvent.click(screen.getByText("Delete"));
        });

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(
                "Failed to delete the post: ",
                error
            );
        });
        consoleSpy.mockRestore();
    });
});