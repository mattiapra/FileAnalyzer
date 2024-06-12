import type {Extractor} from "./index.ts";

export const StringExtractor: Extractor<string> = function* (content) {
    for (const char of content) {
        yield char;
    }
}