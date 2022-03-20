const Cpray = require('cpray');
const cpray = new Cpray();
const redis = require('redis');
const redisClient = redis.createClient();

exports.isItNewYearAlready = async () => {
    var theDay = new Date().getDay();
    var theMonth = new Date().getMonth();
    if (theDay === 1 && theMonth === 1) {
        await redisClient.connect();
        const timeValue = await cpray.getTimesbyYear(req.params.zone);
        await redisClient.json.set(req.params.zone, '.', timeValue, 'EX', 525600);
        console.log('new year is here. now caching');
    } else {
        console.log('not new year yet');
    }
}



