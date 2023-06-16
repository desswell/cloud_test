import React from "react"
import '../styles/modal.css'
import Button from "../components/Button";
import {useNavigate} from "react-router-dom";

export const Modal = ({active, setActive, errorAxios ,children}) => {
    const navigate = useNavigate()
    const HandleClick = () => {
        if (errorAxios) setActive(false)
        else navigate('/')
    }
    return (
        <div className={active ? 'modal active' : 'modal'}>
            <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
                {children}
                <div className={errorAxios ? "Button-close error" : 'Button-close'}>
                <Button data-testid={errorAxios ? "button-close" : "button-to-main"} onClick={HandleClick}>{errorAxios ? "Закрыть" : "На главную"}</Button>
                </div>
            </div>
        </div>
    )
}