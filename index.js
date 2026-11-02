const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

db.sequelize.sync()
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.post('/komik', async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.Komik.create(data);
        res.status(201).send(komik);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.send(komik);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik tidak ditemukan' });
        }
        res.send(komik);
    } catch (err) {
        res.status(500).send(err);
    }
});
