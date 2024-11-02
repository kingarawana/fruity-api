# Fruity API

## Description

This API allows you to create, move, delete, and list directories.

## Setup

Install dependencies:
   ```bash
  yarn
   ````


## Dev mode
Run the project in dev:
   ```bash
   yarn dev
   ````

## Prod mode
Start the server in prod mode:
   ```bash
   yarn start:prod
   ```

## Run tests
Start the server in prod mode:
   ```bash
   yarn test
   ```
   
## How to use API
   ```
   // POST the following JSONs
   
   // to create a folder
   {
      "command": "CREATE fruits"
   }
   
   // to move a folder
   {
      "command": "MOVE fruits grains"
   }
   
   // to delete a folder
   {
      "command": "DELETE fruits"
   }
   
   // to list current full directory structure
   {
      "command": "LIST"
   }
   ```
After starting the app, you can view the swagger docs at http://localhost:3000/api-docs/