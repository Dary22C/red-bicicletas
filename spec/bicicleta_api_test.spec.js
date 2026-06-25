var request = require('supertest');
var mongoose = require('mongoose');
var app = require('../app');
var Bicicleta = require('../models/bicicleta');

describe('Bicicleta API', function () {

    beforeEach(async function () {
        await mongoose.connect('mongodb://localhost/red_bicicletas_test');
        await Bicicleta.deleteMany({});
    });

    afterEach(async function () {
        await Bicicleta.deleteMany({});
        await mongoose.disconnect();
    });

    describe('GET /api/bicicletas', function () {
        it('status 200, devuelve un arreglo vacío al inicio', async function () {
            var res = await request(app).get('/api/bicicletas');
            expect(res.status).toBe(200);
            expect(res.body.bicicletas.length).toBe(0);
        });
    });

    describe('POST /api/bicicletas/create', function () {
        it('status 201, crea una nueva bicicleta', async function () {
            var nuevaBici = { code: 10, color: 'rojo', modelo: 'urbana', lat: -34.6, lng: -58.4 };

            var res = await request(app).post('/api/bicicletas/create').send(nuevaBici);

            expect(res.status).toBe(201);
            expect(res.body.bicicleta.code).toBe(10);
            expect(res.body.bicicleta.color).toBe('rojo');

            var bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(1);
        });
    });

    describe('GET /api/bicicletas/:code', function () {
        it('status 200, devuelve la bicicleta buscada por code', async function () {
            await Bicicleta.add({ code: 20, color: 'verde', modelo: 'montaña', ubicacion: [1, 1] });

            var res = await request(app).get('/api/bicicletas/20');

            expect(res.status).toBe(200);
            expect(res.body.bicicleta.code).toBe(20);
        });

        it('status 404, si la bicicleta no existe', async function () {
            var res = await request(app).get('/api/bicicletas/999');
            expect(res.status).toBe(404);
        });
    });

    describe('PUT /api/bicicletas/update/:code', function () {
        it('status 200, actualiza una bicicleta existente', async function () {
            await Bicicleta.add({ code: 30, color: 'azul', modelo: 'urbana', ubicacion: [2, 2] });

            var res = await request(app)
                .put('/api/bicicletas/update/30')
                .send({ color: 'negro', modelo: 'montaña', lat: 5, lng: 5 });

            expect(res.status).toBe(200);
            expect(res.body.bicicleta.color).toBe('negro');
            expect(res.body.bicicleta.modelo).toBe('montaña');
        });
    });

    describe('DELETE /api/bicicletas/delete/:code', function () {
        it('status 204, elimina una bicicleta existente', async function () {
            await Bicicleta.add({ code: 40, color: 'blanco', modelo: 'urbana', ubicacion: [3, 3] });

            var res = await request(app).delete('/api/bicicletas/delete/40');
            expect(res.status).toBe(204);

            var bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);
        });
    });

});
