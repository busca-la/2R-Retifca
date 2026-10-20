import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, ChevronRight,
  ClipboardCheck, Cog, Copy, Gauge, Mail, MapPin,
  Menu, MessageCircle, Wrench, X, Phone, Facebook, Star, Clock
} from 'lucide-react';
import './styles.css';
import WorkGallery from './WorkGallery';

// Prefer authentic 2R customer photographs once files are added to src/assets/2r.
const realPhotos = import.meta.glob('./assets/2r/*.webp', { eager: true, query: '?url', import: 'default' });

const contact = {
  whatsapp: (import.meta.env.VITE_WHATSAPP_NUMBER || '595984225745').replace(/\D/g, ''),
  phone: '+595 984 225745',
  email: (import.meta.env.VITE_CONTACT_EMAIL || '').trim(),
  address: (import.meta.env.VITE_ADDRESS_TEXT || 'Calle Estrella, zona Blas Garay, Ciudad del Este, Paraguay').trim(),
  mapUrl: (import.meta.env.VITE_GOOGLE_MAPS_URL || 'https://www.google.com/maps/search/?api=1&query=Rectificadora%20de%20motores%202R&query_place_id=ChIJtX38HK6F9pQRcd5ZZhw4uOY').trim(),
  facebook: 'https://www.facebook.com/share/1E6ahNBk5X/',
  reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJtX38HK6F9pQRcd5ZZhw4uOY',
  hours: [{ days: 'Lunes a viernes', time: '08:00 a 17:00' }, { days: 'Sábado', time: '08:00 a 12:00' }]
};

const nav = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Marcas', href: '#marcas' }
];

const services = [
  {
    number: '01',
    title: 'Rectificación de motores',
    text: 'Trabajos de rectificación enfocados en componentes del motor y sus necesidades mecánicas.',
    icon: Cog
  },
  {
    number: '02',
    title: 'Componentes mecánicos',
    text: 'Cada pieza tiene una función. Consultanos sobre el componente y el trabajo que necesitás.',
    icon: Wrench
  },
  {
    number: '03',
    title: 'Consultas técnicas',
    text: 'Contanos qué motor tenés y qué necesitás resolver para orientar tu consulta.',
    icon: Gauge
  }
];

function LogoMark({ compact = false }) {
  return (
    <span className={'logo-mark' + (compact ? ' logo-mark-small' : '')} aria-hidden="true">
      <img src="/logo-2r.svg" alt="" width="740" height="545" decoding="async" />
    </span>
  );
}

function Brand({ compact = false }) {
  return (
    <a className={'brand' + (compact ? ' brand-footer' : '')} href="#inicio" aria-label="Rectificadora de Motores 2R — inicio">
      <LogoMark compact={compact} />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-is-open', open);
    return () => document.body.classList.remove('menu-is-open');
  }, [open]);
  return (
    <header className={'site-header' + (scrolled ? ' is-scrolled' : '')}>
      <div className="header-inner site-container">
        <Brand />
        <nav className={'nav-links' + (open ? ' nav-open' : '')} aria-label="Navegación principal" id="main-navigation">
          {nav.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
          <a className="mobile-nav-cta" href="#contacto" onClick={() => setOpen(false)}>Solicitar presupuesto <ArrowUpRight size={18} /></a>
        </nav>
        <a className="header-cta" href="#contacto">HABLEMOS <ArrowUpRight size={17} strokeWidth={2.3}/></a>
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
          {open ? <X size={25}/> : <Menu size={25}/>}
        </button>
      </div>
    </header>
  );
}

