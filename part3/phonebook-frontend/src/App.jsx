import React, {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import People from "./components/People.jsx";
import phonebookService from "./services/PhonebookService";
import Notification from "./components/Notification.jsx";
import {NotificationType} from "./constants/enum.js";

const App = () => {
    const [people, setPeople] = useState([]);

    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');

    useEffect(() => {
        getAllPeople();
    }, []);

    const getAllPeople = () => {
        phonebookService
            .getAll()
            .then(people => setPeople(people));
    }

    const getNewPerson = () => {
        return {
            name: newName,
            number: newPhoneNumber
        };
    };

    const handleAddPerson = () => {
        const newPerson = getNewPerson();

        phonebookService
            .addPerson(newPerson)
            .then(returnedPerson => {
                setPeople(people.concat(returnedPerson));

                showNotification(`Successfully added ${newName}`);

                setNewName('');
                setNewPhoneNumber('');
            })
            .catch(error => {
                if (error.status === 409) {
                    handleUpdatePerson();
                    return;
                }

                showNotification(`Trouble adding the person: ${error.response.data.error}`, NotificationType.ERROR);
            });
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

    const handleUpdatePerson = () => {
        const currentPersonId = people.find(person => person.name === newName).id;
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
                    getAllPeople();
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        showNotification(
                            `Information of ${newName} has already been removed from the server`,
                            NotificationType.ERROR
                        )
                    } else {
                        showNotification(`Something went wrong while updating ${newName}. ${error.response.data.error}`, NotificationType.ERROR);
                    }

                    getAllPeople();
                });
        }
    }

    const handleDeletePerson = (personId) => {
        const toDeletePerson = people.find(person => person.id === personId);
        const confirm = window.confirm(`Are you sure you want to delete ${toDeletePerson.name}`);
        if (!confirm) {
            return;
        }

        phonebookService
            .deletePerson(personId)
            .then((deletedPerson) => {
                showNotification(`Successfully deleted  ${deletedPerson.name}`);
                setPeople(people.filter(person => person.id !== personId));
            })
            .catch((error) => {
                if (error.response.status === 404) {
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

        handleAddPerson();
    };

    const peopleToDisplay =
        searchTerm
            ? people.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : people;

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
            <People people={peopleToDisplay} onDeletePersonClick={handleDeletePerson}/>
        </div>
    )
}

export default App