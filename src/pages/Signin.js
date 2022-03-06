import React,{useState} from 'react'
import {signInWithGoogle} from "../firebase/Firebase"
import { getAuth} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
function Signin() {
    const auth = getAuth()
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    const handleClick=()=>{
        if(!loggedIn){
            try {
                signInWithGoogle()
                setLoggedIn(true)
            } catch (error) {
                console.log(error)
            }
        } else{
            auth.signOut()
            localStorage.clear();
            setLoggedIn(false)
        }
    }
    if(loggedIn){
        return(
            <div className='d-flex justify-content-center'>
        <button type='button' className='btn btn-dark' onClick={handleClick}>Log out</button>
        </div>
        )
    }
  return (
    <div className='d-flex justify-content-center'>
        <button type='button' className='btn btn-dark' onClick={handleClick}>Sign In</button>
        </div>
     
  )
}

export default Signin