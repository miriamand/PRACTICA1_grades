const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');



const url = 'mongodb://localhost:27017';
//const url = 'mongodb+srv://miriam:miriamp@cluster0.9eucu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'grades';
const collection1 = 'grades';
const collection2 = 'alumnos';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection(collection2);

  console.log(collection)
  return { db, collection };

}

const Insertar = async (user) => {
  const { collection } = await main();

  const res = await collection.findOne({
    student_id: user.student_id
  });

  // EN CASO DE QUE EL ID YA EXISTA, MANDAR ERROR
  if (res) {
    client.close();
    
    throw false
  }
  var hashpass = await bcrypt.hash(user.password, 10);

  await collection.insertOne({
    student_id: user.student_id,
    password: hashpass,
    nombre: user.nombre,
    apellido: user.apellido
});

  client.close();

  return;
};


// async function Insertar(user) {

//   var hashpass = await bcrypt.hash(user.password, 10);

//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection(collection2);
//   console.log('Connected successfully to server');



//   await collection.insertOne({
//     student_id: user.student_id,
//     password: hashpass,
//     nombre: user.nombre,
//     apellido: user.apellido

//   });

//   client.close()
// }




// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection(collection2);

//     console.log(collection)
//     return collection;

// }


// async function Insertar(user) {
//main() .then( (colAlumnos) => {
//     
//        const findAlum =  colAlumnos.findOne({student_id:user.student_id})
//         if(findAlum){
//            console.log('usuario ya registrado')   
//         }else{
//            colAlumnos.insertOne({
//                 student_id:user.student_id,
//                 password:user.password,
//                 nombre:user.nombre,
//                 apellido:user.apellido})


//                 client.close()
//         }

//     }) 
// }


module.exports = { client, dbName, Insertar };