function SectionLabel({ children, inverse = false }) {
  return <div className={'section-label' + (inverse ? ' inverse' : '')}><span className="label-dash"></span>{children}</div>;
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-visual" aria-hidden="true">
        {(realPhotos['./assets/2r/hero-bloque-2r.webp'] || realPhotos['./assets/2r/bloque-cilindros-06.webp']) && <img src={realPhotos['./assets/2r/hero-bloque-2r.webp'] || realPhotos['./assets/2r/bloque-cilindros-06.webp']} alt="" fetchPriority="high" />}
      </div>
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="hero-container site-container">
        <div className="hero-content">
          <div className="hero-eyebrow"><span className="pulse-square"></span> RECTIFICADORA 2R / CIUDAD DEL ESTE</div>
          <h1><span>PRECISIÓN</span><span className="outline-word">QUE MUEVE</span><span className="highlight-word">MOTORES<span className="hero-punctuation">.</span></span></h1>
          <p className="hero-subtitle">Rectificación de motores en Ciudad del Este. Cada componente importa. Cada detalle cuenta.</p>
          <div className="hero-actions">
            <a href="#contacto" className="button button-yellow">SOLICITAR PRESUPUESTO <ArrowUpRight size={19}/></a>
            <a href="#servicios" className="text-link">CONOCÉ NUESTRO TRABAJO <ArrowRight size={18}/></a>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="hero-bottom-left"><span className="line-icon"></span><span>CIUDAD DEL ESTE / PARAGUAY / 2R</span></div>
          <a className="scroll-link" href="#servicios">EXPLORAR <ArrowDownRight size={22}/></a>
        </div>
      </div>
      <span className="hero-vertical" aria-hidden="true">MECÁNICA CON PROPÓSITO — 2R</span>
      <span className="hero-index" aria-hidden="true">001 — 004</span>
    </section>
  );
}

function Marquee() {
  return (
    <div className="keyword-strip" aria-hidden="true">
      <div className="keyword-track">
        {Array.from({length: 4}, (_, i) => <span key={i}>RECTIFICACIÓN <b>✳</b> MOTORES <b>✳</b> PRECISIÓN <b>✳</b></span>)}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section className="services-section" id="servicios">
      <div className="site-container">
        <div className="services-head reveal">
          <div>
            <SectionLabel>01 / QUÉ HACEMOS</SectionLabel>
            <h2>EL DETALLE<br/>HACE LA <em>DIFERENCIA.</em></h2>
          </div>
          <p>Un motor es mucho más que la suma de sus piezas. En 2R, la rectificación está en el centro de nuestro trabajo.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return <article className="service-card reveal" key={service.number}>
              <div className="service-card-top"><span>{service.number} / SERVICIO</span><ArrowUpRight size={22}/></div>
              <div className="service-icon"><Icon size={42} strokeWidth={1.25}/></div>
              <div className="service-card-content"><h3>{service.title}</h3><p>{service.text}</p></div>
              <a href="#contacto" className="service-card-link" aria-label={'Consultar por ' + service.title}><span>CONSULTAR</span> <ChevronRight size={18}/></a>
            </article>;
          })}
        </div>
        <div className="services-note reveal"><span>NO TODOS LOS MOTORES SON IGUALES.</span><span>CONSULTÁ POR TU CASO EN PARTICULAR <ArrowUpRight size={17}/></span></div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="about-section">
      <div className="about-photo reveal">
        {realPhotos['./assets/2r/tapa-rectificada-03.webp'] ? (
          <img src={realPhotos['./assets/2r/tapa-rectificada-03.webp']} alt="Tapa de motor trabajada en Rectificadora 2R" loading="lazy" />
        ) : (
          <div className="about-photo-fallback" aria-hidden="true"><img src="/logo-2r.svg" alt="" loading="lazy" /></div>
        )}
        <div className="about-photo-shade"></div>
        <div className="photo-corner"><span>2R</span><span>— RECTIFICADORA</span></div>
        <span className="photo-caption">IMAGEN ILUSTRATIVA</span>
      </div>
      <div className="about-copy">
        <div className="about-copy-inner reveal">
          <SectionLabel inverse>02 / SOBRE 2R</SectionLabel>
          <h2>HABLAMOS<br/>EL IDIOMA<br/><em>DEL MOTOR.</em></h2>
          <div className="about-line"></div>
          <p>Somos <strong>Rectificadora de Motores 2R.</strong> Nuestro nombre representa el área en la que trabajamos: la rectificación de motores y sus componentes.</p>
          <p>Porque detrás de cada motor hay piezas, medidas y detalles que importan.</p>
          <a className="about-link" href="#contacto">HACENOS TU CONSULTA <ArrowUpRight size={21}/></a>
        </div>
        <span className="about-watermark" aria-hidden="true">2R</span>
      </div>
    </section>
  );
}

