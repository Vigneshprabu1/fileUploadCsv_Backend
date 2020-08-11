const path = require("path");
const bunyan = require("bunyan");

const level = process.env.NODE_LOGGING_LEVEL || "info";

var log = bunyan.createLogger({
    name: 'FileUploadCSV',
    streams: [
      {
        level: 'info',
        stream: process.stdout            // log INFO and above to stdout
      },
      {
        level: 'info',
        path: path.resolve(__dirname, "logs.json")  // log INFO and above to a file
      },
      {
        level: 'error',
        path: path.resolve(__dirname, "error.json")  // log INFO and above to a file
      }
    ]
  });

module.exports = log;