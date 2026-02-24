import {typeDefs} from "./typeDefs.js"
import {resolvers} from "./resolvers.js"
import {ApolloServer} from "@apollo/server"
import "dotenv/config"
import jwt from "jsonwebtoken"
import User from "./models/user.js"
import mongoose from "mongoose"
import {makeExecutableSchema} from "@graphql-tools/schema"
import express from 'express'
import {createServer} from 'http'
import {WebSocketServer} from "ws"
import {useServer} from "graphql-ws/use/ws"
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import cors from "cors"
import {expressMiddleware} from "@as-integrations/express5";

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI,)
    .then(() => {
        console.log('✅ MongoDB connected');
        mongoose.set('debug', true)
    })
    .catch(err => console.log(err))

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

const app = express()
const httpServer = createServer(app)

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
})

const serverCleanup = useServer({schema}, wsServer)

const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({httpServer}),

        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose()
                    }
                }
            }
        }
    ]
})

await server.start()

app.use('/',
    cors(),
    express.json(),
    expressMiddleware(server, {
        context: async ({req}) => {
            const auth = req?.headers?.authorization
            if (auth && auth.startsWith('Bearer ')) {
                const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
                const currentUser = await User.findById(decodedToken.id)
                return {currentUser}
            }
            
            return {}
        },
    }),
)

const PORT = 4_000

httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
})