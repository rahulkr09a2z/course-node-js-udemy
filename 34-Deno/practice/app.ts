// #1

// let message:string;

// message = "Hi there!";

// console.log(message);

// // COMMAND-->  deno run app.ts


// #2

const text = "This is a test - and it should be stored in a file!";

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile('message.txt', data).then(()=>{
    console.log('Wrote to file!')
})

/**
 * Command ---> deno run --allow-write app.ts
 */