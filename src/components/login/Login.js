import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/slices/authSlice';
import './Login.css';

const Login = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });

   const [formErrors, setFormErrors] = useState({});

   useEffect(() => {
      if (isAuthenticated) {
         navigate('/');
      }
   }, [isAuthenticated, navigate]);

   useEffect(() => {
      return () => {
         dispatch(clearError());
      };
   }, [dispatch]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));

      // Clear error when user starts typing
      if (formErrors[name]) {
         setFormErrors(prev => ({
            ...prev,
            [name]: ''
         }));
      }
   };

   const validateForm = () => {
      const errors = {};
      if (!formData.email) {
         errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         errors.email = 'Email is invalid';
      }
      if (!formData.password) {
         errors.password = 'Password is required';
      }
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
         dispatch(login(formData));
      }
   };

   return (
      <div className="login-container">
         <div className="login-form">
            <h1>Welcome Back</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
               <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     className={formErrors.email ? 'error' : ''}
                     placeholder="Enter your email"
                  />
                  {formErrors.email && (
                     <span className="error-text">{formErrors.email}</span>
                  )}
               </div>
               <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     id="password"
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     className={formErrors.password ? 'error' : ''}
                     placeholder="Enter your password"
                  />
                  {formErrors.password && (
                     <span className="error-text">{formErrors.password}</span>
                  )}
               </div>
               <button type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
               </button>
            </form>
            <p>
               Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
         </div>
      </div>
   );
};

export default Login; 