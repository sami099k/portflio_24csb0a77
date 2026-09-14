import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [serverSuccess, setServerSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setServerSuccess(null);

    // Client-side pre-validation
    const isValid = validate();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle server validation or execution errors
        if (result.details) {
          setErrors(result.details);
        }
        const errorMsg = result.message || result.error || 'Failed to submit contact form.';
        setServerError(errorMsg);
      } else {
        // Success case (HTTP 201)
        setServerSuccess('Thank you! Your message has been submitted successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setServerError('Network error: Unable to reach the backend server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Allow button if inputs are present (so server rejection can also be tested)
  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <div className="contact-me" id="contact">
      <div className="header" style={{ color: 'rgb(189,21,21)' }}>
        <h2 className="m" style={{ margin: 0 }}>Contact Me</h2>
        <p className="q">Questions, thoughts, or just want to say hello?</p>
      </div>

      {serverSuccess && (
        <div style={{
          padding: '1rem',
          margin: '1rem auto',
          maxWidth: '70%',
          backgroundColor: 'rgba(56, 161, 105, 0.15)',
          border: '1px solid #38a169',
          color: '#276749',
          borderRadius: '6px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {serverSuccess}
        </div>
      )}

      {serverError && (
        <div style={{
          padding: '1rem',
          margin: '1rem auto',
          maxWidth: '70%',
          backgroundColor: 'rgba(229, 62, 62, 0.15)',
          border: '1px solid #e53e3e',
          color: '#c53030',
          borderRadius: '6px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Server Error: {serverError}
        </div>
      )}

      <form className="input" onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" name="name" className="name" placeholder="Enter your name" 
            value={formData.name} onChange={handleChange} 
          />
          {errors.name && <span style={{ color: 'red', display: 'block', marginTop: '0.25rem' }}>{errors.name}</span>}
        </div>
        <div>
          <input 
            type="email" name="email" className="name" placeholder="Enter your email address" 
            value={formData.email} onChange={handleChange} 
          />
          {errors.email && <span style={{ color: 'red', display: 'block', marginTop: '0.25rem' }}>{errors.email}</span>}
        </div>
        <div>
          <input 
            type="text" name="subject" className="name" placeholder="Enter your subject" 
            value={formData.subject} onChange={handleChange} 
          />
        </div>
        <div>
          <textarea 
            name="message" className="name msg" placeholder="Enter your message" 
            value={formData.message} onChange={handleChange}
          ></textarea>
          {errors.message && <span style={{ color: 'red', display: 'block', marginTop: '0.25rem' }}>{errors.message}</span>}
        </div>
        
        <button 
          type="submit" 
          className="hireme s" 
          disabled={!isFormValid || isSubmitting}
          style={{ 
            opacity: isFormValid && !isSubmitting ? 1 : 0.5, 
            cursor: isFormValid && !isSubmitting ? 'pointer' : 'not-allowed', 
            border: 'none' 
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'} 
          <i className="submit-icon fa-solid fa-paper-plane" style={{ paddingLeft: '20px' }}></i>
        </button>
      </form>
    </div>
  );
};

export default Contact;