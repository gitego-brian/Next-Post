import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { fetcher } from "../lib/utils";

const Login = () => {
  const [message, setmessage] = useState('')
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null)
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await fetcher('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: emailRef.current?.value, password: pwdRef.current?.value })
    })
    if (error) setmessage(error)
    else router.replace('/users');
  }
  return (<div>
    <input type="text" name="email" placeholder="email" ref={emailRef} />
    <input type="password" name="password" placeholder="password" ref={pwdRef} />
    <button onClick={handleLogin}>Login</button>
    <p>{message}</p>
  </div>);
}

export default Login;