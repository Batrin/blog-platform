const baseUrl = 'https://kata.academy:8021/api';
const endPoint = {
  articles: '/articles',
  singleArticle: (slug) => `/articles/${slug}`,
  signUp: '/users',
  signIn: '/users/login',
  getProfile: (username) => `/profiles/${username}`,
  updateUser: '/user',
  favoriteArticle: (articleSlug) => `/articles/${articleSlug}/favorite`,
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

  postRequest = async (method, url, body, token) => {
    const response = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (!response.ok) {
      throw json;
    }

    return json;
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
    const user = await this.postRequest('post', url, userInfo);
    return user;
  };

  signInUser = async (userInfo) => {
    const url = `${baseUrl}${endPoint.signIn}`;
    const res = await this.postRequest('post', url, userInfo);
    return res;
  };

  updateUserProfile = async (userinfo, token) => {
    const url = `${baseUrl}${endPoint.updateUser}`;
    const res = await this.postRequest('put', url, userinfo, token);
    return res;
  };

  favoriteArticle = async (slug, token) => {
    const url = `${baseUrl}${endPoint.favoriteArticle(slug)}`;
    const res = await this.postRequest('post', url, {}, token);
    return res;
  };

  unfavoriteArticle = async (slug, token) => {
    const url = `${baseUrl}${endPoint.favoriteArticle(slug)}`;
    const res = await this.postRequest('delete', url, {}, token);
    return res;
  };

  addNewArticle = async (articleBody, token) => {
    const url = `${baseUrl}${endPoint.articles}`;
    const res = await this.postRequest('post', url, articleBody, token);
    return res;
  };

  updateArticle = async (slug, articleBody, token) => {
    const url = `${baseUrl}${endPoint.singleArticle(slug)}`;
    const res = await this.postRequest('put', url, articleBody, token);
    return res;
  };

  deleteArticle = async (slug, token) => {
    const url = `${baseUrl}${endPoint.singleArticle(slug)}`;
    const response = await fetch(url, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ data: 'data' }),
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  };
}
