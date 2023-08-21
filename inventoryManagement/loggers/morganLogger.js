const fs = require('fs')
const morgan = require('morgan');

const stream = fs.createWriteStream('./loggers/log/log.txt', { flags: 'a' });

const logger = morgan('tiny', { stream: stream });

module.exports = logger;