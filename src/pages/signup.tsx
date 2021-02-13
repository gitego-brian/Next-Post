import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { logupHandler } from "../lib/auth";

const Signup = () => {
  const [message, setmessage] = useState('')
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null)
  const router = useRouter();

  const handleSignup = async () => {
    const error = await logupHandler({
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: pwdRef.current?.value
    }, false)
    if (error) setmessage(error)
    else router.replace('/login')
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