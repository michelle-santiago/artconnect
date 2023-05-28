import React, { useContext, useState } from 'react'
import { loginFields } from '../constants/loginFields'
import { signIn } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext} from '../utils/providers/CurrentUserProvider';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Button, Label, TextInput } from 'flowbite-react';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field  => fieldsState[field.id] = '');

const Login = () => {
	const [ user, setUser ] = useState(fieldsState);
	const navigate = useNavigate();
	const { updateSessionToken } = useContext(CurrentUserContext)

	const handleSubmit = async (e) => { 
		e.preventDefault();
		signIn({
			email: user.emailAddress,
			password: user.password,
		})
		.then((res) => {
			updateSessionToken({
				'Authorization':  res.data.token
			});
			navigate('/home');
		})
		.catch((err) => {
			toast.error(err.response.data.error)
		});
	};

	const handleChange = (e) => {
		setUser({...user, [e.target.id] : e.target.value})
	}
	return (
		<>
			<div className='flex items-center justify-center px-10'>
				<div className='relative flex flex-1 flex-col items-center justify-center'>
				<div className='my-6 flex items-center gap-x-1'>
						<span className='whitespace-nowrap text-2xl font-semibold'>art<span className='text-secondary-500'>connect</span></span>	
				</div>
				<Card 
					horizontal
					imgSrc='/images/login.jpg'
					imgAlt=''
					className='w-full lg:max-w-screen-lg md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block'
				>
					<h1 className='mb-3 text-2xl font-bold'>
						Sign in to platform
					</h1>
					<form className='w-full' onSubmit={handleSubmit}>
						{ fields.map((field,index) =>
						<div key={index} className='mb-4 flex flex-col gap-y-3'>
							<Label htmlFor={field.labelFor} >{field.labelText}</Label>
							<input
								onChange={handleChange}
								value={user[field.id]}
								id={field.id}
								name={field.name}
								type={field.type}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-950 focus:border-primary-950 block w-full p-2.5'
								placeholder={field.placeholder}
							/>
						</div>
						)}

						<div className='mb-6'>
							<NavLink to='' className='w-1/2 text-right text-sm text-primary-600'>
								Forgot Password?
							</NavLink>
						</div>
						
						<Button type='submit' className='w-full font-semibold bg-primary-950 focus:ring-transparent hover:bg-white hover:border-solid hover:border-primary-950 hover:text-black' onSubmit = { handleSubmit }>
							Login to your account
						</Button>
						<p className='mt-6 text-sm text-gray-600'>
							Not registered?&nbsp;
							<NavLink  to='/register' className='font-semibold text-secondary-500'>
								Create account
							</NavLink>
						</p>
					</form>
				</Card>
				
				</div>
				<Toaster position='top-center' reverseOrder={false}/>
			</div>
		</>
	)
    
}

export default Login