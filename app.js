var chokidar = require('chokidar');
var Twitter = require('twitter');
var config = require('./app-config.js');
var fs = require('fs');
var moment = require('moment');

var log  = console.log.bind(console);
var previous = '2001-01-01T01:01:01Z';
var watcher = chokidar.watch(config.chokidar.watch_dir, config.chokidar.watcher);
var client = new Twitter(config.twitter);

log('system watching dir: ' + config.chokidar.watch_dir);

watcher.on('add', function(path) {
  fs.stat(path, function(err, stat) {
    if(undefined !== stat.mtime && isTimeToTweet(stat.mtime)) {
      log('system has detected intruder');
      tweetPostWithMedia('intruder detected', path);
    }
  });
});

function tweetPostWithMedia(message, filePath) {
  var mediaFile = fs.readFileSync(filePath);
  client.post('media/upload', {media: mediaFile}, function(errorMedia, media, responseMedia){
    if(!errorMedia) {
      var requestData = {
        status: "Grzybowa notification:" + ' ' + message,
        media_ids: media.media_id_string
      }

      client.post('statuses/update', requestData, function(error, tweet, response){
        if (!error) {
          log('system sent tweet: "' + requestData.status +'"');
        }
      });
    }
  });
}

function isTimeToTweet(current) {
  const valueComparator = 60;
  var datePrevious = moment(previous);
  var dateCurrent = moment(current);
  var secondsDiff = dateCurrent.diff(datePrevious, 'seconds');
  previous = current;
  return secondsDiff > valueComparator;
}
