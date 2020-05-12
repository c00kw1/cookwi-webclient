import { OAuthModuleConfig } from 'angular-oauth2-oidc';

export const authModuleConfig: OAuthModuleConfig = {
    resourceServer: {
        allowedUrls: ['https://localhost:5001'],
        sendAccessToken: true,
    }
};