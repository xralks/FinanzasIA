import { Plus } from 'lucide-react';
import './BentosAhorros.css';

const BentosAhorros = () => {

    const goals = [
        {
            titulo: "Vacaciones en Japón",
            categoria: "Viaje",
            currentAmount: 4500000,
            goalAmount: 5000000,
            monthsRemaining: 5,
        },
        {
            titulo: "Ahorro para Carro",
            categoria: "Vehículo",
            currentAmount: 12000000,
            goalAmount: 25000000,
            monthsRemaining: 12,
        },
        {
            titulo: "Fondo de Emergencias",
            categoria: "Seguridad",
            currentAmount: 2000000,
            goalAmount: 10000000,
            monthsRemaining: 8,
        },
        {
            titulo: "Nueva Laptop",
            categoria: "Tecnología",
            currentAmount: 1500000,
            goalAmount: 5000000,
            monthsRemaining: 4,
        },
        {
            titulo: "Mueble nuevo",
            categoria: "Hogar",
            currentAmount: 800000,
            goalAmount: 3000000,
            monthsRemaining: 6,
        }
    ];

    return (
        <div className="app-container">
            <div className="app-wrapper">
                <div className="title-section">
                    <div>
                        <h1 className="app-title">Mis Ahorros</h1>
                        <p className="app-subtitle">
                            Hola, bienvenido de nuevo. Aquí están tus metas de Ahorro.
                        </p>
                    </div>
                    <button className="boton-primario boton-medio">
                        <Plus size={18} />
                        Meta de Ahorro
                    </button>
                </div>

                <div className="containerCardsAhorros">

                    {goals.map((goal, index) => {
                        const percentage = (goal.currentAmount / goal.goalAmount) * 100;

                        return (
                            <div className="containerAhorrosCardsBtn" key={index}>
                                <div className="containertiempo">
                                    <a className="BtnTiempo" href='/'></a>
                                    <a className="BtnTiempo" href='/'></a>
                                </div>

                                <div className="cardAhorro">
                                    <div className="headCard">
                                        <span className="labelViaje">{goal.categoria}</span>
                                        <button className="btnMenu">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <circle cx="10" cy="4" r="1.5" />
                                                <circle cx="10" cy="10" r="1.5" />
                                                <circle cx="10" cy="16" r="1.5" />
                                            </svg>
                                        </button>
                                    </div>

                                    <h2>{goal.titulo}</h2>

                                    <div className="montoSection">
                                        <div className="montoActual">
                                            <span className="montoGrande">
                                                ${goal.currentAmount.toLocaleString()}
                                            </span>
                                            <span className="montoMeta">
                                                / ${goal.goalAmount.toLocaleString()}
                                            </span>
                                        </div>
                                        <span className="porcentaje">{percentage.toFixed(0)}%</span>
                                    </div>

                                    <div className="barraProgreso">
                                        <div
                                            className="barraProgresoFill"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>

                                    <div className="footerCard">
                                        <span className="tiempoRestante">
                                            Faltan {goal.monthsRemaining} meses
                                        </span>
                                        <div className='hola'>
                                            <button className="boton-primario boton-medio">
                                                <Plus size={18} />
                                                Añadir Fondo
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}

                </div>

            </div>
        </div>
    );
};

export default BentosAhorros;
