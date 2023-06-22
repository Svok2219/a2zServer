const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(bodyParser.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.get("/", (req, res) => res.send("Hello world! once again"));

const UserRouter = require("./Router/User");
// const UserRouter = require("./Router/UserRouter");
// const PartnersRouter = require("./Router/PartnersRouter");
// const InternOpeningsRouter = require("./Router/InternOpeningsRouter");
// const ThrivesdailyRouter = require("./Router/ThrivesdailyRouter");
// const RecognizedRouter = require("./Router/RecognizedRouter");
// const MentorshipRouter = require("./Router/MentorshipRouter");
const CourseRouter = require("./Router/Course");
// const ProjectDetails = require("./Router/ProjectDetailsRouter");
const Payment = require("./Router/payment");
const Authenticate = require("./Router/Authenticate");
const Orders = require("./Router/OrdersRouter");
const Module = require("./Router/module");
const Progress = require("./Router/Progress");

// app.use("/EventsRouter", EventsRouter);
// app.use("/InternOpeningsRouter", InternOpeningsRouter);
// app.use("/ThrivesDailyRouter", ThrivesdailyRouter);
// app.use("/MentorshipRouter", MentorshipRouter);
app.use("/CourseRouter", CourseRouter);
// app.use("/PartnersRouter", PartnersRouter);
app.use("/UserRouter", UserRouter);
// app.use("/RecognizedRouter", RecognizedRouter);
// app.use("/ProjectRouter", ProjectDetails);
app.use("/Authenticate", Authenticate);
// app.use("/Contact", Contact);
app.use("/OrdersRouter", Orders);
app.use("/Payment", Payment);

app.use("/ModulesRouter", Module);

app.use("/ProgressRouter", Progress);

console.log(process.env.DB_USER);
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb://Exc_User:Exc_Pass@ac-qku4k21-shard-00-00.qfgbub3.mongodb.net:27017,ac-qku4k21-shard-00-01.qfgbub3.mongodb.net:27017,ac-qku4k21-shard-00-02.qfgbub3.mongodb.net:27017/?ssl=true&replicaSet=atlas-104vlv-shard-0&authSource=admin&retryWrites=true&w=majority",

    // "mongodb+srv://Exc_User:Exc_Pass@cluster0.qfgbub3.mongodb.net/?retryWrites=true&w=majority"
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Exceed",
    }
  )
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
