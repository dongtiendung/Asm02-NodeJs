import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext);
    const { dispatch: dispatchLogout } = useContext(AuthContext);
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className="logo">Admin Dashboard</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <p className="title">LISTS</p>
                    <Link to="/user" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/hotel" style={{ textDecoration: 'none' }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span>Hotels</span>
                        </li>
                    </Link>
                    <Link to="/room" style={{ textDecoration: 'none' }}>
                        <li>
                            <CreditCardIcon className="icon" />
                            <span>Rooms</span>
                        </li>
                    </Link>
                    <li>
                        <Link to="/transaction" style={{ textDecoration: 'none' }}>
                            <LocalShippingIcon className="icon" />
                            <span>Transactions</span>
                        </Link>
                    </li>
                    <p className="title">NEWS</p>
                    <li>
                        <Link to="/hotel/new" style={{ textDecoration: 'none' }}>
                            <StoreIcon className="icon" />
                            <span>New Hotel</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/room/new" style={{ textDecoration: 'none' }}>
                            <CreditCardIcon className="icon" />
                            <span>New Room</span>
                        </Link>
                    </li>
                    <p className="title">USER</p>
                    <li onClick={() => dispatchLogout({ type: 'LOGOUT' })}>
                        <ExitToAppIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" onClick={() => dispatch({ type: 'LIGHT' })}></div>
                <div className="colorOption" onClick={() => dispatch({ type: 'DARK' })}></div>
            </div>
        </div>
    );
};

export default Sidebar;
