class HomeController{

    async index(req, res){
        res.send("RODANDO");
    }

}

module.exports = new HomeController();