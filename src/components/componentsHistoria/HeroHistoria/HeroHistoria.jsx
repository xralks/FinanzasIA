import './HeroHistoria.css';
import EquipoChanchito from '../../../assets/ObjetosHistoria.webp';

const HeroHistoria = () => {
    return (
        <section className="hero-nosotros">
            <div className="hero-content">
                <div className="hero-text">
                    <span className="hero-badge">Por qué existe la app</span>
                    <h1 className="hero-title">
                        Finanzas personales claras,
                        <span className="resaltarTexto"> impulsadas por inteligencia artificial</span>
                    </h1>
                    <p className="hero-description">
                        Este proyecto nace para resolver un problema común: la falta de visibilidad
                        y análisis en las finanzas personales. La aplicación centraliza ingresos y gastos,
                        genera reportes automáticos y utiliza inteligencia artificial para ofrecer
                        insights financieros personalizados, ayudando a los usuarios a tomar
                        mejores decisiones con sus datos.
                    </p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">Visualiza</span>
                            <span className="stat-label">En qué se va tu dinero</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">Analiza</span>
                            <span className="stat-label">Tu situación financiera</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">Mejora</span>
                            <span className="stat-label">Tus decisiones cada mes</span>
                        </div>
                    </div>
                </div>
                <div className="containerImgNosotros">
                    <div className="img-wrapper">
                        <img
                            src={EquipoChanchito}
                            alt="Equipo de trabajo colaborando"
                        />
                        <div className="img-overlay"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroHistoria;