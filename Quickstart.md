# Quickstart Guide

This guide will help you get started with the application. It will guide you through the process of setting up the application and deploying it to your local machine.

## Table of Contents

1. [Kubernetes](#kubernetes)
    - [Databases for Kubernetes](#databases-for-kubernetes)
    - [Monitoring](#monitoring)
2. [Docker](#docker)
    - [Databases for Docker](#databases-for-docker)
3. [Development](#development)
4. [Ports](#ports)
    

## Kubernetes

To deploy the application locally, you need to have a Kubernetes cluster running. You can use [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) or [Docker Desktop](https://www.docker.com/products/docker-desktop/) to run a local cluster.

This guide assumes you have Windows device, the majority of commands will be the same for Linux and Mac, but you will need to use the appropriate commands for your OS.

When you have a cluster running, you can deploy the application by running the following commands:

First make sure you are in the `kubernetes` directory: 
```
cd kubernetes
```

Then run the following command to deploy the application:
```
kubectl apply -f .
```
This will deploy the application to your cluster. You can check the status of the deployment by running:
```
kubectl get pods
```
You should see an output that looks more or less like this:
```
NAME                                                    READY   STATUS             RESTARTS          AGE
keycloak-86f7d6d9dc-j6k7w                                1/1     Running            1 (11m ago)      22h
rabbitmq-depl-5786bb77f6-nmhmf                           1/1     Running            2 (11m ago)      45h
sevyh-chatbackend-cd4d8d69c-7p77d                        1/1     Running            11 (3m14s ago)   45h
sevyh-frontend-7b665c6d5c-rrq6b                          1/1     Running            2 (11m ago)      45h
sevyh-userbackend-6878578d89-lg899                       1/1     Running            1 (11m ago)      22h
```
That's all there is to it! You can now access the application by going to `localhost:3004` in your browser. If you haven't ran the database setup yet, you will need to do that first. You can find the instructions below.

### Databases for Kubernetes

The Cassandra databases are not included in the kubernetes deployment, as the databases are statefull. More info about this can be found in the [README.md file under the Cassandra section](https://github.com/S5-RB03/Documentation#cassandra). The example below is for the chat service, but the same steps apply for the media service, make sure to change the name of the container and keyspace accordingly.

You can start these with by running the following Docker commands:
```
docker pull cassandra:latest
docker run --name chatmessages-cassandra -p 9042:9042 -e CASSANDRA_DC=datacenter1 -d cassandra:latest
```

You will need to wait untill the Cassandra databases have started up and are ready to accept connections, this takes about 5 minutes. Next you can connect to the Cassandra database with the `cqlsh` tool:
```
docker exec -it chatmessages-cassandra cqlsh
```

Once successfully connected, you can create the keyspace for the application:
```
CREATE KEYSPACE chatmessages_keyspace WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
```
You can edit the replication factor to your liking, in this example it is set to 1.
The Spring Boot applications will create the tables for you, so you don't have to do this manually. You can always check if the tables are created by running the following command:
```
USE chatmessages_keyspace;
DESCRIBE TABLES;
```

### Monitoring
To monitor the applciation, Prometheus can be added. The complete documentation for monitoring in this project can be found [here](https://github.com/S5-RB03/Documentation#monitoring). It is assumed you have [Helm](https://helm.sh/docs/intro/install/) installed. 

First make sure you are in the prometheus directory: 
```
cd prometheus
```

Retrieve the required Helm charts:
```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
helm repo update
```
Prometheus can now be installed. I found an error when installing Prometheus, which can be fixed by including the value.yaml file while installing. Installing can be done by running the following command:
```
helm install prometheus-operator prometheus-community/kube-prometheus-stack -f value.yaml
```

To see if Prometheus is running, you can run the following command:
```
kubectl get pods
```
You should see an output that looks more or less like this:
```
NAME                                                     READY   STATUS             RESTARTS         AGE
alertmanager-prometheus-operator-kube-p-alertmanager-0   2/2     Running            4 (11m ago)      45h
keycloak-86f7d6d9dc-j6k7w                                1/1     Running            1 (11m ago)      22h
prometheus-operator-grafana-9f4766c59-fp6gr              3/3     Running            6 (11m ago)      45h
prometheus-operator-kube-p-operator-bc9c449b4-7n4xs      1/1     Running            4 (10m ago)      45h
prometheus-operator-kube-state-metrics-fcf69f99d-xskml   1/1     Running            4 (10m ago)      45h
prometheus-operator-prometheus-node-exporter-5pt9n       1/1     Running            2 (11m ago)      45h
prometheus-prometheus-operator-kube-p-prometheus-0       2/2     Running            4 (11m ago)      45h
rabbitmq-depl-5786bb77f6-nmhmf                           1/1     Running            2 (11m ago)      45h
sevyh-chatbackend-cd4d8d69c-7p77d                        1/1     Running            11 (3m14s ago)   45h
sevyh-frontend-7b665c6d5c-rrq6b                          1/1     Running            2 (11m ago)      45h
sevyh-userbackend-6878578d89-lg899                       1/1     Running            1 (11m ago)      22h
```

To access the Prometheus dashboard, port forwarding needs to be enabled. This can be done by running the following command:
```
kubectl --namespace default port-forward svc/prometheus-operator-kube-p-prometheus 9090
```

You can now access the Prometheus dashboard by going to `localhost:9090` in your browser.

[ :rocket: Back to the top](#quickstart-guide)

## Docker

To deploy the application locally, you need to have Docker installed. You can find the installation instructions [here](https://docs.docker.com/get-docker/).

When you have Docker installed, you can deploy the application by running the following commands:

First make sure you are in the `Dockerfiles` directory: 
```
cd Dockerfiles
```

Then run the following command to start the containers:
```
docker-compose up
```

### Databases for Docker

The Cassandra databases are not included in the Docker deployment, as the databases are statefull. More info about this can be found in the [README.md file under the Cassandra section](https://github.com/S5-RB03/Documentation#cassandra). The example below is for the chat service, but the same steps apply for the media service, make sure to change the name of the container and keyspace accordingly.

You can start these with by running the following Docker commands:
```
docker pull cassandra:latest
docker run --name chatmessages-cassandra -p 9042:9042 -e CASSANDRA_DC=datacenter1 -d cassandra:latest
```

You will need to wait untill the Cassandra databases have started up and are ready to accept connections, this takes about 5 minutes. Next you can connect to the Cassandra database with the `cqlsh` tool:
```
docker exec -it chatmessages-cassandra cqlsh
```

Once successfully connected, you can create the keyspace for the application:
```
CREATE KEYSPACE chatmessages_keyspace WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
```
You can edit the replication factor to your liking, in this example it is set to 1.
The Spring Boot applications will create the tables for you, so you don't have to do this manually. You can always check if the tables are created by running the following command:
```
USE chatmessages_keyspace;
DESCRIBE TABLES;
```

[ :rocket: Back to the top](#quickstart-guide)

## Development

When you want to develop on the application, you can follow the guide for the [Docker deployment](#docker). All you need to do is turn off the container with the application you want to develop on. You can do this by running the following command:
```
docker stop <container name>
```
Or turn it off via Docker Desktop.

After this you can start the application locally. You can find the instructions for running the applications locally in their respective repositories in the README.md files. To make life a bit easier, the ports that are used for the applications are the same for the Docker containers, so it should be plug and play.

[ :rocket: Back to the top](#quickstart-guide)

## Ports

The ports that are used for the applications are the following:

| Application | Port |
| ----------- | ---- |
| Chat | 3001 |
| Media | 3002 |
| User | 3003 |
| Frontend | 3004 |
| Keycloak | 8080 |
| RabbitMQ | 5672 (messaging) & 15672 (admin panel) |
| Cassandra chatmessages | 9042 |
| Cassandra media | 9043 |

[ :rocket: Back to the top](#quickstart-guide)