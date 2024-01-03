import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./resolvers"
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./configurations/redis";

dotenv.config();

const PORT = process.env.PORT || 4001;

async function startServer() {
    const app = express();
    const httpServer = createServer(app);
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql'
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const serverCleanup = useServer({ schema }, wsServer);

    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ]
    });
    await apolloServer.start();
    app.use(express.json())
    app.use(cors())
    app.use("/graphql", express.json(), cors(), expressMiddleware(apolloServer));

    httpServer.listen(PORT, async () => {
        await client.connect()
        console.log(`server is listening on port ${PORT}`);
    });
}

startServer();