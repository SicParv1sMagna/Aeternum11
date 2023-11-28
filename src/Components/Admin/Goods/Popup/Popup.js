import React, { useState } from 'react';
import './Popup.css';
import { useTranslation } from 'react-i18next';
import api from '../../../../api/axiosConfig';
import { URI } from '../../../../api/config';

const Popup = ({ onClose, setIsOpen, selectedGood, onDataUpdate }) => {
    const [t] = useTranslation('global');
    const [editedGood, setEditedGood] = useState({
        name: selectedGood.name,
        cost: selectedGood.cost,
        compound: selectedGood.compound,
        description: selectedGood.description,
        backColor: {
            name: selectedGood.backColor.name,
            code: selectedGood.backColor.code,
        }
    });

    const handleEditGood = (e) => {
        e.preventDefault();
        console.log("Сохранение товара:", editedGood);

        const updatedGood = {
            name: editedGood.name,
            cost: editedGood.cost,
            compound: editedGood.compound,
            description: editedGood.description,
            backColor: {
                name: editedGood.backColor.name,
                code: editedGood.backColor.code,
            }
        };

        api.put(
            `${URI}/good/${selectedGood.id}/info`,
            updatedGood,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            }
        )
            .then(response => {
                console.log(response);
                // Закрыть модальное окно
                onClose();
                // Обновить данные после успешного редактирования
                onDataUpdate();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleInputChange = (e, field) => {
        if (field.includes('.')) {
            const [nestedField, subField] = field.split('.');
            setEditedGood({
                ...editedGood,
                [nestedField]: {
                    ...editedGood[nestedField],
                    [subField]: e.target.value,
                },
            });
        } else {
            setEditedGood({
                ...editedGood,
                [field]: e.target.value,
            });
        }
    };

    return (
        <div className="modal">
            <div className="modal-content-admin">
                <div className='header-good font-gramatika-bold'>
                    <h1>Редактировать товар</h1>
                    <button className='close' onClick={onClose}><img src='../../IMG/icons8-крестик-78.png' alt='close' /></button>
                </div>
                <div className='flex-cont'>
                    <div>Тут фото</div>
                    <form className='form-edit'>
                        <div className='form-group-edit'>
                            <label htmlFor="name" className='label'>Название:</label>
                            <input
                                id="name"
                                className='good-input-edit'
                                value={editedGood.name}
                                onChange={(e) => handleInputChange(e, 'name')}
                            />
                        </div>

                        <div className='form-group-edit'>
                            <label htmlFor="cost" className='label'>Стоимость:</label>
                            <input
                                id="cost"
                                className='good-input-edit'
                                value={editedGood.cost}
                                onChange={(e) => handleInputChange(e, 'cost')}
                            />
                        </div>

                        <div className='form-group-edit'>
                            <label htmlFor="compound" className='label'>Состав:</label>
                            <input
                                id="compound"
                                className='good-input-edit'
                                value={editedGood.compound}
                                onChange={(e) => handleInputChange(e, 'compound')}
                            />
                        </div>

                        <div className='form-group-edit'>
                            <label htmlFor="description" className='label'>Описание:</label>
                            <textarea
                                id="description"
                                className='good-input-edit text-area'
                                value={editedGood.description}
                                onChange={(e) => handleInputChange(e, 'description')}
                            />
                        </div>

                        <div className='form-group-edit'>
                            <label htmlFor="backColor" className='label'>Цвет/Код фона:</label>
                            <div>
                                <input
                                    id="backColorName"
                                    className='good-input-edit'
                                    style={{ width: '7.5vw' }}
                                    value={editedGood.backColor.name}
                                    onChange={(e) => handleInputChange(e, 'backColor.name')}
                                />
                                <input
                                    id="backColorCode"
                                    className='good-input-edit'
                                    style={{ width: '7.5vw'}}
                                    value={editedGood.backColor.code}
                                    onChange={(e) => handleInputChange(e, 'backColor.code')}
                                />
                            </div>
                        </div>

                        <button className='goodBtn font-gramatika-bold' onClick={handleEditGood}>Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Popup;
