import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import "./../styles/stylesGbForm.css"

export const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    mail: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('El nombre y apellido son requeridos');
      return false;
    }

    if (formData.username.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres');
      return false;
    }

    if (!formData.mail.trim()) {
      setError('El correo es requerido');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      setError('Ingresa un correo válido');
      return false;
    }

    if (!formData.password) {
      setError('La contraseña es requerida');
      return false;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Iniciando registro...');

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.mail,
        password: formData.password,
        options: {
          data: {
            full_name: formData.username,
          }
        }
      });

      if (signUpError) {
        console.error('❌ Error en signUp:', signUpError);
        throw signUpError;
      }

      console.log('✅ Usuario creado en Auth:', authData);
      console.log('✅ El perfil se creará automáticamente con el trigger');

      setSuccess(true);
      console.log('🎉 Registro completado exitosamente');

      setTimeout(() => {
        navigate('/Inicio-Sesion');
      }, 2000);

    } catch (err) {
      console.error('❌ Error completo:', err);

      if (err.message.includes('already registered')) {
        setError('Este correo ya está registrado');
      } else if (err.message.includes('Invalid email')) {
        setError('Correo electrónico inválido');
      } else if (err.message.includes('Password should be')) {
        setError('La contraseña debe tener al menos 6 caracteres');
      } else {
        setError(err.message || 'Error al registrar usuario');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerGbForm">
      <h1><a href="/">FinanzasIA</a></h1>
      <form onSubmit={handleRegister}>
        <div className="iconoUsuario">
          <svg
            height="200px"
            width="200px"
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <style>{`.st0{fill:#ff6a4e;}`}</style>
              <g>
                <path
                  className="st0"
                  d="M341.942,356.432c-20.705-12.637-28.134-11.364-28.134-36.612c0-8.837,0-25.256,0-40.403
                  c11.364-12.62,15.497-11.049,25.107-60.597c19.433,0,18.174-25.248,27.34-47.644c7.471-18.238,1.213-25.632-5.08-28.654
                  c5.144-66.462,5.144-112.236-70.292-126.436c-27.344-23.437-68.605-15.48-88.158-11.569c-19.536,3.911-37.159,0-37.159,0
                  l3.356,31.49c-28.608,34.332-14.302,80.106-18.908,106.916c-6.002,3.27-11.416,10.809-4.269,28.253
                  c9.165,22.396,7.906,47.644,27.34,47.644c9.61,49.548,13.742,47.977,25.107,60.597c0,15.147,0,31.566,0,40.403
                  c0,25.248-8.581,25.683-28.133,36.612c-47.14,26.349-108.569,41.658-119.575,124.01C48.468,495.504,134.952,511.948,256,512
                  c121.048-0.052,207.528-16.496,205.517-31.558C450.511,398.09,388.519,384.847,341.942,356.432z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        
        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c33',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            textAlign: 'center',
            border: '1px solid #fcc'
          }}>
            ❌ {error}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: '#efe',
            color: '#3c3',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            textAlign: 'center',
            border: '1px solid #cfc'
          }}>
            ✅ Registro exitoso! Redirigiendo...
          </div>
        )}

        <div className="formGrupo">
          <label htmlFor="username">Nombre y Apellido:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="formGrupo">
          <label htmlFor="mail">Correo:</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="formGrupo">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="formGrupo">
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          className="boton-primario boton-largo"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <div className="opcionesNavForm centro">
          <div className="opcionNavForm">
            <p>¿Ya tienes cuenta? </p>
            <a href="/Inicio-Sesion">Iniciar sesión</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;