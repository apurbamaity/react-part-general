import { useState } from 'react'
import axios from 'axios'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const tryToLogin = async () =>{
        console.log(username, password);
        const backend_url = "http://127.0.0.1:8000"
        const secret_access_token  = 'my-secret-token-1'
        const request_body = {
            name : username
        }
        try{
            const res = await axios.post(`${backend_url}/greet`, request_body, {headers: {Authorization : `Bearer ${secret_access_token}`}} )
            localStorage.setItem("token", res.data.access_token)
            console.log(res)

        }catch(err){
            console.log(err)
        }
    }
    return (
        <>
            <input type='text' placeholder='enter username'  onChange ={(e)=>{setUsername(e.target.value)}} />
            <input type='password' placeholder='enter your password'  onChange ={(e)=>{setPassword(e.target.value)}} />

            <input type="submit" value="login" onClick={()=>{tryToLogin()}} />

        </>
    )
}

export default Login
