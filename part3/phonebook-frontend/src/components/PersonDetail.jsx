import React from 'react';

const PersonDetail = (props) => {
    const { id, name, number } = props.person;
    const { onDeletePersonClick } = props;
    
    return (
        <li>
            {name} {number}
            <button type="button" onClick={() => onDeletePersonClick(id)}>delete</button>
        </li>
    );
};

export default PersonDetail;