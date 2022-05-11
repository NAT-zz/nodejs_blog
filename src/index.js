const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

const { engine } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const db = require('./config/db');
const route = require('./routes/index');

//connect to db
db.connect();

//Check when static files are being accessed
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
); // xử lý data truyền lên bằng form (hiện ra data thay vì undefined)
app.use(express.json()); // xử lý dạng data gửi từ code js gửi lên

//HTTP Logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(methodOverride('_method'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
