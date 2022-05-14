import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

// export default class LoginForm extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             inputName: "No Name",
//             inputLName:"test"
//         };
        
//         this.handleChange = this.handleChange.bind(this);
//       }

//     handleClick = (event) => {
//         event.preventDefault();
//         const {updateName} = this.props;
//         updateName(this.state.inputName);

//         const {handleLoginClick} = this.props;
//         handleLoginClick(true);
//     }
    
//     handleChange(event) {
//         this.setState({inputName: event.target.value});
//     }

//     render(){
//         return
//             <form onSubmit={this.handleClick}>
//                 <h1>Вход</h1>
//                 <input type="text" value={this.state.InputName} onChange={this.handleChange} className="inputBox" placeholder="Имя"></input><br></br>
               
//                 <button type="submit" className="submitButton">Войти</button>
//             </form>
//         
//     }
// }
const LoginForm = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginDirty, setLoginDirty] = useState('');
    const [passwordDirty, setPasswordDirty] = useState('');
    const [loginErr, setLoginErr] = useState('Введите логин');
    const [passwordErr, setPasswordErr] = useState('Введите пароль');
    const [formvalid, setFormValid] = useState(false);
    let navigate = useNavigate();
    
    useEffect( () => {
        if(loginErr || passwordErr){
            setFormValid(false)
        }
        else{
            setFormValid(true)
        }
    }, [loginErr, passwordErr])

    const loginChanged = (e) => {
        setLogin(e.target.value);
        if(e.target.value.lenght == 0 || !e.target.value){
            setLoginErr('Введите логин');
        }
        else {
            setLoginErr('');
        }
    }

    const passwordChanged = (e) => {
        setPassword(e.target.value);
        if(e.target.value.lenght == 0 || !e.target.value){
                setPasswordErr('Введите пароль');
        }
        else {
            setPasswordErr('');
        }
    }

    const blurHandler = (e) => {
        switch(e.target.name){
            case 'login':
                setLoginDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        navigate("/");
        props.updateName(login);
        props.handleLoginClick(true);
    }


    return(
        <div className="loginForm">
            <form onSubmit={handleClick}>
                <h1>Вход</h1>
                {(loginDirty && loginErr) && <div style={{color:'red'}}>{loginErr}</div>}
                <input name="login" onChange={e => loginChanged(e)} value={login} onBlur={e => blurHandler(e)} type="text" className="inputBox" placeholder="Логин"/><br/>
                {(passwordDirty) && <div style={{color:'red'}}>{passwordErr}</div>}
                <input name="password" onChange={e => passwordChanged(e)} value={password} onBlur={e => blurHandler(e)} type="password" className="inputBox" placeholder="Пароль"/><br></br>
                <button type="submit" disabled={!formvalid} className="submitButton">Войти</button>
            </form>
        </div>
    )
}

export default LoginForm;