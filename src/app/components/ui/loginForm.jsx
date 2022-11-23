import { React, useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
// import * as yup from 'yup'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  // const validateScheme = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required('Password is requared to fill')
  //     .matches(/(?=.*[A-Z])/, 'Password must contain one or more capital')
  //     .matches(/(?=.*[0-9])/, 'Password must contain one or more digit')
  //     .matches(
  //       /(?=.*[!@#$%^&*])/,
  //       'Password must contain at least one of !@#$%^&*'
  //     )
  //     .matches(/(?=.{8,})/, 'Password must contain at least 8 characters'),
  //   email: yup
  //     .string()
  //     .required('Email is requared to fill')
  //     .email('Email is invalid')
  // })

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
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    // validateScheme
    //   .validate(data)
    //   .then(() => setErrors({}))
    //   .catch((err) => setErrors({ [err.path]: err.message }))
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Remember me
      </CheckBoxField>
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  )
}

export default LoginForm
