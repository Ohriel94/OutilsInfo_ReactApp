import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'OutilInventaire';
const collectionName = 'Historiques';

const getCollection = async () => {
 client.connect();
 const db = client.db(dbName);
 const collection = db.collection(collectionName);

 return collection;
};

const closeConnection = async () => {
 await client.close();
};

const getAll = async () => {
 const collection = await getCollection();
 const historique = await collection.find({}).toArray();
 await closeConnection();
 return historique;
};

const findByDate = async (Date) => {
 try {
  const collection = await getCollection();
  const res = await collection.find({}).toArray();
  const historique = res.filter((hist) => hist.date == Date);
  if (historique === undefined) throw new Error('Historiques pas trouvé...');
  return historique[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const updateById = async (id, historique) => {
 try {
  const collection = await getCollection();
  let updatedItems = await collection.updateOne({ _id: ObjectId(id) }, { $set: historique });
  if (updatedItems.matchedCount == 0) throw new Error('Usager pas trouvé...');
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const addOne = async (newEntry) => {
 try {
  const collection = await getCollection();
  await collection.insertOne(newEntry);
  await closeConnection();
 } catch (e) {
  await closeConnection();
 }
};

const deleteById = async (affectation) => {
 try {
  const collection = await getCollection();
  await collection.insertOne(affectation);
  await closeConnection();
 } catch (e) {
  await closeConnection();
 }
};

export default {
 getAll,
 addOne,
 findByDate,
 updateById,
 deleteById,
};
