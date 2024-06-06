import { objectToFormData, formDataToObject } from "./formDataHelper";

describe("objectToFormData", () => {
    test("should convert object to FormData", () => {
        const expected_object = {
            title: "Hello World",
            body: "Hello World",
        };
        const actual_object = objectToFormData(expected_object);
        expect(actual_object.get("title")).toEqual(expected_object.title);
        expect(actual_object.get("body")).toEqual(expected_object.body);
    });
    test("should handle nested objects", () => {
        const expected_object = {
            post: {
                title: "Hello World",
                body: "Hello World",
            },
        };
        const actual_object = objectToFormData(expected_object);
        expect(actual_object.get("post[title]")).toEqual(expected_object.post.title);
        expect(actual_object.get("post[body]")).toEqual(expected_object.post.body);
    });
    test("should handle Date objects", () => {
       const expected_object = {
        post: {
            title: "Hello World",
            body: "Hello World",
            create_at: new Date(),
        },
       };
       const actual_object = objectToFormData(expected_object);

       expect(actual_object.get("post[create_at]")).toEqual(expected_object.post.create_at.toISOString());
    });
    test("should handle File objects", () => {
        const file = new File(["content"], "filename.txt");
        const expected_object = {
            post: {
                title: "Hello World",
                body: "Hello World",
                file: file,
            },
        };
        const actual_object = objectToFormData(expected_object);
        expect(actual_object.get("post[file]")).toEqual(expected_object.post.file);
    });
});

describe("formDataToObject", () => {
    test("should covert FormData to an Object", () => {
        const formData = new FormData();
        formData.append("title", "Hello World");
        formData.append("body", "Hello World");
    
        const result = formDataToObject(formData);
        expect(result).toEqual({
            title: "Hello World",
            body: "Hello World",
        });
    });

  
});