const formaterHeure = (date) => {
 const heureFormatee = [
  formaterA2Digits(date.getHours()),
  formaterA2Digits(date.getMinutes()),
  formaterA2Digits(date.getSeconds()),
 ].join(':');
 return heureFormatee;
};

const formaterDate = (date) => {
 const dateFormatee = [
  formaterA2Digits(date.getDate()),
  formaterA2Digits(date.getMonth() + 1),
  date.getFullYear(),
 ].join('/');
 return dateFormatee;
};

const formaterUsername = (prenom, nom) => {
 const username = prenom.substring(0, 1).toUpperCase() + nom.split('-')[1].toUpperCase();
 return username;
};

export default {
 formaterHeure,
 formaterDate,
 formaterUsername,
};
