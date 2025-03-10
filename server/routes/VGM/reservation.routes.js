const express = require("express");
const router = express.Router();

const reservationController = require("../../controllers/VGM/reservation.controller");

router.post("/", reservationController.createReservation);
router.get("/", reservationController.getAllReservations);
router.get("/:id", reservationController.getReservationById);
router.put("/:id", reservationController.updateReservation);
router.delete("/:id", reservationController.deleteReservation);
module.exports = router;
