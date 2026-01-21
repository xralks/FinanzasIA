import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import "./NavbarHome.css";

const NavbarHome = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const getInitials = () => {
        if (!user) return '';

        const fullName = user.user_metadata?.full_name || user.email;
        
        if (fullName.includes('@')) {

            return fullName.substring(0, 2).toUpperCase();
        }

        const names = fullName.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        
        return fullName.substring(0, 2).toUpperCase();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        const { error } = await signOut();
        if (!error) {
            setShowMenu(false);
            navigate('/');
        }
    };

    return (
        <nav>
            <div className="navbarHome">
                <div className="navbarHomeLogo">
                    <a href="/">
                        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor">
                            <g>
                                <circle fill="currentColor" cx="32" cy="14" r="3"></circle>
                                <path fill="currentColor" d="M4,25h56c1.794,0,3.368-1.194,3.852-2.922c0.484-1.728-0.242-3.566-1.775-4.497l-28-17 C33.438,0.193,32.719,0,32,0s-1.438,0.193-2.076,0.581l-28,17c-1.533,0.931-2.26,2.77-1.775,4.497C0.632,23.806,2.206,25,4,25z M32,9c2.762,0,5,2.238,5,5s-2.238,5-5,5s-5-2.238-5-5S29.238,9,32,9z"></path>
                                <rect x="34" y="27" fill="currentColor" width="8" height="25"></rect>
                                <rect x="46" y="27" fill="currentColor" width="8" height="25"></rect>
                                <rect x="22" y="27" fill="currentColor" width="8" height="25"></rect>
                                <rect x="10" y="27" fill="currentColor" width="8" height="25"></rect>
                                <path fill="currentColor" d="M4,58h56c0-2.209-1.791-4-4-4H8C5.791,54,4,55.791,4,58z"></path>
                                <path fill="currentColor" d="M63.445,60H0.555C0.211,60.591,0,61.268,0,62v2h64v-2C64,61.268,63.789,60.591,63.445,60z"></path>
                            </g>
                        </svg>
                        FinanzasIA
                    </a>
                </div>

                <div className="botonNavbarHome">
                    {user ? (
                        <div className="userMenuContainer" ref={menuRef}>
                            <button 
                                className="userAvatar"
                                onClick={() => setShowMenu(!showMenu)}
                                aria-label="Menú de usuario"
                            >
                                {getInitials()}
                            </button>

                            {showMenu && (
                                <div className="userDropdownMenu">
                                    <div className="userInfo">
                                        <div className="userAvatarLarge">
                                            {getInitials()}
                                        </div>
                                        <div className="userDetails">
                                            <p className="userName">{user.user_metadata?.full_name || 'Usuario'}</p>
                                            <p className="userEmail">{user.email}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="menuDivider"></div>
                                    
                                    <button 
                                        className="menuItem"
                                        onClick={() => {
                                            navigate('/Mi-Panel');
                                            setShowMenu(false);
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="14" width="7" height="7"></rect>
                                            <rect x="3" y="14" width="7" height="7"></rect>
                                        </svg>
                                        Mi Panel
                                    </button>

                                    <button 
                                        className="menuItem"
                                        onClick={() => {
                                            navigate('/Ahorros');
                                            setShowMenu(false);
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        Mis Ahorros
                                    </button>

                                    <button 
                                        className="menuItem"
                                        onClick={() => {
                                            navigate('/Transacciones');
                                            setShowMenu(false);
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="12" y1="1" x2="12" y2="23"></line>
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                        </svg>
                                        Transacciones
                                    </button>

                                    <div className="menuDivider"></div>

                                    <button 
                                        className="menuItem menuItemLogout"
                                        onClick={handleLogout}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <a href="/Inicio-Sesion" className="boton-primario">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                style={{ marginRight: "8px", verticalAlign: "middle" }}
                            >
                                <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.33 0-10 1.667-10 5v3h20v-3c0-3.333-6.67-5-10-5z" />
                            </svg>
                            Acceder
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavbarHome;