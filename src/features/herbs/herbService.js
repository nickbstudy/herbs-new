import axios from "axios";

const API_URL = 'https://healthy-ray-cowboy-boots.cyclic.app/api/herbs/'

// Get herbs
const getHerbs = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

// Add herb
const addHerb = async (herbData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, herbData, config)

    return response.data
}

// Update amount - PATCH /herbs/api/:id - value: newAmount
const changeAmount = async (herbData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.patch(`${API_URL}${herbData.herbID}`, {newAmount: herbData.newAmount}, config)

    return response.data
}

const herbService = {
    getHerbs,
    addHerb,
    changeAmount
}

export default herbService