import { TOGGLE_DETAIL } from 'constants/detail';

export default {
  toggle: (detail) => {
  	return { type : TOGGLE_DETAIL, payload: detail}
  }
};
