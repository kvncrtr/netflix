import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearError } from '../../store/slices/authSlice';
import './Signup.css';

const Signup = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
      if (!formData.name) {
         errors.name = 'Name is required';
      }
      if (!formData.email) {
         errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         errors.email = 'Email is invalid';
      }
      if (!formData.password) {
         errors.password = 'Password is required';
      } else if (formData.password.length < 6) {
         errors.password = 'Password must be at least 6 characters';
      }
      if (!formData.confirmPassword) {
         errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
         errors.confirmPassword = 'Passwords do not match';
      }
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
         const { confirmPassword, ...signupData } = formData;
         dispatch(signup(signupData));
      }
   };

   return (
      <div className="signup-container">
         <div className="signup-form">
            <h1>Create Account</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
               <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     className={formErrors.name ? 'error' : ''}
                     placeholder="Enter your name"
                  />
                  {formErrors.name && (
                     <span className="error-text">{formErrors.name}</span>
                  )}
               </div>
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
                     placeholder="Create a password"
                  />
                  {formErrors.password && (
                     <span className="error-text">{formErrors.password}</span>
                  )}
               </div>
               <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                     type="password"
                     id="confirmPassword"
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     className={formErrors.confirmPassword ? 'error' : ''}
                     placeholder="Confirm your password"
                  />
                  {formErrors.confirmPassword && (
                     <span className="error-text">{formErrors.confirmPassword}</span>
                  )}
               </div>
               <button type="submit" disabled={loading}>
                  {loading ? 'Signing up...' : 'Sign Up'}
               </button>
            </form>
            <p>
               Already have an account? <Link to="/login">Login</Link>
            </p>
         </div>
      </div>
   );
};

export default Signup; 