import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'OutilInventaire';
const collectionName = 'Administrateurs';

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
 const admins = await collection.find({}).toArray();
 await closeConnection();
 return admins;
};

const findById = async (id) => {
 try {
  const collection = await getCollection();
  const trouve = await collection.findOne({ _id: ObjectId(id) });
  if (trouve === null) throw new Error('Administrateur pas trouvé');
  return trouve;
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const findByEmail = async (email) => {
 try {
  const collection = await getCollection();
  const res = await collection.find({}).toArray();
  const trouves = res.filter((admin) => admin.email === email);
  if (trouves === undefined) throw new Error('Administrateur pas trouvé');
  return trouves[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const findByUsername = async (username) => {
 try {
  const collection = await getCollection();
  const res = await collection.find({}).toArray();
  const trouves = res.filter((admin) => admin.username === username);
  if (trouves === undefined) throw new Error('Administrateur pas trouvé');
  return trouves[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const addOne = async (administrateur) => {
 try {
  const collection = await getCollection();
  await collection.insertOne(administrateur);
  await closeConnection();
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const deleteOne = async (id) => {
 const collection = await getCollection();
 let deletedItem = await collection.deleteOne({ _id: ObjectId(id) });
 await closeConnection();
 return deletedItem;
};

const updateById = async (id, administrateur) => {
 try {
  const collection = await getCollection();
  let updatedItems = await collection.updateOne({ _id: ObjectId(id) }, { $set: administrateur });
  if (updatedItems.matchedCount == 0) throw new Error('Administrateur pas trouvé');
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

export default {
 getAll,
 findById,
 findByEmail,
 findByUsername,
 addOne,
 deleteOne,
 updateById,
};
