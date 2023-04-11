import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const {name, username, password, password2} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Please enter your credentials</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="formGroup">
                    <input type="text" className="form-control" name="username" id="username" value={username} placeholder='Enter your username' onChange={onChange}/>
                </div>
                <div className="formGroup">
                    <input type="password" className="form-control" name="password" id="password" value={password} placeholder='Enter your password' onChange={onChange}/>
                </div>
                <div className="formGroup">
                    <button type="submit" className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login