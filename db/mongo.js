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
  const collectiong = db.collection(collection1)

  console.log(collection)
  return { db, collection, collectiong };

}
//Registrar usuario
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

const Promedio = async (user) => {

  const { collectiong } = await main();

  const find = await collectiong.find({
    student_id: user
  }).toArray();
if(!find){
  client.close()
  throw false;
}
  const pip = [
    {
      '$group': {
        '_id': '$student_id',
        'acumulator': {
          '$avg': '$promedio'
        }
      }
    }
  ]

const agg = collectiong.aggregate(pip);
const res = await agg.toArray();
await client.close();
const search = res.find(o=> o._id ===user);
const round = Math.round(search.acumulator);
return [round]
}

const showDataTable = async (user) => {
  const { collectiong } = await main();
  const find = await collectiong.find({
      student_id: user
  }).toArray();

  let array = [];

  for(const item of find){
      array.push( Math.round(item.promedio));
  }

  for(let i = 0; i < find.length; i++) {
      find[i].promedio = array[i];
  }

  return find;

};




module.exports = { client, dbName,collection1,collection2, Insertar,Promedio,showDataTable};


