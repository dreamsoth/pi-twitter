var chokidar = require('chokidar');
var Twitter = require('twitter');
var config = require('./app-config.js');
var fs = require('fs');

var log  = console.log.bind(console);
var watcher = chokidar.watch(config.chokidar.watch_dir, config.chokidar.watcher);
var client = new Twitter(config.twitter);

log('system watching dir: ' + config.chokidar.watch_dir);

watcher.on('add', function(path) {
  log('system has detected intruder');
  tweetPostWithMedia('intruder detected', path);
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
