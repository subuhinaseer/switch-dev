import {utils} from './utils';
export const DEBUG = __DEV__;
export const appName = 'SalesAgent';
export const config = {
  API_URL: 'https://api-dev.switchafrica.io',
};

export const url = {
  BASE_URL: config.API_URL,
  SOCKET: config.API_URL,
  // core
  Device: '/v1/api/Device/',
  User: '/v1/api/User/',
  Notification: '/v1/api/Notification/',
  // auth
  login: '/api/v1/auth/login/',
  logout: '/api/v1/auth/logout/',
  register: '/api/v1/auth/registration/',
  user: '/api/v1/auth/user/',
  // pasword
  tnc: 'https://switchafrica.io/',
  faq: 'https://switchafrica.io/',
  about: 'https://switchafrica.io/',
  privacy: 'https://switchafrica.io/',
  auth: {
    password_reset: '/api/v1/auth/password/reset/',
    password_reset_confirm: '/api/v1/auth/password/reset/confirm/',
    login: '/api/v1/auth/login/',
    logout: '/api/v1/auth/logout/',
    user: '/api/v1/auth/user/',
    password_change: '/api/v1/auth/password/change/',
    token_verify: '/api/v1/auth/token/verify/',
    token_refresh: '/api/v1/auth/token/refresh/',
    register: '/api/v1/auth/registration/',
  },
  crm: {
    Contact: '/crm/api/v1/Contact/',
  },
  common: {
    Business: '/common/api/v1/Business/',
    User: '/api/v1/User/',
    Profile: '/common/api/v1/Profile/',
    BusinessSector: '/common/api/v1/BusinessSector/',
    DocumentType: '/common/api/v1/DocumentType/',
    Document: '/common/api/v1/Document/',
  },
  inventory: {
    Order: '/inventory/api/v1/Order/',
    Product: '/inventory/api/v1/Product/',
    LineItem: '/inventory/api/v1/LineItem/',
    OrderCategory: '/inventory/api/v1/OrderCategory/',
    ProductCategory: '/inventory/api/v1/ProductCategory/',
  },
  billing: {
    Payment: '/billing/api/v1/Payment/',
  },
  credit: {
    LoanApplication: '/credit/api/v1/LoanApplication/',
    LoanPortfolio: '/credit/api/v1/LoanPortfolio/',
    EMISchedule: '/credit/api/v1/EMISchedule/',
    credit_score: '/',
  },
  getURL: (path, {item, type = 'detail'} = {}) => {
    const base = utils.getObject(url, path);
    let link = base;
    if (['detail', 'delete', 'edit'].includes(type)) {
      link = `${base}{{id}}/`;
    }
    return utils.replaceVariablesFromString(link, item);
  },
  getItemURL: (path, item) => url.getURL(path, {item, type: 'detail'}),
};
