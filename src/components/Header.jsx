import { useState } from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser, FaRegPlusSquare, FaSort } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { addHerb, setSearchTerm } from '../features/herbs/herbSlice'

function Header() {

    const [search, setSearch] = useState('')
    const [newName, setNewName] = useState('')
    const [newExpiry, setNewExpiry] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onChangeSearch = e => {
        setSearch(e.target.value)
        dispatch(setSearchTerm(e.target.value))
    }

    const clearSearch = () => {
        setSearch("")
        dispatch(setSearchTerm(""))
    }

    const openAddHerb = () => {
        const modal = document.getElementById('modal')
        modal.showModal()
    }

    const cancelAddHerb = (e) => {
        e.preventDefault();
        const modal = document.getElementById('modal')

        setNewExpiry("")
        setNewName("")
        
        modal.close()
    }
    const handleAddHerb = (e) => {
        e.preventDefault();
        if (newName === "") {
            alert("Please enter a name for the new herb")
            return;
        }
        if (newExpiry === "") {
            alert("Please enter an expiry date")
            return;
        }
        const modal = document.getElementById('modal')

        const herbData = {herbName: newName, expiryDate: `${newExpiry}-15`}
        dispatch(addHerb(herbData))

        setNewExpiry("")
        setNewName("")
        
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
                <span className="logo">Herb<br/>Tracker</span>
                    {user ? <span style={{display: 'flex'}}>
                       <input type="text" placeholder="🔎 Search..." onChange={onChangeSearch} value={search} style={{height: "40px", width: '230px', fontSize: '1.4rem', marginLeft: '10px', padding: '4px'}}/>
                       <button onClick={clearSearch} style={{marginLeft: '10px', dataInline: true, height: '35px', width: '35px', borderRadius: '50%', backgroundColor: 'black', color: 'white', fontSize: '0.8em', fontWeight: 800}}>✕</button>
                       <button className="btn" style={{dataInline: true, transform: 'translate(0px, -3px)', marginLeft: '20px'}} onClick={openAddHerb}><FaRegPlusSquare />　Add Herb</button>
                        </span> : <p></p>}
                    
            </div>
            <ul>
                {user ? (
                    <li style={{display: 'flex'}}> 
                        <span style={{marginRight: '12px', fontSize: '1.3em'}}>{user.name}</span>
                    <button className="btn" onClick={onLogout} style={{transform: 'translate(0px, -3px)'}}>
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
            <form>
                <div className="addContainer">
                    <div><label htmlFor="newName">Herb name:</label><br />
                    <input type="text" name="newName" id="newName" value={newName} onChange={(e) => setNewName(e.target.value)}/></div>
                    <div><label htmlFor="newExpiry">Expiry:</label><br />
                    <input type="month" name="newExpiry" id="newExpiry" value={newExpiry} onChange={(e) => setNewExpiry(e.target.value)}/></div>
                    <div className="modalButtons">
                        <button type="submit" onClick={handleAddHerb} className="newAdd">Add Herb</button>
                        <button className="newCancel" onClick={cancelAddHerb}>Cancel</button>
                    </div>
                </div>
            </form>
            
        </dialog>
    </>
  )
}

export default Header