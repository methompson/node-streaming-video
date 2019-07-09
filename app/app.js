const http = require('http');
const express = require('express');

const app = express();

app.use( '/', (req, res, next) => {

    /**
     * This is our video file. Under normal circumstances, we would likely grab this from
     * a database list in production, but for the purpose of this demonstration, we will
     * hard code an HTTP accessible mp4 file. In this case, this is from a local dev server
     * running an HTTP server with the video as an accessible file.
     */
    const url = "http://10.1.10.17:8000/stream/ignite.mp4";

    /**
     * If headers are sent as part of the request (i.e. you are already viewing the video and
     * you are skipping ahead), we need to get these headers.
     * 
     * Otherwise, we keep the start point at zero, i.e. the beginning of the video.
     */
    let start = 0;
    if (req.headers.range){

        // We need to replace the bytes= text with an empty string and then split the
        // start/end numbers. We will only be using the start.
        let range = req.headers.range.replace(/bytes=/, '').split("-");

        // If the number exists, we will assign it to start.
        if (range[0]){
            start = range[0];
        }
    }

    /**
     * At this point, we are making the HTTP request to the url defined above.
     * Right now, we have NO error handling. That would, obviously, need to be completed
     * before this is put into production.
     * 
     * The magic of making the remote stream accessible as thought it were local is by
     * passing a Range header to the request. If we don't pass this Range value, everything
     * breaks.
     */
    const streamReq = http.get(url, {
        headers: {
            Range: 'bytes=' + start+ "-",
        },
    }, (streamRes) => {

        /**
         * We take the response from the stream and grab the content-range header
         * value from the headers. We split at the '/' value and use the value on
         * the right side as a totalSize value. This totalSize value is important
         * for headers we send to the client.
         */
        let range = streamRes.headers['content-range'].split('/');
        const totalSize = range[1];

        // We cannot use the Content-Length value, because it doesn't represent the file size
        // It represents how much data there exists between the starting point to the end.
        // const totalSize = parseInt(streamRes.headers['content-length'], 10);
        
        // end must be totalSize - 1. I don't know why, but every guide I've ready describes
        // this necessity.
        let end = totalSize - 1;
        
        // console.log("START: ", start);
        // console.log("END: ", end);
        // console.log("TOTAL SIZE: ", totalSize);
        // console.log("TRANSFER SIZE: ", end-start + 1);

        // console.log(start, end, totalSize, end-start + 1);
        
        /**
         * We construct the headers here. Including the Content-Range (Where we start to end),
         * the Accept-Ranges (where you can seek)
         * the content Length (how much data is left in the stream)
         * and Content-Type (MIME type of the file being sent.)
         */
        const head = {
            'Content-Range': 'bytes '+start+'-'+end+'/'+totalSize,
            'Accept-Ranges': 'bytes',
            // 'Accept-Ranges': '0-' + end,
            // 'Content-Length': end-start + 1,
            'Content-Length': totalSize-start,
            'Content-Type': 'video/mp4',
        };

        /**
         * Here we set the response code to 206, which means partial content.
         * We also pass all of the above headers to the the response.
         */
        res.writeHead(206, head);

        // The streamRes value is a stream. We can just pipe the data into the response.
        streamRes.pipe(res);

    });

});

const server = http.createServer(app);

server.listen(3000);