function Brands() {
  const brands = ['SCANIA', 'VOLVO', 'MERCEDES-BENZ', 'CAT'];
  return (
    <section className="brands-section" id="marcas">
      <div className="site-container">
        <div className="brands-heading reveal">
          <SectionLabel inverse>03 / MOTORES Y MARCAS</SectionLabel>
          <div className="brands-heading-row">
            <h2>GRANDES<br/><em>NOMBRES.</em></h2>
            <p>Estas marcas aparecen en la presentación de 2R. Consultá por la atención disponible para tu motor y modelo.</p>
          </div>
        </div>
        <div className="brands-list">
          {brands.map((brand, i) => <a className="brand-row reveal" key={brand} href="#contacto">
            <span className="brand-row-number">0{i+1}</span>
            <span className="brand-row-name">{brand}</span>
            <ArrowUpRight size={29} strokeWidth={1.4}/>
          </a>)}
        </div>
        <p className="brands-disclaimer">Las marcas mencionadas pertenecen a sus respectivos titulares. Su mención no implica representación ni vínculo oficial.</p>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="review-section" aria-label="Reseñas en Google">
      <div className="site-container review-inner reveal">
        <div>
          <SectionLabel inverse>RESEÑAS / GOOGLE</SectionLabel>
          <h2>TU OPINIÓN<br/><em>NOS IMPULSA.</em></h2>
          <p>¿Ya conocés el trabajo de la 2R? Compartí tu experiencia en nuestro perfil de Google.</p>
        </div>
        <a className="review-button" href={contact.reviewUrl} target="_blank" rel="noopener noreferrer">ESCRIBIR UNA RESEÑA <ArrowUpRight size={22}/></a>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', motor: '', detail: '' });
  const [status, setStatus] = useState('');
  const [draft, setDraft] = useState('');
  const setField = (field, value) => {
    setForm(current => ({ ...current, [field]: value }));
    setStatus('');
  };
  async function submit(e) {
    e.preventDefault();
    const message = ['Hola, Rectificadora 2R. Quisiera hacer una consulta.',
      'Nombre: ' + form.name.trim(),
      'Motor / modelo: ' + (form.motor.trim() || 'Sin especificar'),
      'Consulta: ' + form.detail.trim()].join('\n');
    setDraft(message);
    if (contact.whatsapp) {
      window.open('https://wa.me/' + contact.whatsapp + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
      setStatus('Abrimos WhatsApp con tu mensaje. Confirmá el envío desde la aplicación.');
    } else if (contact.email) {
      window.location.href = 'mailto:' + contact.email + '?subject=' + encodeURIComponent('Consulta de motor - 2R') + '&body=' + encodeURIComponent(message);
      setStatus('Se abrió tu aplicación de correo. Confirmá el envío para completar la consulta.');
    } else {
      try {
        await navigator.clipboard.writeText(message);
        setStatus('¡Consulta copiada! Ya podés pegar el texto en el canal de contacto de 2R.');
      } catch (error) {
        setStatus('Tu consulta está lista. Seleccioná y copiá el mensaje que aparece debajo.');
      }
    }
  }
  return (
    <section className="contact-section" id="contacto">
      <div className="site-container contact-layout">
        <div className="contact-intro reveal">
          <SectionLabel>04 / CONTACTO</SectionLabel>
          <h2>HABLEMOS<br/>DE TU<br/><span>MOTOR.</span></h2>
          <p>Contanos qué motor tenés y qué trabajo necesitás. Prepará tu consulta en unos pasos.</p>
          <div className="contact-lines">
            <a href={'tel:+' + contact.whatsapp} aria-label={'Llamar al ' + contact.phone}><Phone size={20}/><span>{contact.phone}</span><ArrowUpRight size={18}/></a>
            <a href={'https://wa.me/' + contact.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={20}/><span>ESCRIBIR POR WHATSAPP</span><ArrowUpRight size={18}/></a>
            <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={20}/><span>{contact.address}</span><ArrowUpRight size={18}/></a>
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={20}/><span>VISITAR FACEBOOK</span><ArrowUpRight size={18}/></a>
            <a href={contact.reviewUrl} target="_blank" rel="noopener noreferrer"><Star size={20}/><span>DEJAR UNA RESEÑA EN GOOGLE</span><ArrowUpRight size={18}/></a>
            {contact.email && <a href={'mailto:' + contact.email}><Mail size={20}/><span>{contact.email}</span><ArrowUpRight size={18}/></a>}
          </div>
          <div className="business-hours">
            <Clock size={19} aria-hidden="true"/>
            <div><strong>HORARIOS PUBLICADOS EN GOOGLE</strong>
              {contact.hours.map(({days,time}) => <span key={days}>{days}: {time}</span>)}
              <small>Domingo: sin horario publicado. Confirmá antes de visitar.</small>
            </div>
          </div>
        </div>
        <div className="form-panel reveal">
          <div className="form-heading"><span>CONSULTA / 2R</span><span>01—03</span></div>
          <h3>CONTANOS<br/>QUÉ NECESITÁS.</h3>
          <form onSubmit={submit} className="inquiry-form">
            <label htmlFor="full-name">01. TU NOMBRE <span>*</span></label>
            <input id="full-name" required autoComplete="name" maxLength={90} placeholder="Tu nombre" value={form.name} onChange={e => setField('name', e.target.value)}/>
            <label htmlFor="motor-model">02. MOTOR / MODELO</label>
            <input id="motor-model" maxLength={120} placeholder="Ej.: marca, modelo, tipo de motor" value={form.motor} onChange={e => setField('motor', e.target.value)}/>
            <label htmlFor="consultation">03. ¿QUÉ NECESITÁS? <span>*</span></label>
            <textarea id="consultation" required maxLength={1200} rows={3} placeholder="Describí brevemente tu consulta..." value={form.detail} onChange={e => setField('detail', e.target.value)}/>
            <button className="submit-button" type="submit">{contact.whatsapp ? 'CONTINUAR EN WHATSAPP' : (contact.email ? 'PREPARAR CORREO' : 'COPIAR MI CONSULTA')} {contact.whatsapp ? <ArrowUpRight size={20}/> : <Copy size={20}/>}</button>
            <p className="form-helper">{contact.whatsapp ? 'Tu mensaje se abrirá en WhatsApp para que confirmes el envío.' : (contact.email ? 'Se abrirá tu correo; el envío se confirma desde tu aplicación.' : 'El mensaje se copiará. No se envían datos desde este formulario.')}</p>
            {status && <div className="form-status" role="status"><ClipboardCheck size={18}/><span>{status}</span></div>}
            {draft && !contact.whatsapp && !contact.email && <textarea className="draft-output" aria-label="Texto de la consulta" value={draft} readOnly rows={5}/>}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="site-container footer-main">
        <div><Brand compact /><p>PRECISIÓN QUE MUEVE MOTORES.</p></div>
        <div className="footer-links"><a href="#inicio">INICIO</a><a href="#servicios">SERVICIOS</a><a href="#trabajos">TRABAJOS</a><a href="#nosotros">NOSOTROS</a><a href="#marcas">MARCAS</a><a href="#contacto">CONTACTO</a><a href={contact.facebook} target="_blank" rel="noopener noreferrer">FACEBOOK</a><a href={contact.mapUrl} target="_blank" rel="noopener noreferrer">UBICACIÓN</a></div>
        <a className="back-top" href="#inicio" aria-label="Volver arriba"><ArrowUpRight size={27}/></a>
      </div>
      <div className="site-container footer-bottom"><span>© {new Date().getFullYear()} RECTIFICADORA DE MOTORES 2R</span><span>DISEÑADO PARA MOVERSE HACIA ADELANTE <ArrowUpRight size={13}/></span></div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Hero />
        <Marquee />
        <Services />
        <WorkGallery />
        <About />
        <Brands />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
