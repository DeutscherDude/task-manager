# What is this?

This is a simple application for local (or web, if you are inclined to publish it on a cloud) for managing your tasks with some users being added upfront. Both the API and database are dockerized with a GUI comming up shortly after finishing the work on the backend.

## Cloning this repository

In order to clone this repository, please use the following command:

    git clone https://github.com/DeutscherDude/task-manager.git

## Create your .env file containing:

    NODE_ENV=
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_PORT=
    POSTGRES_DB=
    POSTGRES_POOL_SIZE=
    SERVER_PORT=

## Starting the dockerized aplication

To start this application, please use the following command:

    sudo docker-compose up

To close this application, please use the following command:

    sudo docker-compose down

In case you'd like to start a fresh database by altering the db/init.sql file, please add '--volume' tag at the end of the docker-compose down command.
