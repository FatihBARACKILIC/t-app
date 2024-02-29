import { HelmetOptions } from 'helmet';

export const helmetOptions: HelmetOptions = {
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'font-src': ['self'],
      'style-src': null,
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  noSniff: false,
  frameguard: false,
  xssFilter: true,
  hidePoweredBy: true,
  referrerPolicy: { policy: 'same-origin' },
};
