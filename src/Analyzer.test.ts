import { test, expect } from "bun:test";
import { StreamExtractor } from "./extractors/StreamExtractor";
import { Analyzer } from "./Analyzer";
import {StringExtractor} from "./extractors/StringExtractor.ts";

test("Analyze ReadableStream", async () => {
    const blob = new Blob(["testo con due parole due due due due due due due due due due che sono  questaequellalì4"]);
    const stream = blob.stream();
    const result = await Analyzer<ReadableStream>(stream, StreamExtractor);
    
    expect(result).toEqual({
        parolePiu10Volte: {
            due: 11
        },
        totLettere: 69,
        totParole: 6,
        totSpazi: 17
    })
});

test("Analyze String", async () => {
    const blob = new Blob(["testo con due parole due due due due due due due due due due che sono  questaequellalì4"]);
    const string = await blob.text();
    const result = await Analyzer<string>(string, StringExtractor);
    
    expect(result).toEqual({
        parolePiu10Volte: {
            due: 11
        },
        totLettere: 69,
        totParole: 6,
        totSpazi: 17
    })
})