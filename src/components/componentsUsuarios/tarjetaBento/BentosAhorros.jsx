import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import './BentosAhorros.css';
import { supabase } from '../../../lib/supabaseClient';

const BentosAhorros = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMetasAhorro();
    }, []);

    const fetchMetasAhorro = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('🔄 Intentando conectar a Supabase...');

            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.error('❌ Error al obtener usuario:', userError);
                throw new Error('No estás autenticado');
            }

            if (!user) {
                throw new Error('Debes iniciar sesión para ver tus metas');
            }

            console.log('✅ Usuario autenticado:', user.id);

            const { data: metas, error: metasError } = await supabase
                .from('metas_ahorros')
                .select('*')
                .eq('usuario_id', user.id)
                .order('created_at', { ascending: false });

            console.log('📊 Respuesta de Supabase:', { data: metas, error: metasError });

            if (metasError) {
                console.error('❌ Error de Supabase:', metasError);
                throw metasError;
            }

            if (!metas || metas.length === 0) {
                console.warn('⚠️ No tienes metas de ahorro creadas');
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
                        console.warn('⚠️ Error al obtener movimientos:', movError);
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
                        categoria: determinarCategoria(meta.nombre || ''),
                        currentAmount: currentAmount,
                        goalAmount: parseFloat(meta.valor_objetivo || 0),
                        monthsRemaining: monthsRemaining,
                        completado: meta.completado,
                        fecha_limite: meta.fecha_limite
                    };
                })
            );

            setGoals(metasConMovimientos);
            console.log('✅ Datos procesados correctamente:', metasConMovimientos);
            console.log(`✅ Total de metas cargadas: ${metasConMovimientos.length}`);
            
        } catch (err) {
            console.error('❌ Error completo:', err);
            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const determinarCategoria = (nombre) => {
        const nombreLower = nombre.toLowerCase();
        if (nombreLower.includes('viaje') || nombreLower.includes('vacacion')) return 'Viaje';
        if (nombreLower.includes('carro') || nombreLower.includes('auto') || nombreLower.includes('vehiculo')) return 'Vehículo';
        if (nombreLower.includes('emergencia') || nombreLower.includes('fondo')) return 'Seguridad';
        if (nombreLower.includes('laptop') || nombreLower.includes('compu') || nombreLower.includes('tecnolog')) return 'Tecnología';
        if (nombreLower.includes('mueble') || nombreLower.includes('casa') || nombreLower.includes('hogar')) return 'Hogar';
        return 'General';
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
                    <button className="boton-primario boton-medio">
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
            </div>
        </div>
    );
};

export default BentosAhorros;