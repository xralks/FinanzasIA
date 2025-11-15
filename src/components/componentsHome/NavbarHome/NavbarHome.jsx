import "./NavbarHome.css";

const NavbarHome = () => {
    return (
        <nav>
            <div className="navbarHome">
                <div className="navbarHomeLogo">
                    <a href="/">FinanzasIA</a>
                </div>
                <div className="botonNavbarHome">
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
                </div>
            </div>
        </nav>
    );
}
export default NavbarHome;