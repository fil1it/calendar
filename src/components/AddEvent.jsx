import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import EventsStore from "../store/EventsStore";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from 'uuid';
import axios from "axios";

const url = 'http://localhost:5000/add';

const AddEvent = observer((props) => {

    const [date, setdate] = useState(new Date());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    useEffect(() => {
        name2();
    },[])

    let navigate = useNavigate();
    useEffect(() => {
        if(!props.isLogin){
            navigate("/login")
        }
    },[props.isLogin])

    const dateChanged = (e) => {
        setdate(e.target.value);
    }
    const nameChanged = (e) => {
        setName(e.target.value);
    }
    const descriptionChanged = (e) => {
        setDescription(e.target.value);
    }

    const name2 = () => {
        if(EventsStore.currentId != 0){
            //console.log(EventsStore.currentEvent);
            //setName(EventsStore.currentEvent.name)
        }
        else{
            setName('');
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        const eventId = uuid();
        try{
            (async () => {
                const response = await axios.post(url,{eventId, date, name, description}).then( await function (response) {
                    navigate("/");
                  })
                  .catch(function (error) {
                    console.log("error");
                  })
            })();
        } catch (e){
            alert("Ошибка")
        }
    }

    return(
        <div className="addEvent">
            <form onSubmit={handleClick}>
                <h2>Дата и время</h2>
                <input onChange={e => dateChanged(e)} name="datetime" type="datetime-local"/>
                <h2>Название события</h2>
                <input onChange={e => nameChanged(e)} name="Название" type="text" className="inputBox" placeholder="Название" value={name}/><br/>
                <h2>Описание события</h2>
                <textarea onChange={e => descriptionChanged(e)} name="Описание события" className="opisEvent" placeholder="Описание события"/><br></br>
                <button type="submit" className="submitButton">Добавить</button>
            </form>
        </div>
    )
})

export default AddEvent;