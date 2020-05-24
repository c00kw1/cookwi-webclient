export const environment = {
    production: false,
    homologation: true,
    dev: false,
    api: {
        scheme: "https",
        hostname: "api.hom.cookwi.com",
        port: 443,
        prefix: "api"
    },
    sso: {
        issuer: "https://sso.hom.cookwi.com/auth/realms/cookwi",
        clientId: "cookwi-webclient"
    }
};
