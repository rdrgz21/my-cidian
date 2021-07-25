import React, {useState} from "react";
import axios from 'axios';
import TangoCSS from "./Tango.module.css";

export default function Tango({id, jp, reading, en, getVocab}) {

    const [isEditing, setIsEditing] = useState(false);

    const [input, setInput] = useState({
        japanese: jp,
        reading,
        english: en
    });

    const deleteVocab = async () => {
        console.log(id);
        const res = await axios.delete(`/api/deletevocab/${id}`);
        console.log(res.data);
        getVocab();
    };

    const handleSubmit = async () => {

        const updatedVocab = {
            japanese: input.japanese,
            reading: input.reading,
            english: input.english
        };

        console.log(updatedVocab);
        
        const response = await axios.post(`/api/updatevocab/${id}`, updatedVocab, {
            header: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);
    };

    const onClickHandler = () => {
        if (isEditing) {
            handleSubmit()
            .then(setIsEditing(false));
            getVocab();
        } else if (!isEditing) {
            setIsEditing(true)
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInput({
            ...input,
            [name]: value
        })
    }

    return (
        <div className={TangoCSS.container}>
            {!isEditing && 
                <div>
                    <p>{reading}</p>
                    <h3>{jp}</h3>
                    <hr />
                    <p>{en}</p>
                </div>
            }
            {isEditing &&
                <form>
                    <input onChange={handleChange} type='text' name='reading' value={input.reading} />
                    <input onChange={handleChange} type='text' name='japanese' value={input.japanese} />
                    <input onChange={handleChange} type='text' name='english' value={input.english} />
                </form>}
            {/* {!isEditing 
                ? <button onClick={setIsEditing(true)}>Edit</button> 
                : <div>
                    <button onClick={setIsEditing(false)}>Cancel</button>
                    <button onClick={setIsEditing(false)}>Save</button>
                </div>
                } */}
            {!isEditing && <button onClick={onClickHandler}>Edit</button>}
            {isEditing && 
                <div>
                    <button onClick={()=>setIsEditing(false)}>Cancel</button>
                    <button onClick={onClickHandler}>Save</button>
                </div>
            }
            <button onClick={deleteVocab}>Delete</button>
        </div>
    )
}
