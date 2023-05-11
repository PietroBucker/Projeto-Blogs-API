const express = require('express');
const { userRoute, loginRoute } = require('./route');

// ...

const app = express();

app.use(express.json());
app.use('/login', loginRoute);
app.use('/user', userRoute);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
