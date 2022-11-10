import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'OutilInventaire';
const collectionName = 'Moniteurs';

const getCollection = async () => {
 client.connect();
 const db = client.db(dbName);
 const collection = db.collection(collectionName);

 return collection;
};

const closeConnection = async () => {
 await client.close();
};

const addOne = async (moniteur) => {
 try {
  const collection = await getCollection();
  await collection.insertOne(moniteur);
  await closeConnection();
 } catch (e) {
  await closeConnection();
 }
};

const findBySerialNumber = async (serNum) => {
 try {
  const collection = await getCollection();
  const res = await collection.find({}).toArray();
  const moniteur = res.filter((ordi) => ordi.serialNumber === serNum);
  if (moniteur === undefined) throw new Error('Moniteur pas trouvé...');
  else return moniteur[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const updateById = async (id, moniteur) => {
 const collection = await getCollection();
 try {
  let updatedItems = await collection.updateOne({ _id: ObjectId(id) }, { $set: moniteur });
  if (updatedItems.matchedCount == 0) throw new Error('Moniteur pas trouvé...');
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const getAll = async () => {
 const collection = await getCollection();
 const moniteurs = await collection.find({}).toArray();
 await closeConnection();
 return moniteurs;
};

export default {
 findBySerialNumber,
 addOne,
 updateById,
 getAll,
};
