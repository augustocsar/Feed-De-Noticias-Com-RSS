// services/rssService.js
import Parser from 'rss-parser';
import { uploadToS3 } from '../aws/s3Service.js';

const parser = new Parser();
const RSS_URL = 'https://g1.globo.com/rss/g1/';

export const rssService = {
    async getFeed() {
        try {
            const feed = await parser.parseURL(RSS_URL);
            
            // Mapeia os dados do G1 (seu código original)
            const news = feed.items.map(item => ({
                title: item.title,
                link: item.link,
                pubDate: new Date(item.pubDate),
                content: item.content,
                description: item.description,
                categories: item.categories || []
            }));

            console.log(`${news.length} notícias carregadas com sucesso!`);
            
            // Envia para o s3Service salvar
            await uploadToS3(news);
            
            return news;
        } catch (error) {
            console.error('Erro ao carregar feed:', error);
            throw new Error('Falha ao carregar feed RSS do G1');
        }
    }
};

export default rssService;