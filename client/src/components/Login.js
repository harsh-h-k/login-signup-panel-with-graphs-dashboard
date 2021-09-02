import React, { useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './styles/login.css'

function Login() {


const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/getUsers')
        .then((jsonRes)=> setUsers(jsonRes))
        .catch((err)=> alert(`error , Please reload page`))
    }, [])

    const [login, setLogin] = useState({
        email: '',
        password: '',
    })



    function handleLoginFormSubmit(event) {
        event.preventDefault()
    }

    function validateLink(event) {

        const validate = users.data.some(user => user.email === login.email && user.password === login.password)
        if(validate){
            return null
        }
        else{
            event.preventDefault()
            alert("incorrect details")
        }

    }


    


    return (
        <div className="login">
            <div className="banner">
                <img src="https://cdn.arnowa.com/wp-content/uploads/2020/01/arnowa-logo-1.png" alt="arnowa-logo" />
            </div>
            <div className="login__form">
                <h1 >Log in</h1>
                <div className="login__form__inputs">
                    <form onSubmit={handleLoginFormSubmit} >
                        <div className="input">
                            <h4>Email Address</h4>
                            <input type="email" placeholder="mike@gmail.com" onChange={event => setLogin({
                                ...login, email: event.target.value
                            })} required autoFocus />
                        </div>
                        <div className="input">
                            <h4>Password</h4>
                            <input type="password" placeholder="Enter your password" onChange={event => setLogin({
                                ...login, password: event.target.value
                            })} required />
                        </div>
                        <div className="login__submit">
                            <Link onClick={validateLink} to={`/dashboard/?email=${login.email}`}>
                                <button type="submit" className="btn">Log in</button>
                            </Link>
                        </div>
                    </form>
                    <div className="login__register">
                        <h4>Don't have an account ?  <Link style={{ textDecoration: "none", color: "#39336b" }} to="/signup">Sign up</Link> </h4>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
