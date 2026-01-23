import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import './BentosAhorros.css';
import { supabase } from '../../../lib/supabaseClient';
import ModalMetaAhorro from '../componentsAhorros/modalMetas/ModalMetaAhorro';
import ModalConfirmacion from '../componentsAhorros/modalConfirmacion/ModalConfirmacion';

const BentosAhorros = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [metaToEdit, setMetaToEdit] = useState(null);
    const [showConfirmacion, setShowConfirmacion] = useState(false);
    const [metaAEliminar, setMetaAEliminar] = useState(null);
    const [menuAbierto, setMenuAbierto] = useState(null);

    useEffect(() => {
        fetchMetasAhorro();
    }, []);

    const fetchMetasAhorro = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                throw new Error('No estás autenticado');
            }

            const { data: metas, error: metasError } = await supabase
                .from('metas_ahorros')
                .select(`
                    id,
                    created_at,
                    nombre,
                    valor_objetivo,
                    fecha_limite,
                    completado,
                    usuario_id,
                    categoria_ahorros!metas_ahorros_categoria_fkey(nombre)
                `)
                .eq('usuario_id', user.id)
                .order('created_at', { ascending: false });

            if (metasError) {
                console.error('❌ Error al cargar metas:', metasError);
                throw metasError;
            }

            if (!metas || metas.length === 0) {
                setGoals([]);
                return;
            }

            const metasConMovimientos = await Promise.all(
                metas.map(async (meta) => {

                    const { data: movimientos, error: movError } = await supabase
                        .from('movimientos_ahorro')
                        .select('cantidad')
                        .eq('meta_ahorro_id', meta.id);

                    if (movError) {
                        console.error('Error al obtener movimientos:', movError);
                    }

                    const currentAmount = movimientos ? movimientos.reduce(
                        (sum, mov) => sum + parseFloat(mov.cantidad || 0),
                        0
                    ) : 0;

                    const monthsRemaining = meta.fecha_limite 
                        ? Math.max(0, Math.ceil(
                            (new Date(meta.fecha_limite) - new Date()) / (1000 * 60 * 60 * 24 * 30)
                        ))
                        : 0;

                    return {
                        id: meta.id,
                        titulo: meta.nombre || 'Sin nombre',
                        categoria: meta.categoria_ahorros?.nombre || 'General',
                        currentAmount: currentAmount,
                        goalAmount: parseFloat(meta.valor_objetivo || 0),
                        monthsRemaining: monthsRemaining,
                        completado: meta.completado,
                        fecha_limite: meta.fecha_limite,
                        valor_objetivo: meta.valor_objetivo
                    };
                })
            );

            setGoals(metasConMovimientos);
            
        } catch (err) {
            console.error('❌ Error:', err);
            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const handleNewMeta = () => {
        setMetaToEdit(null);
        setIsModalOpen(true);
    };

    const handleMetaSuccess = () => {
        fetchMetasAhorro();
    };

    const toggleMenu = (metaId) => {
        setMenuAbierto(menuAbierto === metaId ? null : metaId);
    };

    const handleMarcarCompletada = async (metaId) => {
        try {
            const { error } = await supabase
                .from('metas_ahorros')
                .update({ completado: true })
                .eq('id', metaId);

            if (error) throw error;

            console.log('✅ Meta marcada como completada');
            setMenuAbierto(null);
            fetchMetasAhorro();
        } catch (err) {
            console.error('❌ Error al marcar como completada:', err);
        }
    };

    const abrirConfirmacionEliminar = (metaId) => {
        setMetaAEliminar(metaId);
        setShowConfirmacion(true);
        setMenuAbierto(null);
    };

    const confirmarEliminarMeta = async () => {
        if (!metaAEliminar) return;

        try {

            const { error: movError } = await supabase
                .from('movimientos_ahorro')
                .delete()
                .eq('meta_ahorro_id', metaAEliminar);

            if (movError) throw movError;

            const { error: metaError } = await supabase
                .from('metas_ahorros')
                .delete()
                .eq('id', metaAEliminar);

            if (metaError) throw metaError;

            console.log('✅ Meta eliminada correctamente');
            fetchMetasAhorro();
        } catch (err) {
            console.error('❌ Error al eliminar meta:', err);
        } finally {
            setMetaAEliminar(null);
        }
    };

    if (loading) {
        return (
            <div className="app-container">
                <div className="app-wrapper">
                    <div className="title-section">
                        <h1 className="app-title">Cargando...</h1>
                        <p className="app-subtitle">Obteniendo tus metas de ahorro</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-container">
                <div className="app-wrapper">
                    <div className="title-section">
                        <h1 className="app-title">Error de Conexión</h1>
                        <p className="app-subtitle" style={{ color: 'red' }}>
                            ❌ {error}
                        </p>
                        <button 
                            className="boton-primario boton-medio"
                            onClick={fetchMetasAhorro}
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <div className="app-wrapper">

                <div className="title-section">
                    <div>
                        <h1 className="app-title">Mis Ahorros</h1>
                        <p className="app-subtitle">
                            Hola, bienvenido de nuevo. Aquí están tus metas de Ahorro.
                            {goals.length > 0 && ` (${goals.length} metas activas)`}
                        </p>
                    </div>
                    <button className="boton-primario" onClick={handleNewMeta}>
                        <Plus size={18} />
                        Meta de Ahorro
                    </button>
                </div>

                {goals.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <p>No tienes metas de ahorro aún. ¡Crea tu primera meta!</p>
                    </div>
                ) : (
                    <div className="containerCardsAhorros">
                        {goals.map((goal) => {
                            const percentage = goal.goalAmount > 0 
                                ? (goal.currentAmount / goal.goalAmount) * 100 
                                : 0;

                            return (
                                <div className="containerAhorrosCardsBtn" key={goal.id}>
                                    <div className="containertiempo">
                                        <a className="BtnTiempo" href='/'></a>
                                        <a className="BtnTiempo" href='/'></a>
                                    </div>


                                    <div className="cardAhorro">

                                        <div className="headCard">
                                            <span className="labelViaje">{goal.categoria}</span>
                                            <div className="menu-container">
                                                <button 
                                                    className="btnMenu"
                                                    onClick={() => toggleMenu(goal.id)}
                                                    aria-label="Opciones de meta"
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                        <circle cx="10" cy="4" r="1.5" />
                                                        <circle cx="10" cy="10" r="1.5" />
                                                        <circle cx="10" cy="16" r="1.5" />
                                                    </svg>
                                                </button>

                                                {menuAbierto === goal.id && (
                                                    <div className="dropdown-menu-meta">
                                                        {!goal.completado && (
                                                            <button 
                                                                className="menu-item-meta"
                                                                onClick={() => handleMarcarCompletada(goal.id)}
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                                </svg>
                                                                Marcar completada
                                                            </button>
                                                        )}
                                                        <button 
                                                            className="menu-item-meta menu-item-danger"
                                                            onClick={() => abrirConfirmacionEliminar(goal.id)}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                            </svg>
                                                            Eliminar meta
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
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
                                                style={{ width: `${Math.min(percentage, 100)}%` }}
                                            />
                                        </div>

                                        <div className="footerCard">
                                            <span className="tiempoRestante">
                                                {goal.monthsRemaining > 0 
                                                    ? `Faltan ${goal.monthsRemaining} meses`
                                                    : 'Sin fecha límite'
                                                }
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
                )}
                <ModalMetaAhorro
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleMetaSuccess}
                    metaToEdit={metaToEdit}
                />
                <ModalConfirmacion
                    isOpen={showConfirmacion}
                    onClose={() => {
                        setShowConfirmacion(false);
                        setMetaAEliminar(null);
                    }}
                    onConfirm={confirmarEliminarMeta}
                    titulo="¿Eliminar meta de ahorro?"
                    mensaje="Esta acción no se puede deshacer. Se eliminarán todos los movimientos asociados a esta meta."
                    textoConfirmar="Eliminar"
                    textoCancelar="Cancelar"
                    tipo="danger"
                />
            </div>
        </div>
    );
};

export default BentosAhorros;