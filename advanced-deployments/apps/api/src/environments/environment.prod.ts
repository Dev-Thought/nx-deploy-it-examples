export const environment = {
  production: true,

  utelly: {
    endpoint: `https://${process.env.UTELLY_HOST}/lookup`,
    host: process.env.UTELLY_HOST,
    key: process.env.UTELLY_KEY
  },

  mongo: {
    uri: process.env.MONGO_CONNECTION_STRING
  },

  auth0: {
    audience: process.env.AUTH0_AUDIENCE,
    domain: process.env.AUTH0_DOMAIN
  }
};
