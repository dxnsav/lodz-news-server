const axios = require('axios');
const cheerio = require('cheerio');

const scrapUrl = 'https://lodz.pl/aktualnosci';
const siteUrl = 'https://lodz.pl';

axios(scrapUrl).then(response => {
	const html = response.data;
	const $ = cheerio.load(html);
	const newsHeadlines = [];

	$('.article-item').each(function() {
		const title = $(this).find('.article-item__title').text();
		const url = $(this).find('.article-item__title').find('a').attr('href');
		const image = siteUrl + $(this).find('figure').find('a').find('picture').find('img').attr('src');
		const date = $(this).find('p.article-item__date').find('time').find('meta').attr('content');

		newsHeadlines.push({
			title,
			url,
			image,
			date,
			});
		});
}).catch(console.error);
