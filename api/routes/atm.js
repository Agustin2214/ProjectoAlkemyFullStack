const {Router} = require('express');
const { atmGet,atmPost, atmPut, atmDelete, atmGetId } = require('../controllers/atm');
const { check } = require('express-validator');
const router = Router();


router.get("/",atmGet)
router.get("/id",atmGetId)
router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('value','El value es obligatorio').not().isEmpty(),
    check('date','El date es obligatorio').not().isEmpty(),
    check('userUid','ingrese un id correcto').isUUID(4),
    check('type','ingrese un type correcto').isIn(['add','substract'])
],atmPost)
 router.put('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('value','El value es obligatorio').not().isEmpty(),
],atmPut)
router.delete('/',atmDelete)
module.exports = router;
     