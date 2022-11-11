import { React, useState, useEffect } from 'react'
import TextField from '../textField'
import { validator } from '../../utils/validator'

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = ({ target }) => {
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
    }
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-5">
          <h3 className="mb-4">Login</h3>
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
            <button
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
