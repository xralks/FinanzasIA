import '../styles/Inicio.css'

export default function Inicio() {
  return (
    <div>
      <section className="Hero-section">
        <div className="Hero-cont-texto">
          <h1>FinanzasIA</h1>
          <p>Tu Asistente de Finanzas Personales Inteligente</p>
          <div className="container-botones-hero">
            <a href="/cursos" className="btn-primario">Ver Cursos</a>
            <a href="/contacto" className="btn-segundario">Contacto</a>
          </div>
        </div>
      </section>
    </div>
  )
}