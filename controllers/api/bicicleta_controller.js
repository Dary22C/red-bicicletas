var Bicicleta = require('../../models/bicicleta');

// GET /api/bicicletas
exports.bicicleta_list = async function (req, res) {
    try {
        var bicis = await Bicicleta.allBicis();
        res.status(200).json({ bicicletas: bicis });
    } catch (err) {
        res.status(500).send(err);
    }
};

// POST /api/bicicletas/create
exports.bicicleta_create = async function (req, res) {
    try {
        var bici = {
            code: req.body.code,
            color: req.body.color,
            modelo: req.body.modelo,
            ubicacion: [req.body.lat, req.body.lng]
        };

        var newBici = await Bicicleta.add(bici);
        res.status(201).json({ bicicleta: newBici });
    } catch (err) {
        res.status(500).send(err);
    }
};

// GET /api/bicicletas/:code
exports.bicicleta_get_by_code = async function (req, res) {
    try {
        var bici = await Bicicleta.findByCode(req.params.code);
        if (!bici) return res.status(404).json({ msg: 'No existe bicicleta con ese code' });
        res.status(200).json({ bicicleta: bici });
    } catch (err) {
        res.status(500).send(err);
    }
};

// PUT /api/bicicletas/update/:code
exports.bicicleta_update = async function (req, res) {
    try {
        var bici = await Bicicleta.findByCode(req.params.code);
        if (!bici) return res.status(404).json({ msg: 'No existe bicicleta con ese code' });

        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.lat, req.body.lng];

        await bici.save();
        res.status(200).json({ bicicleta: bici });
    } catch (err) {
        res.status(500).send(err);
    }
};

// DELETE /api/bicicletas/delete/:code
exports.bicicleta_delete = async function (req, res) {
    try {
        await Bicicleta.removeByCode(req.params.code);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
};
