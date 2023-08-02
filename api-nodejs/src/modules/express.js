const express = require('express');
const userRouter = require('../routes/user.router');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

let router_list = [
    '/user',
]

app.use( (req, res, next) => {
    console.log(`Request Type: ${req.method}`);
    console.log(`Requested Path: ${req.originalUrl}`);
    console.log(`Date: ${new Date()}`);
    next();
})

app.get('/', (req, res) => {
    res.contentType('.txt').status(200).send('Servidor Online');
})

app.get("/getData", (req, res) => {
    res.redirect('/user/');
})

function printUrls(router = app._router, path) {
    let index = 0;
    router.stack.forEach(el => {
        if (el.route) {
            console.log(`- http://localhost:${port}${path?path:''}${el.route.path}`);
        }
        if (el.name === 'router') {
            printUrls(el.handle, router_list[index]);
            index++;
        }   
    });
}
router_list.forEach((el) => {
    app.use(el, userRouter);
})

app.listen(port, () => {
    console.log(`Rodando app na porta ${port}\nLinks mapeados:`);
    printUrls();
})