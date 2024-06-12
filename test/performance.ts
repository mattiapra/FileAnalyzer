import { run, bench } from 'mitata';
import { heapStats } from "bun:jsc";

import { FileLoader } from '../src/FileLoader';
import { StreamExtractor } from '../src/extractors/StreamExtractor';
import { Analyzer } from '../src/Analyzer';
import {StringExtractor} from "../src/extractors/StringExtractor.ts";

const handle = FileLoader("./esempi/test.txt");

bench("ReadableStream", async () => {
    const file = handle.asReadableStream();
    await Analyzer<ReadableStream>(file, StreamExtractor);
});

bench("String", async () => {
    const file = await handle.asString();
    await Analyzer<string>(file, StringExtractor);
})

await run();