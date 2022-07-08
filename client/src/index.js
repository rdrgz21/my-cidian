import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AddChinese from './components/Chinese/AddChinese/AddChinese';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import Vocab from './components/Pages/Vocab';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="addvocab" element={<AddChinese />} />
                <Route path="vocab" element={<Vocab />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
