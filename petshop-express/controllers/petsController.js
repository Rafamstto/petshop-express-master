
const listaPets =["Gato","Cachorro","Papagaio","Hamster", "Chinchila"];


const PetsController ={
    index: function(req , res){
        res.send(listaPets);
    }

}

 module.exports = PetsController;