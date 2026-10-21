import test from 'node:test';
import assert from 'node:assert/strict';
import { contact, inquiryMessage, whatsappUrl } from '../src/siteData.js';

test('WhatsApp uses the official country code and preserves Spanish and punctuation', () => {
  const message = 'Hola, ¿rectifican mi motor? Tapa & bloque + fotos.\nModelo: Ñandú';
  const url = new URL(whatsappUrl(message));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/595984225745');
  assert.equal(url.searchParams.get('text'), message);
});
test('Inquiry removes outer whitespace and keeps the customer details in the draft', () => {
  const text = inquiryMessage({ name: '  Cliente de prueba  ', motor: '  Motor de prueba  ', detail: '  Consulta de prueba\ncon segunda línea.  ' });
  assert.equal(text, 'Hola, Rectificadora 2R. Quisiera hacer una consulta.\nNombre: Cliente de prueba\nMotor / modelo: Motor de prueba\nConsulta: Consulta de prueba\ncon segunda línea.');
});
test('Motor is optional and the Google review destination preserves the supplied place id', () => {
  assert.match(inquiryMessage({ name: 'Prueba', motor: '  ', detail: 'Consulta' }), /Motor \/ modelo: Sin especificar/);
  assert.equal(new URL(contact.reviewUrl).searchParams.get('placeid'), 'ChIJtX38HK6F9pQRcd5ZZhw4uOY');
});
