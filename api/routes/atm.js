const {Router} = require('express');
const { atmGet,atmPost, atmPut, atmDelete, atmGetId } = require('../controllers/atm');
const { check } = require('express-validator');
const router = Router();


router.get("/",atmGet)
router.get("/id",atmGetId)
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('value','Value is required').not().isEmpty(),
    check('date','Date is required').not().isEmpty(),
    check('userUid','id invalid').isUUID(4),
    check('type','Type is required').isIn(['add','substract'])
],atmPost)
 router.put('/',[
    check('name','Name is required').not().isEmpty(),
    check('value','Value is required').not().isEmpty(),
],atmPut)
router.delete('/',atmDelete)
module.exports = router;
     