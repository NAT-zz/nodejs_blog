const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

const { engine } =  require('express-handlebars');
const path  = require('path');
const app = express();
const port = 3000

const route = require('./routes');

//Check when static files are being accessed
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use(express.urlencoded({
  extended: true
})); // xử lý data truyền lên bằng form (hiện ra data thay vì undefined)
app.use(express.json()) ;  // xử lý dạng data gửi từ code js gửi lên 

//HTTP Logger
app.use(morgan('combined'));

//Template engine
app.engine('hbs', engine({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


// Routes init
route(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
