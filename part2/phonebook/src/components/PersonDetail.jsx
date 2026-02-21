import React from 'react';

const PersonDetail = (props) => {
    const { id, name, phone } = props.person;
    const { onDeletePersonClick } = props;
    
    return (
        <li>
            {name} {phone}
            <button type="button" onClick={() => onDeletePersonClick(id)}>delete</button>
        </li>
    );
};

export default PersonDetail;