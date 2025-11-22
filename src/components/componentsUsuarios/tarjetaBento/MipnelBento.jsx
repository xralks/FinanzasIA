import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PieChart, ArrowUpRight, Wallet } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from 'recharts';
import './MipnelBento.css';

// Datos de ejemplo
const lineData = [
  { mes: 'Ene', valor: 2400 },
  { mes: 'Feb', valor: 1398 },
  { mes: 'Mar', valor: 9800 },
  { mes: 'Abr', valor: 3908 },
  { mes: 'May', valor: 4800 },
  { mes: 'Jun', valor: 3800 },
];

const areaData = [
  { dia: 'L', ingreso: 4000, gasto: 2400 },
  { dia: 'M', ingreso: 3000, gasto: 1398 },
  { dia: 'X', ingreso: 2000, gasto: 9800 },
  { dia: 'J', ingreso: 2780, gasto: 3908 },
  { dia: 'V', ingreso: 1890, gasto: 4800 },
];

const pieData = [
  { name: 'Comida', value: 400, color: '#10b981' },
  { name: 'Transporte', value: 300, color: '#3b82f6' },
  { name: 'Servicios', value: 300, color: '#f59e0b' },
  { name: 'Otros', value: 200, color: '#ef4444' },
];

const gastos = [
  { nombre: 'Netflix', monto: 7190, categoria: 'Entretenimiento', fecha: 'Hoy' },
  { nombre: 'Supermercado', monto: 40000, categoria: 'Comida', fecha: 'Ayer' },
  { nombre: 'Uber', monto: 10000, categoria: 'Transporte', fecha: '2 días' },
];

// Componente Card Base
const BentoCard = ({ children, className = '', span = 1, height = 'medium' }) => {
  const spanClass = span === 2 ? 'card-span-2' : 'card-span-1';
  const heightClass = `card-height-${height}`;
  
  return (
    <div className={`bento-card ${spanClass} ${heightClass} ${className}`}>
      {children}
    </div>
  );
};

// Card de Balance Principal
const BalanceCard = ({ balance, cambio }) => {
  const esPositivo = cambio >= 0;
  return (
    <BentoCard span={2} height="small" className="balance-card">
      <div className="balance-content">
        <div className="balance-header">
          <span className="balance-label">Balance Total</span>
          <Wallet className="balance-icon" />
        </div>
        <div className="balance-info">
          <h2 className="balance-amount">${balance.toLocaleString()}</h2>
          <div className="balance-change">
            {esPositivo ? <TrendingUp className="trend-icon" /> : <TrendingDown className="trend-icon" />}
            <span className="change-text">
              {esPositivo ? '+' : ''}{cambio}% este mes
            </span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

// Card de Estadística Rápida
const StatCard = ({ titulo, valor, icono: Icon, color, porcentaje }) => {
  const esPositivo = porcentaje >= 0;
  return (
    <BentoCard height="small">
      <div className="stat-content">
        <div className="stat-header">
          <span className="stat-label">{titulo}</span>
          <div className={`stat-icon-container ${color}`}>
            <Icon className="stat-icon" />
          </div>
        </div>
        <div className="stat-info">
          <h3 className="stat-value">${valor.toLocaleString()}</h3>
          <div className="stat-change">
            {esPositivo ? (
              <TrendingUp className={`trend-small ${esPositivo ? 'positive' : 'negative'}`} />
            ) : (
              <TrendingDown className={`trend-small ${esPositivo ? 'positive' : 'negative'}`} />
            )}
            <span className={`change-small ${esPositivo ? 'positive' : 'negative'}`}>
              {esPositivo ? '+' : ''}{porcentaje}%
            </span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

// Card de Gráfico de Línea
const LineChartCard = () => {
  return (
    <BentoCard span={2} height="large">
      <div className="chart-container">
        <div className="chart-header">
          <h3 className="chart-title">Tendencia de Ingresos</h3>
          <ArrowUpRight className="chart-icon-header" />
        </div>
        <div className="chart-body">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <Line 
                type="monotone" 
                dataKey="valor" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </BentoCard>
  );
};

// Card de Gráfico de Área
const AreaChartCard = () => {
  return (
    <BentoCard span={2} height="large">
      <h3 className="chart-title">Ingresos vs Gastos</h3>
      <div className="chart-body-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={areaData}>
            <Area type="monotone" dataKey="ingreso" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            <Area type="monotone" dataKey="gasto" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </BentoCard>
  );
};

// Card de Gráfico Circular
const PieChartCard = () => {
  return (
    <BentoCard span={1} height="large">
      <h3 className="chart-title">Distribución</h3>
      <div className="pie-chart-body">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPie>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </RechartsPie>
        </ResponsiveContainer>
      </div>
      <div className="pie-legend">
        {pieData.map((item, i) => (
          <div key={i} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: item.color }}></div>
            <span className="legend-text">{item.name}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

// Card de Lista de Gastos
const GastosCard = () => {
  return (
    <BentoCard span={1} height="large">
      <h3 className="chart-title">Gastos Recientes</h3>
      <div className="gastos-list">
        {gastos.map((gasto, i) => (
          <div key={i} className="gasto-item">
            <div className="gasto-info">
              <p className="gasto-nombre">{gasto.nombre}</p>
              <p className="gasto-detalle">{gasto.categoria} • {gasto.fecha}</p>
            </div>
            <span className="gasto-monto">-${gasto.monto}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

// Card de Porcentaje Grande
const PercentageCard = ({ titulo, porcentaje, meta, actual }) => {
  const progreso = (actual / meta) * 100;
  const dashArray = progreso * 3.51;
  
  return (
    <BentoCard height="large">
      <div className="percentage-container">
        <h3 className="percentage-title">{titulo}</h3>
        <div className="percentage-circle-wrapper">
          <div className="percentage-circle">
            <svg className="circle-svg" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="56"
                className="circle-bg"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                className="circle-progress"
                style={{
                  strokeDasharray: `${dashArray} 351`,
                }}
              />
            </svg>
            <div className="circle-text">
              <span className="circle-percentage">{porcentaje}%</span>
            </div>
          </div>
        </div>
        <div className="percentage-meta">
          <p className="meta-text">${actual.toLocaleString()} de ${meta.toLocaleString()}</p>
        </div>
      </div>
    </BentoCard>
  );
};

// Componente Principal
export default function BentoFinanceGrid() {
  const [balance] = useState(24580);
  const [cambioBalance] = useState(12.5);

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <h1 className="app-title">Mi Panel</h1>
        
        <div className="bento-grid">
          <BalanceCard balance={balance} cambio={cambioBalance} />
          <StatCard 
            titulo="Ingresos" 
            valor={15420} 
            icono={TrendingUp} 
            color="green"
            porcentaje={8.2}
          />
          <StatCard 
            titulo="Gastos" 
            valor={8340} 
            icono={TrendingDown} 
            color="red"
            porcentaje={-3.5}
          />
          <LineChartCard />
          <PercentageCard 
            titulo="Meta de Ahorro"
            porcentaje={68}
            meta={10000}
            actual={6800}
          />
          <GastosCard />
          <AreaChartCard />
          <PieChartCard />
        </div>
      </div>
    </div>
  );
}