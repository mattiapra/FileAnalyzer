// @bun
// src/FileLoader.ts
var {file } = globalThis.Bun;
var FileLoader = (path) => {
  const fileHandle = file(path);
  if (!fileHandle.exists())
    throw new Error("File not present");
  return {
    asString: () => fileHandle.text(),
    asReadableStream: () => fileHandle.stream()
  };
};

// src/Analyzer.ts
var Analyzer = async (file2, extractor) => {
  const partialResult = {
    totLettere: 0,
    totSpazi: 0
  };
  const parole = {};
  let length = 0;
  let lastWordBuffer = "";
  for await (const char of extractor(file2)) {
    if (char === " ") {
      if (lastWordBuffer.length) {
        if (lastWordBuffer in parole)
          parole[lastWordBuffer]++;
        else
          parole[lastWordBuffer] = 1;
        lastWordBuffer = "";
      }
      partialResult.totSpazi++;
    } else {
      if (char.toUpperCase() !== char.toLowerCase())
        partialResult.totLettere++;
      lastWordBuffer += char;
    }
    length++;
  }
  const parolePiu10Volte = {};
  for (const p in parole) {
    if (parole[p] > 10)
      parolePiu10Volte[p] = parole[p];
  }
  return {
    ...partialResult,
    totParole: Object.keys(parole).length,
    parolePiu10Volte
  };
};

// src/extractors/StringExtractor.ts
var StringExtractor = function* (content) {
  for (const char of content) {
    yield char;
  }
};

// src/extractors/StreamExtractor.ts
var StreamExtractor = async function* (stream) {
  const textDecoder = new TextDecoder;
  for await (const chunk of stream) {
    const decodedText = textDecoder.decode(chunk);
    yield* StringExtractor(decodedText);
  }
};

// src/index.ts
var server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const path = new URL(req.url).pathname;
    const file2 = FileLoader(`./esempi/${path}`).asReadableStream();
    const result = await Analyzer(file2, StreamExtractor);
    return Response.json(result);
  }
});
console.info("Server ready on port", server.port);
process.on("SIGINT", () => {
  server.stop();
  console.info("Server closed");
  process.exit();
});
