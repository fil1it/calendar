import React from "react";
import 'react-calendar/dist/Calendar.css'
import Calendar from './Calendar';
import Modal from './ModalWindow';
const events = [
    {
        id:1,
        date: '03.05.2022',
        title: "событие 1"
    },
    {
        id:2,
        date: '03.05.2022',
        title: "событие 2"
    },
    {
        id:3,
        date: '03.05.2022',
        title: "событие 3 "
    },
    {
        id:4,
        date: '27.04.2022',
        title: "событие 4"
    },
    {
        id:5,
        date: '28.04.2022',
        title: "событие 5"
    },
    {
        id:6,
        date: '29.04.2022',
        title: "событие 6"
    },
    {
        id:7,
        date: '01.05.2022',
        title: "событие 7"
    },
  ]

class Dashboard extends React.Component{
    state = {
        date: new Date(),
        currentEvents: [],
        modalActive: false,
    }

    newCurrentEvents = () => {
        this.state.currentEvents = [];
            for( let i = 0; i < events.length; i++){
                if(this.state.date.toLocaleDateString() == events[i].date)
                    this.state.currentEvents.push(events[i])
            }
    }

    handleDateChange = date => {
        this.setState({date});
        this.newCurrentEvents();
    }
    
    handleModalClick = (param) => {
        this.setState({modalActive: param})
    }

    render(){
        
         return<div className="MainScreen">
            <div className="leftBar">
                <h1>Привет, {this.props.name}</h1>  
                
                <div className="calendar">
                <Calendar
                    onChange={this.handleDateChange}
                />
                </div>  
            </div> 

            <div className="dashboard">
                <div>
                    {this.state.date && <h2>Дата: {this.state.date.toLocaleDateString()}</h2>}
                </div>
                {<div className="events">
                {this.state.currentEvents.map((event) => 
                    <div className="event" key={event.id} onClick={this.handleModalClick}>
                       
                            {event.title} 
                            <button className="delBtn">Удалить</button>
                            
                    </div>
                    
                )}
                <Modal 
                    modalActive={this.state.modalActive} 
                    handleModalClick={this.handleModalClick}
                    //title={event.date}
                >
                    {/* {event.title} */}
                </Modal>
                </div>}
            </div>
            
      </div>
    }
}

export default Dashboard;