const baseUrl = 'https://kata.academy:8021/api';
const endPoint = {
  articles: '/articles',
};

export default class BlogApi {
  getResource = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    return response.status;
  };

  getArticles = async (offsetCount = 0) => {
    const url = `${baseUrl}${endPoint.articles}?limit=5&offset=${offsetCount}`;
    const articles = await this.getResource(url);
    return articles;
  };
}
