import { useState } from "react";
import { Link } from "react-router-dom";




function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msgusername, setMsgusername] = useState('');
    const [msgpassword, setMsgpassword] = useState('');

    const login = () => {
        // cek username
        if (username === '') {
            setMsgusername('maap cug isi username nya dulu!')
        } else if (password === '') {
            setMsgpassword('password nya jg jangan lupa cug')
            setMsgusername('')
        }
    }
    return (
        <>
            <div className="container py-5">
                <h1 className="text-muted">Login</h1>
                <p className="text-muted">Please Login to authenticate</p>
                <hr />
                <div className="form-group">
                    <label>Username</label>
                    <input type='text' className="form-control " onChange={(e) => { setUsername(e.target.value) }} />
                    <b className="text-danger">{msgusername}</b>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type='password' className="form-control" onChange={(e) => { setPassword(e.target.value) }} />
                    <b className="text-danger">{msgpassword}</b>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary mt-3" onClick={login}>LOGIN</button>
                </div>
                <p className="text-muted">Don't have account? Please <Link to='/register'>register</Link></p>
            </div>
        </>
    );
}

export default Login;