import * as ev_function from '../controller/guests.controler.js'
import express from 'express'
const Router=express.Router()
Router.post('/save',ev_function.save)
Router.get('/fetchall', ev_function.fetchAllGuests);
Router.get('/fetch/:id', ev_function.fetch);
Router.delete('/delete/:id',ev_function.deleteuser)
Router.put('/update/:id', ev_function.update)

 export default Router

 