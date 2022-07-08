import {useContext} from 'react';
import { AuthContext } from '../components/General/AuthProvider/AuthProvider';

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;