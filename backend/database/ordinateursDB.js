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
 try {
  const collection = await getCollection();
  await collection.insertOne(ordinateur);
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const findBySerialNumber = async (serNum) => {
 try {
  const collection = await getCollection();
  const ordinateur = await collection.find({ serialNumber: serNum }).toArray();
  if (ordinateur === undefined) throw new Error('Ordinateur pas trouvé...');
  else return ordinateur[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const findById = async (id) => {
 try {
  const collection = await getCollection();
  const ordinateur = await collection.find({ _id: ObjectId(id) }).toArray();
  if (ordinateur === undefined) throw new Error('Ordinateur pas trouvé...');
  else return ordinateur[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const updateById = async (id, ordinateur) => {
 const collection = await getCollection();
 try {
  let updatedItems = await collection.updateOne({ _id: ObjectId(id) }, { $set: ordinateur });
  if (updatedItems.matchedCount == 0) throw new Error('Ordinateur pas trouvé...');
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const getAll = async () => {
 const collection = await getCollection();
 const ordinateurs = await collection.find({}).toArray();
 await closeConnection();
 return ordinateurs;
};

const deleteOne = async (id) => {
 const collection = await getCollection();
 try {
  let deletedItems = await collection.deleteOne({ _id: ObjectId(id) });
  if (deletedItems.matchedCount == 0) throw new Error('Ordinateur pas trouvé...');
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

export default {
 getAll,
 findBySerialNumber,
 findById,
 addOne,
 deleteOne,
 updateById,
};
