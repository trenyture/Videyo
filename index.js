'use strict';

const
    server = require('./server/index'),
    config = require('./server/configs/index');

server.create(config);
server.start();