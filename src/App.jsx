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
      name: "",
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
                  name={this.state.name} 
                />}
                path="/"
              />
              <Route
                element={<AddEvent
                  isLogin={this.state.isLogin} />}
                path="/addevents"
              />
              <Route
                element={<RegForm/>}
                path="/registration"
              />
              <Route
                element={<LoginForm handleLoginClick={ this.handleLoginClick } updateName={this.updateName}/>}
                path="/login"
              />
              
            </Routes>
          </Router>    
        </div>
     
      
      {/* {this.state.isLogin ? <div>
        <Router>
          <Header 
            isLogin={this.state.isLogin} 
            handleLoginClick={ this.handleLoginClick }
          />
        </Router>
        <Dashboard
          //date={this.state.date} 
          handleLoginClick={ this.handleLoginClick}
          name={this.state.name} 
          //events={this.state.events}
        />
      </div> :
        <div>
          <Router>
            <Header 
              isLogin={this.state.isLogin} 
              handleLoginClick={ this.handleLoginClick }
            />
            <Routes>
              <Route
                element={<RegForm/>}
                path="/registration"
                />
                <Route
                  element={<LoginForm handleLoginClick={ this.handleLoginClick } updateName={this.updateName}/>}
                  exact path="/login"
                />
            </Routes>
          </Router>    
        </div>
      // <LoginForm handleLoginClick={ this.handleLoginClick } updateName={this.updateName}/>
      
      } */

  }
}
}

export default App;


