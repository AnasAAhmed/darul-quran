import { Button } from '@heroui/react'
import { Navigate } from 'react-router-dom'

const Home = ({ redirect }) => {
   return  <Navigate to={redirect?redirect:'/login'} />
}

export default Home
