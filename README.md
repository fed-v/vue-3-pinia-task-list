# Vue 3 Pinia Task List

This is a simple Vue application that showcases the usage of Pinia for state management. Features for the application include: 

* CRUD operations powered by Pinia state management and a JSON server backend.

* Responsive designed achieved through CSS3 media queries. 

* Task prioritization with dynamic CSS classes for clear visualization.

* Mark tasks as favorites or completed for streamlined organization.

* Detailed task descriptions that can be toggled for a simplified or detailed view

* Followed best practices and accessibility guidelines (such as WCAG) to ensure the application meets the accessibility requirements, providing an inclusive experience for all users.

* Pinia store unit tests using Vitest

![Homepage screen capture](homepage.png?raw=true "Homepage screen capture")
![Homepage with modal screen capture](modal.png?raw=true "Homepage with modal screen capture")

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
### Running the tests

```bash
# npm
npm run test

# pnpm
pnpm run test

# yarn
yarn test
```

## Further reading

For more information about Pinia, checkout the documentation: https://pinia.vuejs.org/core-concepts/

## Contributions

Contributions are welcome! If you have any ideas for improvements or new features, please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/fed-v/vue-3-pinia-task-list?tab=MIT-1-ov-file) file for details.


