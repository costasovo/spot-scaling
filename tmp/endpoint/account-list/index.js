import axios from 'axios';

// just for Lambda
require('babel/register');

// !!!!!!!! not DRY
const ax = axios.create({
  timeout: 5000,
  headers: {"WEB-API-key": "26981d4c-331b-4f35-9ba1-9a56ee13bf63"}
});

const GET_LIST_URL = "https://api.csas.cz/sandbox/webapi/api/v1/transparentAccounts/accounts";
// !!!!!!!!!!!!!!!!

const handler = (event, context) => {
	ax.get(GET_LIST_URL).then((response) => {
		const data = response.data;
		const count = data.length;
		// todo process list of accounts - push to queue for load details & tag
		context.succeed({count, data});
	}).catch((response) => {
		context.fail(response);
	});
};

// just for Lambda
export default handler;
exports.handler = handler;