require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 5000 || Process.env.PORT;

//templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.send("hello world");
});

app.listen(PORT, ()=>{

})