import express from "express";
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to backend of online store</h1>`)
})

async function start() {
    try {
        app.listen(PORT, () => console.log(`Server has been started on PORT = ${PORT}`))
    } catch(e) {
        console.log(e);
    }
}

start();