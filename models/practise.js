const {Sequelize,DataTypes}=require('sequelize');


const sequelize=new Sequelize('vandana','root','root',{
    host:'localhost',
    dialect:'mysql',
    logging:true
})


//for the connection establish
let connection= async ()=>{
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connection();


let create=async()=>{
  try{
    await sequelize.sync({force:false});
    console.log("Table is created successfully");

  }catch(e){
    console.log("Error",e)
  }
  
}
create()

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.user); // true

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.User=require('./model')(sequelize,DataTypes);
db.Posts=require('./posts')(sequelize,DataTypes);

// db.User.hasOne(db.Posts,{foreignKey:'user_id',as:'postDetails'}) //  for One-To-One
db.User.hasMany(db.Posts,{foreignKey:'user_id'})   // for One-To-Many
db.Posts.belongsTo(db.User,{foreignKey:'user_id'})
module.exports=db;