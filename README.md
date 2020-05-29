# Streaming-Video
this is front-end react project to implement video streaming app upon a request.

We have some streamers running a computer and on their computer they are running some streaming software which is Open Broadcaster Software OBS. it is not only used for streaming video but also used for recording your desktop to a video file as well. OBS is going to record your desktop and stream that video to some outside server. One way of putting this video streaming service together is to create something called a Real Time Messaging Protocol (RTMP) Server. This is a specialized server that is going to receive an incoming video feed and then broadcast that video feed out to a bunch of different viewers who can watch from their browser. RTMP server is not limited to just one stream at a time. So we could potentially have several different streamers, all sending video to our single server RTMP and then many different viewers could be watching each of these different streamers at the same time. We are going to create an RTMP server but we are going to use a third party package. 
