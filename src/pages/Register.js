import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';

export default function Register() {

	const { user } = useContext(UserContext);

	//State hooks to store the values of the input fields
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');

	//State to determine whether submit button is enabled or not for conditional rendering
	const [isActive, setIsActive] = useState(true);


	useEffect(() => {
		//Validation to enable submit button when all fields are populated and both passwords match
		if((email !== '' && password1 !== '' && password2 !== '') && (password1 === password2)){
			setIsActive(true);
		}else {
			setIsActive(false);
		}
	}, [email, password1, password2])


	function registerUser(e) {
		//Prevents page redirection via form submission
		e.preventDefault();

		//Clear input fields
		setEmail('');
		setPassword1('');
		setPassword2('');

		Swal.fire({
			title: "Yaaaaaaaaay!",
			icon: "success",
			text: "You have successfully registered"
		})

	}

	return (

		//Conditional rendering
		(user.accessToken !== null) ? 

		<Navigate to="/" />

		:

		<Form onSubmit={(e) => registerUser(e)}>
			<h1>Register</h1>
			<Form.Group> 
				<Form.Label>Email Adress</Form.Label>
				<Form.Control 
					type="email"
					placeholder="Enter Email"
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else
					</Form.Text>
			</Form.Group>

			<Form.Group> 
				<Form.Label>Password</Form.Label>
				<Form.Control 
					type="password"
					placeholder="Enter Password"
					required
					value={password1}
					onChange={e => setPassword1(e.target.value)}
					/>
			</Form.Group>

			<Form.Group> 
				<Form.Label>Verify Password</Form.Label>
				<Form.Control 
					type="password"
					placeholder="Verify Password"
					required
					value={password2}
					onChange={e => setPassword2(e.target.value)}
					/>
			</Form.Group>
			{isActive ? 
				<Button variant="primary" type="submit" className="mt-3">Submit</Button>

				:

				<Button variant="primary" type="submit" className="mt-3" disabled>Submit</Button>

			}
			
		</Form>

		)
}
