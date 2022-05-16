import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import EventsStore from "../store/EventsStore";


const url = 'http://localhost:5000/login';

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState('');
    const [passwordDirty, setPasswordDirty] = useState('');
    const [emailErr, setEmailErr] = useState('Введите логин');
    const [passwordErr, setPasswordErr] = useState('Введите пароль');
    const [errAuth, setErrAuth] = useState('');
    const [formvalid, setFormValid] = useState(false);
    //const [users, ]
    let navigate = useNavigate();
    
    useEffect( () => {
        if(emailErr || passwordErr){
            setFormValid(false)
        }
        else{
            setFormValid(true)
        }
    }, [emailErr, passwordErr])

    // useEffect(()=>{
    //     (async () => {
    //         try{
    //             const result = await fetch(url);
    //             const users = await result.json();
    //     } catch{
    //         console.log('Ошибка подключения!');
    //     }})();
        
    // },[])

    const loginChanged = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailErr('Некоректный email');
        }
        else {
            setEmailErr('');
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
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        try{
            (async () => {
                const response = await axios.post(url,{email, password}).then( await function (response) {
                    EventsStore.currentId = response.data.userId; 
                    EventsStore.name = response.data.name;
                    props.handleLoginClick(true);
                    navigate("/");
                  })
                  .catch(function (error) {
                    setErrAuth('Ошибка входа');
                    console.log("error");
                  })
            })();
            
        } catch (e){
            alert("Ошибка")
        }
        
    }

    return(
        <div className="loginForm">
            <form onSubmit={handleClick}>
                <h1>Вход</h1>
                {(emailDirty && emailErr) && <div style={{color:'red'}}>{emailErr}</div>}
                <input name="email" onChange={e => loginChanged(e)} value={email} onBlur={e => blurHandler(e)} type="text" className="inputBox" placeholder="E-mail"/><br/>
                {(passwordDirty) && <div style={{color:'red'}}>{passwordErr}</div>}
                <input name="password" onChange={e => passwordChanged(e)} value={password} onBlur={e => blurHandler(e)} type="password" className="inputBox" placeholder="Пароль"/><br></br>
                {(errAuth) && <div style={{color:'red'}}>{errAuth}</div>}
                <button type="submit" disabled={!formvalid} className="submitButton">Войти</button>
            </form>
        </div>
    )
}

export default LoginForm;