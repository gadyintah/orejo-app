import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default function ErrorPage() {
	return (
		<Row>
			<Col>
				<h1>404 - Page Not Found</h1>
				<p>Nawala ka sa aking pahina</p>
				<Button variant="primary" as={ Link } to="/"> Back to Home </Button>
			</Col>
		</Row>
		)
}
