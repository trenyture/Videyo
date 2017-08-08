'use strict';

const
    server = require('./server'),
    config = require('./server/configs');

server.create(config);
server.start();