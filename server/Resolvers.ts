import articles from './dataset';

const Resolvers = {
	Query: {
		getAllArticles: () => articles,
		getArticleById: (parent: any, args: any) => {
			const { id } = args;
			return articles.find((article) => article.id === id);
		},
	},
	Mutation: {
		addArticle: (parent: any, args: any) => {
			const { title } = args;
			const newArticle = {
				id: articles.length + 1,
				title,
			};
			articles.push(newArticle);
			return newArticle;
		},
	},
};

export default Resolvers;
