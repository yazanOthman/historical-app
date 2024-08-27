const router = require("express").Router();
const {
  getPlaces,
  getPlace,
  getRandomPlaces,
  updatePlaceVisit,
} = require("../controllers/places");

router.get("/places", getPlaces);
router.get("/places/:id", getPlace);
router.get("/random-places", getRandomPlaces);
router.patch("/places/:id", updatePlaceVisit);

module.exports = router;
