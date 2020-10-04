const User = require('../models/User');
class UsersController {

  async index (req, res){

    const users = await User.findallUsers();
    return res.json(users);

  }
  async findUser(req,res){
    const { id } = req.params;
    const user = await User.findById(id);

    if(user.length > 0){

      return res.json(user);

    }else{

      return res.status(404).json({error: "id not found"});

    }
    
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

  async remove (req, res){
    const { id } = req.params;
    const result = await User.delete(id);
    if(result.status){
      return res.json({message: 'User delete success'});
    }else{
      return res.status(406).json({error:result.err});
    }
  }

}
module.exports = new UsersController();