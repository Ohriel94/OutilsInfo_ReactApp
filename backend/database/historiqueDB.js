import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'OutilInventaire';
const collectionName = 'Historique';

const getCollection = async () => {
 client.connect();
 const db = client.db(dbName);
 const collection = db.collection(collectionName);

 return collection;
};

const closeConnection = async () => {
 await client.close();
};

const getHistorique = async () => {
 console.log('--- historiqueDB/getHistorique');
 const collection = await getCollection();
 const historique = await collection.find({}).toArray();
 await closeConnection();
 console.log(historique);
 return historique;
};

const findByDate = async (Date) => {
 console.log('--- historiqueDB/findByDate');
 try {
  const collection = await getCollection();
  const res = await collection.find({}).toArray();
  const historique = res.filter((hist) => hist.date == Date);
  console.log(historique != undefined ? 'Trouvé...' : 'Pas trouvé...');
  if (historique === undefined) throw new Error('Historique pas trouvé...');
  return historique[0];
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const updateById = async (id, historique) => {
 console.log('--- historiqueDB/updateById');
 try {
  const collection = await getCollection();
  let updatedItems = await collection.updateOne(
   { _id: ObjectId(id) },
   { $set: historique }
  );
  if (updatedItems.matchedCount == 0) throw new Error('Usager pas trouvé...');
 } catch (e) {
  throw e;
 } finally {
  await closeConnection();
 }
};

const addEntree = async (newEntry) => {
 console.log('--- historiqueDB/addEntree');
 try {
  const collection = await getCollection();
  await collection.insertOne(newEntry);
  await closeConnection();
 } catch (e) {
  await closeConnection();
 }
};

const removeEntree = async (affectation) => {
 console.log('--- historiqueDB/removeEntree');
 try {
  const collection = await getCollection();
  await collection.insertOne(affectation);
  await closeConnection();
 } catch (e) {
  await closeConnection();
 }
};

export default {
 getHistorique,
 updateById,
 findByDate,
 addEntree,
 removeEntree,
};
