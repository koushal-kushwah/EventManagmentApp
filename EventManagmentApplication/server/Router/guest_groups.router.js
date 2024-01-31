import * as ev_function from '../controller/guest_groups.controler.js'
import express from 'express'
const Router=express.Router()
 Router.post('/save',ev_function.save)
Router.get('/fetchall', ev_function.fetchAll);
Router.get('/fetch/:id', ev_function.fetch);
Router.delete('/delete',ev_function.deleteuser)
Router.put('/update', ev_function.updateuser)

 export default Router
 