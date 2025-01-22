# Ticketing Web Application

This repository contains a microservices-based web application for buying and selling tickets.  
It provides a RESTful API and a Next.js front end, built using TypeScript and MongoDB.  
The application is containerized with Docker and deployed through Kubernetes.

## Microservices Architecture

The application is composed of several microservices, each responsible for a specific domain:
Messaging of events is handled using NATS service message broker.

- **Auth Service**: Manages user authentication and authorization with JSON web tokens.
- **Tickets Service**: Handles creation, updating, and retrieval of ticket information.
- **Orders Service**: Manages user orders for tickets.
- **Payments Service**: Processes payments for orders.
- **Expiration Service**: Monitors and expires unpaid orders.
- **Client**: The Next.js front-end application.

Each service is deployed as a separate Docker container within a Kubernetes cluster, allowing for independent scaling and maintenance.

## API Routes

Below is an overview of the primary API routes exposed by the microservices:

- **Auth Service**
  - `POST /api/users/signup`: Register a new user.
  - `POST /api/users/signin`: Authenticate an existing user.
  - `POST /api/users/signout`: Sign out the current user.
  - `GET /api/users/currentuser`: Retrieve details of the currently authenticated user.

- **Tickets Service**
  - `GET /api/tickets`: Retrieve a list of all tickets.
  - `POST /api/tickets`: Create a new ticket.
  - `GET /api/tickets/:id`: Retrieve details of a specific ticket.
  - `PUT /api/tickets/:id`: Update an existing ticket.

- **Orders Service**
  - `GET /api/orders`: Retrieve a list of the current user's orders.
  - `POST /api/orders`: Create a new order.
  - `GET /api/orders/:id`: Retrieve details of a specific order.
  - `DELETE /api/orders/:id`: Cancel an existing order.

- **Payments Service**
  - `POST /api/payments`: Process a payment for an order.

For detailed information on request and response schemas, please refer to the respective service directories in the repository.

## Deployment

The application is deployed using Kubernetes, with each microservice running in its own pod.  
The `infra/k8s` directory contains the Kubernetes configuration files for deploying the services, including:

- Deployment configurations for each microservice.
- Service definitions for internal communication.
- Ingress configurations for external access.

To deploy the application, ensure that your Kubernetes cluster is properly configured and apply the configurations using `kubectl`:

```bash
kubectl apply -f infra/k8s/
```

Using Skafold, run in a development environment:
```bash
skaffold dev
```