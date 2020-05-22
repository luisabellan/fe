import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Must be a valid email address").required("Must include email address"),
    password: yup.string().required("Must include password"),
    terms: yup.boolean().oneOf([true],"Please agree to terms of use")
})


export default function Form (){
    //Set State of Users to display
    const [users, setUsers] = useState([])
    //Set Form State
    const[formState, setFormState]=useState({
        id:Date.now(),
        name:"",
        email:"",
        password:"",
        terms: false
    });

    const[errorState, setErrorState]=useState({
        id:Date.now(),
        name:"",
        email:"",
        password:"",
        terms: ""
    });
    //Yup Validation
    const validate = e =>{
        let value = e.target.type==="checkbox"? e.target.checked:e.target.value;
        yup.reach(formSchema, e.target.name)
        .validate(value)
        .then(valid=>{
            setErrorState({
                ...errorState, [e.target.name]: ""    
            });
        })
        .catch(err=>{
            setErrorState({
                ...errorState,[e.target.name]:err.errors[0]
            });
        });
        };
    //Event Handler
    const changeHandler = (e)=>{
        e.persist();
        validate(e);
        let value = e.target.type ==="checkbox"? e.target.checked:e.target.value;
        setFormState({
            ...formState,[e.target.name]:value
        })
    }

    const formSubmit = e =>{
        e.preventDefault();
        console.log("form submitted!");
        axios.post("https://reqres.in/api/users", formState)
        .then(response => setUsers([
            //Changed response from console.log to instead go through Users
            ...users,
            formState
        ]))
        .catch(error => console.log(error))
        setFormState({
            name: '',
            email: '',
            password: '',
            terms: false

        })
    }
        console.log(users);
    //Map Through Users and display. Form
    return (
        <div id="formContainer">
             {users.map(person => {
                return <div>
                    <h1>User</h1>
                    <div id="onboardedUsers">
                    <h2>Name: {person.name}</h2>
                    <h2>Email: {person.email}</h2>
                    </div>
                </div>
            })}
        <form onSubmit={formSubmit}
        >
            <label htmlFor="name"><span className="fieldTitle">Name:</span>
            <input id="name" type="text" name="name" placeholder="Please enter name" value={formState.name}
                onChange={changeHandler} />
                {errorState.name.length>0?(
                <p className="error">{errorState.name}</p>
            ) :null}
             </label>

            <label htmlFor="email"><span className="fieldTitle">Email:</span>
            <input id="email" type="text" name="email" placeholder="Please enter email" value={formState.email} onChange={changeHandler} />
            {errorState.email.length>0?(
                <p className="error">{errorState.email}</p>
            ) :null}
            </label>

            <label htmlFor="password"><span className="fieldTitle">Password:</span>
            <input id="password" type="text" name="password" placeholder="Please enter password" value={formState.password}
                onChange={changeHandler} />
                {errorState.password.length>0?(
                <p className="error">{errorState.password}</p>
            ) :null}
            </label>

            <label htmlFor="terms"><span className="fieldTitle">Terms of Service</span>
            <input id="terms" type="checkbox" name="terms" checked={formState.terms} onChange={changeHandler} />
            {errorState.terms.length>0?(
                <p className = "error">{errorState.terms}</p>
            ): null}
            </label>
            <button type="submit">Submit</button>
        </form>
        {console.log(formState)}
       </div>
    )

}

