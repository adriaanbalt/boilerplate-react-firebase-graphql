const express = require('express')
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express')
const schema = require('./schema')
const resolvers = require('./resolvers')
// const { graphqlUploadExpress } = require('graphql-upload')
const { fileParser } = require('express-multipart-file-parser')

function configureServer() {
    // invoke express to create our server
    const app = express();
    // cors allows our server to accept requests from different origins
    app.use(cors());
    app.options('*', cors());
    app.use(fileParser({
    }))
    // app.use(
    //     '/graphql',
    //     graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    //     graphqlHTTP({ schema })
    //     )

    // setup server
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        introspection: true, // so we can access the playground in production reference: https://www.apollographql.com/docs/apollo-server/api/apollo-server/#constructor-options-lt-ApolloServer-gt
        playground: true,
        engine: {
            debugPrintReports: true,
        },
        // uploads: {
        //     // Limits here should be stricter than config for surrounding
        //     // infrastructure such as Nginx so errors can be handled elegantly by
        //     // graphql-upload:
        //     // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
        //     maxFileSize: 10000000, // 10 MB
        //     maxFiles: 1
        // },
    })

    // // Save raw body for verifying payments
    // app.use((req, res, next) => {
    //     const header = req.get('Content-Type')
    //     console.log('header', header, header && !header.startsWith('multipart/form-data') )
    //     if (header && !header.startsWith('multipart/form-data')) {
    //         req.rawBody = '';
    //         req.on('data', (chunk) => (req.rawBody += chunk));
    //     }
    //     next();
    // });

    // now we take our newly instantiated ApolloServer and apply the   // previously configured express application
    server.applyMiddleware({ app, path: '/', cors: true })
    // port set by heroku or locally at 4000
    // app.listen({ port: process.env.PORT || 4000}, (event) =>{
    //     console.log(`🚀 Server ready at ${event}`)
    //     console.log(`Try your health check at: ${event}.well-known/apollo/server-health`)
    // })
    // app.use((req, res, next) => {
    //     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    //     return next();
    // });
    // app.use('/schema', (req, res) => {
    //     res.set('Content-Type', 'text/plain');
    //     res.send(printSchema(schema));
    // });

    // finally return the application
    return app;
}


module.exports = configureServer
