import React from 'react';

export default function Modal({deleteThis, setDeleteIndex}) {


    return (
        <div className="modal">
            <div className="modal__bg"></div>
            <div className="modal__content">
                <p>Вы уверены, что хотите удалить пользователя</p>
                <div className="modal__buttons">
                    <div className="modal__button" onClick={deleteThis}>Да</div>
                    <div className="modal__button" onClick={()=> {
                        setDeleteIndex(null)
                    }}>Нет</div>
                </div>
            </div>
        </div>
    )

}