// import * as ev_function from '../controller/users.controler.js'
// import express from 'express'
// const Router=express.Router()
// Router.post('/save',ev_function.save)
// Router.get('/fetchall', ev_function.fetchAll);
// Router.get('/fetch/:id', ev_function.fetch);
// Router.delete('/delete',ev_function.deleteuser)
// Router.put('/update', ev_function.updateuser)
// Router.post('/login',ev_function.login)

// export default Router


// ##################################

import express from 'express';
import * as ev_function from '../controller/users.controler.js';
import { verifyToken } from '../authmiddleware/auth.js';


const Router = express.Router();

// Protected routes
Router.get('/fetchall', ev_function.fetchAll);
Router.get('/fetch/:id', ev_function.fetch);
Router.put('/update', ev_function.updateuser);
Router.delete('/delete', ev_function.deleteuser);

// Other routes
Router.post('/save',ev_function.save);
Router.post('/login', ev_function.login);

// Router.post('/login',verifyToken, ev_function.login);
// Router.post('/login',verifyToken, ev_function.login);


export default Router;
