* Start with docker compose: `docker-compose up --force-recreate --build --remove-orphans`
* Start only service with docker when a ravendb instance exists in the local environment: `sh ./run-docker.sh api "5001:5001"`
* Start without using docker when a ravendb instance exists in the local environment: `yarn serve`
* Build project for production: `yarn build:prod`
* Edit env variables in directory: `.env`