import React from "react";
import logo from"../img/calendar.png"

export default class Header extends React.Component{

    handleClick = () => {
        const {handleLoginClick} = this.props;
        handleLoginClick(false);
    }

    render(){
        if(this.props.isLogin){
            return<div className="header">
                <div><img className="logo" src={logo}/></div> 
                <div className="headerBtn">
                    <button className="addBtn">Добавить событие</button>
                    <button onClick={this.handleClick} className="exitBtn">Выйти</button>
                </div>
                
            </div> 
    }
        else{
           return<div className="header">
                <div><img className="logo" src={logo}/></div> 
                </div> 
        }
    }
}
