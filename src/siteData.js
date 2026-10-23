const env = import.meta.env || {};
const officialNumber = '595984225745';
const configuredNumber = (env.VITE_WHATSAPP_NUMBER || officialNumber).replace(/\D/g, '');
const number = /^\d{7,15}$/.test(configuredNumber) ? configuredNumber : officialNumber;
export const contact = {
  whatsapp: number,
  phone: number === officialNumber ? '+595 984 225745' : '+' + number,
  email: (env.VITE_CONTACT_EMAIL || '').trim(),
  address: (env.VITE_ADDRESS_TEXT || 'Zona Calle Estrella / Blas Garay, Ciudad del Este').trim(),
  mapUrl: (env.VITE_GOOGLE_MAPS_URL || 'https://www.google.com/maps/search/?api=1&query=Rectificadora%20de%20motores%202R&query_place_id=ChIJtX38HK6F9pQRcd5ZZhw4uOY').trim(),
  facebook: 'https://www.facebook.com/share/1E6ahNBk5X/',
  reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJtX38HK6F9pQRcd5ZZhw4uOY'
};
export function whatsappUrl(message = 'Hola, 2R. Quisiera solicitar un presupuesto para mi motor.') {
  return 'https://wa.me/' + contact.whatsapp + '?text=' + encodeURIComponent(message);
}
export function inquiryMessage({ name, motor, detail }) {
  return ['Hola, Rectificadora 2R. Quisiera hacer una consulta.', 'Nombre: ' + name.trim(), 'Motor / modelo: ' + (motor.trim() || 'Sin especificar'), 'Consulta: ' + detail.trim()].join('\n');
}
export const navigation = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Ubicación y contacto', href: '#ubicacion' }
];
