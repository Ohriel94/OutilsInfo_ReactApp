import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'OutilInventaire';
const collectionName = 'Appareils';

const getCollection = async () => {
 client.connect();
 const db = client.db(dbName);
 const collection = db.collection(collectionName);

 return collection;
};

const closeConnection = async () => {
 await client.close();
};

const addOne = async (appareil) => {
 try {
  const collection = await getCollection();
  await collection.insertOne(appareil);
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const addMany = async (appareils) => {
 try {
  const collection = await getCollection();
  const res = await collection.insertMany([...appareils]);
  return res;
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const findByType = async (typ) => {
 try {
  const collection = await getCollection();
  const appareils = await collection.find({ type: typ }).toArray();
  if (appareils === undefined) throw new Error("Le ou les Appareil(s) n'ont pas trouvé...");
  else return appareils;
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const findBySerialNumber = async (serNum) => {
 try {
  const collection = await getCollection();
  const appareils = await collection.find({ serialNumber: serNum }).toArray();
  if (appareils === undefined) throw new Error("Le ou les Appareil(s) n'ont pas trouvé...");
  else return appareils[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const findById = async (id) => {
 try {
  const collection = await getCollection();
  const appareils = await collection.find({ _id: ObjectId(id) }).toArray();
  if (appareils === undefined) throw new Error("Le ou les Appareil(s) n'ont pas trouvé...");
  else return appareils[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const updateById = async (id, appareil) => {
 const collection = await getCollection();
 try {
  let updatedItems = await collection.updateOne({ _id: ObjectId(id) }, { $set: appareil });
  if (updatedItems.matchedCount == 0) throw new Error("Le ou les Appareil(s) n'ont pas trouvé...");
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const getAll = async () => {
 const collection = await getCollection();
 const appareils = await collection.find({}).toArray();
 await closeConnection();
 return appareils;
};

const deleteOne = async (id) => {
 const collection = await getCollection();
 try {
  let deletedItems = await collection.deleteOne({ _id: ObjectId(id) });
  if (deletedItems.matchedCount == 0) throw new Error("Le ou les Appareil(s) n'ont pas trouvé...");
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

export default {
 getAll,
 findByType,
 findBySerialNumber,
 findById,
 addOne,
 addMany,
 deleteOne,
 updateById,
};
