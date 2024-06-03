import fetchMock from "jest-fetch-mock"
import{
    fetchAllPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
} from "./postService";

fetchMock.enableMocks();

jest.mock("../constants", () => ({
    API_URL: "http://your-test-api-url",
}));

describe("Post API Service", () =>{
    beforeEach(() => {
        fetchMock.resetMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    //Index
    test("fetches all posts", async () => {
        const mockData = [
            { id: 1, title: "Post 1", body: "Hello World!" },
        ];
        fetch.mockResponseOnce(JSON.stringify(mockData));

        const result = await fetchAllPosts();

        expect(result).toEqual(mockData);
    });
    //Show
    test("fetches a single post", async () => {
        const mockPostID = 1;
        const mockData = { id: mockPostID, title: "Post 1", body: "Hello World!" };
        fetch.mockResponseOnce(JSON.stringify(mockData));

        const result = await fetchPost(mockPostID);

        expect(result).toEqual(mockData);
    });
    //New 
    //Create
    test("create a new post", async () => {
        const mockData = { title: "Post 1", body: "Hello World!" };
        fetch.mockResponseOnce(JSON.stringify(mockData));

        const result = await createPost(mockData);

        expect(result).toEqual(mockData);
    });
    //Edit
    //Update
    test("update a post", async () => {
        const mockPostID = 1;
        const mockData = { title: "Post 1", body: "Hello World!" };
        fetch.mockResponseOnce(JSON.stringify(mockData));

        const result = await updatePost(mockPostID, mockData);

        expect(result).toEqual(mockData);
    });
    //Delete
    test("delete a post", async () => {
        const mockPostID = 1;
        fetch.mockResponseOnce(null, { status: 204 });

        const result = await deletePost(mockPostID);

        expect(result).toEqual(null);
    });
    //Error handling
    test("throws an error when the fetchAllPost response is not ok", async () => {
        //Ensure that we are actually throiwing an error in the service.
        // We can do this by mocking the response to be not ok.
        fetch.mockResponseOnce(
            JSON.stringify({}),
            { status: 500 }
        );
        //We expect the service to throw an error.
        await expect(fetchAllPosts()).rejects.toThrow();

    });
    test("throws an error when the fetchPost response is not ok", async () => {
        const mockPostID = 1;
        fetch.mockResponseOnce(
            JSON.stringify({}),
            { status: 500 }
        );

        await expect(fetchPost(mockPostID)).rejects.toThrow();
    });
    test("throws an error when the createPost response is not ok", async () => {
        const mockData = { title: "Post 1", body: "Hello World!" };
        fetch.mockResponseOnce(
            JSON.stringify({}),
            { status: 500 }
        );

        await expect(createPost(mockData)).rejects.toThrow();
    });
    test("throws an error when the updatePost response is not ok", async () => {
        const mockPostID = 1;
        const mockData = { title: "Post 1", body: "Hello World!" };
        fetch.mockResponseOnce(
            JSON.stringify({}),
            { status: 500 }
        );

        await expect(updatePost(mockPostID, mockData)).rejects.toThrow();
    });
    test("throws an error when the deletePost response is not ok", async () => {
        const mockPostID = 1;
        fetch.mockResponseOnce(
            JSON.stringify({}),
            { status: 500 }
        );

        await expect(deletePost(mockPostID)).rejects.toThrow();
    });

    //Delete throws an error if the response is not ok and not 204
    test("throws an error when the deletePost response 500", async () => {
        const mockPostID = 1;
        fetch.mockResponseOnce(
            JSON.stringify({}),
            { status: 500 }
        );

        await expect(deletePost(mockPostID)).rejects.toThrow();
    });


});