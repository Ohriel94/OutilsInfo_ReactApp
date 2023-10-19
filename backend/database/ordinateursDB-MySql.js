import mysql from 'mysql2';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'outilsinfo_user',
	password: 'keRoYe',
	database: 'outilsinfo_db',
});

// con.connect(function (err) {
// 	if (err) throw err;
// 	console.log('Connected!');
// 	con.query('SELECT * FROM ordinateurs', function (err, results) {
// 		if (err) throw err;
// 		console.log('Result: ' + [...results]);
// 	});
// });

const getAll = async () => {
	await connection.execute('SELECT * FROM ordinateurs', (err, result) => {
		if (err) throw err;
		console.log(result);
		return result;
	});
};

// const addOne = async (ordinateur) => {
// 	try {
// 		const collection = await getCollection();
// 		await collection.insertOne(ordinateur);
// 	} catch (e) {
// 		throw e;
// 	} finally {
// 		await closeConnection();
// 	}
// };

// const addMany = async (ordinateurs) => {
// 	try {
// 		const collection = await getCollection();
// 		const res = await collection.insertMany([...ordinateurs]);
// 		return res;
// 	} catch (e) {
// 		throw e;
// 	} finally {
// 		await closeConnection();
// 	}
// };

// const findBySerialNumber = async (serNum) => {
// 	try {
// 		const collection = await getCollection();
// 		const ordinateur = await collection
// 			.find({ serialNumber: serNum })
// 			.toArray();
// 		if (ordinateur === undefined) throw new Error('Ordinateur pas trouvé...');
// 		else return ordinateur[0];
// 	} catch (e) {
// 		throw e;
// 	} finally {
// 		await closeConnection();
// 	}
// };

// const findById = async (id) => {
// 	try {
// 		const collection = await getCollection();
// 		const ordinateur = await collection.find({ _id: ObjectId(id) }).toArray();
// 		if (ordinateur === undefined) throw new Error('Ordinateur pas trouvé...');
// 		else return ordinateur[0];
// 	} catch (e) {
// 		throw e;
// 	} finally {
// 		await closeConnection();
// 	}
// };

// const updateById = async (id, ordinateur) => {
// 	const collection = await getCollection();
// 	try {
// 		let updatedItems = await collection.updateOne(
// 			{ _id: ObjectId(id) },
// 			{ $set: ordinateur }
// 		);
// 		if (updatedItems.matchedCount == 0)
// 			throw new Error('Ordinateur pas trouvé...');
// 	} catch (e) {
// 		throw e;
// 	} finally {
// 		await closeConnection();
// 	}
// };

// const deleteOne = async (id) => {
// 	const collection = await getCollection();
// 	try {
// 		let deletedItems = await collection.deleteOne({ _id: ObjectId(id) });
// 		if (deletedItems.matchedCount == 0)
// 			throw new Error('Ordinateur pas trouvé...');
// 	} catch (e) {
// 		throw e;
// 	} finally {
// 		await closeConnection();
// 	}
// };

export default {
	getAll,
	// 	findBySerialNumber,
	// 	findById,
	// 	addOne,
	// 	addMany,
	// 	deleteOne,
	// 	updateById,
};
