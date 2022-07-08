import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import AddChinese from './components/Chinese/AddChinese/AddChinese';
// import Login from './components/Pages/Login/Login';
// import Register from './components/Pages/Register/Register';
// import Vocab from './components/Pages/Vocab';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
       <App />
    </BrowserRouter>
);
