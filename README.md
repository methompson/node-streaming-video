# Node Video Streaming Script

This is a single script that streams a remote MP4 file as though it were a local file.

Why?

What if we want to control access to video files? I.e. streaming the video without providing a direct link.

What if we want to store our videos somewhere other than a local server, like a CDN?

This script can accept a session token or JWT in order to determine if the user has access to the video, then if they do, the video can stream. Under normal circumstances, you would use Node's fs module to access video files, then pipe the data into the response. This script gets an HTTP request stream, and pipes that data into a response.

The app is packaged in a docker container, so you can copy the files into a directory and install with the following commands:

* `docker-compose build`
* `docker-compose up`

Then you would enter into the container with the following command:

* `docker exec -it node bash`

Then you must change directory into the app directory and install all dependencies with the following command

* `npm install`

You can visit the site at the following location:

* `http://localhost:3000`