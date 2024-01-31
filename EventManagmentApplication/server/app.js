
import express from 'express'
import bodyParser from 'body-parser'
import ActivityRouter from './Router/activity_log.route.js'
import EventRouter from './Router/events.router.js'
import EVFunctionROuter from './Router/ev_function.router.js'
import FunctionRouter from './Router/function_schedules.router.js'
import GuestRouter from './Router/guests.router.js'
import GGroupRouter from './Router/guest_groups.router.js'
import QrScanROuter from './Router/qr_scan_log.router.js'
import UserRouter from './Router/users.ROuter.js'
import cors from 'cors'
const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({"extended":true}))
app.use(cors())
app.use('/activity',ActivityRouter)
app.use('/event',EventRouter)
app.use('/efunction',EVFunctionROuter)
app.use('/function',FunctionRouter)
app.use('/guest',GuestRouter)
app.use('/ggroup',GGroupRouter)
app.use('/qrscan',QrScanROuter)
app.use('/user',UserRouter)
app.listen(3000)
console.log('server invoked at http://lochalhost:3000')