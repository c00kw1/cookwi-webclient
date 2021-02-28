export const environment = {
  production: true,
  homologation: false,
  dev: false,
  api: {
    scheme: 'https',
    hostname: 'api.cookwi.com',
    port: 443,
    prefix: 'api',
  },
  sso: {
    issuer: 'https://sso.cookwi.com/auth/realms/cookwi',
    clientId: 'cookwi-webclient',
  },
};
