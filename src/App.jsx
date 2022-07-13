import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

const backend_base_url = 'http://localhost:3044';

function App() {
    const [jobSources, setJobSources] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const getJobSources = async () => {
        setJobSources(
            (await axios.get(backend_base_url + '/job-sources')).data
        );
    };

    const userIsLoggedIn = () => {
        return Object.keys(currentUser).length > 0;
    };

    useEffect(() => {
        if (userIsLoggedIn()) {
            getJobSources();
        }
    }, []);

    const handleLoginButton = async () => {
        const response = await fetch(backend_base_url + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        setUsername('');
        setPassword('');
        if (response.ok) {
            const data = await response.json();
            getJobSources();
            setCurrentUser(data.user);
            localStorage.setItem('token', data.token);
        } else {
            setMessage('bad login');
        }
    };

    return (
        <div className="App">
            <h1>EJT Job Manager</h1>

            {userIsLoggedIn() ? (
                <>
                    <p>There are {jobSources.length} job sources:</p>
                    <ul>
                        {jobSources.map((jobSource, i) => {
                            return <li key={i}>{jobSource.name}</li>;
                        })}
                    </ul>
                </>
            ) : (
                <form className="login">
                    <div className="row">
                        username:{' '}
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            type="text"
                        />
                    </div>
                    <div className="row">
                        password:{' '}
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                        />
                    </div>
                    <div className="row">
                        <button type="button" onClick={handleLoginButton}>
                            Login
                        </button>
                    </div>
                    <div>{message}</div>
                </form>
            )}
        </div>
    );
}

export default App;
