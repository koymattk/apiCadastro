const knex = require('../database/connection');
const bcrytp = require('bcrypt');
class User {

  async new(email, name, password, role){
    try{

      const hash = await bcrytp.hash(password, 10);
      await knex.insert({email, name, password:hash, role}).table('users');

    }catch(err){

      console.log(err);

    }  
  }

  async findallUsers(){

    try{

      const results = await knex.select(['id','name','email','role']).table('users');
      return results;

    }catch(err){

      console.log(err);
      return;

    }
    

  }
  
  async findById(id){
    try{

     const results = await knex.select(['id','name','email','role']).where({id:id}).table('users');
     return results

    }catch(err){

      console.log(err)
      return;

    }
  }

  async findEmail(email){
    try{
      
      const result = await knex.select('*').from('users').where({email:email});

      if(result.length > 0){
        
        return true;

      }
        
      return false;
      
    }catch(err){
      
      return false;

    }
  }
}

module.exports = new User();