import { useState } from 'react';
import birdtable from '/common.jpg';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Namn är obligatoriskt";
    if (!formData.email.trim()) {
      newErrors.email = "E-post är obligatorisk";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ogiltig e-postadress";
    }
    if (!formData.message.trim()) newErrors.message = "Meddelande får inte vara tomt";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Formulär skickat:", formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 3000); 
    }
  };

  return (
    <section id="contact"
      className="relative w-full bg-cover bg-center flex items-center justify-center py-20 md:py-50 px-2.5 md:px-0" 
       style={{ backgroundImage: `url(${birdtable})` }}
    >
      {/* Mörk overlay för bättre läsbarhet */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Kontaktformulär centrerat ovanpå bakgrundsbilden */}
      <div className="relative z-10 max-w-2xl w-full p-12 shadow-lg rounded-lg backdrop-blur-md bg-white/60">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Kontakta oss</h2>
        
        {success && <p className="text-green-600 text-center mb-4">Ditt meddelande har skickats!</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Namn */}
          <div>
            <label className="block text-gray-700 font-medium text-lg">Namn</label>
            <input 
              type="text" 
              className="w-full border rounded-lg p-3 text-lg focus:ring focus:ring-green-300" 
              placeholder="Ditt namn"
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* E-post */}
          <div>
            <label className="block text-gray-700 font-medium text-lg">E-post</label>
            <input 
              type="email" 
              className="w-full border rounded-lg p-3 text-lg focus:ring focus:ring-green-300" 
              placeholder="din@email.com"
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Meddelande */}
          <div>
            <label className="block text-gray-700 font-medium text-lg">Meddelande</label>
            <textarea 
              className="w-full border rounded-lg p-3 text-lg h-32 focus:ring focus:ring-green-300" 
              placeholder="Skriv ditt meddelande här..."
              value={formData.message} 
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          {/* Skicka-knapp */}
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-3 text-lg rounded-lg hover:bg-green-700 transition duration-300"
          >
            Skicka
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
