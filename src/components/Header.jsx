import { useState, useEffect } from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser, FaRegPlusSquare, FaSearch } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

function Header() {

    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onChangeSearch = e => {
        setSearch(e.target.value)
    }

    const clearSearch = () => {
        setSearch("")
    }

    const addHerb = () => {
        const modal = document.getElementById('modal')
        modal.showModal()
    }
    const closeModal = () => {
        const modal = document.getElementById('modal')
        modal.close()
    }

    const onLogout = () => {
        console.log('@function')
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <>
        <header className="header">
            <div className="headerActions" style={{whiteSpace: 'nowrap', display: 'flex', flexGrow: '1', width: '600px'}}>
                <span className="logo">Herb Tracker</span>
                    {user ? <span style={{display: 'flex'}}>
                       <input type="text" placeholder="🔎 Search..." onChange={onChangeSearch} value={search} style={{height: "40px", width: '230px', fontSize: '1.4rem', marginLeft: '10px', padding: '4px'}}/>
                       <button onClick={clearSearch} style={{marginLeft: '10px', dataInline: true, height: '35px', width: '35px', borderRadius: '50%', backgroundColor: 'black', color: 'white', fontSize: '0.8em', fontWeight: 800}}>✕</button>
                       <button className="btn" style={{dataInline: true, transform: 'translate(0px, -3px)', marginLeft: '30px'}} onClick={addHerb}><FaRegPlusSquare />　Add Herb</button>
                        </span> : <p></p>}
                    
            </div>
            <ul>
                {user ? (
                    <li style={{display: 'flex'}}> 
                        <span style={{marginRight: '12px', fontSize: '1.3em'}}>{user.name}</span>
                    <button className="btn" onClick={onLogout}>
                        <FaSignOutAlt />　Logout
                    </button>
                </li>
                ) : 
                (
                    <>
                        <li>
                            <Link to='login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
                
            </ul>

        </header>
        <dialog name="modal" id="modal">
            test
            <button onClick={closeModal}>Cancel</button>
        </dialog>
    </>
  )
}

export default Header