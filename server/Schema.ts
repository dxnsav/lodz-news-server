import { gql } from "apollo-server-express";

const Schema = gql`
	type Article {
		id: ID!
		title: String
		description: String
		url: String
		urlToImage: String
		publishedAt: String
	}

	type Query {
		getAllArticles: [Article]
		getArticleById(id: Int): Article
	}

	type Mutation {
		addArticle(title: String): Article
	}
	`;

export default Schema;