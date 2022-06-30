import express from 'express';
const {Router} = express;
import fetch from 'node-fetch';
const router = Router();

const products = [];

// Esta ruta carga nuestro archivo index.html en la raíz de la misma
router.route('/')
    .get(async (req, res) => {
        const response = await fetch('http://localhost:8080/productos');
        const productos = await response.json();
        res.render('index.pug', {productos});
    })
    .post((req, res)=>{
        products.push(req.body);
        res.status(200).redirect('/');
    })


//Configuramos ruta para devolver todos los productos cuando se acceda a /productos
router.route('/productos')
    .get((req, res)=>{
        res.send(JSON.stringify(products));
    })
export default router;