var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const Model_Mahasiswa = require('../model/Model_Mahasiswa.js');

router.get('/', async function (req, res, next) {
    let rows = await Model_Mahasiswa.getAll();
    res.render('mahasiswa/index', {
        data: rows
    });
});

router.get('/create', function (req, res, next) {
    res.render('mahasiswa/create', {
        nrp: '',
        nama_depan: '',
        nama_belakang: '',
        jenis_kelamin: '',
        agama: '',
        umur: '',
        tinggi_badan: '',
        golongan_darah: '',
        alamat: '',
        hobi: '',
        email: '',
        no_telpon: '',
    })
})

router.post('/store', async function (req, res, next) {
    try {
        let { nrp } = req.body;
        let { nama_depan } = req.body;
        let { nama_belakang } = req.body;
        let { jenis_kelamin } = req.body;
        let { agama } = req.body;
        let { umur } = req.body;
        let { tinggi_badan } = req.body;
        let { golongan_darah } = req.body;
        let { alamat } = req.body;
        let { hobi } = req.body;
        let { email } = req.body;
        let { no_telpon } = req.body;
        let Data = {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            golongan_darah,
            alamat,
            hobi,
            email,
            no_telpon,
        }
        await Model_Mahasiswa.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/mahasiswa');
    } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/mahasiswa')
    }
})

router.get('/edit/(:id)', async function (req, res, next) {
    let id = req.params.id;
    let rows = await Model_Mahasiswa.getId(id);
    res.render('mahasiswa/edit', {
        id: rows[0].id_mahasiswa,
        nrp: rows[0].nrp,
        nama_depan: rows[0].nama_depan,
        nama_belakang: rows[0].nama_belakang,
        jenis_kelamin: rows[0].jenis_kelamin,
        agama: rows[0].agama,
        umur: rows[0].umur,
        tinggi_badan: rows[0].tinggi_badan,
        golongan_darah: rows[0].golongan_darah,
        alamat: rows[0].alamat,
        hobi: rows[0].hobi,
        email: rows[0].email,
        no_telpon: rows[0].no_telpon,

    })
})



router.post('/update/(:id)', async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, golongan_darah,
            alamat, hobi, email, no_telpon } = req.body;
        let Data = {
            nrp: nrp,
            nama_depan: nama_depan,
            nama_belakang: nama_belakang,
            jenis_kelamin: jenis_kelamin,
            agama: agama,
            umur: umur,
            tinggi_badan: tinggi_badan,
            golongan_darah: golongan_darah,
            alamat: alamat,
            hobi: hobi,
            email: email,
            no_telpon: no_telpon,
        }
        await Model_Mahasiswa.Update(id, Data);
        req.flash('success', 'Berhasil mengubah data');
        res.redirect('/mahasiswa')
    } catch {
        req.flash('error', 'terjadi kesalahan pada fungsi');
        res.redirect('/mahasiswa');
    }
})

router.get('/delete/(:id)', async function (req, res) {
    let id = req.params.id;
    await Model_Mahasiswa.Delete(id);
    req.flash('success', 'Berhasil menghapus data');
    res.redirect('/mahasiswa')
})

module.exports = router;