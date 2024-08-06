const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");

const logEvents = async (msg, locationFile) => {
  try {
    const dateTime = format(new Date(), "yyyy/MM/dd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;

    const saveLog = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(saveLog)) {
      await fsPromise.mkdir(saveLog);
    }

    await fsPromise.appendFile(path.join(saveLog, locationFile), logItem);
  } catch (error) {
    console.error(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqlog.txt");
  console.log(`${req.method}\t${req.url}`);

  next()
};

module.exports = { logEvents, logger };
