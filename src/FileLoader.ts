import { file } from "bun";

export const FileLoader = (path: string) => {
    const fileHandle = file(path);
    if (!fileHandle.exists()) throw new Error("File not present");
    return {
        asString: () => fileHandle.text() ,
        asReadableStream: () => fileHandle.stream()
    }
}