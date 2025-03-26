import { rssService } from './services/rssService.js';
import RssController from './controllers/rssController.js';
import { uploadToS3 } from './aws/s3Service.js';

/*
// Teste do Service
async function testRss() {
    try {
        const feed = await rssService.getFeed();
        console.log('RSS Feed obtido com sucesso:');
        console.log(feed);
    } catch (error) {
        console.error('Erro ao obter RSS:', error);
    }
}
*/

/*
// Criar uma instância do controller
const controller = new RssController(rssService);

// Simulação para testes do Controller
const mockReq = {
    params: {}  // Inicializa params como um objeto vazio
};
const mockRes = {
    json: (data) => {
        if (Array.isArray(data)) {
            console.log(`Total de itens: ${data.length}`);
            if (data.length > 0 && data[0].title) {
                // Se são notícias
                data.forEach(news => {
                    console.log('\n-------------------');
                    console.log(`Data: ${new Date(news.pubDate).toLocaleString()}`);
                    console.log(`Título: ${news.title}`);
                    console.log(`Seção: ${news.link.split('/')[3]}`);
                    console.log(`URL: ${news.link}`);
                });
            } else {
                // Se são seções
                console.log('Seções disponíveis:');
                data.forEach(section => console.log(`- ${section}`));
            }
        }
        return mockRes;
    },
    status: (code) => {
        console.log('Status:', code);
        return mockRes;
    }
};

// Teste do Controller
async function testController() {
    try {
        // Teste 1: Listar todas as seções
        console.log('\n=== Testando getSections ===');
        await controller.getSections(mockReq, mockRes);

        // Teste 2: Filtrar por seção específica (saude)
        console.log('\n=== Testando getNewsBySection (saude) ===');
        mockReq.params.section = 'saude';
        await controller.getNewsBySection(mockReq, mockRes);

        // Teste 3: Todas as notícias
        console.log('\n=== Testando getAllNews ===');
        await controller.getAllNews(mockReq, mockRes);

    } catch (error) {
        console.error('Erro nos testes:', error);
    }
}
*/

// Teste do S3
async function testS3() {
    try {
        console.log('\n=== Testando Upload para S3 ===');
        
        // Dados de teste
        const testData = {
            timestamp: new Date().toISOString(),
            test: true,
            message: "Teste de upload para S3",
            sample_news: [
                {
                    title: "Notícia de Teste 1",
                    link: "https://exemplo.com/noticia1",
                    pubDate: new Date(),
                    content: "Conteúdo de teste 1"
                },
                {
                    title: "Notícia de Teste 2",
                    link: "https://exemplo.com/noticia2",
                    pubDate: new Date(),
                    content: "Conteúdo de teste 2"
                }
            ]
        };

        console.log('Iniciando upload de dados de teste...');
        const location = await uploadToS3(testData);
        console.log('Upload realizado com sucesso!');
        console.log('Arquivo disponível em:', location);

        // Teste com dados reais do RSS
        console.log('\n=== Testando Upload de Dados RSS ===');
        const feed = await rssService.getFeed();
        console.log(`${feed.length} notícias carregadas do RSS`);
        const rssLocation = await uploadToS3(feed);
        console.log('Upload do RSS realizado com sucesso!');
        console.log('Arquivo RSS disponível em:', rssLocation);

    } catch (error) {
        console.error('Erro no teste do S3:', error);
        console.error('Detalhes do erro:', error.message);
        if (error.code) {
            console.error('Código do erro AWS:', error.code);
        }
    }
}







/*
// Executar os testes
console.log('=== Testando Service ===');
await testRss();
*/

/*
console.log('\n=== Testando Controller ===');
await testController();
*/

// Executar apenas o teste do S3
console.log('=== Iniciando Testes do S3 ===');
await testS3();
