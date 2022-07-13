import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

const backend_base_url = 'http://localhost:3044';

function App() {
    const [jobSources, setJobSources] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const getJobSources = async () => {
        setJobSources((await axios.get(backend_base_url + '/job-sources')).data);
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
        const _currentUser = (await axios.post(backend_base_url + '/login')).data;
        getJobSources();
        setCurrentUser(_currentUser);
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
                </form>
            )}
        </div>
    );
}

export default App;
