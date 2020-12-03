const express = require(`express`);
const connectDB = require('./config/db');
const app = express();
const connectDb = require('./config/db')
//Connection to DB
connectDB();
//Init middle ware 
app.use(express.json({ extended: false }))
const PORT = process.env.PORT || 5000
//Defining routes
app.use(`/api/post`, require("./routes/apis/posts"));
app.use(`/api/user`, require("./routes/apis/users"));
app.use(`/api/auth`, require("./routes/apis/auth"));
app.use(`/api/profile`, require("./routes/apis/profiles"));

app.get(`/`, (req, res) => { res.send(`API running`) })
app.listen(PORT, () => console.log(`server listening on ${PORT}`))
