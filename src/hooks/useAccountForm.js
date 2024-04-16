import { useState } from "react"

export default function useAccountForm(){
    const [name,setName] = useState(null)
    const [email,setEmail] = useState(null)

    const handleNameInput = (e)=>{
        setName(e.target.value)
    } 
    const handleEmailInput = (e)=>{
        setEmail(e.target.value)
    }

    return {
        email,
        handleEmailInput,
        name,
        handleNameInput,
    }
}