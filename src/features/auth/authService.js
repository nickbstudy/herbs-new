import axios from 'axios'


// Register user
const register = async (userData) => {
    const response = await axios.post('https://healthy-ray-cowboy-boots.cyclic.app/api/users/', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post('https://healthy-ray-cowboy-boots.cyclic.app/api/users/login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}



// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService