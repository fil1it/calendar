import React, { useState, useEffect} from "react";
import 'react-calendar/dist/Calendar.css'
import Calendar from './Calendar';
import Events from "./Events";
import { useNavigate } from "react-router-dom";
import EventsStore from "../store/EventsStore";
import { observer } from "mobx-react-lite";
import axios from "axios";

const url = 'http://localhost:5000/events';
const Dashboard = observer((props) => {

    const [date, setDate] = useState(new Date());
    const [currentEvents, setCurrentEvents] = useState([]);
    const [del, setDel] = useState(false);

    let navigate = useNavigate();
    useEffect(() => {
        if(!props.isLogin){
            navigate("/login")
        }
    },[props.isLogin])

    useEffect(() => {
        connect();
        setDel(false);
    },[del])

    useEffect(() => {
        connect();
    },[date])
    
    const connect =()=>{
        try{
            (async () => {
                const response = await axios.post(url,{date}).then( await function (response) {
                    EventsStore.currentEvents = [];
                    setCurrentEvents(response.data);
                    EventsStore.currentEvents = response.data;
                 })
                    .catch(function (error) {
                        console.log("error");
                    })
            })();} catch (e){
                alert("Ошибка")
            }
    }

    const handleDateChange = (date) => {
        setDate(date)
    }

    return(
        <div className="MainScreen">
            <div className="leftBar">
                <h1>Привет, {EventsStore.name}</h1>  
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
                    setDel={setDel}
                />
            </div>
        </div>
    )
})

export default Dashboard;