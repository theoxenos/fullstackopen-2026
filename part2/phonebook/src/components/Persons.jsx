import React from "react";
import PersonDetail from "./PersonDetail.jsx";

const Persons = (props) => {
    return (
        <ul style={{ listStyleType: 'none', padding: '0px', margin: '0px' }}>
            {props.persons.map((person) => (
                <PersonDetail key={person.id} person={person} onDeletePersonClick={props.onDeletePersonClick} />
            ))}
        </ul>
    )
};

export default Persons;