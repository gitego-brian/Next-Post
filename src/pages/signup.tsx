import { useRef, useState } from "react";

const Signup = () => {
  const [message, setmessage] = useState('')
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null)

  const handleSignup = async () => {
    const resp = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: nameRef.current?.value, email: emailRef.current?.value, password: pwdRef.current?.value })
    })
    const json = await resp.json();
    setmessage(json.message)
    console.log(json.data)
  }
  return (<div>
    <input type="text" name="name" placeholder="name" ref={nameRef} />
    <input type="text" name="email" placeholder="email" ref={emailRef} />
    <input type="password" name="password" placeholder="password" ref={pwdRef} />
    <button onClick={handleSignup}>Signup</button>
    <p>{message}</p>
  </div>);
}

export default Signup;