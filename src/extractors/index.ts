export type SupportedInput = ReadableStream | string;
export type Extractor<TInput extends SupportedInput> = (content: TInput) => Generator<string> | AsyncGenerator<string>;

