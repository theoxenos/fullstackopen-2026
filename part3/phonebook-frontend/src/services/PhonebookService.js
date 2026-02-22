import axios from "axios";

const baseURL = '/api/persons';

const getAll = () => {
    return axios
        .get(baseURL)
        .then(res => res.data)
};

const addPerson = (person) => {
    return axios
        .post(baseURL, person)
        .then(res => res.data)
}

const deletePerson = (id) => {
    return axios
        .delete(`${baseURL}/${id}`)
        .then(res => res.data)
}

const updatePerson = (person) => {
    return axios
        .put(`${baseURL}/${person.id}`, person)
        .then(res => res.data)
}

export default {getAll, addPerson, deletePerson, updatePerson}