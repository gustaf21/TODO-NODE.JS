const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser =  require('body-parser');

const app = express();
const port = 1700;

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'gustaf',
    password: '0000',
    database: 'MY_TODO'
});
koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambung");
});

app.get('/', (req, res) => {
    koneksi.query('SELECT * FROM aktivitas', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs', {
            judulhalaman: 'MY-TODO',
            data: hasil
        });
    });
});

app.post('/aktivitas', (req, res) =>{
    var detailkegiatan = req.body.inputdetailkegiatan;
    var Tanggal = req.body.inputTanggal;
    koneksi.query('INSERT INTO aktivitas(detail_kegiatan, Tanggal) values(?,?)',
    [detailkegiatan,Tanggal],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});    

app.listen(port ,() => {
    console.log(`app berjalan pada port ${port}`);
}); 