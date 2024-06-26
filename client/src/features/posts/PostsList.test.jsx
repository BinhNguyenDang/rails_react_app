import { MemoryRouter } from "react-router-dom";
import PostsList from "./PostsList";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as postsService from "../../services/postService";


jest.mock("../../services/postService", () => ({
    fetchAllPosts: jest.fn(),
    deletePost: jest.fn(),
}));

global.console.error = jest.fn();

describe("PostsList component", () => {
    const mockPosts = [
        { id: 1, title: "Post 1", body: "Hello World!" },
        { id: 2, title: "Post 2", body: "Hello World!" },
    ];

    beforeEach(() => {
        postsService.fetchAllPosts.mockResolvedValue(mockPosts);
        postsService.deletePost.mockResolvedValue();
    });

    test("renders the list of posts", async () => {
        render(<PostsList posts={mockPosts} />, { wrapper: MemoryRouter });

        await waitFor(() => screen.getByText("Post 1"));
        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByText("Post 2")).toBeInTheDocument();
    });

    test("delete a post when delete button is clicked", async () => {
        render(<PostsList />, { wrapper: MemoryRouter});
        const postText = "Post 1";
        await waitFor(() => screen.getByText(postText));

        fireEvent.click(screen.getAllByText("Delete")[0]);

        await waitFor(() => expect(postsService.deletePost).toHaveBeenCalled());

        expect(screen.queryByText(postText)).not.toBeInTheDocument();
    });

    test("sets error and loading to false when fetching posts fails", async () => {
        //"Failed to fetch posts: ", e => An error occurred!
        const error = new Error("An error occurred!");
        postsService.fetchAllPosts.mockRejectedValue(error);

        render(<PostsList />, {wrapper: MemoryRouter});

        await waitFor(() => {
            // TODO: psy on the console instead of mocking it
            expect(console.error).toHaveBeenCalledWith(
                "Failed to fetch posts: ",
                error
            );
        });
    });

    test("logs error when deleting post fails", async () => {
        postsService.fetchAllPosts.mockResolvedValue(mockPosts);
        const deleteError = new Error("Delete failed!");
        postsService.deletePost.mockRejectedValue(deleteError);

        render(<PostsList />, { wrapper: MemoryRouter });

        await waitFor(() => screen.getByText("Post 1"));

        fireEvent.click(screen.getAllByText("Delete")[0]);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(
                "Failed to delete the post: ",
                deleteError
            );
        });
    });
});
