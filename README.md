# Node Video Streaming Script

This is a single script that streams a remote MP4 file as though it were a local file.

Why?

What if we want to control access to video files? I.e. streaming the video without providing a direct link.

What if we want to store our videos somewhere other than a local server, like a CDN?

This script can accept a session token or JWT in order to determine if the user has access to the video, then if they do, the video can stream.