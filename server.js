const express = require("express");
const app = express();
const PORT = 3000;
const path = require('path')

const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");

app.use(logger);

app.use(express.json())

app.use('/',express.static(path.join(__dirname,'public')))

app.use('/',require('./routes/root'))

app.use('/employee',require('./routes/employee'))

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
