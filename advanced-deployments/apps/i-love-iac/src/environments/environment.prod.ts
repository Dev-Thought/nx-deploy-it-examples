export const environment = {
  production: true,

  apiEndpoint: 'http://localhost:3333',

  auth0: {
    clientId: 'LMkss3frfejwLPpVS58QfaCjvkKnajvQ',
    domain: 'movie-saver.eu.auth0.com',
    audience: 'http://localhost:3333',
    redirect: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  }
};
