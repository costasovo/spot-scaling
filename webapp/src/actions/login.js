import { LOGIN } from 'constants/login';

export default {
  login: (accessKey, secret) => ({ type : LOGIN,  accessKey, secret})
};
