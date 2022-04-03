const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')

const db = require('./config/index')
const router = require('./router/index')

dotenv.config()

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())


db.connect()

router(app)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening port`);
})