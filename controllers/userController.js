const {Sequelize,Op, where, QueryTypes } = require('sequelize');
var db =require('../models/practise')

const Users=db.User
const Posts=db.Posts

var addUser=async (req,resp)=>{

    let data=await Users.create({FirstName:'Akshay',LastName:'Pal', Gender:'male',Address:'Bhaynder',Email:'akshaySpalll@gamile.com'});
    console.log(data.dataValues)



    

    // //For Update
    // data.FirstName='hajsdhds';
    // data.save()

    //For Delete
    // data.destroy()

    let response={
        data:'ok'
    }
    resp.status(200).json(response)
}


var crudOperation=async(req,res)=>{

    // let data1=await Users.create({FirstName:'Pranali',LastName:'sakPal', Gender:'Female',Address:'kandiwali'})
    // console.log(data1.dataValues)


    // let data1=await Users.update({FirstName:'Rutuja'},{
    //     where:{
    //         Id:2
    //     }
    // })

    // let data1=await Users.destroy({
    //     where :{
    //         Id:3
    //     }
    // })

    // console.log(data1.Id);
    let response={
        data:'ok'
    }
    res.status(200).json(response)
}


var QueryData=async(req,res)=>{
//  let data2=await Users.create({FirstName:'Rutuja',LastName:'Patil', Gender:'Female',Address:'kandiwali'},{
//     // fields:['Address']
  
//  })

 let data2=await Users.findAll({
    // attributes:['FirstName','Gender',
    // ['Address','Add'],
    // [Sequelize.fn('CONCAT',Sequelize.col|('LastName'),' Kumar'),'lastcount']]

    // attributes:{
    //     exclude:['FirstName','LastName','Gender'],
    //     include:[
    //         [Sequelize.fn('COUNT',Sequelize.col('Address')),'AddCount']
    //     ]
    // }


    where:{
        //  Id:{
        //     [Op.eq]:3
        //  },
        LastName:{
            [Op.like]:'%Pal'
        }

    },
    order:[
        ['FirstName','DESC']
    ],
    offset:2,
    limit:3
 })

let response={
    data:data2
}
res.status(200).json(response)
}


var finderData = async(req,res)=>{
    // let datafind=await Users.findByPk(5
    // )

    // let datafind=await Users.findAndCountAll({
    //     where:{
    //         LastName:'pal' 
    //     }
    // })


    let [datafind,create]=await Users.findOrCreate({
        where:{FirstName:'Rupesh'},
        defaults:{
            LastName:'Yadav', Gender:'male',Address:'malad'
        }
    })

    let response={
        data:datafind,
        add:create
    }
    res.status(200).json(response)
}

var gettersetter= async(req,res)=>{
    // let setdata= await Users.create({FirstName:'Roopa',LastName:'Yadav', Gender:'Female',Address:'Jogeshwari'})
    let getdata=await Users.findAll({})

    let response={
        data:getdata
    }
    res.status(200).json(response)
}

var Validator = async(req,res)=>{
    try{
        // let validdata= await Users.create({FirstName:'rakesh',LastName:'palaaaa', Gender:'male',Address:'malada' ,Email:'rakesh@gmail.com'})
        let response={
            data:validdata
        }
        res.status(200).json(response)
    }catch(e){
        console.log(e)
    }
 
    
} 

var rawQuery=async(req,res)=>{
    try{
        
        let rawdata=await db.sequelize.query("SELECT * FROM users WHERE Email LIKE :searchemail",{
            type: QueryTypes.SELECT,
            model:Users,
            // replacements:{gender:'male'},
            // replacements:{gender:['male','female']}
            replacements:{searchemail: '%@gmail.com' }
        })
    
        let response={
            data:rawdata
        }
        res.status(200).json(response)

    }catch(e){
        console.log("Error",e)
    }

        
    
}

var oneToOne=async(req,res)=>{
    
    // let oneData=await Posts.create({name:'Olddd',title:'Bike',content:'bullet'
    let oneData=await Users.findAll({
        include:[{
            model:Posts,
            as:'postDetails',
            attributes:['title',['name','Postname']]
        }],
        where:{
            id:11
        }
    });

    let response={
        data:oneData
    }
    res.status(200).json(response)
}

var belongsTo=async(req,res)=>{
    let belongdata=await Posts.findAll({
        include:[{
            model:Users,
            attributes:[]
        }]
    })

    let response={
        data:belongdata
    }
    res.status(200).json(response)
}

var onetomany=async(req,res)=>{
    let manydata=await Users.findAll({
        attributes:['FirstName','Email'],
        include:[{
            model:Posts,
            attributes:['title',['name','Postname']]
        }],
        where:{
            id:9
        }
    })
    let response={
        data:manydata
    }
    res.status(200).json(response)
}

module.exports={
    addUser,
    crudOperation,
    QueryData,
    finderData,
    gettersetter,
    Validator,
    rawQuery,
    oneToOne,
    belongsTo,
    onetomany
}