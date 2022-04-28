import React from "react";
//import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Calendar from './Calendar';

export default class LeftBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
     this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange = date => {
        this.setState({date});
        const {updateDate} = this.props;
        updateDate(this.state.date);
    }

    render(){
        //const { date } = this.state;
        return<div className="leftBar">
            <h1>Привет, {this.props.name}</h1>  
            
            <div className="calendar">
            <Calendar
                onChange={this.handleDateChange}
            />
            {this.state.date && <h2>Дата: {this.state.date.toLocaleDateString()}</h2>}
            </div>  
        </div> 
    }
}
