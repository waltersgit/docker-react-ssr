var express = require('express');
var router = express.Router();
var {redisClient, getAsync} = require('../db/redis.js');

/* GET home page. */
router.get('/',async function (req, res, next) {
    redisClient.set("text", "Hello Redis");
    var val = await getAsync('text');
    res.send({
        "name": "PETER",
        "redisTestValue": val
    })
});

module.exports = router;
