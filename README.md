# Turborepo Documentation

This repository is set up using Turborepo to manage both backend and frontend applications in a monorepo.

## Project Setup

### Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 16 or higher)
- [npm](https://www.npmjs.com/get-npm)
- [Turborepo](https://turbo.build/repo/docs) (if not installed, you can install it globally using `npm install -g turbo`)

### Folder Structure

The project structure is as follows:

- `backend/`: Contains the backend application, running on `http://localhost:3001`.
- `frontend/`: Contains the frontend application, running on `http://localhost:3000`.
- `packages/`: Shared libraries, utilities, or components between the backend and frontend.

## Running the Project Locally

### Backend Setup

The backend application should be running on `http://localhost:3001`.

1. Navigate to the `backend/` directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    npm run dev
    ```

The backend will now be available at `http://localhost:3001`.

### Frontend Setup

The frontend application should be running on `http://localhost:3000`.

1. Navigate to the `frontend/` directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm run dev
    ```

The frontend will now be available at `http://localhost:3000`.

### Running Both Backend and Frontend

To run both the backend and frontend locally at the same time, you can either manually run the commands in separate terminal windows or use the following command from the root of your project (where both the backend and frontend are located):

```bash
npm run dev
