// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    homologation: false,
    dev: true,
    api: {
        scheme: "https",
        hostname: "localhost",
        port: 5001,
        prefix: "api"
    },
    sso: {
        issuer: "http://localhost:9011",
        clientId: "026de2c8-b990-4717-91d8-92a704e25f58"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
