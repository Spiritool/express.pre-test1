const express = require('express');
const router = express.Router();
var connection = require('../config/database.js');
const Model_pendidikan = require('../model/Model_Pendidikan');
const Model_mahasiswa = require('../model/Model_Mahasiswa.js');


router.get('/', async function (req, res, next) {
    let rows = await Model_pendidikan.getAll();
    res.render('pendidikan/index', {
        data: rows
    })
})

router.get('/create', async function(req, res, next) {
    try {
        
        let rows = await Model_mahasiswa.getAll(); 
        res.render('pendidikan/create', { 
            nama_instansi:'',
            jurusan:'',
            tahun_masuk:'',
            tahun_lulus:'',
            nomor_ijazah:'',
            id_mahasiswa:'',
            data : rows
        });
    } catch (error) {
        
        next(error);
    }
});

router.post('/store', async function(req, res, next) {
    try {
        let data = {
            nama_instansi: req.body.nama_instansi,
            jurusan: req.body.jurusan,
            tahun_masuk: req.body.tahun_masuk,
            tahun_lulus: req.body.tahun_lulus, 
            nomor_ijazah: req.body.nomor_ijazah, 
            id_mahasiswa: req.body.id_mahasiswa
        }
        await Model_pendidikan.Store(data);
        req.flash('success', 'Pendidikan created successfully');
        res.redirect('/pendidikan');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to create Pendidikan');
        res.redirect('/pendidikan');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let dataMahasiswa = await Model_mahasiswa.getAll();
        const id = req.params.id;
        const pendidikan = await Model_pendidikan.getId(id);
        if (!pendidikan || pendidikan.length === 0) {
            return res.status(404).send('Data pendidikan tidak ditemukan');
        }
        res.render('pendidikan/edit', {
            id: id,
            nama_instansi: pendidikan[0].nama_instansi,
            jurusan: pendidikan[0].jurusan,
            tahun_masuk: pendidikan[0].tahun_masuk,
            tahun_lulus: pendidikan[0].tahun_lulus,
            nomor_ijazah: pendidikan[0].nomor_ijazah,
            id_mahasiswa: pendidikan[0].id_mahasiswa,
            data: dataMahasiswa 
        });
    } catch (error) {
        console.error(error);
        next(error); 
    }
});



router.post('/update/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        let data = {
            nama_instansi: req.body.nama_instansi,
            jurusan: req.body.jurusan,
            tahun_masuk: req.body.tahun_masuk,
            tahun_lulus: req.body.tahun_lulus, 
            nomor_ijazah: req.body.nomor_ijazah, 
            id_mahasiswa: req.body.id_mahasiswa
        }
        await Model_pendidikan.Update(id, data);
        req.flash('success', 'Pendidikan updated successfully');
        res.redirect('/pendidikan');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to update Pendidikan');
        res.redirect('/pendidikan');
    }
});

router.get('/delete/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        await Model_pendidikan.Delete(id);
        req.flash('success', 'Pendidikan deleted successfully');
        res.redirect('/pendidikan');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to delete Pendidikan');
        res.redirect('/pendidikan');
    }
});

module.exports = router;