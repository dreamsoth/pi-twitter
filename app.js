var chokidar = require('chokidar');
var Twitter = require('twitter');
var config = require('./app-config.js');

var log  = console.log.bind(console);
var watcher = chokidar.watch(config.chokidar.watch_dir, config.chokidar.watcher);
var client = new Twitter(config.twitter);

log('system watching dir: '+config.chokidar.watch_dir);

watcher.on('add', function(path) {
  log('system has detected intruder')
  tweetPost('intruder detected');
});

function tweetPost(message) {
  const TITLE = "Grzybowa notification:";
  var requestMessage = TITLE + ' ' + message;
  client.post('statuses/update', {status: requestMessage}, function(error, tweet, response){
    if (!error) {
      log('system sent tweet: "' + requestMessage +'"');
    }
  });
}
