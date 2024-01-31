import * as guestsCntroler from '../controller/activity_log.controler.js'
import express from 'express'
const Router=express.Router()
Router.post('/save',guestsCntroler.save)
Router.get('/fetchall', guestsCntroler.fetchAll);
Router.get('/fetch/:id', guestsCntroler.fetch);
Router.delete('/delete',guestsCntroler.deleteuser)
Router.put('/update', guestsCntroler.updateuser)
export default Router
