import React, { useState } from 'react'
import { registerFields } from '../constants/registerFields'
import { signUp } from '../api/api';
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const fields = registerFields;
let fieldsState = {};
fields.forEach(field  => fieldsState[field.id] = '');

const Register = () => {
    const [ user, setUser ] = useState(fieldsState);

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp({
            first_name: user.firstName,
            last_name: user.lastName,
            username: user.userName,
            email: user.emailAddress,
            password: user.password,
            password_confirmation: user.confirmPassword,
            role: user.role
        })
			.then(res => {
                toast.success("Sign Up Successful")				
			}).catch(err => {
                // console.log(err.response.data.errors)
                let errors = err.response.data.errors
                if(errors.length > 1) {
                    errors.forEach((error)=>{
                        toast.error(error)
                    })
                }else {
                    toast.error(errors)
                }
			})
    }

    const handleChange = (e) => {
      setUser({...user, [e.target.id] : e.target.value})
    }

    return (
     <>
        <div className="flex items-center justify-center py-10">
            <div className="relative flex flex-1 flex-col items-center justify-center pb-16">
                <h1 className="">Create your account</h1>
                <form className="w-full max-w-sm" onSubmit = { handleSubmit } >
                    <div className="mb-6">
                        { fields.map((field,index) =>
                        <div key = { index } >
                            <label htmlFor = { field.labelFor } className="block text-sm font-semibold leading-6 text-gray-900">
                                { field.labelText }
                            </label>
                            <input
                                onChange = { handleChange }
                                value = { user[field.id] }
                                id = { field.id }
                                name = { field.name }
                                type = { field.name }
                                className ="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                                placeholder = { field.placeholder }
                            />
                        </div>
                        )}
                    </div>
                    <button type="submit" className="inline-flex bg-primary justify-center rounded-lg ring-1 text-sm font-semibold py-2.5 px-4  hover:bg-secondary w-full" onSubmit = { handleSubmit }>
                        Register
                    </button>
                    <div className="pt-5 space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4">
                        <p className="text-center sm:text-left">Already have an account?</p>
                        <NavLink  to="/login"  className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
                            Login
                        </NavLink>
                    </div>
                </form>
            </div>
            <Toaster position="top-center" reverseOrder = { false }/>
        </div>
    </>
    )
    
}

export default Register