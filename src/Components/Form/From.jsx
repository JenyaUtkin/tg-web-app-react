import React, {useEffect, useState, useCallback} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram";

const From = () => {
   const [name, setName] =  useState('');
   const [date, setDate] =  useState('');
   const [subject, setSubject] =  useState('consultation');
   const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            name,
            date,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [name, date, subject, tg])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, tg])

   useEffect(() => {
    tg.MainButton.setParams({
        text: 'Отправить'
    })
   },[tg.MainButton])

    useEffect(() => {
        if(!name || !date) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }

    }, [name, date, tg.MainButton])

   const onChangeName = (e) => {
        setName(e.target.value)
   }

   const onChangeDate = (e) => {
        setDate(e.target.value)
   }

   const onChangeSubject = (e) => {
        setSubject(e.target.value)
   }

    return (
        <div className={'form'}>
            <h3>Введите данные</h3>
            <input
                className={"input"}
                type="text"
                placeholder={'Укажите имя'}
                value={name}
                onChange={onChangeName}
            />
            <input className={"input"}
                   type="text"
                   placeholder={'введите дату рождения'}
                   value={date}
                   onChange={onChangeDate}
            />

            <select className={'select'} value={subject} onChange={onChangeSubject}>
                <option value={'consultation'}>Консультация</option>
                <option value={'course'}>Запись на курс</option>
            </select>
        </div>
    );
};

export default From;