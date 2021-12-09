* Start with docker compose when the project was built: `docker-compose up --force-recreate --build --remove-orphans`
* Start only service with docker when a ravendb instance exists in the local environment: `sh ./run-docker.sh api "5001:5001"`
* Start without using docker when a ravendb instance exists in the local environment: `yarn serve`
* Build project for production: `yarn build:prod`
* Edit env variables in directory: `.env`


once the project started, the Swagger link is: `http://0.0.0.0:5001/v3/docs/`

The normal flow before dealing with tasks would be:
* sign up
* login
* authorize by pasting the JWT value in the top right button called `Authorize`, without any other word like `Bearer`
* Now you can use the task CRUD
