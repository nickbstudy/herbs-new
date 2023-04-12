import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
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

        const userData = {
            username,
            password
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
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
                    <button type="submit" className="btn-reg">Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login