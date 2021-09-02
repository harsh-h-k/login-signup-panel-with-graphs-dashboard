import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import './styles/signup.css'

function Signup() {

    const [users, setUsers] = useState([])
    const [register, setRegister] = useState({
        name : '',
        email : '',
        password : '',
        Cpassword : '',
    })

    useEffect(() => {
        axios.get('http://localhost:5000/getUsers')
        .then((jsonRes)=> setUsers(jsonRes))
        .catch((err)=> alert(`error , Please reload page`))
    }, [register])

    



    function handleFormSubmit (event){
        event.preventDefault()
        const data = register;
            if(register.password === register.Cpassword && !(users.data.some((a)=> a.email === register.email)) ){
                axios.post('http://localhost:5000/signup',data)
                .then((res)=>{
                    if(res.ok){
                        res.json()
                    }
                })
                .then(alert("Signup Successfull , Go and login now"))
                .catch((error)=> alert(error))
                setRegister({...register , name: '', email:'', password:'',Cpassword:''})

            }else(
                alert("Password not matching or Email already in use")
            )
    }


    return (
        <div className="signup">
            <div className="banner">
                <img src="https://cdn.arnowa.com/wp-content/uploads/2020/01/arnowa-logo-1.png" alt="arnowa-logo" />
            </div>

<div className="registered">
    <h3 style={{textAlign:"center" , marginTop:"1rem"}}>Have a account ?  <Link style={{textDecoration:"none" , color:"#39336b"}} to="/">Click to Sign in now</Link></h3>
</div>
            <div className="signup__container" >
                <h1>Register Now</h1>
                <div className="signup__form">
                <form onSubmit={handleFormSubmit}>
                    <div className="input">
                        <h4>Name</h4>
                        <input type="type" placeholder="Enter your name" value={register.name} onChange={event => setRegister({...register, name : event.target.value})} required />
                    </div>
                    <div className="input">
                        <h4>Email address</h4>
                        <input type="email" placeholder="Enter your email address"value={register.email}  onChange={event => setRegister({...register, email : event.target.value})} required />
                    </div>
                    <div className="input">
                        <h4>Password</h4>
                        <input type="password" placeholder="Enter your password"value={register.password}  onChange={event => setRegister({...register, password : event.target.value})} required />
                    </div>
                    <div className="input">
                        <h4>Confirm Password</h4>
                        <input type="password" placeholder="Confirm your password"value={register.Cpassword}  onChange={event => setRegister({...register, Cpassword : event.target.value})} required />
                    </div>
                    <div className="signup__button">
                        <button className="btn" type="submit">
                            Sign up
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
