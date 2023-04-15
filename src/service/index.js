import axios from "axios";

export const action = async (url) => {
    return await axios.get(url)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw err;
        })
}