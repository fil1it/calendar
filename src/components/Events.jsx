import React, {useState,useEffect} from "react";
import Modal from './ModalWindow';
import EventsStore from "../store/EventsStore";
import { observer } from "mobx-react-lite";



const Events = observer((props) => {
    
    const [modalActive, setModalActive] = useState(false);
    // const [modalId, setModalId] = useState();
    // const [currentEvent, setCurrentEvent] = useState();

    // useEffect(() => {
    //     EventsStore.currentEventId = modalId;
    //     console.log(currentEvent)
    // }, [currentEvent])

    const handleModalClick = (param) => {
        setModalActive(param)
    }

    const handleEventClick = (event) => {
        let currentEventId = event.target.id;
        //setModalId(event.target.id);
        props.currentEvents.forEach( event => {
            if(event.eventId == currentEventId ){
                //setCurrentEvent(event);
                EventsStore.currentEvent = event;
            }
        });
        handleModalClick(true);
    }
    
    return(
        <div className="events">
            <div>
                {props.date && <h2>Дата: {props.date.toLocaleDateString()}</h2>}
                
            </div>
                {props.currentEvents.map((event) => 
                    <div className="event" key={event.eventId} id={event.eventId} onClick={(e) => handleEventClick(e)}>
                            {event.name} 
                            
                    </div>
                    
                )}
                <Modal 
                    modalActive={modalActive} 
                    handleModalClick={handleModalClick}
                    setDel={props.setDel}
                >
                </Modal>
        </div>
    )
})

export default Events;