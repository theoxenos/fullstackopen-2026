import DuplicateError from '../errors/DuplicateError.js'
import NotFoundError from '../errors/NotFoundError.js'
import Person from '../models/person.js'

const UPDATE_OPTIONS = { new: true, runValidators: true }

const getAll = async () => {
  return Person.find({})
}

const getById = async (id) => {
  return Person.findById(id)
}

const getByName = async (name) => {
  return Person.findOne({ name })
}

const getCount = async () => {
  return Person.countDocuments({})
}

const addPerson = async (person) => {
  const existingPerson = await Person.findOne({ name: person.name })
  if (existingPerson) {
    throw new DuplicateError(`Person with name ${person.name} already exists`)
  }
  return Person.create(person)
}

const updatePerson = async (person) => {
  if (person.id) {
    return Person.findByIdAndUpdate(person.id, person, UPDATE_OPTIONS)
  }

  const existingPerson = await Person.findOne({ name: person.name })
  if (!existingPerson) {
    throw new NotFoundError(`Person with name ${person.name} does not exist`)
  }

  return Person.updateOne({ name: person.name }, person, UPDATE_OPTIONS)
}

const deleteById = async (id) => {
  return Person.findByIdAndDelete(id)
}

export default {
  getAll,
  addPerson,
  getById,
  getByName,
  deleteById,
  getCount,
  updatePerson,
}
