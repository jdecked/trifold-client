# trifold-client
This is the client-side code for the [Trifold project](https://github.com/jdecked/trifold). Check out the [Trifold README](https://github.com/jdecked/trifold/blob/master/README.md) for a full explanation of Trifold.

## Running Instructions
Note that this repository is one of three repositories for the microservices involved in Trifold; the other two repositories host the [reverse proxy](https://github.com/jdecked/trifold) and the [backend code](https://github.com/jdecked/trifold-api), so go there if you're looking to peruse the non-JavaScript source code.

That said, assuming you already have both git and Docker installed:
```
$ git clone https://github.com/jdecked/trifold
$ git clone https://github.com/jdecked/trifold-client
$ git clone https://github.com/jdecked/trifold-api
$ cd trifold
$ docker-compose build
$ docker-compose up
```

Navigate to `http://localhost/` in your browser to see Trifold up and running. Note that this won't work without you first setting the appropriate DJANGO_SECRET_KEY, REACT_APP_OAUTH_CLIENT_ID, and CLIENT_ID environment variables. If you don't have them, [email me](mailto:justine@minerva.kgi.edu) to get them.