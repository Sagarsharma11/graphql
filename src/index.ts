import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json())

  // create GQL server

  const gqlServer = new ApolloServer({
    typeDefs: `type Query{
        hello: String
        say(name: String): String
    }`, //schema
    resolvers: {
        Query:{
            hello: ()=>`hii this is GQL server`,
            say: (_, {name}:{name:string}, )=> `hii ${name}`
        }
    }, //resolvers
  });
  //start the gql server
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({
      message: "Server is up and running",
    });
  });

  app.use("/graphql", expressMiddleware(gqlServer))

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
init();
