import React from 'react';
import logo from '../logo.svg';
import Banner from '../components/Banner';

export default function Home() {
	return(
		<>
			

            <div className="App">
                <header className="App-header">
                    <Banner/>
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                    Eto na ang simula. 12 days to go for Software Engineer! 🍻
                    </p>
                    <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Learn React
                    </a>
                </header>
            </div>
			
		</>
		)
}