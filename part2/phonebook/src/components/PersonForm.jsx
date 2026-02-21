import React from 'react';

const PersonForm = (props) => {
    const {handlePhonebookFormSubmit, handleNameChange, handlePhoneChange } = props;
    const {newName, newPhoneNumber} = props;
    return (
        <div>
            <form onSubmit={handlePhonebookFormSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newPhoneNumber} onChange={handlePhoneChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;