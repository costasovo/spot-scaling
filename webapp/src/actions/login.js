import { LOGIN } from 'constants/login';

export default {
  login: (accessKey, secret) => {
  	return { type : LOGIN, payload: { accessKey, secret }}
  }
};
