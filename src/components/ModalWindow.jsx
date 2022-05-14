import React from "react";
import {Link} from "react-router-dom";
import EventsStore from "../store/EventsStore";
import { observer } from "mobx-react-lite";

// const handleClick = () => {
//     const {handleModalClick} = this.props;
//     handleModalClick(false);
// }



const ModalWindow = observer((props) =>{
    
    if (!props.modalActive){
            return null
    }
    else{

        let title = EventsStore.events[props.modalId-1].title;
        let date = EventsStore.events[props.modalId-1].date;

         return<div className={props.modalActive ? "modal active" : "modal"} 
                    onClick={() => props.handleModalClick(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <div className="modal_header">
                    <h2>{title}</h2>
                    {/* {EventsStore.events[props.modalId]} */}
                </div>
                <div className="modal_title">
                    {date}
                </div>
                <Link to="/addevents" className="editBtn">Редактировать</Link>
            </div>
        </div>
    }
})

export default ModalWindow
