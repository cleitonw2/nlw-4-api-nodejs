import express from 'express';

const app = express();

app.get('/users:id', (req, res) => {
    const { id } = req.params;
    res.json({ msg: `esse é um id de mumero ${id}` })
});

app.post('/', (req, res) => {


    res.json({ msg: 'ola seja bem vindo a nlw' })
});

const port = 3000
app.listen(port, () => {
    console.log(`server running on the port ${port}`)
})