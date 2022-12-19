import Axios from 'axios';
import AWN from 'awesome-notifications';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notificateur = (props) => {
 const promise = props.promise;

 let notifier = new AWN();
 notifier.async(promise, '' /* omitted onResolve */, (err) =>
  notifier.alert(`API responded with code: ${err.response.status}`)
 );
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
