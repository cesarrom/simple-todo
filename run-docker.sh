PROJECT_NAME=$1
PORT_FORWARD=$2

echo ${PORT_FORWARD}

yarn build:prod
docker image build --file ${PROJECT_NAME}.dockerfile -t simple-todo-${PROJECT_NAME}:latest .
docker stop simple-todo-${PROJECT_NAME}-service
docker rm simple-todo-${PROJECT_NAME}-service
docker run -it --rm --name simple-todo-${PROJECT_NAME}-service -d --publish="${PORT_FORWARD}" simple-todo-${PROJECT_NAME}