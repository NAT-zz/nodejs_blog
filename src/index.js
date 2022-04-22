const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')

const { engine } =  require('express-handlebars')
const path  = require('path')
const app = express()
const port = 3000

//Check when static files are being accessed
app.use(express.static(path.join(__dirname, 'public')))

//HTTP Logger
app.use(morgan('combined'))

//Template engine
app.engine('hbs', engine({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

//route
app.get('/', (req, res) => {
  res.render('home')
})
app.get('/news', (req, res) => {
  res.render('news')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
