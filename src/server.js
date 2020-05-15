const { GraphQLServer } = require('graphql-yoga');
const { schema } = require('./schema');
const { createContext } = require('./context');

new GraphQLServer({
  schema,
  context: createContext
}).start(() => console.log('Server ready at: http://localhost:4000'));
