# Vue 3 Pinia Task List

This is a simple Vue application that showcases the usage of Pinia for state management.

## Introduction

Instead of relying on a traditional database, this project utilizes a JSON file to store data, allowing the focus to remain on exploring Pinia's capabilities. The project leverages the `json-server` package, which serves as a local environment server for the JSON file, creating endpoints for data manipulation.

## Getting Started

### Installation

To use the `json-server` package, you need to install it globally:

```bash
npm install -g json-server
```

This command starts the server and watches for changes in the db.json file located in the data directory.

### Usage

The fake database is stored in the data directory and can be updated through Pinia actions, demonstrating how Pinia manages state within the application.

Feel free to explore the project and experiment with Pinia's features for state management.

### Running the Server

Once installed, you can run the server using the following command:

```bash
json-server -w ./data/db.json
```
This command starts the server and watches for changes in the db.json file located in the data directory.

## Contributions

Contributions are welcome! If you have any ideas for improvements or new features, please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


