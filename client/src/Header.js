import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function Header() {
    return <div>
    
    <nav style={{ background: "linear-gradient(#FFFFFF, #9198e5)" }} className="navbar navbar-light navbar-expand-lg">
    <a className="navbar-brand text-light" href="http://localhost:3000/"><img style={{ height: "40px", width: "90px"}} src="https://gusec.edu.in/wp-content/uploads/2019/08/GU-GUSEC-High-Res-e1581884201629.png" width="50" height="35" className="d-inline-block align-top m-2 ms-3" alt="" /></a>
        <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
                <Button href="/login">Login</Button>
            </li>
            <li className="nav-item">
                <Button href="/apply">Apply</Button>
            </li>
        </ul>
</nav>

    </div>
}

export default Header;