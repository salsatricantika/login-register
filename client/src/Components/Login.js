import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { FormControl, FormGroup, Form, FormLabel, Button } from "react-bootstrap";

Axios.defaults.withCredentials = true;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    let navigate = useNavigate();

    const login = () => {
        // cek username
        if (username === '') {
            setStatus('username belum diisi!')
        } else if (password === '') {
            setStatus('password belum diisi!')
        } else {
            Axios.post("http://localhost:3001/login", {
                username: username,
                password: password,
            }).then((response) => {
                if (response.data.message) {
                    setStatus(response.data.message);
                } else {
                    sessionStorage.setItem('token', response.data);
                    navigate('/dashboard');
                }
            });
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("token") === null) {
            navigate('/');
        } else {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <>
            <b>
                <main className="form-container">
                    <Form className="form-box w-100 m-auto shadow-lg border">
                        <h1 className="h-3 mb-3 fw-normal text-light"><b>Login</b></h1>
                        <FormGroup className="mb-1 text-light">
                            <FormLabel>Username</FormLabel>
                            <FormControl type="text" className="bg-light" onChange={(e) => setUsername(e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-1 text-light">
                            <FormLabel>Password</FormLabel>
                            <FormControl type="password" onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>
                        <Button className="w-100 mt-3" onClick={login}><b>Login</b></Button>
                        <p className="text-light">Belum Register? <Link to="/register">Registrasi</Link></p>
                    </Form>
                </main>
            </b>
            {/* <div className="container py-5">
                <h1 className="text-muted">Login</h1>
                <p className="text-muted">Please Login to authenticate</p>
                <hr />
                <div className="form-group">
                    <label>Username</label>
                    <input type='text' className="form-control " onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type='password' className="form-control" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary mt-3" onClick={login}>LOGIN</button>
                </div>
                <div className="text-danger my-1">{status}</div>
                <p className="text-muted mt-5">Don't have account? Please <Link to='/register'>register</Link></p>
            </div> */}
        </>
    );
}

export default Login;