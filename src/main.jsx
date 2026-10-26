import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Clock, Facebook, Mail, MapPin, Menu, MessageCircle, Phone, Star, X } from 'lucide-react';
import { contact, inquiryMessage, navigation, whatsappUrl } from './siteData';
import { heroPhoto, servicePhoto } from './media';
import WorkGallery from './WorkGallery';
import { usePhotoMotion, useScrollNavigation } from './useInteractions';
import './styles.css';

function LogoMark({ compact = false }) {
  return <span className={'logo-mark' + (compact ? ' logo-mark-small' : '')} aria-hidden="true"><img src="/logo-2r.svg" alt="" width="740" height="545" decoding="async" /></span>;
}
function Brand({ compact = false }) {
  return <a className={'brand' + (compact ? ' brand-footer' : '')} href="#inicio" aria-label="Rectificadora de Motores 2R — inicio"><LogoMark compact={compact} /></a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);
  const activeSection = useScrollNavigation(header);
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 900px)');
    const onResize = () => { if (!mobile.matches) setOpen(false); };
    mobile.addEventListener('change', onResize);
    return () => mobile.removeEventListener('change', onResize);
  }, []);
  useEffect(() => {
    if (!open) return;
    const main = document.getElementById('contenido');
    const footer = document.querySelector('footer');
    document.body.classList.add('menu-is-open');
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    header.current?.querySelector('nav a')?.focus({ preventScroll: true });
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
      if (event.key !== 'Tab') return;
      const items = [...header.current.querySelectorAll('a, button')].filter(el => el.getClientRects().length);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('menu-is-open');
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      document.removeEventListener('keydown', onKey);
      toggle.current?.focus({ preventScroll: true });
    };
  }, [open]);
  return <header className="site-header" ref={header}>
    <div className="header-inner site-container">
      <Brand />
      <nav className={'nav-links' + (open ? ' nav-open' : '')} aria-label="Navegación principal" id="main-navigation">
        {navigation.map(item => <a key={item.href} href={item.href} aria-current={activeSection === item.href ? 'location' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
        <a className="mobile-nav-cta" href={whatsappUrl()}>SOLICITAR PRESUPUESTO <ArrowUpRight size={18} aria-hidden="true" /></a>
      </nav>
      <a className="header-cta" href={whatsappUrl()}><MessageCircle size={17} aria-hidden="true" /> WHATSAPP <ArrowUpRight size={16} aria-hidden="true" /></a>
      <button className="menu-toggle" type="button" ref={toggle} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
        {open ? <X size={25} aria-hidden="true" /> : <Menu size={25} aria-hidden="true" />}
      </button>
    </div>
  </header>;
}

function SectionLabel({ children }) {
  return <p className="section-label"><span className="label-dash" aria-hidden="true" />{children}</p>;
}
function Hero() {
  const photo = usePhotoMotion();
  const photoSizes = '(max-width: 620px) calc(100vw - 40px), (max-width: 900px) calc(100vw - 48px), (max-width: 1100px) calc((100vw - 64px) * .48), (max-width: 1280px) calc((100vw - 80px) * .48), 576px';
  return <section id="inicio" className="hero" aria-labelledby="hero-title">
    <div className="hero-container site-container">
      <div className="hero-main">
        <div className="hero-content">
          <p className="hero-eyebrow"><span aria-hidden="true" /> RECTIFICADORA 2R · CIUDAD DEL ESTE</p>
          <h1 id="hero-title"><span>PRECISIÓN</span><span className="outline-word">QUE MUEVE</span><span className="highlight-word">MOTORES.</span></h1>
          <p className="hero-subtitle">Rectificación de motores y componentes en Ciudad del Este.</p>
          <div className="hero-actions">
            <a href={whatsappUrl()} className="button button-yellow">CONSULTAR POR WHATSAPP <ArrowUpRight size={19} aria-hidden="true" /></a>
            <a href="#trabajos" className="text-link">VER TRABAJOS REALES <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
          
        </div>
        <figure className="hero-photo" ref={photo}>
          <picture>
            <source type="image/avif" srcSet={heroPhoto.avifSrcSet} sizes={photoSizes} />
            <img src={heroPhoto.url} srcSet={heroPhoto.srcSet} sizes={photoSizes} alt="Bloque de motor de cuatro cilindros sobre fondo negro" width={heroPhoto.width} height={heroPhoto.height} fetchPriority="high" decoding="async" />
          </picture>
          <figcaption><span>BLOQUE DE MOTOR</span><span>RECTIFICADORA 2R</span></figcaption>
        </figure>
      </div>
      <div className="hero-bottom"><a href="#ubicacion">CÓMO LLEGAR <ArrowDownRight size={18} aria-hidden="true" /></a></div>
    </div>
  </section>;
}
function Services() {
  return <section className="services-section section-space" id="servicios" aria-labelledby="services-title">
    <div className="site-container">
      <div className="services-head reveal"><SectionLabel>01 / QUÉ HACEMOS</SectionLabel><h2 id="services-title">Rectificación de motores.<br /><em>Pedí tu presupuesto.</em></h2></div>
      <article className="service-overview reveal">
        <div className="service-copy">
          <p className="section-intro">Consultá por tu motor o pieza. Mandanos una foto por WhatsApp.</p>
          <h3>Para solicitar tu presupuesto</h3>
          <ol className="consultation-checklist">
            <li><span>01</span><div><strong>Marca y modelo</strong><p>Indicá el motor o vehículo.</p></div></li>
            <li><span>02</span><div><strong>Pieza o componente</strong><p>Mandanos una foto de la pieza.</p></div></li>
            <li><span>03</span><div><strong>Trabajo a consultar</strong><p>Contanos qué trabajo necesitás.</p></div></li>
          </ol>
        </div>
        <figure className="service-photo"><img src={servicePhoto.url} srcSet={servicePhoto.srcSet} sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 900px) calc((100vw - 48px) * .45), 520px" alt="Cámaras y válvulas de una tapa de motor fotografiada en 2R" width={servicePhoto.width} height={servicePhoto.height} loading="lazy" decoding="async" /><figcaption>COMPONENTES DEL MOTOR / 2R</figcaption></figure>
      </article>
      <div className="service-cta reveal"><p>¿Tenés una pieza para consultar?<span>Mandá una foto y los datos del motor por WhatsApp.</span></p><a className="button button-outline" href={whatsappUrl('Hola, 2R. Quisiera consultar sobre un trabajo de rectificación. Mi motor / modelo es: ')}>CONSULTAR POR WHATSAPP <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </div>
  </section>;
}
function LocationAndContact() {
  const [form, setForm] = useState({ name: '', motor: '', detail: '' });
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: '' }));
  };
  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Escribí tu nombre.';
    if (!form.detail.trim()) nextErrors.detail = 'Contanos brevemente qué necesitás.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      // Wait for error messages to take their space before moving focus. Native
      // focus scrolling can otherwise leave the field behind the sticky header.
      const invalidField = nextErrors.name ? 'full-name' : 'consultation';
      window.requestAnimationFrame(() => {
        const field = document.getElementById(invalidField);
        field?.focus({ preventScroll: true });
        field?.scrollIntoView({ block: 'center', behavior: 'auto' });
      });
      return;
    }
    window.location.assign(whatsappUrl(inquiryMessage(form)));
  }
  return <section className="location-section section-space" id="ubicacion" aria-labelledby="location-title">
    <div className="site-container">
      <div className="location-heading reveal">
        <SectionLabel>03 / UBICACIÓN Y CONTACTO</SectionLabel>
        <h2 id="location-title">Encontranos.<br /><em>Hablemos de tu motor.</em></h2>
      </div>
      <div className="location-grid reveal">
        <article className="location-card">
          <MapPin size={27} aria-hidden="true" />
          <h3>Cómo llegar</h3>
          <p>{contact.address}, Paraguay.</p>
          <a className="text-link" href={contact.mapUrl} target="_blank" rel="noopener noreferrer">ABRIR GOOGLE MAPS <ArrowUpRight size={18} aria-hidden="true" /></a>
          <div className="location-hours">
            <h4><Clock size={18} aria-hidden="true" /> Horario de atención</h4>
            <p>Consultá el horario antes de visitar el taller.</p>
            <small><a href={whatsappUrl('Hola, 2R. ¿Me confirman el horario de atención?')}>CONFIRMAR HORARIO POR WHATSAPP</a></small>
          </div>
        </article>
        <article className="location-card location-contact-card" id="contacto">
          <MessageCircle size={27} aria-hidden="true" />
          <h3>Pedí tu presupuesto</h3>
          <p>Mandanos una foto del motor o la pieza.</p>
          <a href={whatsappUrl()} className="button button-yellow">ESCRIBIR POR WHATSAPP <ArrowUpRight size={19} aria-hidden="true" /></a>
          <a className="contact-phone" href={'tel:+' + contact.whatsapp}><Phone size={19} aria-hidden="true" /> {contact.phone}</a>
          {contact.email && <a className="contact-phone" href={'mailto:' + contact.email}><Mail size={19} aria-hidden="true" /> {contact.email}</a>}
          <div className="location-social-links">
            <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer"><Star size={17} aria-hidden="true" /> Reseñas en Google <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={17} aria-hidden="true" /> Facebook <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </article>
      </div>
      <details className="contact-form-details reveal">
        <summary>¿Querés dejar una consulta con más detalles? <ArrowRight size={19} aria-hidden="true" /></summary>
        <div className="form-panel">
          <h3>Tu consulta</h3>
          <form onSubmit={submit} className="inquiry-form" noValidate>
            <label htmlFor="full-name">Tu nombre <span>(obligatorio)</span></label>
            <input id="full-name" name="name" required autoComplete="name" maxLength={90} placeholder="¿Cómo te llamás?" value={form.name} onChange={e => setField('name', e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
            {errors.name && <p className="field-error" id="name-error" role="alert">{errors.name}</p>}
            <label htmlFor="motor-model">Motor / modelo <span>(opcional)</span></label>
            <input id="motor-model" name="motor" maxLength={120} placeholder="Marca, modelo o tipo de motor" value={form.motor} onChange={e => setField('motor', e.target.value)} />
            <label htmlFor="consultation">¿Qué necesitás? <span>(obligatorio)</span></label>
            <textarea id="consultation" name="detail" required maxLength={1200} rows={4} placeholder="Describí brevemente tu consulta…" value={form.detail} onChange={e => setField('detail', e.target.value)} aria-invalid={Boolean(errors.detail)} aria-describedby={errors.detail ? 'detail-error' : undefined} />
            {errors.detail && <p className="field-error" id="detail-error" role="alert">{errors.detail}</p>}
            <button className="submit-button" type="submit">CONTINUAR EN WHATSAPP <ArrowUpRight size={19} aria-hidden="true" /></button>
            <p className="form-helper">Vos confirmás el envío en WhatsApp.</p>
          </form>
        </div>
      </details>
    </div>
  </section>;
}
function MobileContactBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('inicio');
    if (!hero || !('IntersectionObserver' in window)) return;
    const mobile = window.matchMedia('(max-width: 620px)');
    let observer;
    const configure = () => {
      observer?.disconnect();
      if (!mobile.matches) { setVisible(false); return; }
      observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 78), { rootMargin: '-78px 0px 0px 0px', threshold: 0 });
      observer.observe(hero);
    };
    configure();
    mobile.addEventListener('change', configure);
    return () => { observer?.disconnect(); mobile.removeEventListener('change', configure); };
  }, []);
  return visible ? <nav className="mobile-contact-bar" aria-label="Contacto rápido de 2R">
    <a href={whatsappUrl()}><MessageCircle size={19} aria-hidden="true" /><span>WhatsApp</span></a>
    <a href={'tel:+' + contact.whatsapp}><Phone size={19} aria-hidden="true" /><span>Llamar</span></a>
    <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={19} aria-hidden="true" /><span>Cómo llegar</span></a>
  </nav> : null;
}
function Footer() {
  return <footer className="footer">
    <div className="site-container footer-main footer-main-compact">
      <Brand compact />
      <a className="footer-direct-link" href={whatsappUrl()}>WHATSAPP <ArrowUpRight size={16} aria-hidden="true" /></a>
      <a className="footer-direct-link" href={contact.mapUrl} target="_blank" rel="noopener noreferrer">CÓMO LLEGAR <ArrowUpRight size={16} aria-hidden="true" /></a>
      <a className="back-top" href="#inicio" aria-label="Volver arriba"><ArrowUpRight size={23} aria-hidden="true" /></a>
    </div>
    <div className="site-container footer-bottom"><span>© {new Date().getFullYear()} RECTIFICADORA DE MOTORES 2R · CIUDAD DEL ESTE</span></div>
  </footer>;
}
function App() {
  useEffect(() => {
    // Only opacity and a short translation: no scroll listeners or heavy effects.
    if (!('IntersectionObserver' in window)) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Elements fade in when entering and gently fade out after leaving.
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.01 });

    const prepare = element => {
      if (!element || !element.classList.contains('reveal')) return;
      if (motion.matches) {
        element.classList.remove('reveal-ready', 'visible');
      } else {
        element.classList.add('reveal-ready');
        observer.observe(element);
      }
    };
    const configure = () => {
      observer.disconnect();
      document.querySelectorAll('.reveal').forEach(prepare);
    };
    configure();

    // React can insert extra gallery cards and videos after the first render.
    const dynamicContent = new MutationObserver(records => {
      records.forEach(record => {
        record.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          prepare(node);
          node.querySelectorAll?.('.reveal').forEach(prepare);
        });
        record.removedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          if (node.classList?.contains('reveal')) observer.unobserve(node);
          node.querySelectorAll?.('.reveal').forEach(element => observer.unobserve(element));
        });
      });
    });
    dynamicContent.observe(document.getElementById('contenido'), { childList: true, subtree: true });
    motion.addEventListener('change', configure);
    return () => {
      dynamicContent.disconnect();
      observer.disconnect();
      motion.removeEventListener('change', configure);
    };
  }, []);
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><Header /><main id="contenido"><Hero /><Services /><WorkGallery /><LocationAndContact /><MobileContactBar /></main><Footer /></>;
}
createRoot(document.getElementById('root')).render(<App />);
