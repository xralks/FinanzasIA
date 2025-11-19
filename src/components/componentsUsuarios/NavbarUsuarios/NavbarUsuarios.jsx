import React, { useState } from 'react';
import './NavbarUsuarios.css';

const NavbarUsuarios = () => {
    const [activeItem, setActiveItem] = useState('transactions');
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const menuItems = [
        { id: 'dashboard', icon: '⊞', label: 'Panel de control' },
        { id: 'transactions', icon: '📄', label: 'Mis presupuestos' },
        { id: 'reports', icon: '📊', label: 'Analisis' }
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className={`menuLateral ${isMenuOpen ? 'open' : ''}`}>
                <div className="menuLateralHeader">
                    <button 
                        className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className="menuLateralLogo">
                        <a href="/">
                            <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve" fill="currentColor">
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
                </div>

                <nav className="menuLateral-nav">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                            onClick={() => handleItemClick(item.id)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="menuLateral-footer">
                    <a className="boton-primario">
                        <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracurrentColorerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_icurrentColoronCarrier">
                                <title>ai</title>
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="icurrentColoron" fill="currentColor" transform="translate(64.000000, 64.000000)">
                                        <path d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z" id="Combined-Shape"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        FinancIA
                    </a>

                    <button className="settings-btn">
                        <span className="settings-icon">⚙️</span>
                        <span className="settings-label">Configuración</span>
                    </button>

                    <div className="user-profile">
                        <div className="user-avatar">RS</div>
                        <div className="user-info">
                            <div className="user-name">Ramiro Sepúlveda</div>
                            <div className="user-email">ramiroandres.sc@mail.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarUsuarios;