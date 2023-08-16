const Etudiant = require('../models/etudiants.model');
const user = require('../models/user.model');
const Events = require('../models/event.model')
const jwt = require('jsonwebtoken');
bcrypt = require('bcryptjs')


const create = async (req,res)=>{
    try {
        await Etudiant.create(req.body);
        res.status(200).json({message:"user added with success"});
    } catch (error) {
        res.status(400).json('Error:' + error)
    }

}

const findAll = async (req,res)=>{
    try {
        const data = await Etudiant.find({"status": false}).sort({"nom":1});
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
    }    
}

const findInscrit = async (req,res)=>{
    try {
        const data = await Etudiant.find({"status": true}).sort({"nom":1});
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
    }    
}

const findInscritByFormation = async (req,res)=>{
    const formation = req.body.formation;
    try {
        const data = await Etudiant.find({"status": true,"formation":formation}).sort({"nom":1});
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
    }    
}

const  deleteEtudiant = async (req,res)=>{
    try {
        const data = await Etudiant.deleteOne({_id: req.params.id})
        res.status(200).json({message:"Etudiant deleted"})
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
    }   
}

const  updateEtudiant = async (req,res)=>{
    try {
        const data = await Etudiant.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new : true}
        )
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
        
    }   
}

const  accepteEtudiant = async (req,res)=>{
    try {
        const data = await Etudiant.findOneAndUpdate(
            {_id: req.params.id},
            {"status" : true}
        )
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
        
    }   
}

const  countInscrit = async (req,res)=>{
    try {
        const data = await Etudiant.find({"status":true}).count()
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
        
    }   
}

const  countNonInscrit = async (req,res)=>{
    try {
        const data = await Etudiant.find({"status":false}).count()
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
        
    }   
}

const  countDevOps = async (req,res)=>{
    try {
        const data = await Etudiant.find({"status":true,"formation":"DevOps"}).count()
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
        
    }   
}

const  countCyber = async (req,res)=>{
    try {
        const data = await Etudiant.find({"status":true,"formation":"Cyber-Security"}).count()
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
        
    }   
}

const  countML = async (req,res)=>{
    try {
        const data = await Etudiant.find({"status":true,"formation":"Machine learning"}).count()
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
        
    }   
}

const  countAdmin = async (req,res)=>{
    try {
        const data = await Etudiant.find({"status":true,"formation":"Admin Linux"}).count()
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
        
    }   
}

const  countNiveau = async (req,res)=>{
    try {
        const data = await Etudiant.aggregate([       
            {$match:{status:true}},
           {$group: {_id:{formation:"$formation",niveau:"$niveau"},total:{$sum:1}}},        
        ])
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
        
    }   
}

const  counttotalniveau = async (req,res)=>{
    try {
        const data = await Etudiant.aggregate([       
            {$match:{status:true}},
           {$group: {_id:"$niveau",total:{$sum:1}}},        
        ])
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
        
    }   
}

const  frequence = async (req,res)=>{
    try {
        const data = await Etudiant.aggregate([       
            
           {$group: {_id:"$createdAt",total:{$sum:1}}},
           {$sort:{_id:1}},
                
        ])
        res.status(200).json(data);
        
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
        
    }   
}

const signup = function(req,res,next) {
    bcrypt.hash(req.body.password, 10)
        .then(hash=>{
            const newuser = new user({
                username: req.body.username,
                password: hash
            });
            // res.send(newuser)        
            newuser.save()
            .then(()=>res.status(201).json({message: 'Utilisateur crée!'}))
            .catch(error=>res.status(400).json({error}))
           
        })
        .catch(error=>res.status(500).json({error}));
        
   
}


const login = function(req,res,next)
{
    user.findOne({username: req.body.username})
        .then(user=>{
            if(!user){
                return res.status(400).json({error:'Utilisateur non trouver!'});
            }
            bcrypt.compare(req.body.password,user.password)
                .then(valid =>{
                    if (!valid){
                        return res.status(401).json({error: "Mot de passe incorrect!"})
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn:'24h'}
                        )
                    });
                })
                .catch(error=>res.status(500).json({error}));
        })
        .catch(error=>res.status(500).json({error}));
}

const createEvent = async (req,res)=>{
    try {
        await Events.create(req.body);
        res.status(200).json({message:"event added with success"});
    } catch (error) {
        res.status(400).json('Error:' + error)
    }

}

const findEvent = async (req,res)=>{
    try {
        const data = await Events.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
    }    
}

const  deleteEvent = async (req,res)=>{
    try {
        const data = await Events.deleteOne({_id: req.params.id})
        res.status(200).json({message:"Event deleted"})
    } catch (error) {
        res.status(400).json('Error:' + error)
        console.log(error.message);
    }   
}

module.exports = {
    create,
    findAll,
    deleteEtudiant,
    updateEtudiant,
    accepteEtudiant,
    findInscrit,
    countInscrit,
    findInscritByFormation,
    countNonInscrit,
    countAdmin,
    countCyber,
    countDevOps,
    countML,
    countNiveau,
    counttotalniveau,
    frequence,
    login,
    signup,
    createEvent,
    findEvent,
    deleteEvent,
}

