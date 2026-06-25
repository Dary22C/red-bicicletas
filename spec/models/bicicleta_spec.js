var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function () {

    beforeEach(function (done) {
        console.log('testeando...');
        mongoose.connect('mongodb://localhost/red_bicicletas_test', { useNewUrlParser: true });
        mongoose.connection.once('open', function () {
            done();
        });
    });

    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err) {
            mongoose.disconnect();
            done();
        });
    });

    describe('Bicicleta.createInstance', function () {
        it('crea una instancia de Bicicleta', function () {
            var bici = new Bicicleta({
                code: 1,
                color: 'rojo',
                modelo: 'urbana',
                ubicacion: [-34.6, -58.4]
            });

            expect(bici.code).toBe(1);
            expect(bici.color).toBe('rojo');
            expect(bici.modelo).toBe('urbana');
            expect(bici.ubicacion[0]).toBe(-34.6);
            expect(bici.ubicacion[1]).toBe(-58.4);
        });
    });

    describe('Bicicleta.allBicis', function () {
        it('comienza vacía la colección', function (done) {
            Bicicleta.allBicis(function (err, bicis) {
                expect(err).toBeNull();
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', function () {
        it('agrega una nueva bicicleta y la persiste en la base', function (done) {
            var aBici = {
                code: 1,
                color: 'verde',
                modelo: 'urbana',
                ubicacion: [-34.6, -58.4]
            };

            Bicicleta.add(aBici, function (err, newBici) {
                expect(err).toBeNull();

                Bicicleta.allBicis(function (err, bicis) {
                    expect(bicis.length).toBe(1);
                    expect(bicis[0].code).toBe(aBici.code);
                    expect(bicis[0].color).toBe(aBici.color);
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', function () {
        it('encuentra una bicicleta por code', function (done) {
            Bicicleta.add({ code: 2, color: 'azul', modelo: 'montaña', ubicacion: [-1, -1] }, function (err) {
                Bicicleta.add({ code: 3, color: 'negra', modelo: 'urbana', ubicacion: [-2, -2] }, function (err) {
                    Bicicleta.findByCode(3, function (err, targetBici) {
                        expect(err).toBeNull();
                        expect(targetBici.code).toBe(3);
                        expect(targetBici.color).toBe('negra');
                        done();
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', function () {
        it('elimina una bicicleta por code', function (done) {
            Bicicleta.add({ code: 4, color: 'gris', modelo: 'urbana', ubicacion: [0, 0] }, function (err) {
                Bicicleta.allBicis(function (err, bicis) {
                    expect(bicis.length).toBe(1);

                    Bicicleta.removeByCode(4, function (err) {
                        expect(err).toBeNull();

                        Bicicleta.allBicis(function (err, bicis) {
                            expect(bicis.length).toBe(0);
                            done();
                        });
                    });
                });
            });
        });
    });

});
