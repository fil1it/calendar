import React from "react";

export default class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inputName: "No Name",
            inputLName:"test"
        };
        
        this.handleChange = this.handleChange.bind(this);
      }

    handleClick = (event) => {
        event.preventDefault();
        const {updateName} = this.props;
        updateName(this.state.inputName);

        const {handleLoginClick} = this.props;
        handleLoginClick(true);
    }
    
    handleChange(event) {
        this.setState({inputName: event.target.value});
    }

    render(){

        return<div className="loginForm">
            <form onSubmit={this.handleClick}>
                <h1>Введите имя</h1>
                <input type="text" value={this.state.InputName} onChange={this.handleChange} className="inputBox" placeholder="Имя"></input><br></br>
               
                <button type="submit" className="submitButton">Войти</button>
            </form>
        </div>
    }
}
