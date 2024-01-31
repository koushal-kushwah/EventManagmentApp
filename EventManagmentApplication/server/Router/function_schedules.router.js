import * as ev_function from '../controller/function_schedules.js'
import express from 'express'
import { verifyToken } from '../authmiddleware/auth.js';


const Router=express.Router()
 Router.post('/save',verifyToken,ev_function.save)
Router.get('/fetchall', verifyToken,ev_function.fetchAll);
Router.get('/fetch/:id', verifyToken,ev_function.fetch);
Router.delete('/delete/:id',verifyToken,ev_function.deleteuser)
Router.put('/update/:id', verifyToken,ev_function.updateuser)

 export default Router
 