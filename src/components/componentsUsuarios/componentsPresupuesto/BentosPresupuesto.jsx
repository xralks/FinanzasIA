import { Plus, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import ModalPresupuesto from './modalPresupuesto/ModalPresupuesto';
import ModalConfirmacion from './modalPresupuesto/ModalConfimacionPresupuesto/ModalConfimacionPresupuesto';
import './BentosPresupuesto.css';

const Presupuestos = () => {
    const [presupuestos, setPresupuestos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [presupuestoToEdit, setPresupuestoToEdit] = useState(null);
    const [showConfirmacion, setShowConfirmacion] = useState(false);
    const [presupuestoAEliminar, setPresupuestoAEliminar] = useState(null);
    const [menuAbierto, setMenuAbierto] = useState(null);

    useEffect(() => {
        fetchPresupuestos();
    }, [mesSeleccionado]);

    const fetchPresupuestos = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                throw new Error('No estás autenticado');
            }

            const mesInicio = new Date(mesSeleccionado.getFullYear(), mesSeleccionado.getMonth(), 1);
            const mesFin = new Date(mesSeleccionado.getFullYear(), mesSeleccionado.getMonth() + 1, 0);

            const { data: presupuestosData, error: presupuestosError } = await supabase
                .from('presupuesto')
                .select(`
                    id,
                    created_at,
                    monto_estimado,
                    mes,
                    categoria_presupuesto!presupuesto_id_categoria_fkey(id, nombre)
                `)
                .eq('id_usuario', user.id)
                .gte('mes', mesInicio.toISOString())
                .lte('mes', mesFin.toISOString())
                .order('created_at', { ascending: false });

            if (presupuestosError) {
                console.error('❌ Error al cargar presupuestos:', presupuestosError);
                throw presupuestosError;
            }

            setPresupuestos(presupuestosData || []);
            
        } catch (err) {
            console.error('❌ Error:', err);
            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const calcularTotales = () => {
        const totalPresupuestado = presupuestos.reduce(
            (sum, p) => sum + parseFloat(p.monto_estimado || 0),
            0
        );
        return { totalPresupuestado };
    };

    const cambiarMes = (direccion) => {
        const nuevoMes = new Date(mesSeleccionado);
        nuevoMes.setMonth(nuevoMes.getMonth() + direccion);
        setMesSeleccionado(nuevoMes);
    };

    const formatearMes = (fecha) => {
        return fecha.toLocaleDateString('es-ES', { 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const handleNuevoPresupuesto = () => {
        setPresupuestoToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditarPresupuesto = (presupuesto) => {
        setPresupuestoToEdit(presupuesto);
        setIsModalOpen(true);
        setMenuAbierto(null);
    };

    const handlePresupuestoSuccess = () => {
        fetchPresupuestos();
    };

    const toggleMenu = (presupuestoId) => {
        setMenuAbierto(menuAbierto === presupuestoId ? null : presupuestoId);
    };

    const abrirConfirmacionEliminar = (presupuestoId) => {
        setPresupuestoAEliminar(presupuestoId);
        setShowConfirmacion(true);
        setMenuAbierto(null);
    };

    const confirmarEliminarPresupuesto = async () => {
        if (!presupuestoAEliminar) return;

        try {
            const { error } = await supabase
                .from('presupuesto')
                .delete()
                .eq('id', presupuestoAEliminar);

            if (error) throw error;

            console.log('✅ Presupuesto eliminado');
            fetchPresupuestos();
        } catch (err) {
            console.error('❌ Error al eliminar:', err);
        } finally {
            setPresupuestoAEliminar(null);
        }
    };

    const renderLoading = () => (
        <div className="contenido-loading">
            <div className="loading-spinner"></div>
            <p className="loading-text">Cargando presupuestos...</p>
        </div>
    );

    const renderError = () => (
        <div className="contenido-error">
            <h2 className="error-title">Error de Conexión</h2>
            <p className="error-message">❌ {error}</p>
            <button className="boton-primario boton-medio" onClick={fetchPresupuestos}>
                Reintentar
            </button>
        </div>
    );

    const { totalPresupuestado } = calcularTotales();

    return (
        <div className="app-container">
            <div className="app-wrapper">
                <div className="presupuesto-header-section">
                    <div className="header-info">
                        <h1 className="app-title">Presupuestos</h1>
                        <p className="app-subtitle">
                            Planifica tus gastos mensuales por categoría
                        </p>
                    </div>
                    <div className="header-mes-control">
                        <div className="mes-navegacion">
                            <button 
                                className="mes-nav-btn mes-prev" 
                                onClick={() => cambiarMes(-1)}
                                title="Mes anterior"
                                disabled={loading}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            
                            <div className="mes-display">
                                <span className="mes-nombre">{formatearMes(mesSeleccionado)}</span>
                                <button 
                                    className="mes-hoy-btn"
                                    onClick={() => setMesSeleccionado(new Date())}
                                    title="Ir al mes actual"
                                    disabled={loading}
                                >
                                    Hoy
                                </button>
                            </div>
                            
                            <button 
                                className="mes-nav-btn mes-next" 
                                onClick={() => cambiarMes(1)}
                                title="Mes siguiente"
                                disabled={loading}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                        
                        <button className="boton-primario boton-medio boton-mobile-full" onClick={handleNuevoPresupuesto}>
                            <Plus size={18} />
                            <span className="btn-text-desktop">Agregar Categoría</span>
                            <span className="btn-text-mobile">Nuevo</span>
                        </button>
                    </div>
                </div>

                {loading ? renderLoading() : error ? renderError() : (
                    <>
                        {/* Dashboard */}
                        <div className="presupuesto-dashboard">
                            <div className="dashboard-card dashboard-principal">
                                <div className="dashboard-icon-wrapper">
                                    <DollarSign size={32} />
                                </div>
                                <div className="dashboard-content">
                                    <p className="dashboard-label">Presupuesto Total del Mes</p>
                                    <p className="dashboard-valor">${totalPresupuestado.toLocaleString()}</p>
                                    <p className="dashboard-hint">
                                        {presupuestos.length} {presupuestos.length === 1 ? 'categoría' : 'categorías'} configuradas
                                    </p>
                                </div>
                            </div>

                            <div className="dashboard-card dashboard-info">
                                <TrendingUp size={20} className="info-icon" />
                                <div>
                                    <p className="info-label">Estado</p>
                                    <p className="info-value">Activo</p>
                                </div>
                            </div>

                            <div className="dashboard-card dashboard-info">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="info-icon">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <div>
                                    <p className="info-label">Periodo</p>
                                    <p className="info-value">Mensual</p>
                                </div>
                            </div>
                        </div>
                        {presupuestos.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">
                                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                </div>
                                <h3 className="empty-state-title">Sin presupuestos para {formatearMes(mesSeleccionado)}</h3>
                                <p className="empty-state-desc">
                                    Comienza agregando categorías para organizar tus gastos mensuales
                                </p>
                                <button className="boton-primario boton-largo" onClick={handleNuevoPresupuesto}>
                                    <Plus size={18} />
                                    Crear primer presupuesto
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="presupuestos-section-header">
                                    <h2 className="section-title">Categorías del mes</h2>
                                    <span className="section-count">{presupuestos.length} {presupuestos.length === 1 ? 'categoría' : 'categorías'}</span>
                                </div>
                                
                                <div className="presupuestos-grid">
                                    {presupuestos.map((presupuesto) => (
                                        <div className="presupuesto-card" key={presupuesto.id}>
                                            <div className="presupuesto-header">
                                                <div className="categoria-badge">
                                                    <span className="categoria-icono">
                                                        {getIconoCategoria(presupuesto.categoria_presupuesto?.nombre)}
                                                    </span>
                                                    <span className="categoria-nombre">
                                                        {presupuesto.categoria_presupuesto?.nombre || 'Sin categoría'}
                                                    </span>
                                                </div>
                                                
                                                <div className="menu-container">
                                                    <button 
                                                        className="btnMenu"
                                                        onClick={() => toggleMenu(presupuesto.id)}
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                            <circle cx="10" cy="4" r="1.5" />
                                                            <circle cx="10" cy="10" r="1.5" />
                                                            <circle cx="10" cy="16" r="1.5" />
                                                        </svg>
                                                    </button>

                                                    {menuAbierto === presupuesto.id && (
                                                        <div className="dropdown-menu-meta">
                                                            <button 
                                                                className="menu-item-meta"
                                                                onClick={() => handleEditarPresupuesto(presupuesto)}
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                                </svg>
                                                                Editar
                                                            </button>
                                                            <button 
                                                                className="menu-item-meta menu-item-danger"
                                                                onClick={() => abrirConfirmacionEliminar(presupuesto.id)}
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                </svg>
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="presupuesto-monto">
                                                <p className="monto-valor">${parseFloat(presupuesto.monto_estimado || 0).toLocaleString()}</p>
                                                <p className="monto-label">presupuestado</p>
                                            </div>

                                            <div className="presupuesto-progreso">
                                                <div className="progreso-bar">
                                                    <div className="progreso-fill" style={{ width: '0%' }}></div>
                                                </div>
                                                <p className="progreso-texto">$0 gastado</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
                <ModalPresupuesto
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setPresupuestoToEdit(null);
                    }}
                    onSuccess={handlePresupuestoSuccess}
                    presupuestoToEdit={presupuestoToEdit}
                    mesSeleccionado={mesSeleccionado}
                />
                 <ModalConfirmacion
                    isOpen={showConfirmacion}
                    onClose={() => {
                        setShowConfirmacion(false);
                        setPresupuestoAEliminar(null);
                    }}
                    onConfirm={confirmarEliminarPresupuesto}
                    titulo="¿Eliminar presupuesto?"
                    mensaje="Esta acción no se puede deshacer."
                    textoConfirmar="Eliminar"
                    textoCancelar="Cancelar"
                    tipo="danger"
                />

            </div>
        </div>
    );
};
const getIconoCategoria = (categoria) => {
    const iconos = {
        'Alimentación': '🍕',
        'Transporte': '🚗',
        'Vivienda': '🏠',
        'Servicios': '💡',
        'Salud': '⚕️',
        'Educación': '📚',
        'Entretenimiento': '🎮',
        'Ropa y Calzado': '👕',
        'Deudas': '💳',
        'Ahorros': '💰',
        'Otros': '📦'
    };
    return iconos[categoria] || '📌';
};

export default Presupuestos;