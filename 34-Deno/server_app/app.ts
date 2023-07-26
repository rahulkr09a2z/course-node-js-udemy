import { serve } from "https://deno.land/std@0.195.0/http/server.ts";

function requestHandler(_req) {
  return new Response( "Hello World\n" );
}

serve(requestHandler, { port: 3000 });

/**
 * Command ---> deno run --allow-net app.ts
 */
