import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import EventsStore from "../store/EventsStore";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from 'uuid';
import axios from "axios";

const url = 'http://localhost:5000/add';
const urlEdit = 'http://localhost:5000/edit';

const AddEvent = observer((props) => {

    const [date, setDate] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [edit, setEdit] = useState(false);
    const [formvalid, setFormValid] = useState(false);

    useEffect(() => {
        update();
    },[])
    useEffect( () => {
        if(date && name && description){
            setFormValid(true)
        }
        else{
            setFormValid(false)
        }
    }, [date, name, description])

    let navigate = useNavigate();
    useEffect(() => {
        if(!props.isLogin){
            navigate("/login")
        }
    },[props.isLogin])

    const dateChanged = (e) => {
        setDate(e.target.value);
    }
    const nameChanged = (e) => {
        setName(e.target.value);
    }
    const descriptionChanged = (e) => {
        setDescription(e.target.value);
    }

    const update = () => {
        //console.log(edit);
        if(EventsStore.currentEventId != 0){
            setEdit(true);
            setName(EventsStore.currentEvent.name);
            setDate(EventsStore.currentEvent.date);
            setDescription(EventsStore.currentEvent.description);
            
        }
        else{
            setName('');
            setDate(new Date().toLocaleString());
            setDescription('');
        }
    }

    const editEvent = () => {
        setEdit(false);
        try{
            const {userId, eventId} = EventsStore.currentEvent;
            (async () => {
                const response = await axios.post(urlEdit,{userId, eventId, date, name, description})
                .then( await function (response) {
                    navigate("/");
                    
                  })
                  .catch(function (error) {
                    console.log("error");
                    
                  })
            })();
        } catch (e){
            alert("???????????? ??????")
        }
    }

    const addEvent = () =>{
        try{
            const eventId = uuid();
            const userId = EventsStore.currentId;
            (async () => {
                const response = await axios.post(url,{userId, eventId, date, name, description})
                .then( await function (response) {
                    navigate("/");
                })
                .catch(function (error) {
                    console.log("error");
                })
            })();
        } catch (e){
            alert("???????????? ??????")
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        if(edit){
            editEvent();
        }
        else{
            addEvent();
        }
    }

    return(
        <div className="addEvent">
            <form onSubmit={handleClick}>
                <h2>???????? ?? ??????????</h2>
                <input onChange={e => dateChanged(e)} name="datetime" type="datetime-local" value={date}/>
                <h2>???????????????? ??????????????</h2>
                <input onChange={e => nameChanged(e)} name="????????????????" type="text" className="inputBox" placeholder="????????????????" value={name}/><br/>
                <h2>???????????????? ??????????????</h2>
                <textarea onChange={e => descriptionChanged(e)} name="???????????????? ??????????????" className="opisEvent" placeholder="???????????????? ??????????????" value={description}/><br></br>
                <button type="submit" disabled={!formvalid} className="submitButton">????????????????</button>
            </form>
        </div>
    )
})

export default AddEvent;