import HeroFinanzasia from "../../../assets/HeroFinanzasia.webp";
import "./HeroHome.css";

const HeroHome = () => {
    return (
        <div>
            <section className="HeroSection">
                <div className="HeroContTexto">
                    <h1>Toma el control de tus Finanzas</h1>
                    <p>La forma más simple de gestionar tu dinero. Ahorra, presupuesta y alcanza tus metas financieras sin complicaciones.</p>
                    <div className="containerBotonesHero">
                        <a href="/Inicio-Sesion" className="boton-primario">Comenzar ahora</a>
                        <a href="/Historia" className="boton-secundario">Saber Más</a>
                    </div>
                </div>
                <div className="HeroContImg">
                    <img src={HeroFinanzasia} alt="" />
                </div>
            </section>
        </div>
    );
};

export default HeroHome;
