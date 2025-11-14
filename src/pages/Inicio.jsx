import '../styles/Inicio.css'

const Inicio = () => {
  return (
    <div>
      <section className="Hero-section">
        <div className="Hero-cont-texto">
          <h1>FinanzasIA</h1>
          <p>Tu Asistente de Finanzas Personales Inteligente</p>
          <div className="container-botones-hero">
            <a href="/cursos" className="boton-primario boton-largo">Comenzar ahora</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
