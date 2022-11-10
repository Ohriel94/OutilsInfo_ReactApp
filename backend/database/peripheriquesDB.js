import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'OutilInventaire';
const collectionName = 'Periphariques';

const getCollection = async () => {
 client.connect();
 const db = client.db(dbName);
 const collection = db.collection(collectionName);

 return collection;
};

const closeConnection = async () => {
 await client.close();
};

const addOne = async (peripharique) => {
 try {
  const collection = await getCollection();
  await collection.insertOne(peripharique);
  await closeConnection();
 } catch (e) {
  await closeConnection();
 }
};

const findBySerialNumber = async (serNum) => {
 try {
  const collection = await getCollection();
  const res = await collection.find({}).toArray();
  const peripharique = res.filter((ordi) => ordi.serialNumber === serNum);
  if (peripharique === undefined) throw new Error('Peripharique pas trouvé...');
  else return peripharique[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const updateById = async (id, peripharique) => {
 const collection = await getCollection();
 try {
  let updatedItems = await collection.updateOne({ _id: ObjectId(id) }, { $set: peripharique });
  if (updatedItems.matchedCount == 0) throw new Error('Peripharique pas trouvé...');
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const getAll = async () => {
 const collection = await getCollection();
 const periphariques = await collection.find({}).toArray();
 await closeConnection();
 return periphariques;
};

export default {
 findBySerialNumber,
 addOne,
 updateById,
 getAll,
};
