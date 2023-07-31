const connectToDatabase = require("./src/database/connect");

connectToDatabase();

require('./src/modules/express');