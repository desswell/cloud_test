import Stepper from "../components/Steppper";
import React, {useState} from "react";
import Button from "../components/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAboutAction, useAbout, useData} from "../store_redux/slices/dataUser";
import {schemaThirdPage} from "../components/Yup";
import Error from "../components/Error";
import axios from "axios";
import {Modal} from "../components/Modal";
import {CloseIcon, CompleteIcon, ErrorIcon} from "../icons";
import {Div, DivButtons, DivInput} from "../components/DivContainer";
import LabelTitle from "../components/Label";


export function ThirdPage () {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [about, setAbout] = useState(useAbout())
    const data = useData()
    const [active, setActive] = useState(false)
    const maxLength = 200
    const [length, setLength] = useState(about.length)
    const [error, setError] = useState(null)
    const [errorAxios, setErrorAxios] = useState(true)
    async function postAxiosData () {
        await axios.post(`https://api.sbercloud.ru/content/v1/bootcamp/frontend`, data).then(() => {
            setActive(true)
            setErrorAxios(false)
        }).catch(() => {
            setActive(true)
            setErrorAxios(true)
        })
    }
    const HandleClick = () => {
        dispatch(setAboutAction(about.trim()))
        schemaThirdPage.validate({
            about: about
        }, {abortEarly: false})
            .then(() => {
                setError(null)
                postAxiosData().then(
                )
            })
            .catch((error) => setError(error.message))
    }
    const HandleChange = (event) => {
        setAbout(event.target.value.replace(/\s\s+/g, ' '))
        const TextWithoutSpace = event.target.value.replace(/\s/g, '')
        setLength(TextWithoutSpace.length)
        const newMax = event.target.value.length <= maxLength ? maxLength : event.target.value.length
        event.target.maxLength = newMax
    }
    return(
        <Div>
            <Stepper step={2}/>
            <DivInput textarea>
                <LabelTitle>About</LabelTitle>
                <textarea data-testid="field-about" maxLength={maxLength} placeholder="About" value={about} onChange={(event) => {
                    HandleChange(event)
                }}/>
                <div className="counter">
                    {length}/{maxLength}
                </div>
                {error && <Error textarea>{error}</Error>}
            </DivInput>
            <DivButtons>
                <Button data-testid="button-back" outline onClick={() => {
                    dispatch(setAboutAction(about.trim()))
                    navigate('/create/2')
                }}>Назад</Button>
                <Button data-testid="button-next" onClick={HandleClick}>Отправить</Button>
            </DivButtons>
            {active && <Modal active={active} setActive={setActive} errorAxios={errorAxios}>
                <div className={errorAxios ? "modal_header error" : "modal_header"}>
                    {errorAxios ? 'Ошибка' : 'Форма успешно отправлена'}
                    {errorAxios && <button className="close-button" onClick={() => setActive(false)}>
                        <CloseIcon/>
                    </button>}
                </div>
                <div className={errorAxios ? "CompletedIcon Error" : "CompletedIcon"}>
                    {errorAxios ? <ErrorIcon/> : <CompleteIcon/>}
                </div>
            </Modal>}
        </Div>
    )
}