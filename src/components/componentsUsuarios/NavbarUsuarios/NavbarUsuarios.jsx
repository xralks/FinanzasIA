import React, { useState } from 'react';
import './NavbarUsuarios.css';

const NavbarUsuarios = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="toggle-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M16.5 4C17.3284 4 18 4.67157 18 5.5V14.5C18 15.3284 17.3284 16 16.5 16H3.5C2.67157 16 2 15.3284 2 14.5V5.5C2 4.67157 2.67157 4 3.5 4H16.5ZM7 15H16.5C16.7761 15 17 14.7761 17 14.5V5.5C17 5.22386 16.7761 5 16.5 5H7V15ZM3.5 5C3.22386 5 3 5.22386 3 5.5V14.5C3 14.7761 3.22386 15 3.5 15H6V5H3.5Z"></path>
          </svg>
        </button>
      </div>
      <div className="nav-main">
        <a href="/new" className="new-chat-button">
          <div className="new-chat-icon">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="white">
              <path d="M10 3C10.4142 3 10.75 3.33579 10.75 3.75V9.25H16.25C16.6642 9.25 17 9.58579 17 10C17 10.3882 16.7051 10.7075 16.3271 10.7461L16.25 10.75H10.75V16.25C10.75 16.6642 10.4142 17 10 17C9.58579 17 9.25 16.6642 9.25 16.25V10.75H3.75C3.33579 10.75 3 10.4142 3 10C3 9.58579 3.33579 9.25 3.75 9.25H9.25V3.75C9.25 3.33579 9.58579 3 10 3Z"></path>
            </svg>
          </div>
          <span className="new-chat-label">Nuevo chat</span>
        </a>
        <NavItem
          icon={
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 4C2 2.89543 2.89543 2 4 2H6C7.10457 2 8 2.89543 8 4V6C8 7.10457 7.10457 8 6 8H4C2.89543 8 2 7.10457 2 6V4ZM12 4C12 2.89543 12.8954 2 14 2H16C17.1046 2 18 2.89543 18 4V6C18 7.10457 17.1046 8 16 8H14C12.8954 8 12 7.10457 12 6V4ZM2 14C2 12.8954 2.89543 12 4 12H6C7.10457 12 8 12.8954 8 14V16C8 17.1046 7.10457 18 6 18H4C2.89543 18 2 17.1046 2 16V14ZM14 12C12.8954 12 12 12.8954 12 14V16C12 17.1046 12.8954 18 14 18H16C17.1046 18 18 17.1046 18 16V14C18 12.8954 17.1046 12 16 12H14Z"></path>
            </svg>
          }
          label="Mi Panel"
          href="/Mi-Panel"
        />
        <NavItem
          icon={
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 4C6 2.89543 6.89543 2 8 2H12C13.1046 2 14 2.89543 14 4V6H15C16.1046 6 17 6.89543 17 8V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V8C3 6.89543 3.89543 6 5 6H6V4ZM8 6H12V4H8V6Z"></path>
            </svg>
          }
          label="Transacciones"
          href="/Transacciones"
          isActive={true}
        />
        <NavItem
          icon={
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 17V3H4V17H2ZM6 17V9H8V17H6ZM10 17V6H12V17H10ZM14 17V12H16V17H14Z"></path>
            </svg>
          }
          label="Reportes"
          href="/Reportes"
        />
      </div>
      <div className="spacer" />
      <div className="sidebar-bottom">
        <button className="boton-primario boton-largo">
          {isExpanded ? 'FinancIA' : '+'}
        </button>
        <NavItem
          icon={
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2.5C10.3956 2.5 10.7423 2.78213 10.8374 3.16577L11.2571 4.82787C11.5714 4.95393 11.8712 5.10779 12.1533 5.28652L13.7121 4.59727C14.0663 4.43435 14.4878 4.55749 14.6982 4.88508L15.6982 6.61492C15.9086 6.94251 15.8384 7.38113 15.5347 7.62867L14.2935 8.60528C14.3296 8.89934 14.3485 9.19769 14.3497 9.49886L14.35 9.50086L14.3497 9.50286C14.3485 9.80403 14.3296 10.1024 14.2935 10.3964L15.5347 11.373C15.8384 11.6206 15.9086 12.0592 15.6982 12.3868L14.6982 14.1166C14.4878 14.4442 14.0663 14.5674 13.7121 14.4044L12.1533 13.7152C11.8712 13.8939 11.5714 14.0478 11.2571 14.1738L10.8374 15.8359C10.7423 16.2196 10.3956 16.5017 10 16.5017C9.60436 16.5017 9.25768 16.2196 9.16263 15.8359L8.74286 14.1738C8.42857 14.0478 8.12883 13.8939 7.8467 13.7152L6.28788 14.4044C5.93366 14.5674 5.51224 14.4442 5.30176 14.1166L4.30176 12.3868C4.09136 12.0592 4.16159 11.6206 4.46527 11.373L5.70647 10.3964C5.67041 10.1024 5.65148 9.80403 5.65025 9.50286L5.65 9.50086L5.65025 9.49886C5.65148 9.19769 5.67041 8.89934 5.70647 8.60528L4.46527 7.62867C4.16159 7.38113 4.09136 6.94251 4.30176 6.61492L5.30176 4.88508C5.51224 4.55749 5.93366 4.43435 6.28788 4.59727L7.8467 5.28652C8.12883 5.10779 8.42857 4.95393 8.74286 4.82787L9.16263 3.16577C9.25768 2.78213 9.60436 2.5 10 2.5ZM10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z"></path>
            </svg>
          }
          label="Configuración"
          href="/Configuracion"
        />
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="user-menu-button"
        >
          <div className="user-avatar">RS</div>
          <div className="user-info">
            <span className="user-name">Ramiro Sepúlveda</span>
            <span className="user-email">Ramiroandres.sc@gmail.com</span>
          </div>
          {isExpanded && (
            <svg width="14" height="14" viewBox="0 0 256 256" fill="#9ca3af" className="user-menu-arrow">
              <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, label, href, isActive = false }) => {
  return (
    <a href={href} className={`nav-item ${isActive ? 'active' : ''}`}>
      <div className="nav-item-icon">{icon}</div>
      <span className="nav-item-label">{label}</span>
    </a>
  );
};

export default NavbarUsuarios;