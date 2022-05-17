import React from "react";
import {Link} from "react-router-dom";
import EventsStore from "../store/EventsStore";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = 'http://localhost:5000/delete';

const ModalWindow = observer((props) =>{
    

    const deleteEvent = () =>{
        let delId = EventsStore.currentEvent.eventId;
        try{
            (async () => {
                const response = await axios.post(url,{delId}).then( await function (response) {
                    props.setModalActive(false)
                    props.setDel(true);
                })
                .catch(function (error) {
                        console.log("error");
                })
            })();} catch (e){
                alert("Ошибка")
            }
    }

    if (!props.modalActive){
        EventsStore.currentEventId = 0;
            return null
    }
    else{
        //{console.log(EventsStore.currentEvent)}
        let title = EventsStore.currentEvent.name;
        let description = EventsStore.currentEvent.description;

         return<div className={props.modalActive ? "modal active" : "modal"} 
                    onClick={() => props.setModalActive(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <div className="modal_header">
                    <h2>{title}</h2>
                </div>
                <div className="modal_title">
                    {description}
                </div>
                <div className="modal_footer">
                    <Link to="/addevents" className="editBtn">Редактировать</Link>
                    <button className="delBtn" onClick={deleteEvent}>Удалить</button>
                </div>
            </div>
        </div>
    }
})

export default ModalWindow
