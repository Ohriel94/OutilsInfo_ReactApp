import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'OutilInventaire';
const collectionName = 'Cellulaires';

const getCollection = async () => {
 client.connect();
 const db = client.db(dbName);
 const collection = db.collection(collectionName);

 return collection;
};

const closeConnection = async () => {
 await client.close();
};

const addOne = async (cellulaire) => {
 console.log('--- cellulairesDB/addOne');
 try {
  const collection = await getCollection();
  await collection.insertOne(cellulaire);
  await closeConnection();
 } catch (e) {
  await closeConnection();
 }
};

const findBySerialNumber = async (serNum) => {
 console.log('--- cellulairesDB/findBySerialNumber');
 try {
  const collection = await getCollection();
  const res = await collection.find({}).toArray();
  const cellulaire = res.filter((ordi) => ordi.serialNumber === serNum);
  if (cellulaire === undefined) throw new Error('Cellulaire pas trouvé...');
  else return cellulaire[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const updateById = async (id, cellulaire) => {
 console.log('--- cellulairesDB/updateById');
 const collection = await getCollection();
 try {
  let updatedItems = await collection.updateOne({ _id: ObjectId(id) }, { $set: cellulaire });
  if (updatedItems.matchedCount == 0) throw new Error('Cellulaire pas trouvé...');
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const getAll = async () => {
 console.log('--- cellulairesDB/getAll');
 const collection = await getCollection();
 const cellulaires = await collection.find({}).toArray();
 await closeConnection();
 return cellulaires;
};

export default {
 findBySerialNumber,
 addOne,
 updateById,
 getAll,
};
