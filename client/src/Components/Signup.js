import { useState } from "react";
import Button from 'react-bootstrap/Button';

function Signup({ setCurrentUser, handleCloseSignup })
{
    //handles user sign up
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    function handleSubmit(e) 
    {
        e.preventDefault();

        const user = {username, password}

        fetch("/users", 
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
        .then((user) => handleCloseSignup)
    }

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
              <div className="signupInput">
                <input
                    id="loginOutline"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
              </div>
              <div className="signupInput">
                <input
                    id="loginOutline"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
                <Button id="signupSubmit" type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default Signup