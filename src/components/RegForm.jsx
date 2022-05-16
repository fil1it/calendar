import axios from "axios";
import React, {useEffect, useState} from "react";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import EventsStore from "../store/EventsStore";

const url = 'http://localhost:5000/reg';

const RegForm = observer((props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loginDirty, setLoginDirty] = useState('');
    const [nameDirty, setNameDirty] = useState('');
    const [emailDirty, setEmailDirty] = useState('');
    const [passwordDirty, setPasswordDirty] = useState('');
    const [nameErr, setNameErr] = useState('Введите имя');
    const [loginErr, setLoginErr] = useState('Введите логин');
    const [emailErr, setEmailErr] = useState('Введите логин');
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

    const nameChanged = (e) => {
        setName(e.target.value);
        if(e.target.value.lenght == 0 || !e.target.value){
                setNameErr('Введите имя');
        }
        else {
            setNameErr('');
        }
    }

    const emailChanged = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailErr('Некоректный email');
        }
        else {
            setEmailErr('');
        }
    }

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
            case 'name':
                setNameDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
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
        const userId = uuid();
        try{
            (async () => {
                const response = await axios.post(url, {userId ,name, login, email, password}).then(await function (response) {  
                    EventsStore.currentId = userId;
                    props.handleLoginClick(true);
                    navigate("/");
                }).catch(function (error) {
                    console.log("error");
                  })
            })();
            
        }catch(err){
            console.log("ошибка")
        }
    }

    return(
        <div className="loginForm">
            <form onSubmit={handleClick}>
                <h1>Регистрация</h1>
                {(nameDirty && nameErr) && <div style={{color:'red'}}>{nameErr}</div>}
                <input name="name" onChange={e => nameChanged(e)} value={name} onBlur={e => blurHandler(e)} type="text" className="inputBox" placeholder="Имя"/><br/>
                {(emailDirty && emailErr) && <div style={{color:'red'}}>{emailErr}</div>}
                <input name="email" onChange={e => emailChanged(e)} value={email} onBlur={e => blurHandler(e)} type="email" className="inputBox" placeholder="E-mail"/><br/>
                {(loginDirty && loginErr) && <div style={{color:'red'}}>{loginErr}</div>}
                <input name="login" onChange={e => loginChanged(e)} value={login} onBlur={e => blurHandler(e)} type="text" className="inputBox" placeholder="Логин"/><br/>
                {(passwordDirty) && <div style={{color:'red'}}>{passwordErr}</div>}
                <input name="password" onChange={e => passwordChanged(e)} value={password} onBlur={e => blurHandler(e)} type="password" className="inputBox" placeholder="Пароль"/><br></br>
                <button type="submit" disabled={!formvalid} className="submitButton">Войти</button>
            </form>
        </div>
    )
})

export default RegForm;