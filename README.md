# Lodz News Server

This project is a simple news article management system with RESTful APIs and GraphQL. It allows you to create, update, and delete articles as well as fetch a list of articles. It uses Express, Apollo Server, Mongoose, and Cheerio for web scraping.

## Project Structure

Below is the structure of the project files:

    ├── config
    │   └── db.config.ts
    ├── controller
    │   └── article.controller.ts
    ├── logger
    │   └── api.logger.ts
    ├── models
    │   └── article.ts
    ├── repository
    │   └── article.repository.ts
    ├── routes
    │   └── index.ts
    ├── service
    │   └── article.service.ts
    ├── types
    │   └── article.d.ts
    ├── app.ts
    ├── index.ts
    ├── scrapper.ts
    └── package.json

## Installation and Setup

1. Install Node.js and npm on your local machine.
2. Clone the repository or download the source code.
3. Open the terminal, navigate to the project directory, and run npm install to install the dependencies.
4. Create a .env file in the root directory and add your MongoDB URI:

    MONGODB_URI=<your_mongodb_uri>

5. Run npm start to start the Express server.

6. To start Apollo Server and GraphQL, run `npm run start:graphql`. You can then access the GraphQL playground at `http://localhost:4000/graphql`.

## API Endpoints

- GET `/api/v1/articles`: Fetches all articles.
- POST `/api/v1/article`: Creates a new article. The request body should have an article object with the following properties: `title`, `description`, `paragraphs`, `images`.
- PUT `/api/v1/article`: Updates an existing article. The request body should have an article object with the properties you want to update, as well as the `_id` of the article you want to update.
- DELETE `/api/v1/article/:id`: Deletes an article by ID.

## GraphQL Schema and Resolvers

The GraphQL schema and resolvers are defined in `types/article.ts` and Resolvers.ts, respectively. You can use the following queries and mutations:

### Queries

`articles`: Fetches all articles.

### Mutations

- `createArticle`: Creates a new article.
- `updateArticle`: Updates an existing article.
- `deleteArticle`: Deletes an article by ID.

## Web Scraping

The scrapper.ts file contains a script to scrape news headlines from `https://lodz.pl/aktualnosci`. It uses Cheerio to extract the title, URL, image, and date of each news article on the page.

To run the script, execute `node scrapper.ts` in the terminal. The script will fetch the news headlines from the website and store them in an array called `newsHeadlines`. You can modify the script to save the scraped data to the database or use it in any other way you see fit.

## Husky Pre-commit Hooks

This project also includes Husky pre-commit hooks to ensure code quality and maintainability. Before every commit, ESLint and Prettier will automatically run to fix and check code for style and syntax issues.

## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues. Please make sure to follow the code style and add/update tests if necessary.
