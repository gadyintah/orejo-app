import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {


	const { unsetUser, setUser } = useContext(UserContext);

	//Clear the localStorage of the user's info we will use the global state unsetUser
	unsetUser();

	useEffect(() => {
		//set the user state back to it's original value
		setUser({ accessToken: null })
	}, [])

	return(

		<Navigate to="/" />

		)
}
