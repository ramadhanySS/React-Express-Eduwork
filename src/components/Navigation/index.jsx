import { NavLink } from 'react-router-dom';
import './index.scss';

const Navigation = () => {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <ul className="link-wrapper">
                    <li className="link">
                        <NavLink exact to='/'>Home</NavLink>
                    </li>
                    <li className="link">
                        <NavLink exact to='/tambah'>Tambah</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navigation;