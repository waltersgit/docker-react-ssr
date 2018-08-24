var redis = require('redis');
var redisClient = redis.createClient(6379,'redis');
const {promisify} = require('util');
const getAsync = promisify(redisClient.get).bind(redisClient);

redisClient.on('connect', function(){
    console.log('連線成功');
});
redisClient.on('error', function(err) {
    console.log('Redis error: ' + err);
});

module.exports = {redisClient, getAsync};