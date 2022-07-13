import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

const backend_url =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:3044/job-sources';

console.log(backend_url);
function App() {
    const [jobSources, setJobSources] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    const getJobSources = async () => {
        setJobSources((await axios.get(backend_url)).data);
    };

    const userIsLoggedIn = () => {
        return Object.keys(currentUser).length > 0;
    };

    useEffect(() => {
        if (userIsLoggedIn()) {
            getJobSources();
        }
    }, []);

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
                    <h2>Login...</h2>
                </form>
            )}
        </div>
    );
}

export default App;
