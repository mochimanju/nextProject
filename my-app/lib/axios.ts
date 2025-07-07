// import axios from 'axios'

// const instance = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com', // เส้น api
//   timeout: 10000, 
// })

// export default instance

// @/lib/axios.ts
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // API หลัก
  timeout: 10000, // รอสูงสุด 10 วินาที
})

export default instance