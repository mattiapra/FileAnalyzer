import type { Extractor } from ".";
import {StringExtractor} from "./StringExtractor.ts";

export const StreamExtractor: Extractor<ReadableStream<Uint8Array>> = async function* (stream) {
    const textDecoder = new TextDecoder();
    for await (const chunk of stream) {
        const decodedText = textDecoder.decode(chunk);
        yield* StringExtractor(decodedText);
    }
}