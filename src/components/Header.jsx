import React from "react";
import logo from"../img/calendar.png"
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
        props.handleLoginClick(false);
    }

    return(<>
        {(props.isLogin ?
            <div className="header">
                <div><Link to="/"><img className="logo" src={logo} alt="img"/></Link></div> 
                <div className="headerBtn">
                    <Link to="/addevents" className="addBtn">Добавить событие</Link>
                    <button onClick={handleClick} className="exitBtn">Выйти</button>
                </div>
                
            </div> :
            <div className="header">
                <div><img className="logo" src={logo} alt="img"/></div> 
                <div className="navbar">
                    <div className="navbar_links">
                        <Link to="/login" className="submitButton">Вход</Link>
                        <Link to="/registration" className="submitButton">Регистрация</Link>
                    </div>
                </div>
            </div>
        )}
        </>
    )
      
}

export default Header;
