const express = require('express');
const router = express.Router();
const {create,findAll,deleteEtudiant,updateEtudiant, accepteEtudiant,findInscrit,countInscrit,
    findInscritByFormation,countNonInscrit, countDevOps, countML, countAdmin, countCyber, 
    countNiveau, counttotalniveau, frequence, login,signup,
    createEvent,findEvent,deleteEvent} = require('../controlleurs/etudiants.controlleurs')

router.post("/", create);

router.get("/", findAll);

router.get("/nombreInscrit", countInscrit);

router.get("/nombreNonInscrit", countNonInscrit);

router.get("/nombreDevOps", countDevOps);

router.get("/nombreML", countML);

router.get("/counttotalniveau", counttotalniveau);

router.get("/nombreAdmin", countAdmin);

router.get("/nombreCyber", countCyber);

router.get("/inscrit", findInscrit);

router.delete("/:id", deleteEtudiant);

router.put("/inscrit/:id", updateEtudiant);

router.put("/:id", accepteEtudiant);

router.get("/countNiveau", countNiveau);

router.post("/inscrit/formation", findInscritByFormation);

router.post("/login", login);

router.post("/signup", signup);

router.get("/frequence", frequence);

router.post("/createEvent", createEvent);

router.get("/findEvent", findEvent)

router.delete("/deleteEvent/:id", deleteEvent)

module.exports = router;