import React, { useState, useEffect } from 'react';
import './kliphub-site.css';
import { EcosystemSection, FeatureShowcase } from './KlipHubShowcases';
import { KlipHubFeaturesMarquee } from './KlipHubFeaturesMarquee';
import KlipHubModulesSection from './KlipHubModulesSection';

const PUBLIC_BASE = import.meta.env.BASE_URL;

const HERO_ROTATING_WORDS = ['organizar.', 'automatizar.', 'lotar a agenda.', 'gerir o caixa.', 'fidelizar.'];

export default function KlipHubSitePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    // Primeira troca em menos de 1 segundo (750ms) logo no inicio do site
    const firstSwapTimer = window.setTimeout(() => {
      setActiveWordIdx((prev) => (prev + 1) % HERO_ROTATING_WORDS.length);
      interval = window.setInterval(() => {
        setActiveWordIdx((prev) => (prev + 1) % HERO_ROTATING_WORDS.length);
      }, 2200);
    }, 750);
    return () => {
      window.clearTimeout(firstSwapTimer);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDialogOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.kliphub-landing .hero');
    const lines = Array.from(hero?.querySelectorAll<HTMLElement>('.hero-title-line') ?? []);
    if (!hero || !lines.length) return;

    const replayTitleEntrance = () => {
      lines.forEach((line) => {
        line.style.animation = 'none';
        void line.offsetWidth;
        line.style.removeProperty('animation');
      });
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) replayTitleEntrance();
    }, { threshold: 0.35 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  return (
    <div className="kliphub-landing-wrapper kliphub-landing min-h-screen bg-[#070707] text-[#f5f5f5]">
      <a className="skip-link" href="#inicio">Ir para o conteúdo</a>

      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <a
            aria-label="KlipHub — Início"
            className="brand-logo"
            href="#inicio"
            onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}
          >
            <div className="brand-logo-badge">
              <img src={`${PUBLIC_BASE}barbershop_brancO64px.png`} alt="KlipHub Logo" width="22" height="22" />
            </div>
            <div className="brand-logo-text">
              <div className="brand-logo-title-row">
                <span className="brand-title">Klip<span className="brand-accent">Hub</span></span>
                <span className="brand-accent-dot"></span>
              </div>
              <span className="brand-subtitle">SISTEMA DE GESTÃO</span>
            </div>
          </a>

          <nav aria-label="Navegação principal" className="desktop-nav">
            <a href="#funcionalidades" onClick={(e) => { e.preventDefault(); scrollToSection('funcionalidades'); }}>Funcionalidades</a>
            <a href="#agendamento" onClick={(e) => { e.preventDefault(); scrollToSection('agendamento'); }}>Agendamento online</a>
            <a href="#planos" onClick={(e) => { e.preventDefault(); scrollToSection('planos'); }}>Planos e clube</a>
            <a href="#duvidas" onClick={(e) => { e.preventDefault(); scrollToSection('duvidas'); }}>Dúvidas</a>
          </nav>

          <div className="header-actions">
            <a className="login-link" href="https://kliphub.com.br/">
              Acessar sistema
              <svg><use href={`${PUBLIC_BASE}icons.svg#external`}></use></svg>
            </a>
            <button className="button button-small" onClick={() => setDialogOpen(true)}>
              Conhecer o KlipHub
              <svg><use href={`${PUBLIC_BASE}icons.svg#arrow`}></use></svg>
            </button>
            <button
              aria-controls="mobile-nav"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              className="menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg><use href={`${PUBLIC_BASE}icons.svg#${mobileMenuOpen ? 'close' : 'menu'}`}></use></svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav aria-label="Navegação móvel" className="mobile-nav" id="mobile-nav" style={{ display: 'flex' }}>
            <a href="#funcionalidades" onClick={(e) => { e.preventDefault(); scrollToSection('funcionalidades'); }}>Funcionalidades</a>
            <a href="#agendamento" onClick={(e) => { e.preventDefault(); scrollToSection('agendamento'); }}>Agendamento online</a>
            <a href="#planos" onClick={(e) => { e.preventDefault(); scrollToSection('planos'); }}>Planos e clube</a>
            <a href="#duvidas" onClick={(e) => { e.preventDefault(); scrollToSection('duvidas'); }}>Dúvidas</a>
            <a href="https://kliphub.com.br/" onClick={() => setMobileMenuOpen(false)}>Acessar sistema</a>
          </nav>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero container" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot pulse"></span> PLATAFORMA INTEGRADA PARA BARBEARIAS
            </div>
            <h1>
              <span className="hero-title-line hero-title-line-first">Seu talento é cortar.</span><br />
              <span className="hero-title-line hero-title-line-second">O nosso é <span className="highlight-word">
                <span key={activeWordIdx} className="hero-rotating-word">
                  {HERO_ROTATING_WORDS[activeWordIdx]}
                </span>
                <svg aria-hidden="true" key={`underline-${activeWordIdx}`} viewBox="0 0 360 20">
                  <path d="M3 13C97 2 240 3 355 12"></path>
                </svg>
              </span></span>
            </h1>
            <p className="hero-description">
              Agenda, caixa e clientes em um só lugar. O KlipHub cuida da gestão para você cuidar do que faz melhor.
            </p>
            <div className="hero-buttons">
              <a className="button" href="https://kliphub.com.br/">
                Começar agora <svg><use href={`${PUBLIC_BASE}icons.svg#arrow`}></use></svg>
              </a>
              <a className="text-button" href="#demonstracao" onClick={(e) => { e.preventDefault(); scrollToSection('demonstracao'); }}>
                <span className="play-circle"><svg><use href={`${PUBLIC_BASE}icons.svg#play`}></use></svg></span>
                Veja como funciona
              </a>
            </div>
            <div className="hero-reassurance">
              <span><svg><use href={`${PUBLIC_BASE}icons.svg#check-circle`}></use></svg>100% online</span>
              <span><svg><use href={`${PUBLIC_BASE}icons.svg#check-circle`}></use></svg>Da agenda ao financeiro</span>
            </div>
            <div className="hero-line">
              <span className="mini-scissors"><svg><use href={`${PUBLIC_BASE}icons.svg#scissors`}></use></svg></span>
              <p>Feito para quem entende de corte.<br /><strong>E quer ter o controle do negócio.</strong></p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-animation-frame">
              <iframe
                aria-label="Animação de conversa do KlipHub Gestor de IA"
                className="hero-animation-iframe"
                loading="eager"
                src={`${import.meta.env.BASE_URL}gestor_de_ia_hero.html?v=20261030-v4`}
                title="Demonstração animada do KlipHub Gestor de IA"
              />
            </div>
          </div>
        </section>

        {/* BARRA FLUTUANTE DE RECURSOS E DIFERENCIAIS */}
        <KlipHubFeaturesMarquee />

        {/* FUNCIONALIDADES · FEATURE SHOWCASE INTERATIVO */}
        <FeatureShowcase onExplore={() => setDialogOpen(true)} />

        {/* DEMONSTRAÇÃO COM A AGENDA REAL */}
        <section className="demo-section section" id="demonstracao">
          <div className="container">
            <div className="section-heading centered">
              <div className="eyebrow">UM OLHAR PARA SUA NOVA ROTINA</div>
              <h2>O dia fica mais leve<br />quando tudo está no lugar.</h2>
              <p>A agenda real do KlipHub, desenvolvida especialmente para a rotina da sua barbearia.</p>

              {/* BARRA DE DESTAQUES RÁPIDOS (GUIA VISUAL PRÉ-AGENDA) */}
              <div className="agenda-pill-strip">
                <div className="agenda-pill-item">
                  <div className="api-icon">
                    <svg fill="none" height="15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="15"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div className="api-text">
                    <strong>Visão Multiprofissional</strong>
                    <span>Grade individual por cadeira</span>
                  </div>
                </div>

                <div className="agenda-pill-divider" aria-hidden="true" />

                <div className="agenda-pill-item">
                  <div className="api-icon">
                    <svg fill="none" height="15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="15"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  </div>
                  <div className="api-text">
                    <strong>Status em Tempo Real</strong>
                    <span>Sincronizado com WhatsApp</span>
                  </div>
                </div>

                <div className="agenda-pill-divider" aria-hidden="true" />

                <div className="agenda-pill-item">
                  <div className="api-icon">
                    <svg fill="none" height="15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="15"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <div className="api-text">
                    <strong>Fechamento Automático</strong>
                    <span>Comissões e caixa apurados na hora</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MOCKUP INTERATIVO DA JANELA DA AGENDA */}
            <div className="agenda-window-mockup">
              <div className="agenda-window-header">
                <div className="window-dots" aria-hidden="true">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="window-title">
                  <span className="status-live-dot pulse"></span>
                  <span className="window-brand">KlipHub Agenda</span>
                  <span className="window-sub">· Simulação interativa em tempo real</span>
                </div>
                <div className="window-actions">
                  <a
                    className="window-btn-expand"
                    href={`${PUBLIC_BASE}agenda_demo_v2.html`}
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Abrir simulação completa em tela cheia"
                  >
                    <span>Tela cheia</span>
                    <svg aria-hidden="true" fill="none" height="13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="13"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
                  </a>
                </div>
              </div>

              <div className="agenda-iframe-container">
                <iframe
                  aria-label="Demonstração interativa e animada da agenda do KlipHub"
                  className="agenda-demo-iframe"
                  loading="lazy"
                  src={`${PUBLIC_BASE}agenda_demo_v2.html?v=20261028-v2`}
                  title="Demonstração animada da Agenda KlipHub"
                />
              </div>

              <div className="agenda-window-footer">
                <div className="agenda-footer-hint">
                  <span className="hint-pill">Ao vivo</span>
                  <span>A animação avança os dias da semana automaticamente. Você também pode pausar e interagir diretamente.</span>
                </div>
                <div className="agenda-footer-meta">
                  <span>Visual fiel do sistema · Proporção original sem cortes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MÓDULOS DO KLIPHUB · CARDS INTERATIVOS */}
        <KlipHubModulesSection />

        {/* ECOSSISTEMA · SOFTWARE, CLUBE E WHATSAPP */}
        <EcosystemSection />

        {/* FAQ SECTION */}
        <section className="section container faq-section" id="duvidas">
          <div className="faq-intro">
            <div className="eyebrow">SEM PONTAS SOLTAS</div>
            <h2>É normal<br />ter perguntas.</h2>
            <p>Vamos deixar a gestão mais simples,<br />começando por aqui.</p>
            <button className="text-button" onClick={() => setDialogOpen(true)}>
              Conhecer o sistema <svg><use href={`${PUBLIC_BASE}icons.svg#arrow`}></use></svg>
            </button>
          </div>

          <div className="faq-list">
            {[
              {
                q: "O KlipHub serve para barbearias pequenas?",
                a: "Sim. O sistema atende desde o barbeiro que trabalha sozinho até barbearias com equipe ampla. Você usa os recursos que fazem sentido para sua rotina."
              },
              {
                q: "Como funciona o agendamento online?",
                a: "O cliente acessa a vitrine da sua barbearia, consulta os serviços, escolhe o profissional e um horário disponível e confirma o agendamento. Na área do cliente, ele acompanha o histórico e os próximos atendimentos."
              },
              {
                q: "Consigo vender produtos e acompanhar comissões?",
                a: "Sim. Cadastre produtos com preço e custo e venda pelo PDV com baixa automática no estoque. As vendas e os atendimentos se integram ao caixa e ao cálculo de comissões por profissional."
              },
              {
                q: "A assinatura do KlipHub é o plano que vendo aos clientes?",
                a: "Não. A assinatura do KlipHub é a contratação do software pela sua barbearia. O clube reúne os planos e pacotes que você cria e oferece aos seus próprios clientes."
              },
              {
                q: "O que o agente de IA pode fazer no WhatsApp?",
                a: "O Agente de IA responde dúvidas e auxilia em ações de agendamento dentro das regras configuradas por você, centralizando conversas e lembretes."
              },
              {
                q: "E o Gestor de IA, como ajuda na operação?",
                a: "Ele entrega resumos executivos e orientações operacionais diárias para apoiar suas decisões e o crescimento do seu negócio."
              },
              {
                q: "Como posso começar a usar o KlipHub?",
                a: "Você pode criar a conta da sua barbearia em poucos minutos diretamente pelo sistema e configurar sua equipe, serviços e horários."
              }
            ].map((faq, i) => (
              <details
                key={i}
                className="faq-item"
                open={openFaq === i}
                onClick={(e) => {
                  e.preventDefault();
                  toggleFaq(i);
                }}
              >
                <summary>
                  {faq.q}
                  <svg style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>
                    <use href={`${PUBLIC_BASE}icons.svg#plus`}></use>
                  </svg>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="final-cta container" id="contato">
          <div className="cta-copy">
            <div className="eyebrow">SEU PRÓXIMO PASSO É MAIS SIMPLES.</div>
            <h2>Menos tempo no controle.<br />Mais tempo na cadeira.</h2>
            <p>Conheça o KlipHub e descubra uma nova rotina para sua barbearia.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <a className="button" href="https://kliphub.com.br/">
                Criar conta da barbearia <svg><use href={`${PUBLIC_BASE}icons.svg#arrow`}></use></svg>
              </a>
              <a className="text-button" href="https://kliphub.com.br/" style={{ color: '#fff' }}>
                Já sou cliente / Entrar <svg><use href={`${PUBLIC_BASE}icons.svg#arrow`}></use></svg>
              </a>
            </div>
          </div>

          <div aria-hidden="true" className="cta-art">
            <div className="large-brand-mark">
              <img src={`${PUBLIC_BASE}icon-white-512.png`} alt="KlipHub" width="48" height="48" />
            </div>
            <span className="cta-status-badge">SISTEMA ATIVO</span>
            <div className="cta-caption">
              SEU NEGÓCIO,<br /><strong>NO SEU RITMO.</strong>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer container">
        <div className="footer-top">
          <div>
            <a
              aria-label="KlipHub — Início"
              className="brand-logo footer-logo"
              href="#inicio"
              onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}
            >
              <div className="brand-logo-badge">
                <img src={`${PUBLIC_BASE}barbershop_brancO64px.png`} alt="KlipHub Logo" width="22" height="22" />
              </div>
              <div className="brand-logo-text">
                <div className="brand-logo-title-row">
                  <span className="brand-title">Klip<span className="brand-accent">Hub</span></span>
                  <span className="brand-accent-dot"></span>
                </div>
                <span className="brand-subtitle">TECNOLOGIA PARA BARBEARIAS</span>
              </div>
            </a>
            <p>Gestão inteligente.<br />Barbearia no seu ritmo.</p>
          </div>

          <div className="footer-links">
            <div>
              <strong>O KlipHub</strong>
              <a href="#funcionalidades" onClick={(e) => { e.preventDefault(); scrollToSection('funcionalidades'); }}>Funcionalidades</a>
              <a href="#demonstracao" onClick={(e) => { e.preventDefault(); scrollToSection('demonstracao'); }}>Visão do sistema</a>
              <a href="#agendamento" onClick={(e) => { e.preventDefault(); scrollToSection('agendamento'); }}>Agendamento online</a>
            </div>
            <div>
              <strong>Para sua barbearia</strong>
              <a href="#planos" onClick={(e) => { e.preventDefault(); scrollToSection('planos'); }}>Planos e clube</a>
              <a href="#duvidas" onClick={(e) => { e.preventDefault(); scrollToSection('duvidas'); }}>Perguntas frequentes</a>
              <a href="#contato" onClick={(e) => { e.preventDefault(); scrollToSection('contato'); }}>Conhecer o KlipHub</a>
            </div>
            <div>
              <strong>Já usa o KlipHub?</strong>
              <a className="footer-external" href="https://kliphub.com.br/">
                Acessar sistema <svg><use href={`${PUBLIC_BASE}icons.svg#external`}></use></svg>
              </a>
              <p>Acesso rápido ao seu painel.</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} KlipHub. Todos os direitos reservados.</span>
          <span>Feito para quem faz acontecer.</span>
          <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>
            Voltar ao topo <svg><use href={`${PUBLIC_BASE}icons.svg#arrow-up`}></use></svg>
          </a>
        </div>
      </footer>

      {/* DIALOG APRESENTAÇÃO */}
      {dialogOpen && (
        <div
          className="intro-dialog-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setDialogOpen(false)}
        >
          <div
            className="intro-dialog relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              aria-label="Fechar apresentação"
              className="dialog-close"
              onClick={() => setDialogOpen(false)}
            >
              <svg><use href={`${PUBLIC_BASE}icons.svg#close`}></use></svg>
            </button>

            <div className="dialog-brand-header" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div className="brand-logo-badge" style={{ width: '34px', height: '34px', borderRadius: '10px' }}>
                <img src={`${PUBLIC_BASE}barbershop_brancO64px.png`} alt="KlipHub" width="18" height="18" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                Klip<span style={{ color: '#14b8a6' }}>Hub</span>
              </span>
            </div>

            <div className="eyebrow">SUA NOVA ROTINA COMEÇA AQUI</div>
            <h2 id="intro-title">Conheça o KlipHub.</h2>
            <p>
              Pronto para transformar a gestão da sua barbearia? Você pode acessar o sistema agora mesmo ou explorar a demonstração nesta página.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
              <a className="button" href="https://kliphub.com.br/" onClick={() => setDialogOpen(false)}>
                Criar conta da barbearia <svg><use href={`${PUBLIC_BASE}icons.svg#arrow`}></use></svg>
              </a>
              <a className="button button-dark" href="https://kliphub.com.br/" onClick={() => setDialogOpen(false)}>
                Já tenho conta / Entrar <svg><use href={`${PUBLIC_BASE}icons.svg#external`}></use></svg>
              </a>
              <button
                className="dialog-preview text-button"
                onClick={() => {
                  setDialogOpen(false);
                  scrollToSection('demonstracao');
                }}
              >
                Explorar a prévia da agenda <svg><use href={`${PUBLIC_BASE}icons.svg#arrow`}></use></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
