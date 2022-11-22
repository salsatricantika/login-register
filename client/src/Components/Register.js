import { useState } from "react";
import { Link } from "react-router-dom";




function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nama, setNama] = useState('');
    const [msgusername, setMsgusername] = useState('');
    const [msgpassword, setMsgpassword] = useState('');
    const [msgnama, setMsgnama] = useState('');

    const register = () => {
        // cek username
        if (username === '') {
            setMsgusername('maap cug isi username nya dulu!')
        } else if (password === '') {
            setMsgpassword('password nya jg jangan lupa cug')
            setMsgusername('')
        } else if (nama === '')
            setMsgnama('di isi juga ya')
    }
    return (
        <>
            <div className="container py-5">
                <h1 className="text-muted">Register</h1>
                <p className="text-muted">Please add your account</p>
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
                    <label>Name</label>
                    <input type='text' className="form-control" onChange={(e) => { setNama(e.target.value) }} />
                    <b className="text-danger">{msgnama}</b>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary mt-3" onClick={register}>REGISTER</button>
                </div>
                <p className="text-muted">Have an account? Please <Link to='/'>Login</Link></p>
            </div>
        </>
    );
}

export default Register;