import React from "react";
import "./style.css"
import LoginForm from "./components/LoginForm";
import LeftBar from "./components/LeftBar";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const events = [
  {
    date: '',
    title: "событие 1"
  },
]

class App extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.state={
      
  //   }
  // }
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      name: "",
      date: new Date()
    };
    this.updateDate = this.updateDate.bind(this)
  }

  handleLoginClick = (param) => {
    this.setState({ isLogin: param });
  }

  handleDateClick = (inputDate) => {
    this.setState({ date: inputDate });
  }

  updateName = (sentName) =>{
    this.setState({ name: sentName });
  }

  updateDate = (sentdate) => {
    this.setState({date:sentdate});
  }

  render (){
    return <div className="App">

      <Header 
        isLogin={this.state.isLogin} 
        handleLoginClick={ this.handleLoginClick }/>

      {this.state.isLogin? <div className="MainScreen">
        <LeftBar 
          name={this.state.name} 
          updateDate={this.updateDate}
        /> 
        <Dashboard 
          date={this.state.date} 
          handleLoginClick={ this.handleLoginClick }
          //events={this.state.events}
        />
      </div> : <LoginForm handleLoginClick={ this.handleLoginClick } updateName={this.updateName}/>}

     
    </div>;
    
  }
}

export default App;
