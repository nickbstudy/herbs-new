import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        password2: ''
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {name, username, password, password2} = formData

    

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset)

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                username,
                password
            }

            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please create an account</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="formGroup">
                    <input type="text" className="form-control" name="name" id="name" value={name} placeholder='Enter your name' onChange={onChange}/>
                </div>
                <div className="formGroup">
                    <input type="text" className="form-control" name="username" id="username" value={username} placeholder='Enter your username' onChange={onChange}/>
                </div>
                <div className="formGroup">
                    <input type="password" className="form-control" name="password" id="password" value={password} placeholder='Enter your password' onChange={onChange}/>
                </div>
                <div className="formGroup">
                    <input type="password" className="form-control" name="password2" id="password2" value={password2} placeholder='Confirm your password' onChange={onChange}/>
                </div>
                <div className="formGroup">
                    <button type="submit" className="btn-reg">Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register