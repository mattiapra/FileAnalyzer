import type {Extractor, SupportedInput} from "./extractors";

type Parole = {
    [parola: string]: number;
}

type AnalysisResult = {
    totParole: number;
    totLettere: number;
    totSpazi: number;
    parolePiu10Volte: Parole;
}

export const Analyzer =
    async <TSupportedInput extends SupportedInput> (file: TSupportedInput, extractor: Extractor<TSupportedInput>): Promise<AnalysisResult> => {
    const partialResult: Pick<AnalysisResult, "totLettere" | "totSpazi"> = {
        totLettere: 0,
        totSpazi: 0,
    };
    const parole: Parole = {};
    
    let length = 0;
    let lastWordBuffer = "";
    
    for await (const char of extractor(file)) {
        if (char === " ") {
            if (lastWordBuffer.length) {
                if (lastWordBuffer in parole) parole[lastWordBuffer]++;
                else parole[lastWordBuffer] = 1;
                
                lastWordBuffer = "";
            }
            
            partialResult.totSpazi++;
        } else {
            if (char.toUpperCase() !== char.toLowerCase()) partialResult.totLettere++;
            lastWordBuffer += char;
        }
        length++;
    }
    
    const parolePiu10Volte: Parole = {};
    for (const p in parole) {
        if (parole[p] > 10) parolePiu10Volte[p] = parole[p];
    }
    
    return {
        ...partialResult,
        totParole: Object.keys(parole).length,
        parolePiu10Volte
    };
}