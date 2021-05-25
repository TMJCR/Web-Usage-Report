const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://TMJCR:QhMehCkdfJoH8N8d@cluster0-shard-00-00.tzcdh.mongodb.net:27017,cluster0-shard-00-01.tzcdh.mongodb.net:27017,cluster0-shard-00-02.tzcdh.mongodb.net:27017/web-usage-report?ssl=true&replicaSet=atlas-by3vyx-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
