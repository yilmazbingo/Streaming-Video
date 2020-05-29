const NodeMediaServer = require("node-media-server");
//--singlecore mode

// port:1935 is where our server receives the incoming streams from OBS
//port:8000 is where our browser consumes
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30,
  },
  http: {
    port: 8000,
    allow_origin: "*",
  },
};

var nms = new NodeMediaServer(config);
nms.run();
