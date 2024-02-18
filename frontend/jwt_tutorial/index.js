// entry point/file for code

// imports
const express = require(`express`);

// creating instance
const app = express();

// api outs -- url endpoints
app.get(`/`, (req, res, next) => res.send({ message: `from /, hello` }));

app.post(`/user`, (req, res, next) => {
	res.send({ message: `user created` });
});

app.listen(3000, () => console.log(`server running`));
