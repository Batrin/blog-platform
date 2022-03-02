const baseUrl = 'https://kata.academy:8021/api';
const endPoint = {
  articles: '/articles',
  singleArticle: (slug) => `/articles/${slug}`,
  signUp: '/users',
  signIn: '/users/login',
  getProfile: (username) => `/profiles/${username}`,
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

  postRequest = async (url, body) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

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

  getSingleArticle = async (slug) => {
    const url = `${baseUrl}${endPoint.singleArticle(slug)}`;
    const singleArticle = await this.getResource(url);
    return singleArticle;
  };

  signUpUser = async (userInfo) => {
    const url = `${baseUrl}${endPoint.signUp}`;
    const user = await this.postRequest(url, userInfo);
    return user;
  };

  signInUser = async (userInfo) => {
    const url = `${baseUrl}${endPoint.signIn}`;
    const res = await this.postRequest(url, userInfo);
    return res;
  };

  getUserProfile = async (userName) => {
    const url = `${baseUrl}${endPoint.getProfile(userName)}`;
    const res = await this.getResource(url);
    return res;
  };
}
