const express = require('express');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Selamat datang di API Perpustakaan Komik',
        status: 'Server berjalan dengan baik',
        endpoints: {
            getAllKomik: 'GET /komik',
            getKomikById: 'GET /komik/:id',
            createKomik: 'POST /komik',
            updateKomik: 'PUT /komik/:id',
            deleteKomik: 'DELETE /komik/:id'
        }
    });
});

// Handler untuk tambah komik baru (kompatibel dengan /komik dan /Komik)
const handleCreateKomik = async (req, res) => {
    const data = req.body;
    try {
        if (!data.title) {
            return res.status(400).json({ message: 'Judul komik (title) wajib diisi' });
        }
        const komik = await db.Komik.create(data);
        res.status(201).json(komik);
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
};

app.post('/komik', handleCreateKomik);
app.post('/Komik', handleCreateKomik);

// Ambil semua komik
app.get('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.json(komik);
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

// Ambil komik berdasarkan ID
app.get('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }
        res.json(komik);
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

// Update komik berdasarkan ID
app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }

        await komik.update(data);
        res.json({ message: 'Komik berhasil diupdate', komik });
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

// Hapus komik berdasarkan ID
app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }

        await komik.destroy();
        res.json({ message: 'Komik berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

// Sinkronisasi database dan jalankan server
db.sequelize.sync()
    .then(() => {
        console.log('Database berhasil disinkronkan.');
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Gagal menyinkronkan database:', err);
    });
