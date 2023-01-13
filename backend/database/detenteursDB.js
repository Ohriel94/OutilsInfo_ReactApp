import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'OutilInventaire';
const collectionName = 'Detenteurs';

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
 const detenteur = await collection.find({}).toArray();
 await closeConnection();
 return detenteur;
};

const findByDate = async (Date) => {
 try {
  const collection = await getCollection();
  const res = await collection.find({}).toArray();
  const detenteur = res.filter((hist) => hist.date == Date);
  if (detenteur === undefined) throw new Error('Detenteurs pas trouvé...');
  return detenteur[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const updateById = async (id, detenteur) => {
 try {
  const collection = await getCollection();
  let updatedItems = await collection.updateOne({ _id: ObjectId(id) }, { $set: detenteur });
  if (updatedItems.matchedCount == 0) throw new Error('Detenteur pas trouvé...');
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
