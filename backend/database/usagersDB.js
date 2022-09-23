import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'OutilInventaire';
const collectionName = 'Usagers';

const getCollection = async () => {
 client.connect();
 const db = client.db(dbName);
 const collection = db.collection(collectionName);

 return collection;
};

const closeConnection = async () => {
 await client.close();
};

const addOne = async (usager) => {
 console.log('--- usagerDB/addOne');
 try {
  const collection = await getCollection();
  await collection.insertOne(usager);
  await closeConnection();
 } catch (e) {
  await closeConnection();
 }
};

const findUserById = async (usagerId) => {
 console.log('--- usagerDB/findUserById');
 try {
  const collection = await getCollection();
  const res = await collection.find().toArray();
  const usager = res.filter((usager) => usager._id == usagerId)[0];
  if (usager === undefined) throw new Error('Usager pas trouvé...');
  return usager;
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const findByUsername = async (username) => {
 console.log('--- usagerDB/findByUsername');
 try {
  const collection = await getCollection();
  const res = await collection.find().toArray();
  const usager = res.filter((usager) => usager.username == username);
  if (usager === undefined) throw new Error('Usager pas trouvé...');
  return usager[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const updateById = async (id, usager) => {
 console.log('--- usagerDB/updateById');
 try {
  const collection = await getCollection();
  let updatedItems = await collection.updateOne(
   { _id: ObjectId(id) },
   { $set: usager }
  );
  if (updatedItems.matchedCount == 0) throw new Error('Usager pas trouvé...');
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const getAll = async () => {
 console.log('--- usagerDB/getAll');
 const collection = await getCollection();
 const usagers = await collection.find({}).toArray();
 await closeConnection();
 return usagers;
};

export default {
 findUserById,
 findByUsername,
 addOne,
 updateById,
 getAll,
};
