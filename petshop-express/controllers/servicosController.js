const servicos = ["Banho e Tosa", "Consultas" , "Vacinas"];

const ServicosController ={
    index: function(req , res){
        res.send(servicos);
    }
}
 module.exports = ServicosController;