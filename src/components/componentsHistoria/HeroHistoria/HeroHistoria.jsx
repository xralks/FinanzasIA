import './HeroHistoria.css';
import EquipoChanchito from '../../../assets/EquipoChanchito.webp';

const HeroHistoria = () => {
    return (
        <section className="hero-nosotros">
            <div className="hero-content">
                <div className="hero-text">
                    <span className="hero-badge">Quiénes Somos</span>
                    <h1 className="hero-title">
                        Transformando ideas en 
                        <span className="subrayado"> soluciones digitales</span>
                    </h1>
                    <p className="hero-description">
                        Somos un equipo apasionado de profesionales dedicados a crear experiencias
                        digitales excepcionales que impulsan el crecimiento de tu negocio.
                    </p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">1+</span>
                            <span className="stat-label">Año creando software</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Proyectos personalizados</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Compromiso con la calidad</span>
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