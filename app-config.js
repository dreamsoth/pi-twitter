module.exports = {
  twitter: {
    consumer_key: 'VQsWSG7Ee8FOZytfFJLtBIJvQ',
    consumer_secret: 'Hxm03BxyhXsxKfPwmyNXI9q0dCocL4pu61UlQqsRketRqsQmDd',
    access_token_key: '4864705215-zpuv7Ze0llbSimiBlpBHexfQQFrgpiDPyxkOIAZ',
    access_token_secret: 'hKxPJxLZIXPqAzMRLYFOSpmQlxsco6Wwyjf5jYuJ3L4ia'
  },
  chokidar: {
    watch_dir: '/home/pi/camera_pi_out/',
    //watch_dir: '.',
    watcher: {
      ignored: /(?!-00)...\.jpg$/,
      persistent: true,
      ignoreInitial: true
    }
  }
};
