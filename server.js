const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const homeRouter = require('./controllers/api/homeRoutes');
const postRouter = require('./controllers/api/postRoutes');
const userRouter = require('./controllers/api/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
  cookie: {}
};

app.use(session(sess));

// Set up Handlebars.js as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routers for different sets of routes
app.use('/', homeRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.render('home', { layout: 'main' });
});

// Sync sequelize models to the database, then start the Express server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});