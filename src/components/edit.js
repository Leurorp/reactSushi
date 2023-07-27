import React, { useState } from "react"
import {useForm} from 'react-hook-form'
import '../index.css'

export default function Edit(props) {
    const {register, handleSubmit, getValues, setValue}=useForm({
        mode:"onChange",
        defaultValues:{
            yourDetails:{
                id:"",nome:"",prezzo:"",immagine:""
            }
        }})
    return(
        <div></div>
    )
}