import {useEffect, useState} from 'react';

const useInputValidation = (regex, string) => {
    const [isValidInput, setIsValidInput] = useState(false);

    useEffect(() => {
        const testResult = regex.test(string);
        setIsValidInput(testResult);
    }, [regex, string]);

    return {isValidInput};
};

export default useInputValidation;