var request = require('supertest');
var mongoose = require('mongoose');
var app = require('../app');
var Bicicleta = require('../models/bicicleta');

describe('Bicicleta API', function () {

    beforeEach(function (done) {
        mongoose.connect('mongodb://localhost/red_bicicletas_test', { useNewUrlParser: true });
        mongoose.connection.once('open', function () {
            Bicicleta.deleteMany({}, function () {
                done();
            });
        });
    });

    afterEach(function (done) {
        Bicicleta.deleteMany({}, function () {
            mongoose.disconnect();
            done();
        });
    });

    describe('GET /api/bicicletas', function () {
        it('status 200, devuelve un arreglo vacío al inicio', function (done) {
            request(app)
                .get('/api/bicicletas')
                .end(function (err, res) {
                    expect(res.status).toBe(200);
                    expect(res.body.bicicletas.length).toBe(0);
                    done();
                });
        });
    });

    describe('POST /api/bicicletas/create', function () {
        it('status 201, crea una nueva bicicleta', function (done) {
            var nuevaBici = { code: 10, color: 'rojo', modelo: 'urbana', lat: -34.6, lng: -58.4 };

            request(app)
                .post('/api/bicicletas/create')
                .send(nuevaBici)
                .end(function (err, res) {
                    expect(res.status).toBe(201);
                    expect(res.body.bicicleta.code).toBe(10);
                    expect(res.body.bicicleta.color).toBe('rojo');

                    Bicicleta.allBicis(function (err, bicis) {
                        expect(bicis.length).toBe(1);
                        done();
                    });
                });
        });
    });

    describe('GET /api/bicicletas/:code', function () {
        it('status 200, devuelve la bicicleta buscada por code', function (done) {
            Bicicleta.add({ code: 20, color: 'verde', modelo: 'montaña', ubicacion: [1, 1] }, function () {
                request(app)
                    .get('/api/bicicletas/20')
                    .end(function (err, res) {
                        expect(res.status).toBe(200);
                        expect(res.body.bicicleta.code).toBe(20);
                        done();
                    });
            });
        });

        it('status 404, si la bicicleta no existe', function (done) {
            request(app)
                .get('/api/bicicletas/999')
                .end(function (err, res) {
                    expect(res.status).toBe(404);
                    done();
                });
        });
    });

    describe('PUT /api/bicicletas/update/:code', function () {
        it('status 200, actualiza una bicicleta existente', function (done) {
            Bicicleta.add({ code: 30, color: 'azul', modelo: 'urbana', ubicacion: [2, 2] }, function () {
                request(app)
                    .put('/api/bicicletas/update/30')
                    .send({ color: 'negro', modelo: 'montaña', lat: 5, lng: 5 })
                    .end(function (err, res) {
                        expect(res.status).toBe(200);
                        expect(res.body.bicicleta.color).toBe('negro');
                        expect(res.body.bicicleta.modelo).toBe('montaña');
                        done();
                    });
            });
        });
    });

    describe('DELETE /api/bicicletas/delete/:code', function () {
        it('status 204, elimina una bicicleta existente', function (done) {
            Bicicleta.add({ code: 40, color: 'blanco', modelo: 'urbana', ubicacion: [3, 3] }, function () {
                request(app)
                    .delete('/api/bicicletas/delete/40')
                    .end(function (err, res) {
                        expect(res.status).toBe(204);

                        Bicicleta.allBicis(function (err, bicis) {
                            expect(bicis.length).toBe(0);
                            done();
                        });
                    });
            });
        });
    });

});
