var express = require('express');
var router = express.Router();
var bicicletaController = require('../../controllers/api/bicicleta_controller');

router.get('/', bicicletaController.bicicleta_list);
router.post('/create', bicicletaController.bicicleta_create);
router.get('/:code', bicicletaController.bicicleta_get_by_code);
router.put('/update/:code', bicicletaController.bicicleta_update);
router.delete('/delete/:code', bicicletaController.bicicleta_delete);

module.exports = router;
