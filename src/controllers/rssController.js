class RssController {
    constructor(rssService) {
        this.rssService = rssService;
    }

    async getAllNews(req, res) {
        try {
            const news = await this.rssService.getFeed();
            return res.json(news);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getSections(req, res) {
        try {
            const news = await this.rssService.getFeed();
            const sections = new Set();
            
            news.forEach(item => {
                const section = item.link.split('/')[3];
                if (section) {
                    sections.add(section);
                }
            });

            return res.json(Array.from(sections));
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getNewsBySection(req, res) {
        try {
            const { section } = req.params;
            const news = await this.rssService.getFeed();
            
            const filteredNews = news.filter(item => 
                item.link.includes(`/${section}/`)
            );

            return res.json(filteredNews);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default RssController;