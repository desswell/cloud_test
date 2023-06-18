import {TrashIcon} from "../icons";
import {useDispatch} from "react-redux";
import {delAdvantagesAction, updateAdvantageAction, useAdvantages} from "../store_redux/slices/dataUser";
import Error from "../components/Error";
import React from "react";
import Input from "./Input";

export function Advantages(data) {
    const {props, error, setError} = data
    const dispatch = useDispatch()
    const advantageDone = useAdvantages().filter((value, index) => index === props.id)
    const HandleClick = (index) => {
        setError((error) => {
            error[props.id] = null
            return error
        })
        dispatch(delAdvantagesAction(index))
    }
    return (
        <div>
            <div className="field-advantage-">
                <Input advantage data-testid={`field-advantages-${props.id + 1}`}
                       placeholder={`${props.id + 1} advantage`} value={advantageDone}
                       onChange={(event) => {
                           const newValue = event.target.value
                           const newAdvantage = {id: props.id, newValue}
                           dispatch(updateAdvantageAction(newAdvantage))
                       }}/>
                <button data-testid={`button-remove-${props.id + 1}`} className="btn-trash"
                        onClick={() => HandleClick(props.id)}><TrashIcon/></button>
            </div>
            {error && <Error>{error}</Error>}
        </div>
    )
}