import { React, useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import API from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
  const [qualities, setQualities] = useState([])
  const [professions, setProfessions] = useState()
  const [errors, setErrors] = useState({})
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfessions(professionsList)
    })
    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validatorConfig = {
    email: {
      isRequired: { message: 'Email is requared to fill' },
      isEmail: { message: 'Email is invalid' }
    },
    password: {
      isRequired: { message: 'Password is requared to fill' },
      isCapitalSymbol: { message: 'Password must contain one or more capital' },
      isContainDigit: { message: 'Password must contain one or more digit' },
      min: { message: 'Password must contain at least 8 characters', value: 8 }
    },
    profession: { isRequired: { message: 'Choose your profession' } },
    licence: { isRequired: { message: 'You must confirm licence agreement' } }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label }
      }
    }
  }
  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const { profession, qualities } = data
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        value={data.email}
        name="email"
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        value={data.password}
        name="password"
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Choose your profession"
        defaultOption="Choose..."
        onChange={handleChange}
        options={professions}
        name="profession"
        error={errors.profession}
        value={data.profession}
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Choose your sex"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Choose your qualities"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Confirm <a>license agreement</a>
      </CheckBoxField>
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
