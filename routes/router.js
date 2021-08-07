const express = require('express');
const router = new express.Router();
const auth = require('../Controllers/Auth')
const user = require('../Controllers/User')
const cars = require('../Controllers/Cars')
const clients = require('../Controllers/Clients')
const deals = require('../Controllers/Deal')
const payments = require('../Controllers/Payments')
const stats = require('../Controllers/Stats')

router.post('/login', user.getUser);
router.get('/user/:id', user.getUserProc);
router.get('/kurs', user.getCourse);
router.get('/cars', auth, cars.getCars);
router.get('/cars_models', cars.carModels);
router.post('/add_car', auth, cars.addCar);
router.put('/car', auth, cars.updateCar);
router.delete('/car/:id', cars.deleteCar);

router.get('/clients', auth, clients.getClients);
router.post('/add_client', auth, clients.addClient);
router.put('/client', auth, clients.updateClient);
router.delete('/client/:id', clients.deleteClient);
router.get('/clientDeals/:id', clients.clientDeals);
router.get('/deals', auth, deals.getDeals);
router.get('/oneDeal/:id', deals.getOneDeal);
router.get('/oneDealTest/:id', deals.getOneDealTest);
router.post('/add_deal', auth, deals.addDeal);
router.put('/deal', auth, deals.updateDeal);
router.delete('/deal/:id', deals.deleteDeal);
router.get('/deal/olish', auth, deals.getOlishList);
router.get('/deal/sotish', auth, deals.getSotishList);
router.get('/payment/:id', payments.getUserSdelkaPayments);
router.post('/payment/add_payment', auth, payments.addPayment);
router.get('/stats', auth, stats.getStats);

module.exports = router;