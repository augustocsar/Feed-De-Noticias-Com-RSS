document.addEventListener('DOMContentLoaded', async () => {
    const sectionSelect = document.getElementById('sectionSelect');
    const newsList = document.getElementById('newsList');

    const API_BASE_URL = window.location.origin;

    function stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    function truncateText(text, maxLength = 300) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    async function loadSections() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/sections`);
            const sections = await response.json();
            
            sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section;
                option.textContent = section.toUpperCase();
                sectionSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar seções:', error);
        }
    }

    async function loadNews(section = '') {
        try {
            const url = section 
                ? `${API_BASE_URL}/api/news/${section}` 
                : `${API_BASE_URL}/api/news`;
            const response = await fetch(url);
            const news = await response.json();
            
            newsList.innerHTML = '';
            
            news.forEach(item => {
                const date = new Date(item.pubDate);
                const dateStr = date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                const cleanContent = stripHtml(item.content);
                const truncatedContent = truncateText(cleanContent);

                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <div class="date">
                        <i class="far fa-clock"></i> ${dateStr}
                    </div>
                    <h2>${item.title}</h2>
                    <div class="content">
                        <p>${truncatedContent}</p>
                    </div>
                    <a href="${item.link}" target="_blank">
                        Ler mais <i class="fas fa-external-link-alt"></i>
                    </a>
                `;
                newsList.appendChild(newsItem);
            });
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
            newsList.innerHTML = `
                <div class="error-message">
                    Erro ao carregar notícias. Por favor, tente novamente mais tarde.
                </div>
            `;
        }
    }

    sectionSelect.addEventListener('change', (e) => {
        loadNews(e.target.value);
    });

    // Carregar dados iniciais
    await loadSections();
    await loadNews();
});