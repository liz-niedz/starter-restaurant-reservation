/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
   .route("/:reservationId/status")
   .put(controller.updateStatus)

router
   .route("/:reservationId")
   .get(controller.read)
   .put(controller.update)
   .all(methodNotAllowed); 


router
   .route("/")
   .post(controller.create)
   .get(controller.list)
   .all(methodNotAllowed);
 
 



module.exports = router;
