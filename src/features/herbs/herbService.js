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

const herbService = {
    getHerbs
}

export default herbService