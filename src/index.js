<<<<<<< HEAD
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import BrowserRoutes from './BrowserRoutes';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <BrowserRoutes />
    </Provider>

);


=======
const express = require('express');
const app = express();
const { PORT, CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')

//import passport middleware
require('./middlewares/passport-middleware')

//init middleware
app.use(express.json())
app.use(cookieParser())

app.use(cors({ origin: CLIENT_URL, credentials: true }))

app.use(passport.initialize())

//import routes
const authenRoutes = require('./routes/authen')

//Init routes
app.use('/api', authenRoutes)


//App start
const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The app is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

appStart();
>>>>>>> da1f6e106d7870e4e2def3a580bdbff20b858b53
