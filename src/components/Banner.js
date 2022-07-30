import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner() {
	
	return(

	<Row>
		<Col className="p-5">
			<h1 className="mb-3">Sample Title</h1>
			<p className="my-3">nutrition analysis, food database, and recipe search</p>
		</Col>
	</Row>
		)
}