import * as guestsCntroler from '../controller/e_functios.controler.js'
import express from 'express'
import { verifyToken } from '../authmiddleware/auth.js';


const Router=express.Router()
Router.post('/save',verifyToken,guestsCntroler.save)
Router.get('/fetchall', verifyToken, guestsCntroler.fetchAll);
Router.get('/fetch/:id',verifyToken, guestsCntroler.fetch);
Router.delete('/delete/:id',verifyToken,guestsCntroler.deleteuser)
Router.put('/update/:id',verifyToken, guestsCntroler.update)
export default Router

