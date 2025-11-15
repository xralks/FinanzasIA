import "./BentosHome.css";

const BentosHome = () => {
    return (
        <section class="bentoSection">
            <div class="bentoGrid">

                <div class="bentoItem large">
                    <h3>Automatización</h3>
                    <p>Optimiza tareas repetitivas con IA.</p>
                </div>

                <div class="bentoItem medium">
                    <h3>Colaboración</h3>
                    <p>Conecta a tu equipo con herramientas modernas.</p>
                </div>

                <div class="bentoItem small">
                    <h3>Finanzas IA</h3>
                    <p>Análisis inteligente en tiempo real.</p>
                </div>

                <div class="bentoItem small">
                    <h3>Reportes</h3>
                    <p>Visualiza métricas y KPIs claros.</p>
                </div>

            </div>
        </section>
    );
}
export default BentosHome;