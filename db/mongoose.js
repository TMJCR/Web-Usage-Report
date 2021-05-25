const mongoose = require("mongoose");
mongoose.connect(
  "mongodb",
  // REDACTED
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
