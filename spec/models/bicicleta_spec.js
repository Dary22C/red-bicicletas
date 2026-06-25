var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function () {

    beforeEach(async function () {
        console.log('testeando...');
        await mongoose.connect('mongodb://localhost/red_bicicletas_test');
    });

    afterEach(async function () {
        await Bicicleta.deleteMany({});
        await mongoose.disconnect();
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
        it('comienza vacía la colección', async function () {
            var bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);
        });
    });

    describe('Bicicleta.add', function () {
        it('agrega una nueva bicicleta y la persiste en la base', async function () {
            var aBici = {
                code: 1,
                color: 'verde',
                modelo: 'urbana',
                ubicacion: [-34.6, -58.4]
            };

            await Bicicleta.add(aBici);

            var bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(1);
            expect(bicis[0].code).toBe(aBici.code);
            expect(bicis[0].color).toBe(aBici.color);
        });
    });

    describe('Bicicleta.findByCode', function () {
        it('encuentra una bicicleta por code', async function () {
            await Bicicleta.add({ code: 2, color: 'azul', modelo: 'montaña', ubicacion: [-1, -1] });
            await Bicicleta.add({ code: 3, color: 'negra', modelo: 'urbana', ubicacion: [-2, -2] });

            var targetBici = await Bicicleta.findByCode(3);
            expect(targetBici.code).toBe(3);
            expect(targetBici.color).toBe('negra');
        });
    });

    describe('Bicicleta.removeByCode', function () {
        it('elimina una bicicleta por code', async function () {
            await Bicicleta.add({ code: 4, color: 'gris', modelo: 'urbana', ubicacion: [0, 0] });

            var bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(1);

            await Bicicleta.removeByCode(4);

            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);
        });
    });

});
