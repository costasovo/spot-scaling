import express from 'express';
import accountList from './endpoint/account-list';

const app = express();

const map = (handler) => (req, res) => {
	const ev = {
	};
	const context = {
		succeed : (payload) => res.json(payload) ,
		fail : (response) => res.status(response.status).json(response.data)
	};
	handler(ev, context);
}

app.get('/account-list', map(accountList));

export default app;
