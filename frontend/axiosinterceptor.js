import axios from 'axios'

// Create a new instance of axios
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000"
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token")
        if (accessToken) {
            // ✅ FIXED: Backend expects "Authorization: Bearer <token>"
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance