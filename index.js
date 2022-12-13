const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const user_routes = require('./routes/userRoute');
const port = process.env.PORT || 2000;
require('./db')

app.use(express.static('views'));
app.set('view engine', 'ejs');





// user routes
app.use('/api', user_routes);

app.get('/', (req, res) => {
    res.render('pages/index')
})



app.listen(port, ()=>console.log(`Server is running on port ${port}`));