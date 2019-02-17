const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const membersOnly = require('./controllers/members-only');
const auth = require('./controllers/authorization');

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Connected to Dockerland');
});
// app.get('/', (req, res)=> { res.send(database.users) })

app.post('/signin', signin.handleSigninAuth(db, bcrypt));

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/membersonly', auth.requireAuth, (req, res) => {
  membersOnly.handleShowMembersOnly(req, res, db);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
