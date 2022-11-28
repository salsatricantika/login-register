import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

function Dashboard() {

    let navigate = useNavigate();
    var username;
    if (sessionStorage.getItem('token') === null) {
        username = '';
    } else {
        var token = sessionStorage.getItem('token');
        var decoded = jwt_decode(token);
        username = decoded.username;
    }

    const logout = () => {
        sessionStorage.removeItem("token");
        navigate('/');
    }

    useEffect(() => {
        if (sessionStorage.getItem('token') === null) {
            navigate('/');
        } else {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-transparent shadow">
                <div className="container">
                    <h3 className="text-light">Dashboard</h3>
                    <div className="">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <button className="btn btn-danger" onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid bg-transparent">
                <div className="container2 text-light border shadow-lg">
                    Selamat Datang, <b>
                        {username}
                    </b>!
                    <p>Ini adalah halaman dashboard implementasi Login dan Register menggunakkan ReactJS-EkspressJS-MySQL menggunakkan JWT Token</p>
                    <blockquote>
                        Harapannya dengan pembelajaran ini peserta didik sudah mampu untuk membuat dan mengimplementasikan sistem Login-Register ini untuk keperluan pembuatan aplikasi yang lebih kompleks
                    </blockquote>
                </div>
            </div>
            <div className="container-fluid fixed-bottom py-3 text-center bg-transparent text-light">
                Copyright &copy; Salsa Tri Cantika - 2022
            </div>
        </>
    );
}

export default Dashboard;
