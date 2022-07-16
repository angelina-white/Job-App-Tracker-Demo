import { useState } from "react";
import Button from 'react-bootstrap/Button';

function Login({ setCurrentUser, renderLists })
{
    //handles user login 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    function handleLogin(e) 
    {
        e.preventDefault();

        const user = {username, password}

        fetch("/login", 
        {
          method: "POST",
          headers: 
          {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
        .then (res => {
          if (res.ok)
          {
            res.json().then(setCurrentUser)
          }
          else{
            res.json().then( e => setErrors(Object.entries(e.error).flat()))
          }
        })
        .then(() => renderLists());
    }

    return (
        <div classname="login">
            <form onSubmit={handleLogin}>
              <div id="loginInput">
                <input
                    id="loginOutline"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
              </div>
              <div id="loginInput">
                <input
                    id="loginOutline"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
              </div> 
              <div>
                <Button variant="secondary" id="loginButton" type="submit">Login</Button>
              </div>
              <div>
                <p>{ errors }</p>
              </div>
            </form>
        </div>
    )
}
export default Login