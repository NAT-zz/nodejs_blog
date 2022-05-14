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

const sortMiddleware = require('./app/middleware/Sort.middleware')

//connect to db
db.connect();


//app.use : bao gồm tất cả request
//Check when static files are being accessed
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
); 

// xử lý data truyền lên bằng form (hiện ra data thay vì undefined)
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
            sortable: (field, sort) => {
                const sortType = field == sort.column ? sort.type : 'default'

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending'
                }
                const icon = icons[sortType]

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const type = types[sortType]

                return `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>`
            }
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(methodOverride('_method'));
app.use(sortMiddleware)

// Routes init
route(app);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
