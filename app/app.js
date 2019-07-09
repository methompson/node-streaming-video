const http = require('http');
const express = require('express');

const app = express();

app.use( '/', (req, res, next) => {

  const url = "http://10.1.10.17:8000/stream/ignite.mp4";
  let start = 0;

  console.log(req.headers);

  if (req.headers.range){

    // Break up the range
    let range = req.headers.range.replace(/bytes=/, '').split("-");

    console.log("RANGE:", range);

    if (range[0]){
      start = range[0];
    }
  }

  const streamReq = http.get(url, {
    headers: {
      Range: 'bytes=' + start+ "-",
    },
  }, (streamRes) => {

    console.log(streamRes.headers);

    let range = streamRes.headers['content-range'].split('/');
    
    const totalSize = range[1];

    // const totalSize = parseInt(streamRes.headers['content-length'], 10);
    
    let end = totalSize - 1;
    
    console.log("START: ", start);
    console.log("END: ", end);
    console.log("TOTAL SIZE: ", totalSize);
    console.log("TRANSFER SIZE: ", end-start + 1);

    // console.log(start, end, totalSize, end-start + 1);
    
    const head = {
      'Content-Range': 'bytes '+start+'-'+end+'/'+totalSize,
      'Accept-Ranges': 'bytes',
      // 'Accept-Ranges': '0-' + end,
      // 'Content-Length': end-start + 1,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);

    streamRes.pipe(res);

    // Don't Need This
    streamRes.on('data', (chunk) => {
      //console.log("Chunk", chunk);
      //console.log("Size: ", chunk.byteLength);

      // res.write(chunk);
    });

    streamRes.on('end', () => {
      console.log("That's all");
      //res.end();
    });
  });

});

const server = http.createServer(app);

server.listen(3000);
