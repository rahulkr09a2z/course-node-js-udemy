// import { serve } from "https://deno.land/std@0.195.0/http/server.ts";

// function requestHandler(_req) {
//   return new Response( "Hello World\n" );
// }

// serve(requestHandler, { port: 3000 });

/**
 * Command ---> deno run --allow-net app.ts
 */

import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello world!";
});

await app.listen({ port: 8000 });
