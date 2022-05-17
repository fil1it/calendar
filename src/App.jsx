import React, {useState}from "react";
import "./style.css"
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import AddEvent from "./components/AddEvent";
//import LeftBar from "./components/LeftBar";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header"
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
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

  render (){
    return <div className="App">
          <Router>
            <Header 
              isLogin={this.state.isLogin} 
              handleLoginClick={ this.handleLoginClick }
            />
            <Routes>
              <Route element={<Dashboard
                  isLogin={this.state.isLogin} 
                  handleLoginClick={ this.handleLoginClick}
                />}
                path="/"
              />
              <Route
                element={<AddEvent
                  isLogin={this.state.isLogin} />}
                path="/addevents"
              />
              <Route
                element={<RegForm handleLoginClick={ this.handleLoginClick }/>}
                path="/registration"
              />
              <Route
                element={<LoginForm handleLoginClick={ this.handleLoginClick } updateName={this.updateName} isLogin={this.state.isLogin}/>}
                path="/login"
              />
              <Route path="*"element={<Dashboard
                  isLogin={this.state.isLogin} 
                  handleLoginClick={ this.handleLoginClick}
                />}></Route>
            </Routes>
          </Router>    
        </div>
}
}

export default App;


