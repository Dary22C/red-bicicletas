var Bicicleta = require('../../models/bicicleta');

// GET /api/bicicletas
exports.bicicleta_list = function (req, res) {
    Bicicleta.allBicis(function (err, bicis) {
        if (err) return res.status(500).send(err);
        res.status(200).json({ bicicletas: bicis });
    });
};

// POST /api/bicicletas/create
exports.bicicleta_create = function (req, res) {
    var bici = {
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    };

    Bicicleta.add(bici, function (err, newBici) {
        if (err) return res.status(500).send(err);
        res.status(201).json({ bicicleta: newBici });
    });
};

// GET /api/bicicletas/:code
exports.bicicleta_get_by_code = function (req, res) {
    Bicicleta.findByCode(req.params.code, function (err, bici) {
        if (err) return res.status(500).send(err);
        if (!bici) return res.status(404).json({ msg: 'No existe bicicleta con ese code' });
        res.status(200).json({ bicicleta: bici });
    });
};

// PUT /api/bicicletas/update/:code
exports.bicicleta_update = function (req, res) {
    Bicicleta.findByCode(req.params.code, function (err, bici) {
        if (err) return res.status(500).send(err);
        if (!bici) return res.status(404).json({ msg: 'No existe bicicleta con ese code' });

        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.lat, req.body.lng];

        bici.save(function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).json({ bicicleta: bici });
        });
    });
};

// DELETE /api/bicicletas/delete/:code
exports.bicicleta_delete = function (req, res) {
    Bicicleta.removeByCode(req.params.code, function (err) {
        if (err) return res.status(500).send(err);
        res.status(204).send();
    });
};
