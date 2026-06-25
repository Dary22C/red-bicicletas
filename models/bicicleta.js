var mongoose = require('mongoose');

var bicicletaSchema = new mongoose.Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], // [latitud, longitud]
        index: {
            type: '2dsphere',
            sparse: true
        }
    }
});

// ----- Método de instancia -----
// Se define en la propiedad "methods" -> responde una instancia del modelo
bicicletaSchema.methods.toString = function () {
    return 'code: ' + this.code + ' | color: ' + this.color;
};

// ----- Métodos de clase (estáticos) -----
// Se definen en la propiedad "statics" -> responden el modelo/clase directamente
bicicletaSchema.statics.add = function (aBici, cb) {
    return this.create(aBici, cb);
};

bicicletaSchema.statics.allBicis = function (cb) {
    return this.find({}, cb);
};

bicicletaSchema.statics.findByCode = function (aCode, cb) {
    return this.findOne({ code: aCode }, cb);
};

bicicletaSchema.statics.removeByCode = function (aCode, cb) {
    return this.deleteOne({ code: aCode }, cb);
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);
