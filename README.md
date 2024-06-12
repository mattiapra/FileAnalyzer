# Prova tecnica di Mattia Prà

> **Premessa:** potreste volermi chiedere perché, nonostante fosse stato richiesto di usare NodeJS, io abbia usato Bun. La risposta è semplice:
Bun è estremamente più veloce e fornisce un'esperienza sviluppatore molto più piacevole e rapida. Inoltre il 99% delle applicazioni NodeJS funziona in Bun,
quindi perché non dargli una possibilità?

Questo progetto è realizzato con Bun e containerizzato in Docker.

Per usare solo Bun occorre avere il runtime di Bun ed eseguire:

```bash
bun install
bun run start
```

In alternativa è configurato anche Docker:

```bash
docker compose up --build
```

Il server risulterà accessibile sulla porta 3000.

## Funzionamento
Sono disponibili due implementazioni, una che legge il file come ReadableStream e l'altra che legge l'intero file come stringa.
Risulta scontato dire che per file piccoli le ottimizzazioni a livello di runtime rendono più veloce l'implementazione con stringhe,
ma l'implementazione con ReadableStream risulta molto più performante per file di grandi dimensioni in quanto il file non viene caricato
interamente in memoria.

Per testare entrambe le implementazioni è sufficiente usare il metodo "asString()" di FileLoader e passare come secondo parametro (e come Generic di TypeScript)
l'Extractor corrispondente alle stringhe.

Per mancanza di requisiti su questo lato, ho creato un semplicissimo server HTTP che legge il path della richiesta e cerca un file nella cartella ./esempi con il path, calcola
la risposta come da requisiti e invia la risposta in JSON al browser.