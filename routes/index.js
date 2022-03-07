const route = require('express').Router();
const CasesController = require('../controllers/casescontroller')
const errorHandler = require('../middlewares/errorHandler')


route.get('/',CasesController.fetchCases)
route.get('/cases',CasesController.findAllCases)

route.use(errorHandler)
module.exports = route