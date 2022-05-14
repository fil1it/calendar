import React, { useState, useEffect} from "react";
import 'react-calendar/dist/Calendar.css'
import Calendar from './Calendar';
import Modal from './ModalWindow';
import Events from "./Events";
import { useNavigate } from "react-router-dom";
import EventsStore from "../store/EventsStore";
import { observer } from "mobx-react-lite";

const Dashboard = observer((props) => {

    const [date, setDate] = useState(new Date());
    const [currentEvents, setCurrentEvents] = useState([]);
   
    let navigate = useNavigate();
    useEffect(() => {
        if(!props.isLogin){
            navigate("/login")
        }
    },[props.isLogin])


    useEffect(() => {
        newCurrentEvents();
    },[date])

    const newCurrentEvents = () => {
        setCurrentEvents([]);
        let copy = [];
        for(let i = 0; i < EventsStore.events.length; i++){
            if(date.toLocaleDateString() == EventsStore.events[i].date)
                copy.push(EventsStore.events[i])
        }
        setCurrentEvents(copy);
    }

    const handleDateChange = (date) => {
        setDate(date)
    }

    return(
        <div className="MainScreen">
            <div className="leftBar">
                <h1>Привет, {props.name}</h1>  
                
                <div className="calendar">
                <Calendar 
                    onChange={date => handleDateChange(date)}
                />
                </div>  
            </div> 

            <div className="dashboard">
                <Events
                    date={date}
                    currentEvents={currentEvents}
                />
            </div>
        </div>
    )
})

// class Dashboard extends React.Component{
//     state = {
//         date: new Date(),
//         currentEvents: [],
//         modalActive: false,
//     }
//     //navigate = useNavigate();

//     newCurrentEvents = () => {
//         this.state.currentEvents = [];
//             for( let i = 0; i < events.length; i++){
//                 if(this.state.date.toLocaleDateString() == events[i].date)
//                     this.state.currentEvents.push(events[i])
//             }
//     }

//     handleDateChange = date => {
//         this.setState({date});
//         this.newCurrentEvents();
//     }
    
//     handleModalClick = (param) => {
//         this.setState({modalActive: param})
//     }

//     render(){
//          return<div className="MainScreen">
//             <div className="leftBar">
//                 <h1>Привет, {this.props.name}</h1>  
                
//                 <div className="calendar">
//                 <Calendar
//                     onChange={this.handleDateChange}
//                 />
//                 </div>  
//             </div> 

//             <div className="dashboard">
//                 <div>
//                     {this.state.date && <h2>Дата: {this.state.date.toLocaleDateString()}</h2>}
//                 </div>
//                 {<div className="events">
//                 {this.state.currentEvents.map((event) => 
//                     <div className="event" key={event.id} onClick={this.handleModalClick}>
                       
//                             {event.title} 
//                             <button className="delBtn">Удалить</button>
                            
//                     </div>
                    
//                 )}
//                 <Modal 
//                     modalActive={this.state.modalActive} 
//                     handleModalClick={this.handleModalClick}
//                     //title={event.date}
//                 >
//                     {/* {event.title} */}
//                 </Modal>
//                 </div>}
//             </div>
            
//       </div>
//     }
// }

export default Dashboard;