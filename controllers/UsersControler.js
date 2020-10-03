const User = require('../models/User');
class UsersController {

  async index (req, res){

    res.send("Criação de usuarios");

  }

  async create(req,res) {
    const {email, name, password, role} = req.body;

    if(email == undefined){

     return res.status(400).json({Err: 'email Invalido'});

    }
     const emailValidete = await User.findEmail(email);
     if(emailValidete){

        res.status(406).json({erro: 'email já cadastrado'});
        return;

     }

    await User.new(email, name, password, role);
    res.send('Cadastro feito sucesso 👌');
     
  }

}
module.exports = new UsersController();