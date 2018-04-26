const express =          require('express');
const mongoose =         require('mongoose');
const bodyParser =       require('body-parser');
const path =             require('path');
const cookieSession =    require('cookie-session');
const passport =         require('passport');
const apiRoutes =        require('./routes/api');
const authRoutes =       require('./routes/auth-routes');
const restrictedRoutes = require('./routes/restrictedRoutes');
                         require('./config/passport-setup');
const keys =             require('./config/keys');
const PythonShell =      require('python-shell');


// set up express app
const app = express();
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// connect to mongoDB
mongoose.connect(keys.mongodb.mLabURI, {
  useMongoClient: true
  /* other options */
})
  .then(() => console.log('connected to MongoDB...'))
  .catch((err) => console.log(err));
// for local mongoDB: keys.mongodb.dbURI
// for online mongoDB: keys.mongodb.mLabURI

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// set up session cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// initialize routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/', restrictedRoutes);

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
// listen to requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
