const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const { createServer } = require('http');
const { graphql, execute, subscribe } = require('graphql');
// Create GraphQL Schema
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { makeExecutableSchema } = require('graphql-tools');
const schema = makeExecutableSchema({ typeDefs, resolvers });
const User = require('./models/User');
const PORT = process.env.PORT || 4000;
const app = express();

var corsOptions = {
  origin: ['http://localhost:3000', /*'https:// .herokuapp.com'*/],
  credentials: true
};
app.use(cors(corsOptions));

const cookieSession = require('cookie-session');
app.use(cookieSession({
  // 24 hour session
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.SESSION_COOKIE_KEY]
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize Passport
require('./authentication/passport');
app.use(passport.initialize());
app.use(passport.session());
const authRouter = require('./authentication/authRouter');
app.use('/', authRouter);

// Mongoose MongoDB
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Apollo GraphQL Server
app.use(
  '/graphql', 
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: { 
      user: req.user 
    } 
  }))
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

// The build folder with static assets is the only output produced by Create React App.
app.use(express.static(path.join(__dirname, '../build')));

// Serving Apps with Client-Side Routing. Serve index.html for any unknown paths
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
})

app.listen(PORT, () => {console.log(`GraphQL Server is now running on ${PORT}`)});