import Router from 'src/utils/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="App">
    <Router/>
    <ToastContainer autoClose={3000} position="bottom-right"/>
  </div>
);


export default App;
