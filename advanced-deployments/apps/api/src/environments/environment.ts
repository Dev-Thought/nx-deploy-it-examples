export const environment = {
  production: false,

  rapidapiKey: process.env.RAPIDAPI_KEY,
  utelly: {
    endpoint: `https://${process.env.UTELLY_HOST}/lookup`,
    host: process.env.UTELLY_HOST
  },
  imdb: {
    endpoint: `https://${process.env.IMDB_HOST}`,
    host: process.env.IMDB_HOST
  },

  mongo: {
    uri: process.env.MONGO_CONNECTION_STRING
  },

  auth0: {
    audience: process.env.AUTH0_AUDIENCE,
    domain: process.env.AUTH0_DOMAIN
  }
};
