const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
})

router.post('/add', isLoggedIn, async (req, res) => {
    const { descripcion, horaEntrega } = req.body;
    const newOrder = {
        descripcion,
        horaEntrega,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO orders set?', [newOrder]);
    req.flash('success', 'Se creó la orden con éxito');
    res.redirect('/links');
})

router.get('/', isLoggedIn, async (req, res) => {
    const orders = await pool.query('SELECT id, descripcion, DATE_FORMAT(fechaPedido, \'\%d/%m/%Y %H:%i:%s\'\) AS fechaPedido, horaEntrega FROM orders WHERE user_id = ?', req.user.id);
    res.render('links/list', { orders: orders })
})

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM orders WHERE id=?', [id]);
    req.flash('success', 'Se eliminó la orden con éxito');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const order = await pool.query('SELECT * FROM orders WHERE id=?', [id]);
    res.render('links/edit', { order: order[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { descripcion, horaEntrega } = req.body;
    const newOrder = {
        descripcion,
        horaEntrega
    };

    await pool.query('UPDATE orders set ? WHERE id = ?', [newOrder, id]);
    req.flash('success', 'Se editó la orden con éxito');
    res.redirect('/links');


});

module.exports = router;