import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../../../lib/supabaseClient';
import { useAuth } from '../../../../context/AuthContext';
import './ModalMetaAhorro.css';

const ModalMetaAhorro = ({ isOpen, onClose, onSuccess, metaToEdit = null }) => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: '',
    categoria_id: '',
    valor_objetivo: '',
    fecha_limite: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      setLoadingCategorias(true);
      const { data, error } = await supabase
        .from('categoria_ahorros')
        .select('id, nombre')
        .order('nombre', { ascending: true });

      if (error) throw error;

      setCategorias(data || []);

      if (data && data.length > 0 && !formData.categoria_id) {
        const generalCategoria = data.find(cat => cat.nombre === 'General');
        if (generalCategoria) {
          setFormData(prev => ({ ...prev, categoria_id: generalCategoria.id }));
        } else {
          setFormData(prev => ({ ...prev, categoria_id: data[0].id }));
        }
      }
    } catch (err) {
      console.error('❌ Error al cargar categorías:', err);
      setError('Error al cargar las categorías');
    } finally {
      setLoadingCategorias(false);
    }
  };

  useEffect(() => {
    if (metaToEdit && categorias.length > 0) {
      setFormData({
        nombre: metaToEdit.nombre || '',
        categoria_id: metaToEdit.categoria || (categorias[0]?.id || ''),
        valor_objetivo: metaToEdit.valor_objetivo || '',
        fecha_limite: metaToEdit.fecha_limite ? metaToEdit.fecha_limite.split('T')[0] : '',
      });
    } else if (!metaToEdit && categorias.length > 0) {
      const generalCategoria = categorias.find(cat => cat.nombre === 'General');
      setFormData({
        nombre: '',
        categoria_id: generalCategoria?.id || categorias[0]?.id || '',
        valor_objetivo: '',
        fecha_limite: '',
      });
    }
    setError(null);
  }, [metaToEdit, isOpen, categorias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      setError('El nombre de la meta es requerido');
      return false;
    }

    if (!formData.categoria_id) {
      setError('Debes seleccionar una categoría');
      return false;
    }

    const valorObjetivo = parseFloat(formData.valor_objetivo);
    
    if (!formData.valor_objetivo || isNaN(valorObjetivo) || valorObjetivo <= 0) {
      setError('El valor objetivo debe ser mayor a 0');
      return false;
    }

    if (formData.fecha_limite) {
      const fechaSeleccionada = new Date(formData.fecha_limite);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (fechaSeleccionada < hoy) {
        setError('La fecha límite no puede ser anterior a hoy');
        return false;
      }
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

      const metaData = {
        nombre: formData.nombre.trim(),
        categoria: formData.categoria_id,
        valor_objetivo: parseFloat(formData.valor_objetivo),
        fecha_limite: formData.fecha_limite || null,
        usuario_id: user.id,
      };

      if (metaToEdit) {
        console.log('🔄 Actualizando meta...', metaData);
        
        const { error: updateError } = await supabase
          .from('metas_ahorros')
          .update(metaData)
          .eq('id', metaToEdit.id)
          .eq('usuario_id', user.id);

        if (updateError) throw updateError;

        console.log('✅ Meta actualizada exitosamente');
      } else {

        console.log('🔄 Creando nueva meta...', metaData);
        
        const { error: insertError } = await supabase
          .from('metas_ahorros')
          .insert([metaData]);

        if (insertError) throw insertError;

        console.log('✅ Meta creada exitosamente');
      }

      const generalCategoria = categorias.find(cat => cat.nombre === 'General');
      setFormData({
        nombre: '',
        categoria_id: generalCategoria?.id || categorias[0]?.id || '',
        valor_objetivo: '',
        fecha_limite: '',
      });

      if (onSuccess) {
        onSuccess();
      }

      onClose();

    } catch (err) {
      console.error('❌ Error al guardar meta:', err);
      setError(err.message || 'Error al guardar la meta');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      const generalCategoria = categorias.find(cat => cat.nombre === 'General');
      setFormData({
        nombre: '',
        categoria_id: generalCategoria?.id || categorias[0]?.id || '',
        valor_objetivo: '',
        fecha_limite: '',
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
          <h2>{metaToEdit ? 'Editar Meta de Ahorro' : 'Nueva Meta de Ahorro'}</h2>
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
            <label htmlFor="nombre">Nombre de la meta *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Vacaciones en Japón"
              disabled={loading}
              required
            />
          </div>

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
          </div>

          <div className="form-group">
            <label htmlFor="valor_objetivo">Valor objetivo ($) *</label>
            <input
              type="number"
              id="valor_objetivo"
              name="valor_objetivo"
              value={formData.valor_objetivo}
              onChange={handleChange}
              placeholder="5000000"
              min="1"
              step="any"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fecha_limite">Fecha límite (opcional)</label>
            <input
              type="date"
              id="fecha_limite"
              name="fecha_limite"
              value={formData.fecha_limite}
              onChange={handleChange}
              disabled={loading}
              min={new Date().toISOString().split('T')[0]}
            />
            <small className="form-hint">Deja vacío si no tienes una fecha específica</small>
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
              disabled={loading}
            >
              {loading ? 'Guardando...' : metaToEdit ? 'Actualizar Meta' : 'Crear Meta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalMetaAhorro;