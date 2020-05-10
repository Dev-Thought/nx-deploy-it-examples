export const environment = {
  production: true,

  apiEndpoint: 'https://api-functions3f2b2a1e.azurewebsites.net',

  auth0: {
    clientId: '9D02dAxNLqNKnVN0EsDibNUFv67jMH1t',
    domain: 'movie-saver.eu.auth0.com',
    audience: 'https://api-functions3f2b2a1e.azurewebsites.net',
    redirect: 'https://accountddb9961f.z6.web.core.windows.net/callback',
    scope: 'openid profile email'
  }
};
