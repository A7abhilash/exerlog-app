const express = require("./node_modules/express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();

//*****CONFIGURATION
//dotenv
dotenv.config({ path: "./config/config.env" });

//database
connectDB();

//*****MIDDLEWARE
//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Routes
app.use(
  "/graphiql",
  graphqlHTTP({ schema, rootValue: resolvers, graphiql: true })
);
app.use("/", require("./routes/"));

//*****PORT
const PORT = process.env.PORT || 7781;
app.listen(PORT, () => {
  console.log(`Server Connected on ${PORT}`);
});
