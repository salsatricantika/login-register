import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import { FormGroup, FormControl, FormLabel, Form, Button } from "react-bootstrap";

Axios.defaults.withCredentials = true;

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nama, setNama] = useState('');
    const [validasi, setValidasi] = useState('');
    let navigate = useNavigate();

    const register = () => {
        // cek username
        if (username === '') {
            setValidasi('Username belum diisi!')
        } else if (password === '') {
            setValidasi('password belum diisi!')
        } else if (nama === '') {
            setValidasi('nama belum diisi!')
        } else {
            // proses register ketika data sudah tervalidasi
            // console.log(username, password, nama);
            Axios.post("http://localhost:3001/register", {
                username: username,
                password: password,
                nama: nama,
            }).then((response) => {
                console.log(response);
            });

            navigate('/');
        }
    };
    return (
        <>
            <main className="form-container">
                <Form className="form-box w-100 m-auto border shadow-lg">
                    <h1 className="h-3 mb-3 fw-normal text-light"><b>Register</b></h1>
                    <FormGroup className="mb-1 text-light">
                        <FormLabel><b>Username</b></FormLabel>
                        <FormControl type="text" onChange={(e) => setUsername(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-1 text-light" >
                        <FormLabel><b>Password</b></FormLabel>
                        <FormControl type="password" onChange={(e) => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-1 text-light">
                        <FormLabel><b>Nama</b></FormLabel>
                        <FormControl type="text" onChange={(e) => setNama(e.target.value)} />
                    </FormGroup>
                    <Button className="w-100 mt-3" onClick={register}><b>Register</b></Button>
                    <b><p className="text-light mt-3">Sudah Register? <Link to="/LogIn">Login</Link></p></b>
                </Form>
            </main>

            {/* <div className="container py-5">
                <h1 className="text-muted">Register</h1>
                <p className="text-muted">Please add your account</p>
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
                    <label>Name</label>
                    <input type='text' className="form-control" onChange={(e) => { setNama(e.target.value) }} />
                </div>
                <div className="form-group mt-3">
                    <button className="btn btn-primary mt-3" onClick={register}>REGISTER</button>
                </div>
                <div className="text-danger">{validasi}</div>
                <p className="text-muted mt-5">Have an account? Please <Link to='/'>Login</Link></p>
            </div> */}
        </>
    );
}

export default Register;