import "./BentosHome.css";

const BentosHome = () => {
    return (
        <section className="bentoSection">
            <div className="bentoGrid">

                <div className="bentoItem large">
                    <h3>Automatización</h3>
                    <p>Optimiza tareas repetitivas con IA.</p>
                </div>

                <div className="bentoItem medium">
                    <h3>Colaboración</h3>
                    <p>Conecta a tu equipo con herramientas modernas.</p>
                </div>

                <div className="bentoItem small">
                    <h3>Finanzas IA</h3>
                    <p>Análisis inteligente en tiempo real.</p>
                </div>

                <div className="bentoItem small">
                    <h3>Reportes</h3>
                    <p>Visualiza métricas y KPIs claros.</p>
                </div>

            </div>
        </section>
    );
}
export default BentosHome;