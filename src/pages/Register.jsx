import React, { useState } from 'react'
import { registerFields } from '../constants/registerFields'
import { signUp } from '../api/api';
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Card,Button, Label, TextInput } from 'flowbite-react';

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
		}).then(res => {
				toast.success('Sign Up Successful')				
		}).catch(err => {
			let errors = err.response.data.errors
			if(errors.length > 1) {
				errors = errors.join('\n')	
			}
			toast.error(errors)
		})
	}

	const handleChange = (e) => {
		setUser({...user, [e.target.name] : e.target.value})
	}

	return (
		<>
			<div className='flex items-center justify-center'>
				<div className='relative flex flex-1 flex-col items-center justify-center'>
					<div className='my-6 flex items-center gap-x-1'>
						<span className='whitespace-nowrap text-2xl font-semibold'>art<span className='text-secondary-500'>connect</span></span>
					</div>
					<Card 
						horizontal
						imgSrc="/images/register.jpg"
						imgAlt=""
						className="w-full lg:max-w-screen-lg md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
					>
						<h1 className='mb-3 text-2xl font-bold'>
						Sign up to platform
						</h1>
						<form className='w-full' onSubmit={handleSubmit} >
							<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
								{ fields.map((field,index) =>
								<div key={index} >
									{ field.type !== 'radio'?
									<>
										<Label htmlFor={field.labelFor}>
												{field.labelText}
											</Label>
											<input
												onChange={handleChange}
												value={user[field.id]}
												id={field.id}
												name={field.name}
												type={field.type}
												className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-950 focus:border-primary-950 block w-full p-2.5'
												placeholder={field.placeholder}
											/>
									</>
									:
									<div className='flex items-center pl-4 border border-gray-200 rounded'>
											<input
												onChange={handleChange}
												value={field.labelText.toLowerCase()}
												id={field.id}
												name={field.name}
												type={field.type}
												className='w-4 h-4 text-primary-950 bg-gray-100 border-gray-300 focus:ring-0'
												placeholder={field.placeholder}
											/>
											<label htmlFor={field.labelFor} className='w-full py-4 ml-2 text-sm font-medium text-gray-900'>{field.labelText}</label>
									</div>
									}
								</div>
								)}
							</div>
							
							<Button type='submit' className='w-full mt-6 text-xl font-semibold bg-primary-950 focus:ring-transparent hover:bg-white hover:border-solid hover:border-primary-950 hover:text-black' onSubmit={handleSubmit}>
								Create Account
							</Button>
							<div className='mt-6 text-sm text-gray-600'>
								Already have an account?&nbsp;
								<NavLink  to='/login' className='font-semibold text-secondary-500'>
									Login
								</NavLink>
							</div>
						</form>
					</Card>
				</div>
				
				<Toaster position='top-center' reverseOrder={false}/>
			</div>
	</>
	)
    
}

export default Register