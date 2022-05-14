import React, {useState,useEffect} from "react";
import Modal from './ModalWindow';
import EventsStore from "../store/EventsStore";
import { observer } from "mobx-react-lite";

const Events = observer((props) => {
    
    const [modalActive, setModalActive] = useState(false);
    const [modalId, setModalId] = useState();

    useEffect(() => {
        EventsStore.currentId = modalId - 1
    }, [modalId])

    const handleModalClick = (param) => {
        setModalActive(param)
    }

    const handleEventClick = (event) => {
        handleModalClick(true);
        setModalId(event.target.id);
    }
   

    return(
        <div className="events">
            <div>
                {props.date && <h2>Дата: {props.date.toLocaleDateString()}</h2>}
            </div>
                {props.currentEvents.map((event) => 
                    <div className="event" key={event.id} id={event.id} onClick={(e) => handleEventClick(e)}>
                            {event.title} 
                            <button className="delBtn">Удалить</button>
                            
                    </div>
                    
                )}
                <Modal 
                    modalActive={modalActive} 
                    handleModalClick={handleModalClick}
                    modalId={modalId}
                >
                </Modal>
        </div>
    )
})

export default Events;