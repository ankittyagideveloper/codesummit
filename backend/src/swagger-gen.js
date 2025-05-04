import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "CodeSummit Api",
    description: "Description",
  },
  host: "localhost:8080",
};

const outputFile = "./swagger-output.json";
const routes = ["./app.ts"];

swaggerAutogen(outputFile, routes, doc);
