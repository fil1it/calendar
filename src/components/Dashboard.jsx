import React from "react";

const events = [
    {
        id:1,
        date: '27.04.2022',
        title: "событие 1"
    },
    {
        id:2,
        date: '26.04.2022',
        title: "событие 2"
    },
    {
        id:3,
        date: '27.04.2022',
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
  ]

class Dashboard extends React.Component{
    state = {
        currentEvents: []
    }

    // handleClick = () => {
    //     const {handleLoginClick} = this.props;
    //     handleLoginClick(false);
    // }

    newCurrentEvents = () => {
        this.state.currentEvents = []
            for( let i = 0; i < events.length; i++){
                if(this.props.date.toLocaleDateString() == events[i].date)
                    this.state.currentEvents.push(events[i])
            }
    }

    render(){
        
        this.newCurrentEvents();
         return<div className="dashboard">
            {/* <button onClick={this.handleClick} className="exitBtn">Выйти</button> <br/> */}
            <div>
                {this.props.date && <h2>Дата: {this.props.date.toLocaleDateString()}</h2>}
            </div>
            {<div className="events">
            {this.state.currentEvents.map((event) => (
                <div className="event" key={event.id} >
                    {event.title}
                        <button className="delBtn">Удалить</button>
                </div>
            ))}
            </div>}

        </div>
    }
}

export default Dashboard;