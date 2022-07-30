import React, { useState, useEffect, useContext } from 'react';
//useContext is used to unpack or deconstruct the value of the UserContext
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Login() {

	const navigate = useNavigate();

	//Allows us to consume the User context object and it's properties to use for user validation
	const { user, setUser } = useContext(UserContext);

	//State hooks to store the values of the input fields
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	//login button
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		//Validation to enable submit button 
		if(email !== '' && password !== '') {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password])

/*Notes:
	fetch() is a method in JS, which allows to send a request to an API and process its response.

	Syntax:

	fetch('url', {options}).then(response => response.json()).then(data => {console.log(data)})

	-'url' = the url coming from the API/server
	-{optional object} = it contains additional information about our requests such as method, body and headers (Content-Type: application/json) or any other info.
	-then(response => response.json()) = parse the response as JSON
	-.then(data => {console.log(data)}) = process the actual data 


*/

	function authenticate(e) {
		e.preventDefault();

		fetch('https://my-app-current.herokuapp.com/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(response => response.json())
		.then(data => {
			console.log(data)

			if(data.accessToken !== undefined){
				localStorage.setItem('accessToken', data.accessToken);
				setUser({ accessToken: data.accessToken });

				Swal.fire({
					title:'Yay!',
					icon: 'success',
					text: 'Successfully Logged in'
				})

				//Getting the user's credentials
				fetch('https://my-app-current.herokuapp.com/getUserDetails', {
					headers: {
						Authorization: `Bearer ${data.accessToken}`
					}
				})
				.then(res => res.json())
				.then(result => {
					console.log(result)
					if(result.isAdmin === true) {
						localStorage.setItem('email', result.email)
						localStorage.setItem('isAdmin', result.isAdmin)
						setUser({
							email: result.email,
							isAdmin: result.isAdmin
						})

						//redirect the admin to /courses
						navigate('/courses')

					}else {
						//if not an admin, redirect to homepage
						navigate('/')
					}
				})

			}else {
				Swal.fire({
					title: 'Ooops!',
					icon: 'error',
					text: 'Something Went Wrong. Check your Credentials.'
				})
			}

			setEmail('');
			setPassword('');

		})
	}
	
	return (
		// Create a conditional rendering statement that will redirect the user to the courses page when a user is logged in.

		(user.accessToken !== null) ?

		<Navigate to="/courses" />

		:

		<Form onSubmit={(e) => authenticate(e)}>
			<h1>Login</h1>
			<Form.Group>
				<Form.Label>Email address:</Form.Label>
				<Form.Control 
					type="email"
					placeholder="Enter email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}

				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control 
					type="password"
					placeholder="Enter your password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					
				/>
			</Form.Group>

			{isActive ?
				<Button variant="primary" type="submit" className="mt-3"> Login </Button>

				:

				<Button variant="danger" type="submit" disabled className="mt-3"> Login </Button>
			}

			
		</Form>
		)
}
