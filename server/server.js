const express = require("./node_modules/express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const RootQueryType = require("./schemas/RootQueryType");
const RootMutationType = require("./schemas/RootMutationType");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const Users = require("./models/Users");

const app = express();

//*****CONFIGURATION
//dotenv
dotenv.config({ path: "./config/config.env" });

//database
connectDB();

//graphql
// const schema = new GraphQLSchema({
//   query: RootQueryType,
//   mutation: RootMutationType,
// });

//*****MIDDLEWARE
//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Session
app.use(
  session({
    secret: "7781",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Routes
app.use(
  "/graphiql",
  graphqlHTTP({ schema, rootValue: resolvers, graphiql: true })
);
const router = express.Router();
//@route     GET /newUser
//@desc       Add new user
router.post("/newUser", async (req, res) => {
  const newUser = req.body;
  // console.log(req.body);
  try {
    let user = await Users.findOne({ googleId: newUser.googleId });
    if (user) {
      return res.json({ msg: "User logged in successfully!!!", user });
    }
    user = await User.create(newUser);
    return res.json({ msg: "New user created successfully!!!", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//*****PORT
const PORT = process.env.PORT || 7781;
app.listen(PORT, () => {
  console.log(`Server Connected on ${PORT}`);
});
