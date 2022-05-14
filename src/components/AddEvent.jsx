import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import EventsStore from "../store/EventsStore";
import { observer } from "mobx-react-lite";

const AddEvent = observer((props) => {

    const [newDate, setNewDate] = useState(new Date());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    useEffect(() => {
        console.log(EventsStore.currentId);
        name2();
    },[])

    let navigate = useNavigate();
    useEffect(() => {
        if(!props.isLogin){
            navigate("/login")
        }
    },[props.isLogin])

    const dateChanged = (e) => {
        setNewDate(e.target.value);
    }
    const nameChanged = (e) => {
        setName(e.target.value);
    }
    const descriptionChanged = (e) => {
        setDescription(e.target.value);
    }

    const handleClick = (event) => {
        event.preventDefault();
        console.log(newDate)
    }

    const name2 = () => {
        console.log(EventsStore.currentId)
        if(EventsStore.currentId > 0){
            setName(EventsStore.events[EventsStore.currentId].title)
        }
        else{
            setName('');
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