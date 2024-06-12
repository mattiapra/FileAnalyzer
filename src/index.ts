import {FileLoader} from "./FileLoader.ts";
import {Analyzer} from "./Analyzer.ts";
import {StreamExtractor} from "./extractors/StreamExtractor.ts";

const server = Bun.serve({
    port: 3000,
    async fetch (req) {
        const path = new URL(req.url).pathname;
        
        const file = FileLoader(`./esempi/${path}`).asReadableStream();
        const result = await Analyzer<ReadableStream>(file, StreamExtractor);
        
        return Response.json(result)
    }
})

console.info("Server ready on port", server.port)

process.on("SIGINT", () => {
    server.stop();
    console.info("Server closed")
    process.exit();
});