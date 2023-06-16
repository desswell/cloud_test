import React, {useState} from 'react'
import Stepper from "../components/Steppper";
import {useNavigate} from "react-router-dom";
import {MenuItem, Select} from "@mui/material";
import {
    setNameAction,
    setNicknameAction, setSexAction, setSurnameAction,
    useName,
    useNickname,
    useSex,
    useSurname
} from "../store_redux/slices/dataUser";
import {useDispatch} from "react-redux";
import Button from "../components/Button";
import Error from "../components/Error";
import {schemaFirstPage} from "../components/Yup";
import Input from "../components/Input";
import LabelTitle from "../components/Label";
import {Div, DivButtons, DivInput} from "../components/DivContainer";



export function FirstPage() {
    const nicknameDone = useNickname()
    const nameDone = useName()
    const surnameDone = useSurname()
    const sexDone = useSex()
    const navigate = useNavigate()
    const [sex, setSex] = useState(sexDone)
    const [nickname, setNickname] = useState(nicknameDone)
    const [name, setName] = useState(nameDone)
    const [surName, setSurname] = useState(surnameDone)
    const [errorNickname, setErrorNickname] = useState(null);
    const [errorName, setErrorName] = useState(null);
    const [errorSurName, setErrorSurname] = useState(null);
    const [errorSex, setErrorSex] = useState(null);
    const dispatch = useDispatch()
    const dispatching = () => {
        dispatch(setNicknameAction(nickname))
        dispatch(setNameAction(name))
        dispatch(setSurnameAction(surName))
        dispatch(setSexAction(sex))
    }
    const HandleClick = () => {
        schemaFirstPage.validate({
            nickname: nickname,
            name: name,
            surname: surName,
            sex: sex
        }, {abortEarly: false}).then(val => {
                dispatching()
                navigate('/create/2')
            }
        ).catch(error => {
            const errors = error.errors
            if (errors.includes('1')) setErrorNickname('Enter your Nickname')
            else if(errors.includes('4')) setErrorNickname('Please, don`t use special symbols')
            else setErrorNickname(null)
            if (errors.includes('2')) setErrorName('Enter your Name')
            else if(errors.includes('5')) setErrorName('Please, don`t use numbers')
            else setErrorName(null)
            if (errors.includes('3')) setErrorSurname('Enter your Surname')
            else if(errors.includes('6')) setErrorSurname('Please, don`t use numbers')
            else setErrorSurname(null)
            if (errors.includes('7')) setErrorSex('Please, select your Sex')
            else setErrorSex(null)
        })
    }
    return (
        <Div>
            <Stepper step={0}/>
            <DivInput>
                <LabelTitle>NickName</LabelTitle>
                <Input outline data-testid="field-nickname" placeholder="Nickname" maxLength={30} value={nickname}
                       onChange={(event) => setNickname(event.target.value)}/>
                {errorNickname && <Error>{errorNickname}</Error>}
            </DivInput>
            <DivInput>
                <LabelTitle>Name</LabelTitle>
                <Input outline data-testid="field-name" placeholder="Name" maxLength={50} value={name}
                       onChange={(event) => setName(event.target.value)}/>
                {errorName && <Error>{errorName}</Error>}
            </DivInput>
            <DivInput>
                <LabelTitle>Surname</LabelTitle>
                <Input outline data-testid="field-sername" placeholder="Surname" maxLength={50} value={surName}
                       onChange={(event) => setSurname(event.target.value)}/>
                {errorSurName && <Error>{errorSurName}</Error>}
            </DivInput>
            <DivInput selector>
                <LabelTitle>Sex</LabelTitle>
                <Select data-testid="field-sex" value={sex} className="select"
                        onChange={(event) => setSex(event.target.value)}>
                    {sex === 'n' && <MenuItem className="notChosen" disabled value="n">
                        Не выборано
                    </MenuItem>}
                    <MenuItem data-testid="field-sex-option-man" value='Man'>Man</MenuItem>
                    <MenuItem data-testid="field-sex-option-woman" value='Woman'>Woman</MenuItem>
                </Select>
                {errorSex && <Error>{errorSex}</Error>}
            </DivInput>
            <DivButtons>
                <Button data-testid="button-back" outline onClick={() => {
                    dispatching()
                    navigate('/')
                }}>Назад</Button>
                <Button data-testid="button-next" onClick={HandleClick}>Далее</Button>
            </DivButtons>
        </Div>
    )
}