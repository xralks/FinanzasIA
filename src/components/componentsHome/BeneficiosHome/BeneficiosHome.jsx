import "./BeneficiosHome.css";

const BeneficiosHome = () => {
    return (
        <section className="beneficiosHome">
            <h2 className="beneficiosHomeTitulo">Beneficios de usar <span className="resaltarTexto">FinanzasIA</span></h2>
            <div className="beneficiosHomeLista">
                <div className="beneficioItem">
                    <h3 className="beneficioItemTitulo">Visualiza tus gastos</h3>
                    <p className="beneficioItemDescripcion">Indícale a la app tu presupuesto mensual y registra tus gastos para obtener una visión clara de en qué se va tu dinero.</p>
                </div>
                <div className="beneficioItem">
                    <h3 className="beneficioItemTitulo">Crea presupuestos personalizados</h3>
                    <p className="beneficioItemDescripcio">Establece límites de gasto por categoría y recibe alertas inteligentes que te ayudan a mantener el control de tus finanzas.</p>
                </div>
                <div className="beneficioItem">
                    <h3 className="beneficioItemTitulo">Alcanza tus metas</h3>
                    <p className="beneficioItemDescripcio">Define tus metas financieras y sigue tu progreso paso a paso para hacerlas realidad más rápido.</p>
                </div>
            </div>
        </section>
    )
};
export default BeneficiosHome;