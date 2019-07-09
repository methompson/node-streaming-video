# barebones-docker-node-container
A barebones Node.js server in a Docker Container

Why? I don’t like installing Node and NPM on my local laptop, but I regularly need to work with it. This barebones setup allows me to easily start a Node.js instance without any of the baggage. I can then grab NPM packages by exec’ing into the container.

Installation is simple.

1. Install Docker on to your system [Link](https://docs.docker.com/v17.12/install/)
2. Create a new directory and pull the repository into that folder
3. In your terminal, navigate into the folder.
4. Use docker-compose to build the image.
  * `docker-compose build`
  * use the optional 'pull' parameter in case you get image issues
  * `docker-compose build --pull`
5. Use docker-compose to start the image.
  * `docker-compose up`
6. Navigate to localhost:3000 in your browser to view the server.

By Default, the only things installed on the system are Node.js and NPM. Future updates will have different packages. You can navigate inside of the container with `docker exec -it node bash`. Inside of bash, you can use NPM to initialize a new project and install any packages you need.
