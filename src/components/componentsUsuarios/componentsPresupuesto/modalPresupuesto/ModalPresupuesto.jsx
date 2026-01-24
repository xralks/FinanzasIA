import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../../../lib/supabaseClient';
import { useAuth } from '../../../../context/AuthContext';
import './ModalPresupuesto.css';

const ModalPresupuesto = ({ isOpen, onClose, onSuccess, presupuestoToEdit = null, mesSeleccionado }) => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    categoria_id: '',
    monto_estimado: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [error, setError] = useState(null);

  // Cargar categorías desde la base de datos
  useEffect(() => {
    if (isOpen) {
      fetchCategorias();
    }
  }, [isOpen]);

  const fetchCategorias = async () => {
    try {
      setLoadingCategorias(true);
      const { data, error } = await supabase
        .from('categoria_presupuesto')
        .select('id, nombre')
        .order('nombre', { ascending: true });

      if (error) throw error;

      setCategorias(data || []);
      
      // Si hay categorías y no hay una seleccionada, seleccionar la primera
      if (data && data.length > 0 && !formData.categoria_id && !presupuestoToEdit) {
        setFormData(prev => ({ ...prev, categoria_id: data[0].id }));
      }
    } catch (err) {
      console.error('❌ Error al cargar categorías:', err);
      setError('Error al cargar las categorías');
    } finally {
      setLoadingCategorias(false);
    }
  };

  // Cargar datos si es edición
  useEffect(() => {
    if (presupuestoToEdit && categorias.length > 0) {
      setFormData({
        categoria_id: presupuestoToEdit.categoria_presupuesto?.id || (categorias[0]?.id || ''),
        monto_estimado: presupuestoToEdit.monto_estimado || '',
      });
    } else if (!presupuestoToEdit && categorias.length > 0) {
      // Reset form si no hay presupuesto para editar
      setFormData({
        categoria_id: categorias[0]?.id || '',
        monto_estimado: '',
      });
    }
    setError(null);
  }, [presupuestoToEdit, isOpen, categorias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.categoria_id) {
      setError('Debes seleccionar una categoría');
      return false;
    }

    const montoEstimado = parseFloat(formData.monto_estimado);
    
    if (!formData.monto_estimado || isNaN(montoEstimado) || montoEstimado <= 0) {
      setError('El monto debe ser mayor a 0');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Formatear mes para guardar (primer día del mes)
      const mesPrimerDia = new Date(mesSeleccionado.getFullYear(), mesSeleccionado.getMonth(), 1);

      const presupuestoData = {
        id_usuario: user.id,
        id_categoria: formData.categoria_id,
        monto_estimado: parseFloat(formData.monto_estimado),
        mes: mesPrimerDia.toISOString(),
      };

      if (presupuestoToEdit) {
        // Actualizar presupuesto existente
        console.log('🔄 Actualizando presupuesto...', presupuestoData);
        
        const { error: updateError } = await supabase
          .from('presupuesto')
          .update({
            id_categoria: presupuestoData.id_categoria,
            monto_estimado: presupuestoData.monto_estimado,
          })
          .eq('id', presupuestoToEdit.id)
          .eq('id_usuario', user.id);

        if (updateError) throw updateError;

        console.log('✅ Presupuesto actualizado exitosamente');
      } else {
        // Crear nuevo presupuesto
        console.log('🔄 Creando nuevo presupuesto...', presupuestoData);
        
        const { error: insertError } = await supabase
          .from('presupuesto')
          .insert([presupuestoData]);

        if (insertError) throw insertError;

        console.log('✅ Presupuesto creado exitosamente');
      }

      // Limpiar formulario
      setFormData({
        categoria_id: categorias[0]?.id || '',
        monto_estimado: '',
      });

      // Llamar callback de éxito
      if (onSuccess) {
        onSuccess();
      }

      // Cerrar modal
      onClose();

    } catch (err) {
      console.error('❌ Error al guardar presupuesto:', err);
      setError(err.message || 'Error al guardar el presupuesto');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        categoria_id: categorias[0]?.id || '',
        monto_estimado: '',
      });
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{presupuestoToEdit ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}</h2>
          <button 
            className="modal-close-btn" 
            onClick={handleClose}
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <div className="modal-error">
              ❌ {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="categoria_id">Categoría *</label>
            <select
              id="categoria_id"
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              disabled={loading || loadingCategorias}
              required
            >
              {loadingCategorias ? (
                <option value="">Cargando categorías...</option>
              ) : categorias.length === 0 ? (
                <option value="">No hay categorías disponibles</option>
              ) : (
                categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))
              )}
            </select>
            <small className="form-hint">
              Mes: {mesSeleccionado.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="monto_estimado">Monto Presupuestado ($) *</label>
            <input
              type="number"
              id="monto_estimado"
              name="monto_estimado"
              value={formData.monto_estimado}
              onChange={handleChange}
              placeholder="500000"
              min="1"
              step="any"
              disabled={loading}
              required
            />
            <small className="form-hint">
              ¿Cuánto planeas gastar en esta categoría este mes?
            </small>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="boton-secundario boton-largo"
              onClick={handleClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="boton-primario boton-largo"
              disabled={loading || loadingCategorias}
            >
              {loading ? 'Guardando...' : presupuestoToEdit ? 'Actualizar' : 'Crear Presupuesto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPresupuesto;