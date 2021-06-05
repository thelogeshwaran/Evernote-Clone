import {removeHTMLTags} from "./helpers";

test("sample test",()=>{
    const result = removeHTMLTags("<p>Hello</p>")
    expect(result).toBe("Hello")
})