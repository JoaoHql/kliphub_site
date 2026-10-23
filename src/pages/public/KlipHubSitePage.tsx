import React, { useState, useEffect } from 'react';
import './kliphub-site.css';

const PUBLIC_BASE = import.meta.env.BASE_URL;

export default function KlipHubSitePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    if (!hero || !lines.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.kliphub-landing .hero');
    const frame = hero?.querySelector<HTMLIFrameElement>('.hero-animation-iframe');
    if (!hero || !frame) return;

    let conversationComplete = false;
    let wheelGestureLocked = false;
    let wheelGestureTimer: number | undefined;
    let touchStartY = 0;
    let touchStartedWhileHeroVisible = false;
    let touchGestureUsed = false;

    const heroIsVisible = () => {
      const rect = hero.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const scrollToNextSection = () => {
      document.querySelector('.kliphub-landing .benefit-ribbon')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const advanceOrContinue = () => {
      if (wheelGestureLocked) {
        window.clearTimeout(wheelGestureTimer);
        wheelGestureTimer = window.setTimeout(() => { wheelGestureLocked = false; }, 220);
        return;
      }
      wheelGestureLocked = true;
      window.clearTimeout(wheelGestureTimer);
      wheelGestureTimer = window.setTimeout(() => { wheelGestureLocked = false; }, 220);
      if (conversationComplete) {
        scrollToNextSection();
        return;
      }
      frame.contentWindow?.postMessage({ type: 'kliphub:advance' }, window.location.origin);
    };

    const handleFrameMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.contentWindow) return;
      if (event.data?.type === 'kliphub:conversation-complete') {
        conversationComplete = true;
      } else if (event.data?.type === 'kliphub:frame-scroll') {
        if (event.data.direction > 0) advanceOrContinue();
        else window.scrollBy({ top: event.data.direction, behavior: 'auto' });
      }
    };

    const handlePageWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0 || !heroIsVisible()) return;
      event.preventDefault();
      advanceOrContinue();
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartedWhileHeroVisible = heroIsVisible();
      touchGestureUsed = false;
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!touchStartedWhileHeroVisible || touchGestureUsed || !event.touches[0]) return;
      const currentY = event.touches[0].clientY;
      if (touchStartY - currentY > 36) {
        event.preventDefault();
        touchGestureUsed = true;
        advanceOrContinue();
      }
    };

    window.addEventListener('message', handleFrameMessage);
    window.addEventListener('wheel', handlePageWheel, { capture: true, passive: false });
    window.addEventListener('touchstart', handleTouchStart, { capture: true, passive: true });
    window.addEventListener('touchmove', handleTouchMove, { capture: true, passive: false });
    return () => {
      window.removeEventListener('message', handleFrameMessage);
      window.removeEventListener('wheel', handlePageWheel, true);
      window.removeEventListener('touchstart', handleTouchStart, true);
      window.removeEventListener('touchmove', handleTouchMove, true);
      window.clearTimeout(wheelGestureTimer);
    };
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
              <span className="hero-title-line hero-title-line-second">O nosso é <span className="highlight-word">organizar.
                <svg aria-hidden="true" viewBox="0 0 360 20">
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
                aria-label="Animação original de conversa do Gestor de IA"
                className="hero-animation-iframe"
                loading="eager"
                src={`${import.meta.env.BASE_URL}gestor_de_ia_hero.html?v=20261023-0002`}
                title="Demonstração animada do Gestor de IA"
              />
            </div>
          </div>
        </section>

        {/* BENEFIT RIBBON */}
        <section aria-label="Principais recursos" className="benefit-ribbon">
          <div className="container ribbon-inner">
            <span><svg><use href={`${PUBLIC_BASE}icons.svg#calendar`}></use></svg>Agenda online</span>
            <span><svg><use href={`${PUBLIC_BASE}icons.svg#wallet`}></use></svg>Caixa e comissões</span>
            <span><svg><use href={`${PUBLIC_BASE}icons.svg#users`}></use></svg>Clientes e equipe</span>
            <span><svg><use href={`${PUBLIC_BASE}icons.svg#message`}></use></svg>WhatsApp com IA</span>
            <span><svg><use href={`${PUBLIC_BASE}icons.svg#chart`}></use></svg>Financeiro claro</span>
          </div>
        </section>

        {/* FUNCIONALIDADES */}
        <section className="section container" id="funcionalidades">
          <div className="section-heading split-heading">
            <div>
              <div className="eyebrow">MENOS CONTROLE MANUAL. MAIS BARBEARIA.</div>
              <h2>Tudo conectado.<br />Você no controle.</h2>
            </div>
            <p>Horários por mensagem, comissões na calculadora, estoque na cabeça. Sua barbearia merece uma rotina mais simples.</p>
          </div>

          <div className="feature-grid">
            <article className="feature-card feature-agenda">
              <div className="feature-card-top">
                <span className="feature-icon"><svg><use href={`${PUBLIC_BASE}icons.svg#calendar`}></use></svg></span>
                <span className="feature-number">01 / AGENDA</span>
              </div>
              <h3>Cadeira ocupada.<br />Agenda organizada.</h3>
              <p>Veja os horários e a disponibilidade da equipe. Crie agendamentos manualmente, confirme, remarque, cancele e conclua atendimentos.</p>
              <div aria-label="Representação ilustrativa de agenda" className="week-preview">
                <div className="week-days">
                  <span>SEG</span><span>TER</span><span className="active">QUA</span><span>QUI</span><span>SEX</span>
                </div>
                <div className="week-bars">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <small>Prévia ilustrativa</small>
              </div>
              <a className="card-link" href="#demonstracao" onClick={(e) => { e.preventDefault(); scrollToSection('demonstracao'); }}>
                Explorar a agenda <svg><use href={`${PUBLIC_BASE}icons.svg#arrow`}></use></svg>
              </a>
            </article>

            <article className="feature-card">
              <div className="feature-card-top">
                <span className="feature-icon"><svg><use href={`${PUBLIC_BASE}icons.svg#wallet`}></use></svg></span>
                <span className="feature-number">02 / CAIXA</span>
              </div>
              <h3>Feche a conta.<br />Não a sua visão.</h3>
              <p>Serviços e produtos no PDV, baixa automática no estoque e vendas integradas ao caixa e às comissões.</p>
              <div className="tags">
                <span>PDV e comanda</span><span>Formas de pagamento</span><span>Comissões</span>
              </div>
              <details className="feature-detail">
                <summary>O que está incluído <svg><use href={`${PUBLIC_BASE}icons.svg#plus`}></use></svg></summary>
                <p>Registre o recebimento pela forma de pagamento escolhida. Configure os métodos aceitos no balcão e no agendamento online. Consulte as reservas de produtos para retirada e os valores de comissão ligados aos atendimentos realizados.</p>
              </details>
            </article>

            <article className="feature-card">
              <div className="feature-card-top">
                <span className="feature-icon"><svg><use href={`${PUBLIC_BASE}icons.svg#chart`}></use></svg></span>
                <span className="feature-number">03 / FINANCEIRO</span>
              </div>
              <h3>Saiba o que entra.<br />E o que faz crescer.</h3>
              <p>Receitas, despesas, comissões e ticket médio. Enxergue os números da sua barbearia sem depender de planilhas.</p>
              <div aria-hidden="true" className="mini-chart">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <details className="feature-detail">
                <summary>O que está incluído <svg><use href={`${PUBLIC_BASE}icons.svg#plus`}></use></svg></summary>
                <p>Cadastre despesas com descrição, categoria, valor, vencimento e observações. Marque como pagas ou pendentes, filtre por período e categoria e consulte receitas e transações por período, profissional e método de pagamento.</p>
              </details>
            </article>

            <article className="feature-card">
              <div className="feature-card-top">
                <span className="feature-icon"><svg><use href={`${PUBLIC_BASE}icons.svg#users`}></use></svg></span>
                <span className="feature-number">04 / OPERAÇÃO</span>
              </div>
              <h3>Seu negócio inteiro.<br />Sem pontas soltas.</h3>
              <p>Clientes, equipe, serviços e produtos bem organizados. As informações certas para cada atendimento.</p>
              <div className="tags">
                <span>Histórico de clientes</span><span>Equipe e acessos</span><span>Estoque</span>
              </div>
              <details className="feature-detail">
                <summary>O que está incluído <svg><use href={`${PUBLIC_BASE}icons.svg#plus`}></use></svg></summary>
                <p>Cadastre e busque clientes com histórico de atendimentos. Organize os profissionais, seus acessos e configurações. Defina preço, duração e disponibilidade dos serviços, além de preço, custo e estoque dos produtos. Acompanhe receita e atendimentos do dia, clientes cadastrados e cancelamentos no painel.</p>
              </details>
            </article>

            <article className="feature-card">
              <div className="feature-card-top">
                <span className="feature-icon"><svg><use href={`${PUBLIC_BASE}icons.svg#heart`}></use></svg></span>
                <span className="feature-number">05 / RELACIONAMENTO</span>
              </div>
              <h3>Um bom corte traz.<br />Uma boa relação mantém.</h3>
              <p>Fidelidade, avaliações e radar de retenção para identificar quem está há mais tempo sem agendar.</p>
              <div className="retention-note">
                <svg><use href={`${PUBLIC_BASE}icons.svg#heart`}></use></svg>
                <span>Crie mais motivos para o cliente voltar.</span>
              </div>
              <details className="feature-detail">
                <summary>O que está incluído <svg><use href={`${PUBLIC_BASE}icons.svg#plus`}></use></svg></summary>
                <p>Incentive a frequência com recursos de fidelidade, acompanhe satisfação e reputação nas avaliações e use campanhas e lembretes para manter o contato com seus clientes.</p>
              </details>
            </article>

            <article className="feature-card feature-whatsapp">
              <div className="feature-card-top">
                <span className="feature-icon"><svg><use href={`${PUBLIC_BASE}icons.svg#message`}></use></svg></span>
                <span className="feature-number">06 / WHATSAPP + IA</span>
              </div>
              <h3>Você atende na cadeira.<br />A IA ajuda na conversa.</h3>
              <p>Conecte seu WhatsApp, acompanhe as conversas e use um agente de IA para dúvidas e ações de agenda.</p>
              <div className="chat-preview">
                <span>Tem horário para corte?</span>
                <span>Vamos encontrar um horário para você.<svg><use href={`${PUBLIC_BASE}icons.svg#check-double`}></use></svg></span>
                <small>Exemplo ilustrativo de conversa</small>
              </div>
              <details className="feature-detail">
                <summary>Conheça as duas IAs <svg><use href={`${PUBLIC_BASE}icons.svg#plus`}></use></svg></summary>
                <p>O Agente de IA responde dúvidas e auxilia em ações de agenda dentro das regras que você configurar. A caixa de atendimento reúne as conversas e os lembretes. O Gestor de IA entrega resumos e orientações operacionais para apoiar decisões do dia a dia.</p>
              </details>
            </article>
          </div>
        </section>

        {/* DEMONSTRAÇÃO COM A AGENDA REAL */}
        <section className="demo-section section" id="demonstracao">
          <div className="container">
            <div className="section-heading centered">
              <div className="eyebrow">UM OLHAR PARA SUA NOVA ROTINA</div>
              <h2>O dia fica mais leve<br />quando tudo está no lugar.</h2>
              <p>A agenda real do KlipHub, desenvolvida especialmente para a rotina da sua barbearia.</p>
            </div>
            <figure className="agenda-product-shot">
              <a
                aria-label="Abrir a captura da agenda do KlipHub em tamanho original"
                className="agenda-product-image-link"
                href={`${PUBLIC_BASE}agenda-kliphub.webp`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="Captura da agenda real do KlipHub em tema escuro, com horários organizados em colunas por barbeiro, cartões de agendamento e resumo dos atendimentos do dia."
                  className="agenda-product-image"
                  decoding="async"
                  height="1152"
                  loading="lazy"
                  src={`${PUBLIC_BASE}agenda-kliphub.webp`}
                  width="2048"
                />
                <span className="image-zoom-hint">Abrir imagem em tamanho original <span aria-hidden="true">↗</span></span>
              </a>
              <figcaption>
                <span className="shot-label">AGENDA REAL DO KLIPHUB</span>
                <span>Visual do sistema em uso · Proporção original 16:9 · Sem recortes</span>
                <span className="shot-mobile-note">Toque na imagem para ampliar no celular.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* AGENDAMENTO ONLINE / VITRINE */}
        <section className="section container booking-section" id="agendamento">
          <div className="booking-visual">
            <span className="floating-caption"><svg><use href={`${PUBLIC_BASE}icons.svg#globe`}></use></svg>Sua barbearia, aberta para agendar.</span>
            <div className="phone-frame">
              <div className="phone-camera"></div>
              <div className="phone-browser"><svg><use href={`${PUBLIC_BASE}icons.svg#lock`}></use></svg>Vitrine da sua barbearia</div>
              <div className="shop-cover">
                <svg><use href={`${PUBLIC_BASE}icons.svg#scissors`}></use></svg>
                <span>STUDIO DO CORTE</span>
                <small>Seu estilo. Seu momento.</small>
              </div>
              <div className="phone-content">
                <span className="tiny-label">AGENDE SEU PRÓXIMO CORTE</span>
                <h4>Como você quer<br />cuidar do seu estilo?</h4>
                <div className="service-preview selected">
                  <svg><use href={`${PUBLIC_BASE}icons.svg#scissors`}></use></svg>
                  <div>
                    <strong>Corte masculino</strong>
                    <span>Serviço da barbearia</span>
                  </div>
                  <svg><use href={`${PUBLIC_BASE}icons.svg#check-circle`}></use></svg>
                </div>
                <div className="service-preview">
                  <svg><use href={`${PUBLIC_BASE}icons.svg#scissors`}></use></svg>
                  <div>
                    <strong>Corte + barba</strong>
                    <span>Serviço da barbearia</span>
                  </div>
                  <span className="radio-empty"></span>
                </div>
                <div className="phone-steps">
                  <span>1. Serviço</span><span>2. Profissional</span><span>3. Horário</span>
                </div>
                <span className="phone-cta">Escolher profissional <svg><use href={`${PUBLIC_BASE}icons.svg#arrow`}></use></svg></span>
                <small className="phone-disclaimer">Exemplo ilustrativo de vitrine</small>
              </div>
            </div>
            <span className="floating-note">
              <svg><use href={`${PUBLIC_BASE}icons.svg#check-circle`}></use></svg>
              O cliente escolhe.<br /><strong>Você recebe o agendamento.</strong>
            </span>
          </div>

          <div className="booking-copy">
            <div className="eyebrow">O PRÓXIMO HORÁRIO COMEÇA ONLINE</div>
            <h2>A sua barbearia.<br />A um clique<br />do próximo cliente.</h2>
            <p>Uma vitrine digital com a sua identidade. Seu cliente conhece os serviços, escolhe o profissional e encontra um horário disponível, a qualquer hora.</p>
            <ol className="booking-steps">
              <li>
                <span>01</span>
                <div>
                  <strong>Apresente sua barbearia</strong>
                  <p>Serviços, preços, duração e equipe em uma página personalizada.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Deixe o cliente escolher</strong>
                  <p>Serviço, profissional e horário, com acesso ao histórico e à própria área do cliente.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Leve a relação adiante</strong>
                  <p>Divulgue seu clube e disponibilize produtos para reserva e retirada na barbearia.</p>
                </div>
              </li>
            </ol>
            <button className="text-button" onClick={() => setDialogOpen(true)}>
              Quero conhecer a vitrine <svg><use href={`${PUBLIC_BASE}icons.svg#arrow`}></use></svg>
            </button>
          </div>
        </section>

        {/* PLANOS E CLUBE */}
        <section className="club-section" id="planos">
          <div className="container">
            <div className="club-intro">
              <div>
                <div className="eyebrow">CLIENTE QUE VOLTA. NEGÓCIO QUE CRESCE.</div>
                <h2>O clube é da sua barbearia.<br />A organização é do KlipHub.</h2>
              </div>
              <p>Crie planos e pacotes com preço, descrição, benefícios, serviços ou combos mensais e descontos. Divulgue na vitrine e gerencie as solicitações de adesão.</p>
            </div>

            <div className="plan-distinction">
              <article>
                <span className="plan-tag">PARA SUA BARBEARIA</span>
                <h3>Assinatura KlipHub</h3>
                <p>É o plano que você contrata para usar o sistema e organizar sua operação.</p>
                <span className="plan-footer"><svg><use href={`${PUBLIC_BASE}icons.svg#monitor`}></use></svg>Você contrata o software</span>
              </article>
              <article>
                <span className="plan-tag">PARA SEUS CLIENTES</span>
                <h3>Seu clube de benefícios</h3>
                <p>São os planos e pacotes que você cria e oferece aos clientes da sua barbearia.</p>
                <span className="plan-footer"><svg><use href={`${PUBLIC_BASE}icons.svg#heart`}></use></svg>Seu cliente contrata seu clube</span>
              </article>
              <article>
                <span className="plan-tag">PARA A COMUNICAÇÃO</span>
                <h3>Créditos de mensagens</h3>
                <p>São pacotes ligados ao uso de recursos de comunicação da plataforma.</p>
                <span className="plan-footer"><svg><use href={`${PUBLIC_BASE}icons.svg#message`}></use></svg>Independentes do clube</span>
              </article>
            </div>

            <div className="plan-note">
              <svg><use href={`${PUBLIC_BASE}icons.svg#info`}></use></svg>
              <p>A assinatura do sistema, o clube da barbearia e os créditos de mensagens são recursos integrados. Consulte as condições e planos no sistema.</p>
            </div>
          </div>
        </section>

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
