# Vue 3 Pinia Task List

This is a simple Vue application that showcases the usage of Pinia for state management.

## Introduction

Instead of relying on a traditional database, this project utilizes a JSON file to store data, allowing the focus to remain on exploring Pinia's capabilities. The project leverages the `json-server` package, which serves as a local environment server for the JSON file, creating endpoints for data manipulation.

## Getting Started

### Installation

Install all dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

Next, to use the `json-server` package, you need to install it globally:

```bash
npm install -g json-server
```

## Usage

The fake database is stored in the data directory and can be updated through Pinia actions, demonstrating how Pinia manages state within the application.

### Running the Server

Once installed, you can run the server using the following command:

```bash
json-server -w ./data/db.json
```
This command starts the server on http://localhost:3000 and watches for changes in the db.json file located in the data directory.

### Running the application

Once the server is running, you can go ahead and start the application in a new terminal using the following command:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```


### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```


## Further reading

For more information about Pinia, checkout the documentation: https://pinia.vuejs.org/core-concepts/

## Contributions

Contributions are welcome! If you have any ideas for improvements or new features, please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/fed-v/vue-3-pinia-task-list?tab=MIT-1-ov-file) file for details.


