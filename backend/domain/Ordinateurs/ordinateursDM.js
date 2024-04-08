import ordinateursDB from '../../database/ordinateursDB-MySql.js';

const creerOrdinateur = async (
	serNum,
	mar,
	mod,
	dateAcqu,
	sys,
	proc,
	mem,
	disq,
	notes
) => {
	const newOrdinateur = {
		serialNumber: serNum,
		etatDisponible: true,
		details: {
			marque: mar,
			modele: mod,
			dateAcquisition: dateAcqu,
			configuration: {
				systeme: sys,
				processeur: proc,
				memoire: mem,
				disque: disq,
			},
			notes: notes,
		},
	};
	const trouve = await ordinateursDB.findBySerialNumber(
		newOrdinateur.serialNumber
	);
	try {
		if (trouve === undefined) await ordinateursDB.addOne(newOrdinateur);
		else throw new Error('This serial number is already in use...');
	} catch (e) {
		throw e;
	}
};

const creerOrdinateurs = async (
	qte,
	serNum,
	mar,
	mod,
	dateAcqu,
	sys,
	proc,
	mem,
	disq,
	notes
) => {
	let arr = [];
	for (let i = 0; i < qte; i++) {
		const trouve = await ordinateursDB.findBySerialNumber(serNum + i);
		console.log('Found : ', trouve);
		if (trouve === undefined) {
			arr.push({
				serialNumber: serNum,
				type: 'Laptop',
				etatDisponible: true,
				details: {
					marque: mar,
					modele: mod,
					dateAcquisition: dateAcqu,
					configuration: {
						systeme: sys,
						processeur: proc,
						memoire: mem,
						disque: disq,
					},
					notes: notes,
				},
				piecesJointes: {
					factures: [],
				},
			});
		}
	}
	console.log('[OrdDM] Length :', arr.length);
	const result = await ordinateursDB.addMany(arr);
	console.log('[OrdDM] Result :', result);
};

const recupererOrdinateurs = () => {
	const ordinateurs = ordinateursDB.getAll();
	return ordinateurs;
};

const recupererOrdinateurParSerialNumber = async (serialNumber) => {
	try {
		const ordinateur = await ordinateursDB.findBySerialNumber(serialNumber);
		return ordinateur;
	} catch (e) {
		throw new Error(e);
	}
};

const recupererOrdinateurParId = async (id) => {
	try {
		const ordinateur = await ordinateursDB.findById(id);
		return ordinateur;
	} catch (e) {
		throw new Error(e);
	}
};

const editerOrdinateur = async (
	id,
	serNum,
	mar,
	mod,
	dateAcqu,
	sys,
	proc,
	mem,
	disq,
	notes
) => {
	try {
		const trouve = await ordinateursDB.findById(id);
		if (trouve !== undefined) {
			if (serNum !== trouve.serialNumber) trouve.serialNumber = serNum;
			if (mar !== trouve.details.marque) trouve.details.marque = mar;
			if (mod !== trouve.details.modele) trouve.details.modele = mod;
			if (dateAcqu !== trouve.details.dateAcquisition)
				trouve.details.dateAcquisition = dateAcqu;
			if (sys !== trouve.details.configuration.systeme)
				trouve.details.configuration.systeme = sys;
			if (proc !== trouve.details.configuration.processeur)
				trouve.details.configuration.processeur = proc;
			if (mem !== trouve.details.configuration.memoire)
				trouve.details.configuration.memoire = mem;
			if (disq !== trouve.details.configuration.disque)
				trouve.details.configuration.disque = disq;
			if (notes !== trouve.details.notes) trouve.details.notes = notes;
			await ordinateursDB.updateById(trouve._id, trouve);
		}
	} catch (e) {
		throw new Error(e);
	}
};

const affecterOrdinateur = async (serialNumber) => {
	if (serialNumber != undefined) {
		const ordi = await ordinateursDB.findBySerialNumber(serialNumber);
		ordi.etatDisponible = false;
		await ordinateursDB.updateById(ordi._id, ordi);
	}
};

const retirerOrdinateur = async (serialNumber) => {
	if (serialNumber != undefined) {
		const ordi = await ordinateursDB.findBySerialNumber(serialNumber);
		ordi.etatDisponible = true;
		await ordinateursDB.updateById(ordi._id, ordi);
	}
};

const supprimerOrdinateur = async (id) => {
	try {
		const trouve = await ordinateursDB.findById(id);
		if (trouve !== undefined) await ordinateursDB.deleteOne(id);
		else throw new Error('This serial number is already in use...');
	} catch (e) {
		throw e;
	}
};

export default {
	creerOrdinateur,
	creerOrdinateurs,
	editerOrdinateur,
	supprimerOrdinateur,
	recupererOrdinateurs,
	recupererOrdinateurParSerialNumber,
	recupererOrdinateurParId,
	affecterOrdinateur,
	retirerOrdinateur,
};
