import React, {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import phonebookService from "./components/services/PhonebookService";
import Notification from "./components/Notification.jsx";
import {NotificationType} from "./constants/enum.js";

const App = () => {
    const [persons, setPersons] = useState([]);

    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');

    useEffect(() => {
        getAllPersons();
    }, []);

    const getAllPersons = () => {
        phonebookService
            .getAll()
            .then(persons => setPersons(persons));
    }

    const getNewPerson = () => {
        return {
            name: newName,
            phone: newPhoneNumber
        };
    };

    const addPerson = () => {
        const newPerson = getNewPerson();

        if (checkPersonExists()) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        phonebookService
            .addPerson(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));

                showNotification(`Successfully added ${newName}`);

                setNewName('');
                setNewPhoneNumber('');
            })
            .catch(() => {
                showNotification('Unknown error occurred please try again', NotificationType.ERROR);
            });
    }

    const checkPersonExists = () => {
        return persons.some(person => person.name === newName);
    }

    const resetNotification = () =>
        setTimeout(() => {
            setNotificationMessage('');
            setNotificationType('');
        }, 5000)

    const showNotification = (message, type = NotificationType.SUCCESS) => {
        setNotificationMessage(message);
        setNotificationType(type);

        resetNotification();
    }

    const updatePerson = () => {
        const currentPersonId = persons.find(person => person.name === newName).id;
        const newPerson = {
            ...getNewPerson(),
            id: currentPersonId,
        };
        const confirm = window.confirm(`Are you sure you want to update ${newName}?`);
        if (confirm) {
            phonebookService
                .updatePerson(newPerson)
                .then(() => {
                    showNotification(`Successfully updated  ${newName}`);
                    getAllPersons();
                })
                .catch((reason) => {
                    if (reason.response.status === 404) {
                        showNotification(
                            `Information of ${newName} has already been removed from the server`,
                            NotificationType.ERROR
                        )
                    } else {
                        showNotification(`Something went wrong while updating ${newName}`, NotificationType.ERROR);
                    }

                    getAllPersons();
                });
        }
    }

    const handleDeletePerson = (personId) => {
        const toDeletePerson = persons.find(person => person.id === personId);
        const confirm = window.confirm(`Are you sure you want to delete ${toDeletePerson.name}`);
        if (!confirm) {
            return;
        }

        phonebookService
            .deletePerson(personId)
            .then((deletedPerson) => {
                showNotification(`Successfully deleted  ${deletedPerson.name}`);
                setPersons(persons.filter(person => person.id !== personId));
            })
            .catch((reason) => {
                if (reason.response.status === 404) {
                    showNotification(
                        `Information of ${toDeletePerson.name} has already been removed from the server`,
                        NotificationType.ERROR
                    )
                    return;
                }

                showNotification(`Something went wrong while deleting ${toDeletePerson.name}`, NotificationType.ERROR);
            })
    }

    const handlePhonebookFormSubmit = (e) => {
        e.preventDefault();

        if (checkPersonExists(newName)) {
            updatePerson();
        } else {
            addPerson();
        }
    };

    const personsToDisplay =
        searchTerm
            ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} type={notificationType}/>
            <Filter searchTerm={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
            <h2>Add a new</h2>
            <PersonForm newName={newName} newPhoneNumber={newPhoneNumber}
                        handleNameChange={e => setNewName(e.target.value)}
                        handlePhoneChange={e => setNewPhoneNumber(e.target.value)}
                        handlePhonebookFormSubmit={handlePhonebookFormSubmit}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToDisplay} onDeletePersonClick={handleDeletePerson}/>
        </div>
    )
}

export default App