import { Bell, Plus, CreditCard, Wallet, PiggyBank, TrendingUp, ShoppingCart, DollarSign, Film, Users } from 'lucide-react';
import './BentosTransacciones.css';

const BentosTransacciones = () => {
    // Configuración del grid - Totalmente modificable
    const configuracionBento = {
        filas: 3,
        columnas: 3,
        gap: '1.5rem',
        // Matriz de tarjetas con sus posiciones y tamaños
        tarjetas: [
            {
                id: 'saldos-cuentas',
                filaInicio: 1,
                filaFin: 2,
                columnaInicio: 1,
                columnaFin: 3,
                componente: 'SaldosCuentas'
            },
            {
                id: 'resumen-gastos',
                filaInicio: 1,
                filaFin: 2,
                columnaInicio: 3,
                columnaFin: 4,
                componente: 'ResumenGastos'
            },
            {
                id: 'transacciones-recientes',
                filaInicio: 2,
                filaFin: 4,
                columnaInicio: 1,
                columnaFin: 4,
                componente: 'TransaccionesRecientes'
            }
        ]
    };

    const obtenerEstiloGrid = () => ({
        display: 'grid',
        gridTemplateRows: `repeat(${configuracionBento.filas}, minmax(200px, auto))`,
        gridTemplateColumns: `repeat(${configuracionBento.columnas}, 1fr)`,
        gap: configuracionBento.gap
    });

    const obtenerEstiloTarjeta = (tarjeta) => ({
        gridRow: `${tarjeta.filaInicio} / ${tarjeta.filaFin}`,
        gridColumn: `${tarjeta.columnaInicio} / ${tarjeta.columnaFin}`
    });

    const componentes = {
        SaldosCuentas: () => (
            <>
                <h2 className="titulo-tarjeta">Saldos de Cuentas</h2>
                <div className="grilla-cuentas">
                    <div className="tarjeta-cuenta cuenta-ahorros">
                        <div className="encabezado-cuenta">
                            <PiggyBank size={18} />
                            <span className="etiqueta-cuenta">Cuenta de Ahorros</span>
                        </div>
                        <div className="monto-cuenta">$12,450.75</div>
                    </div>

                    <div className="tarjeta-cuenta cuenta-corriente">
                        <div className="encabezado-cuenta">
                            <Wallet size={18} />
                            <span className="etiqueta-cuenta">Cuenta Corriente</span>
                        </div>
                        <div className="monto-cuenta">$2,890.20</div>
                    </div>

                    <div className="tarjeta-cuenta cuenta-credito">
                        <div className="encabezado-cuenta">
                            <CreditCard size={18} />
                            <span className="etiqueta-cuenta">Tarjeta de Crédito</span>
                        </div>
                        <div className="monto-cuenta monto-credito">-$540.30</div>
                    </div>
                </div>
            </>
        ),
        
        ResumenGastos: () => (
            <>
                <h2 className="titulo-tarjeta">Resumen de Gastos</h2>
                <div className="grafico-gastos">
                    <div className="circulo-grafico">
                        <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" className="circle-bg" />
                            <circle cx="50" cy="50" r="40" className="circle-segment segment-1" />
                            <circle cx="50" cy="50" r="40" className="circle-segment segment-2" />
                            <circle cx="50" cy="50" r="40" className="circle-segment segment-3" />
                            <circle cx="50" cy="50" r="40" className="circle-segment segment-4" />
                        </svg>
                        <div className="centro-grafico">
                            <div className="etiqueta-grafico">Total Gastado</div>
                            <div className="valor-grafico">$1,850.00</div>
                        </div>
                    </div>
                </div>
                <div className="leyenda-gastos">
                    <div className="item-leyenda">
                        <div className="punto-leyenda" style={{ background: '#10b981' }} />
                        <span className="etiqueta-leyenda">Comida</span>
                        <span className="valor-leyenda">$740</span>
                    </div>
                    <div className="item-leyenda">
                        <div className="punto-leyenda" style={{ background: '#f59e0b' }} />
                        <span className="etiqueta-leyenda">Transporte</span>
                        <span className="valor-leyenda">$555</span>
                    </div>
                    <div className="item-leyenda">
                        <div className="punto-leyenda" style={{ background: '#ef4444' }} />
                        <span className="etiqueta-leyenda">Ocio</span>
                        <span className="valor-leyenda">$370</span>
                    </div>
                    <div className="item-leyenda">
                        <div className="punto-leyenda" style={{ background: '#8b5cf6' }} />
                        <span className="etiqueta-leyenda">Otros</span>
                        <span className="valor-leyenda">$185</span>
                    </div>
                </div>
            </>
        ),

        TransaccionesRecientes: () => (
            <>
                <h2 className="titulo-tarjeta">Transacciones Recientes</h2>
                <div className="lista-transacciones">
                    <div className="item-transaccion">
                        <div className="icono-transaccion icono-verde">
                            <ShoppingCart size={20} />
                        </div>
                        <div className="info-transaccion">
                            <div className="nombre-transaccion">Supermercado XYZ</div>
                            <div className="fecha-transaccion">15 Oct, 2023</div>
                        </div>
                        <div className="monto-transaccion">-$85.50</div>
                    </div>

                    <div className="item-transaccion">
                        <div className="icono-transaccion icono-verde">
                            <DollarSign size={20} />
                        </div>
                        <div className="info-transaccion">
                            <div className="nombre-transaccion">Pago de Salario</div>
                            <div className="fecha-transaccion">15 Oct, 2023</div>
                        </div>
                        <div className="monto-transaccion positivo">+$2,500.00</div>
                    </div>

                    <div className="item-transaccion">
                        <div className="icono-transaccion icono-morado">
                            <Film size={20} />
                        </div>
                        <div className="info-transaccion">
                            <div className="nombre-transaccion">Cineplex Entradas</div>
                            <div className="fecha-transaccion">14 Oct, 2023</div>
                        </div>
                        <div className="monto-transaccion">-$25.00</div>
                    </div>

                    <div className="item-transaccion">
                        <div className="icono-transaccion icono-naranja">
                            <Users size={20} />
                        </div>
                        <div className="info-transaccion">
                            <div className="nombre-transaccion">Restaurante La Piazza</div>
                            <div className="fecha-transaccion">12 Oct, 2023</div>
                        </div>
                        <div className="monto-transaccion">-$62.30</div>
                    </div>
                </div>
                <div className='contenedor-boton-mas'>
                    <a href="/Inicio-Sesion" className="boton-primario boton-largo mas">Ver más Transacciones</a>
                </div>
            </>
        )
    };

    return (
        <div className="contenedor-app">
            <div className="envoltorio-app">
                <div className="seccion-titulo">
                    <div>
                        <h1 className="titulo-app">Mis Transacciones</h1>
                        <p className="subtitulo-app">
                            Hola, aquí está tu resumen financiero mensual.
                        </p>
                    </div>
                </div>
                
                {/* Bento Grid Dinámico */}
                <div className="grilla-bento-principal" style={obtenerEstiloGrid()}>
                    {configuracionBento.tarjetas.map((tarjeta) => {
                        const Componente = componentes[tarjeta.componente];
                        return (
                            <div 
                                key={tarjeta.id}
                                className="tarjeta-bento"
                                style={obtenerEstiloTarjeta(tarjeta)}
                            >
                                <Componente />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BentosTransacciones;