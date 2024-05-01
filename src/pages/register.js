import { useState } from "react"
import { onRegistration } from "../api/auth";
import '../css/register.css'; // Import your CSS file

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onRegistration(values);
      setError('');
      setSuccess(data.message);
      setValues({ username: '', password: '' });
      localStorage.setItem('isAuth', 'true');
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess('');
    }
  };

  return (
  
      <div className="register-container">
        <div className="container mt-3">
          <h3 className="text-center">REGISTER</h3>
          <form onSubmit={(e) => onSubmit(e)}>

            {/* Username field */}
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>
                Username
              </label>
              <input
                onChange={(e) => onChange(e)}
                type='text'
                className='form-control'
                id='username'
                name='username'
                value={values.username}
                placeholder='Enter your username'
                required
              />
            </div>

            {/* Password Field */}
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                onChange={(e) => onChange(e)}
                type='password'
                value={values.password}
                className='form-control'
                id='password'
                name='password'
                placeholder='Enter your password'
                required
              />
            </div>

            {/* Display error message */}
            {error && <div className="error-message">{error}</div>}
            {/* Display success message */}
            {success && <div className="success-message">{success}</div>}

            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      </div>
 
  );
};

export default Register;
