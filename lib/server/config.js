var convict = require('convict');

var conf = convict({
  environment: {
    default: 'development',
    env: 'NODE_ENV'
  },
  hostname: {
    default: 'localhost',
    env: 'HOSTNAME'
  },
  mongo: {
    database: {
      default: 'derbyuser',
      env: 'MONGO_DATABASE'
    },
    hostname: {
      default: 'localhost',
      env: 'MONGO_HOSTNAME'
    },
    options: {
      safe: true
    },
    port: {
      default: 27017,
      env: 'MONGO_PORT',
      type: 'port'
    }
  },
  port: {
    default: 3000,
    env: 'PORT',
    format: 'port'
  },
  protocol: {
    default: 'http',
    env: 'PROTOCOL'
  },
  redis: {
    hostname: {
      default: '127.0.0.1',
      env: 'REDIS_HOSTNAME'
    },
    index: {
      default: 1,
      env: 'REDIS_INDEX'
    },
    options: {
      auth_pass: {
        default: '',
        env: 'REDIS_PASSWORD'
      }
    },
    port: {
      default: 6379,
      env: 'REDIS_PORT',
      format: 'port'
    }
  },
  secretKey: {
    default: 'App Secret',
    env: 'SECRET_KEY'
  },
  webport: {
    default: process.env.PORT || 3000,
    env: 'WEB_PORT'
  }
});

conf.load({
  mongo: {
    url: 'mongodb://' + conf.get('mongo.hostname') + ':' + conf.get('mongo.port') + '/' + conf.get('mongo.database')
  },
  origin: conf.get('protocol') + '://' + conf.get('hostname') + ':' + conf.get('webport')
});

conf.loadFile(__dirname + '/../../package.json');
module.exports = conf;