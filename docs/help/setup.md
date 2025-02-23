# Project Setup Guide

Welcome to the project! Follow the steps below to set up your development environment and get started.

## Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (version 14.x or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

## Install Dependencies

After cloning the repository, run the following command to install all necessary dependencies:

```bash
npm install
```

This command reads the `package.json` and `package-lock.json` files and installs the specified dependencies into the `node_modules` directory.

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will start the Next.js development server, and you can view your application in the browser at `http://localhost:3000`.

### Building the Application

To create an optimized production build of the application, run:

```bash
npm run build
```

This will compile your application and generate the necessary production files.

### Starting the Production Server

After building the application, you can start the production server with:

```bash
npm start
```

This will start the Next.js production server, and you can view your application in the browser at `http://localhost:3000`.

### Linting the Code yet to be done

To check your code for linting errors and ensure it follows the project's coding standards, run:

```bash
npm run lint
```
