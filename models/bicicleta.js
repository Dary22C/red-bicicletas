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
// Nota: desde Mongoose 7/8, los métodos de consulta ya no aceptan callbacks,
// por eso estos métodos devuelven directamente la Promesa.
bicicletaSchema.statics.add = function (aBici) {
    return this.create(aBici);
};

bicicletaSchema.statics.allBicis = function () {
    return this.find({});
};

bicicletaSchema.statics.findByCode = function (aCode) {
    return this.findOne({ code: aCode });
};

bicicletaSchema.statics.removeByCode = function (aCode) {
    return this.deleteOne({ code: aCode });
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);
