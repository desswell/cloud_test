import React, {useState} from 'react'
import {Avatar} from '@mui/material';
import myAvatar from '../img/avatar.jpg'
import {Link, useNavigate} from "react-router-dom";
import {Diver, FolderIcon} from '../icons'
import InputMask from 'react-input-mask';
import {useDispatch} from "react-redux";
import {setEmailAction, setPhoneAction, useEmail, usePhone} from "../store_redux/slices/dataUser";
import Button from "../components/Button";
import Error from "../components/Error";
import { schemaMainPage } from "../components/Yup";
import {Div} from "../components/DivContainer";
import Input from "../components/Input";
import LabelTitle from "../components/Label";

export function MainPage() {
    const emailDone = useEmail()
    const phoneDone = usePhone()
    const [phone, setPhone] = useState(phoneDone)
    const [email, setEmail] = useState(emailDone)
    const [errorPhone, setErrorPhone] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const HandleClick = () => {
        schemaMainPage.validate({email: email, phone: phone}, {abortEarly: false})
            .then(valid => {
                setErrorEmail(null)
                setErrorPhone(null)
                dispatch(setPhoneAction(phone))
                dispatch(setEmailAction(email))
                navigate('create/1')
            })
            .catch(error => {
                const errors = error.errors
                if (errors.length === 2){
                    setErrorEmail(errors[0])
                    setErrorPhone(errors[1])
                } else if (errors[0].includes('Email')){
                    setErrorPhone(null)
                    setErrorEmail(errors[0])
                } else {
                    setErrorEmail(null)
                    setErrorPhone(errors[0])
                }
            });
    };

    return (
        <Div>
            <div className="linkTo">
                <div className="avatarMain">
                    <Avatar src={myAvatar}
                            sx={{
                                width: 80,
                                height: 80,
                                '@media screen and (max-width: 899px)': {
                                    width: 65,
                                    height: 65,
                                },
                                '@media screen and (min-width: 1921px)': {
                                    width: 160,
                                    height: 160,
                                }
                            }}
                    ></Avatar>
                </div>
                <div className='positions'>
                    <div className="myName">Ким Алексей</div>
                    <div className="linkToSM">
                        <FolderIcon/>
                        <Link to='https://t.me/desswell' className="linkToText">Telegram</Link>
                        <FolderIcon/>
                        <Link to='https://github.com/desswell' className="linkToText">GitHub</Link>
                        <FolderIcon/>
                        <Link to='https://disk.yandex.ru/i/Ewu-wPcPTj55RA' className="linkToText">Resume</Link>
                    </div>
                </div>
            </div>
            <Diver/>
            <div className="Input">
                <LabelTitle>Номер телефона</LabelTitle>
                <InputMask mask="+7 (999)-999-99-99" value={phone} disabled placeholder="+7 (999)-999-99-99"
                           className="input-area" onChange={(event) => {
                    setPhone(event.target.value)
                }}/>
                {errorPhone && <Error>{errorPhone}</Error>}
            </div>
            <div className="Input downInput">
                <LabelTitle>Email</LabelTitle>
                <Input placeholder="example@example.ru" value={email} disabled
                       onChange={(event) => setEmail(event.target.value)}/>
                {errorEmail && <Error>{errorEmail}</Error>}
            </div>
            <Button data-testid="button-start" onClick={HandleClick}>Начать</Button>
        </Div>
    )
}