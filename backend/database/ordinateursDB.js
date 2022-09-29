import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'OutilInventaire';
const collectionName = 'Ordinateurs';

const getCollection = async () => {
 client.connect();
 const db = client.db(dbName);
 const collection = db.collection(collectionName);

 return collection;
};

const closeConnection = async () => {
 await client.close();
};

const addOne = async (ordinateur) => {
 console.log('--- ordinateursDB/addOne');
 try {
  const collection = await getCollection();
  await collection.insertOne(ordinateur);
  await closeConnection();
 } catch (e) {
  await closeConnection();
 }
};

const findBySerialNumber = async (serNum) => {
 console.log('--- ordinateursDB/findBySerialNumber');
 console.log(serNum);
 try {
  const collection = await getCollection();
  const res = await collection.find({}).toArray();
  const ordinateur = res.filter((ordi) => ordi.serialNumber === serNum);
  if (ordinateur === undefined) throw new Error('Ordinateur pas trouvé...');
  else return ordinateur[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const updateById = async (id, ordinateur) => {
 console.log('--- ordinateursDB/updateById');
 const collection = await getCollection();
 try {
  let updatedItems = await collection.updateOne(
   { _id: ObjectId(id) },
   { $set: ordinateur }
  );
  if (updatedItems.matchedCount == 0)
   throw new Error('Ordinateur pas trouvé...');
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const getAll = async () => {
 console.log('--- ordinateursDB/getAll');
 const collection = await getCollection();
 const ordinateurs = await collection.find({}).toArray();
 await closeConnection();
 return ordinateurs;
};

export default {
 findBySerialNumber,
 addOne,
 updateById,
 getAll,
};
