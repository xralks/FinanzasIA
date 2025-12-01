import { useState } from 'react';
import { Bell, Plus, CreditCard, Wallet, PiggyBank, TrendingUp, ShoppingCart, DollarSign, Film, Users } from 'lucide-react';
import './BentosMiPanel.css';

export default function FinancialDashboard() {
  return (
    <div className="app-container">
      {/* Main Content */}
      <div className="app-wrapper">
        {/* Title Section */}
        <div className="title-section">
          <div>
            <h1 className="app-title">Panel de Control</h1>
            <p className="app-subtitle">
              Hola, bienvenido de nuevo. Aquí está tu resumen financiero.
            </p>
          </div>
          <button className="boton-primario boton-medio">
            <Plus size={18} />
            Añadir Gasto
          </button>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid-main">
          {/* Saldos de Cuentas */}
          <div className="bento-card card-span-2">
            <h2 className="card-title">Saldos de Cuentas</h2>
            <div className="accounts-grid">
              <div className="account-card account-savings">
                <div className="account-header">
                  <PiggyBank size={18} />
                  <span className="account-label">Cuenta de Ahorros</span>
                </div>
                <div className="account-amount">$12,450.75</div>
              </div>
              
              <div className="account-card account-current">
                <div className="account-header">
                  <Wallet size={18} />
                  <span className="account-label">Cuenta Corriente</span>
                </div>
                <div className="account-amount">$2,890.20</div>
              </div>
              
              <div className="account-card account-credit">
                <div className="account-header">
                  <CreditCard size={18} />
                  <span className="account-label">Tarjeta de Crédito</span>
                </div>
                <div className="account-amount credit-amount">-$540.30</div>
              </div>
            </div>
          </div>

          {/* Resumen de Gastos */}
          <div className="bento-card">
            <h2 className="card-title">Resumen de Gastos</h2>
            <div className="expenses-chart">
              <div className="chart-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="circle-bg" />
                  <circle cx="50" cy="50" r="40" className="circle-segment segment-1" />
                  <circle cx="50" cy="50" r="40" className="circle-segment segment-2" />
                  <circle cx="50" cy="50" r="40" className="circle-segment segment-3" />
                  <circle cx="50" cy="50" r="40" className="circle-segment segment-4" />
                </svg>
                <div className="chart-center">
                  <div className="chart-label">Total Gastado</div>
                  <div className="chart-value">$1,850.00</div>
                </div>
              </div>
            </div>
            <div className="expenses-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#10b981' }} />
                <span className="legend-label">Comida</span>
                <span className="legend-value">$740</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#f59e0b' }} />
                <span className="legend-label">Transporte</span>
                <span className="legend-value">$555</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#ef4444' }} />
                <span className="legend-label">Ocio</span>
                <span className="legend-value">$370</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#8b5cf6' }} />
                <span className="legend-label">Otros</span>
                <span className="legend-value">$185</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bento-grid-secondary">
          {/* Estado del Presupuesto y Metas */}
          <div className="bento-card">
            <h2 className="card-title">Estado del Presupuesto</h2>
            <div className="budget-list">
              <div className="budget-item">
                <div className="budget-header">
                  <span className="budget-label">Comida</span>
                  <span className="budget-values">$350 / $500</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '70%', background: 'var(--color-success)' }} />
                </div>
              </div>
              
              <div className="budget-item">
                <div className="budget-header">
                  <span className="budget-label">Transporte</span>
                  <span className="budget-values">$120 / $150</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '80%', background: 'var(--color-success)' }} />
                </div>
              </div>
              
              <div className="budget-item">
                <div className="budget-header">
                  <span className="budget-label">Ocio</span>
                  <span className="budget-values">$210 / $200</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '105%', background: 'var(--color-warning)' }} />
                </div>
              </div>
            </div>

            <h2 className="card-title section-title">Metas de Ahorro</h2>
            <div className="budget-list">
              <div className="budget-item">
                <div className="budget-header">
                  <span className="budget-label">Viaje a Japón</span>
                  <span className="budget-values">$3,500 / $5,000</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '70%' }} />
                </div>
              </div>
              
              <div className="budget-item">
                <div className="budget-header">
                  <span className="budget-label">Nuevo Portátil</span>
                  <span className="budget-values">$1,200 / $1,500</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '80%' }} />
                </div>
              </div>
              
              <div className="budget-item">
                <div className="budget-header">
                  <span className="budget-label">Fondo de Emergencia</span>
                  <span className="budget-values">$2,500 / $10,000</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Transacciones Recientes */}
          <div className="bento-card">
            <h2 className="card-title">Transacciones Recientes</h2>
            <div className="transactions-list">
              <div className="transaction-item">
                <div className="transaction-icon icon-green">
                  <ShoppingCart size={20} />
                </div>
                <div className="transaction-info">
                  <div className="transaction-name">Supermercado XYZ</div>
                  <div className="transaction-date">15 Oct, 2023</div>
                </div>
                <div className="transaction-amount">-$85.50</div>
              </div>
              
              <div className="transaction-item">
                <div className="transaction-icon icon-green">
                  <DollarSign size={20} />
                </div>
                <div className="transaction-info">
                  <div className="transaction-name">Pago de Salario</div>
                  <div className="transaction-date">15 Oct, 2023</div>
                </div>
                <div className="transaction-amount positive">+$2,500.00</div>
              </div>
              
              <div className="transaction-item">
                <div className="transaction-icon icon-purple">
                  <Film size={20} />
                </div>
                <div className="transaction-info">
                  <div className="transaction-name">Cineplex Entradas</div>
                  <div className="transaction-date">14 Oct, 2023</div>
                </div>
                <div className="transaction-amount">-$25.00</div>
              </div>
              
              <div className="transaction-item">
                <div className="transaction-icon icon-orange">
                  <Users size={20} />
                </div>
                <div className="transaction-info">
                  <div className="transaction-name">Restaurante La Piazza</div>
                  <div className="transaction-date">12 Oct, 2023</div>
                </div>
                <div className="transaction-amount">-$62.30</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
