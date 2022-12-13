import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notificateur = () => {
 const notifier = (statusCode) => {
  console.log(statusCode);
  switch (statusCode) {
   case 200:
    toast.success('Inscription réussie...');
    break;
   case 400:
    toast.error('Ce membre existe déjà...');
    break;
  }
 };
 return (
  <ToastContainer
   position='top-left'
   autoClose={2000}
   hideProgressBar={true}
   newestOnTop={false}
   closeOnClick
   rtl={false}
   transition={Flip}
  />
 );
};

export default Notificateur;
