import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);
const dbUsername = 'tp3';
const collectionUsername = 'Administrateurs';

const getCollection = async () => {
 client.connect();
 const db = client.db(dbUsername);
 const collection = db.collection(collectionUsername);

 return collection;
};

const closeConnection = async () => {
 client.close();
};

const getAll = async () => {
 try {
  const collection = await getCollection();
  const res = await collection.find({});
  const administrateur = await res.toArray();
  await closeConnection();
  return administrateur;
 } catch (e) {
  await closeConnection();
 }
};

const findById = async (id) => {
 try {
  const collection = await getCollection();
  const trouve = await collection.findOne({ _id: ObjectId(id) });
  if (trouve === null) throw new Error('Administrator not found');
  return trouve;
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
  if (trouves === undefined) throw new Error('Administrator not found');
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
  await closeConnection();
 }
};

const updateById = async (id, administrateur) => {
 try {
  const collection = await getCollection();

  let updatedItems = await collection.updateOne(
   { _id: ObjectId(id) },
   { $set: administrateur }
  );
  if (updatedItems.matchedCount == 0)
   throw new Error('Administrators not found');
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

export default {
 getAll,
 findById,
 findByUsername,
 addOne,
 updateById,
};
