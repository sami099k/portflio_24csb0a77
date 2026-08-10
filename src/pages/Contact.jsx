import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <div className="contact-me" id="contact">
      <div className="header" style={{ color: 'rgb(189,21,21)' }}>
        <h2 className="m" style={{ margin: 0 }}>Contact Me</h2>
        <p className="q">Questions, thoughts, or just want to say hello?</p>
      </div>
      <form className="input" onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" name="name" className="name" placeholder="Enter your name" 
            value={formData.name} onChange={handleChange} 
          />
          {errors.name && <span style={{ color: 'red', display: 'block' }}>{errors.name}</span>}
        </div>
        <div>
          <input 
            type="email" name="email" className="name" placeholder="Enter your email address" 
            value={formData.email} onChange={handleChange} 
          />
          {errors.email && <span style={{ color: 'red', display: 'block' }}>{errors.email}</span>}
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
          {errors.message && <span style={{ color: 'red', display: 'block' }}>{errors.message}</span>}
        </div>
        
        <button 
          type="submit" 
          className="hireme s" 
          disabled={!isFormValid}
          style={{ opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed', border: 'none' }}
        >
          Send Message <i className="submit-icon fa-solid fa-paper-plane" style={{ paddingLeft: '20px' }}></i>
        </button>
      </form>
    </div>
  );
};

export default Contact;