

module.exports=(sequelize,DataTypes,QueryTypes )=>{
    const User=sequelize.define('User',{
        Id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        FirstName:{
            type:DataTypes.STRING(100),
            allowNull:true,
            // set(value){
            //     this.setDataValue('FirstName',value+'Kumar')
            // }
            // get(){
            //     return this.getDataValue('FirstName')+' '+this.LastName
            // }
        },
        LastName:{
            type:DataTypes.STRING(100),
            allowNull:false,
         
        },
        Gender:{
            type:DataTypes.TEXT,
            allowNull:false,
        // validate:{
        //     equals:'female'
        // }
        },
        Address:{
            type:DataTypes.STRING(100),
            allowNull:false,
          
        },
        Email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique:true
                }
    },{
        //timestamps:false   when timestamps false then createdAt and updatedAt will be not created automatically.
        //timestamps:true   when timestamps true then createdAt and updatedAt will be  created automatically.
        //updatedAt:updated_at  for changing name
        // updatedAt:false it will not create updted_At columns
    }
    )
    return User;
}