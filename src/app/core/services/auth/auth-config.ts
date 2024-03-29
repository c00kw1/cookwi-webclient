import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { APP_BASE_HREF } from '@angular/common';

// doc for getting started https://www.npmjs.com/package/angular-oauth2-oidc

export const authCodeFlowConfig: AuthConfig = {
  // basic configs
  issuer: environment.sso.issuer,
  clientId: environment.sso.clientId,
  responseType: 'code',
  redirectUri: document.getElementsByTagName('base')[0].href + 'home', // we have to handle /fr and /en so we use base href
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid offline_access cookwi.api.default cookwi.api.admin',
  useSilentRefresh: false, // Needed for Code Flow to suggest using iframe-based refreshes
  //silentRefreshTimeout: 5000, // For faster testing
  timeoutFactor: 0.75, // For faster testing
  sessionChecksEnabled: false,
  showDebugInformation: environment.dev, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
  nonceStateSeparator: 'semicolon', // Real semicolon gets mangled by IdentityServer's URI encoding
};
