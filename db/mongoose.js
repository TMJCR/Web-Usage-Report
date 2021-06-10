const mongoose = require("mongoose");
mongoose.connect("mongodb:", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
