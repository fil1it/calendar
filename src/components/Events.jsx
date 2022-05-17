import React, {useState,useEffect} from "react";
import Modal from './ModalWindow';
import EventsStore from "../store/EventsStore";
import { observer } from "mobx-react-lite";

const Events = observer((props) => {
    
    const [modalActive, setModalActive] = useState(false);
    
    const handleEventClick = (event) => {
        let currentEventId = event.target.id;
        props.currentEvents.forEach( event => {
            if(event.eventId == currentEventId ){
                EventsStore.currentEvent = event;
                EventsStore.currentEventId = currentEventId
            }
        });
        setModalActive(true);
    }
    
    return(
        <div className="events">
            <div>
                {props.date && <h2>Дата: {props.date.toLocaleDateString()}</h2>}
                
            </div>
                {props.currentEvents.map((event) => 
                    <div className="event" key={event.eventId} id={event.eventId} onClick={(e) => handleEventClick(e)}>
                            <h4>{event.date.slice(-5)}</h4>&nbsp;
                            {event.name} 
                    </div>
                    
                )}
                <Modal 
                    modalActive={modalActive} 
                    setModalActive={setModalActive}
                    setDel={props.setDel}
                >
                </Modal>
        </div>
    )
})

export default Events;