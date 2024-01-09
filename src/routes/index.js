const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index')
})
//RUTAS PARA LOS MENUS
router.get('/menu', (req, res) => {
    res.render('menus/menu');
});

router.get('/galeria', (req, res) => {
    res.render('menus/galeria');
});

router.get('/mapa', (req, res) => {
    res.render('menus/mapa');
});

router.get('/contacto', (req, res) => {
    res.render('menus/contacto');
});

router.get('/nosotros', (req, res) => {
    res.render('menus/nosotros');
});

module.exports = router;