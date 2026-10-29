import React, { useState, useEffect, useRef } from 'react';

// Ícones SVG customizados com visual limpo
function Icon({ name }) {
  const icons = {
    calendar: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    wallet: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
        <path d="M4 6v12a2 2 0 0 0 2 2h14v-4"></path>
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>
      </svg>
    ),
    chart: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
    users: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    heart: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    ),
    message: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    ),
    arrowRight: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    )
  };
  return icons[name] || null;
}

const featureItems = [
  {
    id: 'agenda',
    number: '01',
    label: 'Agenda',
    icon: 'calendar',
    title: 'AGENDA ORGANIZADA. CADEIRA OCUPADA.',
    description: 'Visualize a disponibilidade da equipe e crie, confirme, remarque ou conclua atendimentos em um só lugar.',
    viewTitle: 'Agenda da barbearia',
  },
  {
    id: 'caixa',
    number: '02',
    label: 'Caixa e comissões',
    icon: 'wallet',
    title: 'FECHE A CONTA. NÃO A SUA VISÃO.',
    description: 'Serviços e produtos registrados no PDV, com os recebimentos e as comissões reunidos no fechamento.',
    viewTitle: 'Caixa e comissões · PDV',
  },
  {
    id: 'financeiro',
    number: '03',
    label: 'Financeiro',
    icon: 'chart',
    title: 'SAIBA O QUE ENTRA E O QUE SAI.',
    description: 'Acompanhe receitas, despesas, comissões e o movimento da barbearia por período.',
    viewTitle: 'Resumo financeiro',
  },
  {
    id: 'operacao',
    number: '04',
    label: 'Equipe e estoque',
    icon: 'users',
    title: 'TUDO O QUE A OPERAÇÃO PRECISA.',
    description: 'Organize equipe, clientes, serviços e produtos; acompanhe o estoque ligado às vendas.',
    viewTitle: 'Operação e estoque',
  },
  {
    id: 'relacionamento',
    number: '05',
    label: 'Relacionamento',
    icon: 'heart',
    title: 'UM BOM CORTE TRAZ. UMA BOA RELAÇÃO MANTÉM.',
    description: 'Fidelidade, avaliações e sinais de retorno para manter a conversa com os clientes.',
    viewTitle: 'Radar de relacionamento',
  },
  {
    id: 'whatsapp',
    number: '06',
    label: 'WhatsApp com IA',
    icon: 'message',
    title: 'VOCÊ ATENDE NA CADEIRA. A IA AJUDA NA CONVERSA.',
    description: 'O agente de IA responde dúvidas e apoia ações de agenda dentro das regras definidas por você.',
    viewTitle: 'Atendimento pelo WhatsApp',
  },
];

// Componentes de visualização do painel central
function FeatureMainPreview({ id, onExplore }) {
  if (id === 'whatsapp') {
    return (
      <div className="pc-chat-window anim-fade-in">
        <div className="pc-chat-header">
          <span className="pc-avatar">M</span>
          <div className="pc-chat-info">
            <strong>Marcos Oliveira</strong>
            <small>Conversa de exemplo</small>
          </div>
          <span className="pc-status-green"><i className="dot-green"></i> WhatsApp</span>
        </div>
        <div className="pc-chat-messages">
          <p className="chat-bubble client anim-pop-1">Oi! Tem horário para corte na sexta?</p>
          <p className="chat-bubble agent anim-pop-2">Olá, Marcos! Tenho opções às 10h30 e às 14h. Qual fica melhor para você?</p>
          <p className="chat-bubble client anim-pop-3">Pode ser às 14h.</p>
          <p className="chat-bubble agent anim-pop-4">Pronto, seu horário ficou reservado. Até sexta!</p>
        </div>
        <button className="pc-btn-primary" onClick={onExplore}>
          Conhecer o KlipHub <Icon name="arrowRight" />
        </button>
      </div>
    );
  }

  if (id === 'agenda') {
    return (
      <div className="pc-agenda-view anim-fade-in">
        <div className="pc-view-head"><strong>Agenda de hoje</strong><span>Prévia</span></div>
        {[
          ['09:00', 'Rafael M.', 'Corte · João'],
          ['10:30', 'André L.', 'Corte + barba · Caio'],
          ['13:00', 'Horário disponível', 'Livre para agendar'],
          ['14:30', 'Bruno S.', 'Corte · João'],
        ].map(([time, client, service], index) => (
          <div 
            className={`pc-appointment-item ${client === 'Horário disponível' ? 'is-free' : ''} anim-slide-right`} 
            style={{ animationDelay: `${index * 0.08}s` }}
            key={time}
          >
            <time>{time}</time>
            <span className="pc-bar-mark"></span>
            <div className="pc-appointment-details">
              <strong>{client}</strong>
              <small>{service}</small>
            </div>
            {index === 2 && <span className="pc-free-tag">Disponível</span>}
          </div>
        ))}
      </div>
    );
  }

  if (id === 'caixa') {
    return (
      <div className="pc-pos-view anim-fade-in">
        <div className="pc-view-head">
          <strong>Recebimentos do Dia (PDV)</strong>
          <span className="pc-badge-green">Fechamento ativo</span>
        </div>
        <div className="pc-pos-metrics">
          <div className="pc-pos-metric-card anim-slide-up" style={{ animationDelay: '0.05s' }}>
            <div className="pc-metric-top">
              <small>Dinheiro / PIX</small>
              <span>35%</span>
            </div>
            <strong>R$ 680,00</strong>
            <div className="pc-mini-progress"><div className="pc-fill-bar" style={{ width: '35%' }}></div></div>
          </div>
          <div className="pc-pos-metric-card anim-slide-up" style={{ animationDelay: '0.12s' }}>
            <div className="pc-metric-top">
              <small>Cartão Crédito/Débito</small>
              <span>65%</span>
            </div>
            <strong>R$ 1.240,00</strong>
            <div className="pc-mini-progress"><div className="pc-fill-bar cyan" style={{ width: '65%' }}></div></div>
          </div>
        </div>
        <div className="pc-comissao-split anim-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="pc-split-row">
            <span>Comissões equipe (40%)</span>
            <strong>R$ 768,00</strong>
          </div>
          <div className="pc-split-row highlight">
            <span>Caixa barbearia (60%)</span>
            <strong className="glow-cyan">R$ 1.152,00</strong>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'financeiro') {
    const bars = [45, 68, 52, 85, 60, 95, 74];
    return (
      <div className="pc-finance-view anim-fade-in">
        <div className="pc-view-head"><strong>Fluxo Semanal · Receitas</strong><span>Gráfico com Meta</span></div>
        <div className="pc-finance-summary">
          <div>
            <small>Entrada consolidada</small>
            <strong>R$ 5.120,00</strong>
          </div>
          <span className="pc-badge-green">+18% vs sem. anterior</span>
        </div>
        
        {/* Gráfico Aprimorado com Linhas de Grade e Média */}
        <div className="pc-chart-wrapper">
          <div className="pc-grid-lines">
            <span className="grid-line"><small>100%</small></span>
            <span className="grid-line benchmark-line"><small>Média</small></span>
            <span className="grid-line"><small>0%</small></span>
          </div>
          <div className="pc-bars-container">
            {bars.map((height, index) => (
              <div className="pc-bar-col" key={index}>
                <div 
                  className="pc-bar-fill bar-anim" 
                  style={{ height: `${height}%`, animationDelay: `${index * 0.07}s` }}
                ></div>
                <small>{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][index]}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (id === 'operacao') {
    return (
      <div className="pc-stock-view anim-fade-in">
        <div className="pc-view-head"><strong>Equipe & Estoque Crítico</strong><span>Monitoramento</span></div>
        <div className="pc-stock-list">
          {[
            ['Pomada modeladora fixadora', '12 un.', 'Estoque OK', 'normal'],
            ['Óleo para barba premium', '2 un.', 'Reposição urgente', 'low pulse'],
            ['Shampoo profissional 1L', '6 un.', 'Estoque OK', 'normal'],
          ].map(([product, quantity, status, badgeClass], idx) => (
            <div className="pc-stock-item anim-slide-up" style={{ animationDelay: `${idx * 0.1}s` }} key={product}>
              <span className="pc-product-thumb"><Icon name="users" /></span>
              <div className="pc-stock-info">
                <strong>{product}</strong>
                <small>Qtd atual: {quantity}</small>
              </div>
              <span className={`pc-stock-tag ${badgeClass}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pc-retention-view anim-fade-in">
      <div className="pc-view-head"><strong>Radar de Retorno Inteligente</strong><span>CRM Ativo</span></div>
      <div className="pc-user-card anim-slide-right">
        <span className="pc-avatar red-glow">L</span>
        <div>
          <strong>Lucas Ferreira</strong>
          <small>Ausente há 45 dias · Média habitual: 25d</small>
        </div>
        <span className="pc-alert-tag">Reativar</span>
      </div>
      <div className="pc-message-preview anim-slide-up" style={{ animationDelay: '0.12s' }}>
        <span className="pc-message-tag"><Icon name="message" /> Disparo automático WhatsApp</span>
        <p>"Oi, Lucas! Notamos que já passou do seu período habitual. Que tal garantir seu horário com o João nesta semana?"</p>
        <div className="pc-retention-footer">
          <small><i className="dot-small"></i> Enviado com sucesso</small>
          <span className="pc-status-sent">Aguardando resposta</span>
        </div>
      </div>
    </div>
  );
}

// Coluna Lateral Direita da Tela do PC - Centralizada Verticalmente sem Espaços Vazios
function FeatureSidePreview({ id }) {
  const cards = {
    agenda: [
      { label: 'Próximo horário', value: '14:30', detail: 'com João' },
      { label: 'Disponibilidade', value: '3 horários', detail: 'para hoje' },
    ],
    caixa: [
      { label: 'Comissões', value: 'R$ 768', detail: 'lançadas no PDV' },
      { label: 'Fechamento', value: '100% OK', detail: 'sem divergências' },
    ],
    financeiro: [
      { label: 'Despesas', value: 'R$ 1.420', detail: 'fixas e variáveis' },
      { label: 'Balanço', value: '+ R$ 3.700', detail: 'lucro líquido' },
    ],
    operacao: [
      { label: 'Estoque crítico', value: '1 item', detail: 'óleo para barba' },
      { label: 'Equipe ativa', value: '4 profissionais', detail: 'na escala' },
    ],
    relacionamento: [
      { label: 'Clientes em alerta', value: '12', detail: '> 35 dias ausentes' },
      { label: 'Campanha', value: 'Ativa', detail: 'WhatsApp IA' },
    ],
    whatsapp: [
      { label: 'Agente de IA', value: 'Ativo', detail: 'regras da barbearia' },
      { label: 'Resultado', value: 'Horário reservado', detail: 'na própria conversa' },
    ],
  };

  return (
    <aside className="pc-sidebar-stats">
      <div className="pc-sidebar-inner">
        {cards[id].map((card, idx) => (
          <div className="pc-stat-card anim-pop" style={{ animationDelay: `${idx * 0.12}s` }} key={card.label}>
            <small>{card.label}</small>
            <strong>{card.value}</strong>
            <span>{card.detail}</span>
          </div>
        ))}
      </div>
      <span className="pc-side-note">Prévia ilustrativa</span>
    </aside>
  );
}

export default function KlipHubShowcases({ onExplore = () => {} }) {
  const [activeId, setActiveId] = useState('whatsapp');
  const [headerVisible, setHeaderVisible] = useState(false);
  const [boardVisible, setBoardVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer sequencial: Textos entram primeiro, depois o board cai
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          setTimeout(() => {
            setBoardVisible(true);
          }, 350);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Troca automática dos pilares a cada 3 segundos
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveId((prevId) => {
        const currentIndex = featureItems.findIndex((item) => item.id === prevId);
        const nextIndex = (currentIndex + 1) % featureItems.length;
        return featureItems[nextIndex].id;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const active = featureItems.find((feature) => feature.id === activeId) ?? featureItems[0];

  return (
    <div className="klip-showcase-section" ref={sectionRef}>
      <style>{`
        /* Reset & Layout Base */
        .klip-showcase-section {
          background-color: #030708;
          color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          padding: 80px 24px;
          box-sizing: border-box;
          overflow: hidden;
          perspective: 1200px;
        }

        .klip-container {
          max-width: 1240px;
          margin: 0 auto;
        }

        /* 1. Header com Animação Sequencial de Chegada */
        .klip-header {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 40px;
          align-items: flex-start;
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(-30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .klip-header.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .klip-header-left .eyebrow {
          color: #00f2b2;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 20px;
          display: block;
        }

        .klip-header-left h2 {
          font-size: 3.2rem;
          font-weight: 900;
          line-height: 1.05;
          color: #ffffff;
          margin: 0;
          letter-spacing: -1px;
          text-transform: uppercase;
        }

        .klip-header-right p {
          color: #94a3b8;
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
          padding-top: 40px;
        }

        /* 2. Container com Animação de "Placa Caindo" */
        .klip-board-wrapper {
          opacity: 0;
          transform-origin: top center;
          transform: rotateX(-35deg) translateY(-60px) scale(0.95);
          transition: opacity 0.5s ease;
        }

        .klip-board-wrapper.animate-drop {
          opacity: 1;
          animation: plateSwingDrop 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.15) forwards;
        }

        @keyframes plateSwingDrop {
          0% {
            opacity: 0;
            transform: rotateX(-45deg) translateY(-80px) scale(0.9);
          }
          60% {
            opacity: 1;
            transform: rotateX(8deg) translateY(6px) scale(1.005);
          }
          80% {
            transform: rotateX(-3deg) translateY(-2px) scale(0.998);
          }
          100% {
            opacity: 1;
            transform: rotateX(0deg) translateY(0) scale(1);
          }
        }

        /* 3. Grid de 3 Colunas: [Opções] -> [Texto Pilar] -> [Simulador PC] */
        .klip-grid-3col {
          display: grid;
          grid-template-columns: 280px 1fr 530px;
          gap: 36px;
          align-items: center;
          position: relative;
        }

        /* Coluna 1: Lista de Opções (Esquerda) */
        .klip-pills-column {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pills-section-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .pill-item-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 12px;
          background: transparent;
          border: 1px solid transparent;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .pill-item-btn:hover {
          background: rgba(255, 255, 255, 0.03);
          color: #ffffff;
        }

        .pill-item-btn.is-active {
          background: rgba(8, 20, 20, 0.9);
          border-color: rgba(0, 242, 178, 0.25);
          color: #ffffff;
        }

        .pill-item-btn.is-active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #00f2b2;
        }

        .pill-item-btn.is-active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 100%;
          background: rgba(0, 242, 178, 0.8);
          animation: progressTimer 3s linear infinite;
        }

        @keyframes progressTimer {
          from { width: 0%; }
          to { width: 100%; }
        }

        .pill-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          transition: all 0.25s;
          flex-shrink: 0;
        }

        .pill-item-btn.is-active .pill-icon-box {
          background: rgba(0, 242, 178, 0.15);
          border-color: rgba(0, 242, 178, 0.4);
          color: #00f2b2;
        }

        .pill-copy-box {
          flex: 1;
        }

        .pill-copy-box small {
          display: block;
          font-size: 0.7rem;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .pill-copy-box strong {
          display: block;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .pill-arrow {
          color: #475569;
          transition: transform 0.25s, color 0.25s;
        }

        .pill-item-btn.is-active .pill-arrow {
          color: #00f2b2;
          transform: translateX(4px);
        }

        /* Coluna 2: Texto do Pilar Ativo (Centro) */
        .klip-text-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeInText 0.35s ease-out;
        }

        @keyframes fadeInText {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .pilar-kicker {
          font-size: 0.8rem;
          color: #00f2b2;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .klip-text-column h3 {
          font-size: 2.2rem;
          font-weight: 900;
          line-height: 1.1;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }

        .klip-text-column p {
          font-size: 1rem;
          color: #94a3b8;
          line-height: 1.6;
          margin: 0;
        }

        /* Coluna 3: Simulador do Computador (Direita) */
        .pc-window-frame {
          background: #0a0e14;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 178, 0.03);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .pc-top-bar {
          background: #0d121a;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .pc-dots {
          display: flex;
          gap: 6px;
        }

        .pc-dots i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
        }

        .pc-title-label {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .pc-demo-label {
          font-size: 0.7rem;
          color: #64748b;
        }

        .pc-screen-content {
          display: grid;
          grid-template-columns: 1fr 140px;
          min-height: 360px;
          background: #06090e;
        }

        .pc-main-pane {
          padding: 20px;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Internal Component Styles */

        /* WhatsApp Chat */
        .pc-chat-window { display: flex; flex-direction: column; gap: 12px; height: 100%; justify-content: space-between; }
        .pc-chat-header { display: flex; align-items: center; gap: 10px; padding-bottom: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .pc-avatar { width: 32px; height: 32px; border-radius: 50%; background: #005c4b; color: #00f2b2; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; }
        .pc-avatar.red-glow { background: #7f1d1d; color: #fca5a5; }
        .pc-chat-info strong { display: block; font-size: 0.85rem; color: #fff; }
        .pc-chat-info small { font-size: 0.7rem; color: #64748b; }
        .pc-status-green { margin-left: auto; font-size: 0.7rem; color: #00f2b2; display: flex; align-items: center; gap: 4px; }
        .dot-green { width: 6px; height: 6px; background: #00f2b2; border-radius: 50%; }
        .pc-chat-messages { display: flex; flex-direction: column; gap: 10px; margin: 10px 0; }
        .chat-bubble { padding: 10px 14px; border-radius: 12px; font-size: 0.8rem; max-width: 85%; line-height: 1.4; margin: 0; }
        .chat-bubble.client { background: #1e293b; color: #e2e8f0; align-self: flex-start; border-bottom-left-radius: 2px; }
        .chat-bubble.agent { background: #005c4b; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 2px; }
        .pc-btn-primary { background: #00f2b2; color: #030708; border: none; padding: 10px 16px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s, transform 0.2s; }
        .pc-btn-primary:hover { background: #00d89e; transform: translateY(-1px); }

        /* Agenda */
        .pc-agenda-view { display: flex; flex-direction: column; gap: 8px; width: 100%; }
        .pc-view-head { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #64748b; margin-bottom: 8px; }
        .pc-appointment-item { display: flex; align-items: center; gap: 10px; background: rgba(255, 255, 255, 0.03); padding: 10px 12px; border-radius: 8px; font-size: 0.8rem; }
        .pc-appointment-item.is-free { border: 1px dashed rgba(0, 242, 178, 0.3); background: rgba(0, 242, 178, 0.02); }
        .pc-bar-mark { width: 3px; height: 26px; background: #3b82f6; border-radius: 2px; }
        .is-free .pc-bar-mark { background: #00f2b2; }
        .pc-appointment-details strong { display: block; color: #f8fafc; font-size: 0.8rem; }
        .pc-appointment-details small { color: #64748b; font-size: 0.7rem; }
        .pc-free-tag { margin-left: auto; font-size: 0.65rem; background: rgba(0, 242, 178, 0.15); color: #00f2b2; padding: 2px 6px; border-radius: 4px; }

        /* Caixa / PDV */
        .pc-pos-view { display: flex; flex-direction: column; gap: 12px; width: 100%; }
        .pc-badge-green { background: #00f2b2; color: #030708; padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: bold; }
        .pc-pos-metrics { display: flex; flex-direction: column; gap: 8px; }
        .pc-pos-metric-card { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); padding: 10px; border-radius: 8px; }
        .pc-metric-top { display: flex; justify-content: space-between; font-size: 0.7rem; color: #94a3b8; }
        .pc-pos-metric-card strong { display: block; font-size: 1rem; color: #fff; margin: 2px 0; }
        .pc-mini-progress { height: 4px; background: rgba(255, 255, 255, 0.1); border-radius: 2px; overflow: hidden; margin-top: 6px; }
        .pc-fill-bar { height: 100%; background: #3b82f6; border-radius: 2px; transition: width 0.8s ease-out; }
        .pc-fill-bar.cyan { background: #00f2b2; }
        .pc-comissao-split { background: rgba(0, 242, 178, 0.03); border: 1px solid rgba(0, 242, 178, 0.15); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 6px; }
        .pc-split-row { display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8; }
        .pc-split-row.highlight { color: #fff; font-weight: bold; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 6px; }
        .glow-cyan { color: #00f2b2; text-shadow: 0 0 8px rgba(0, 242, 178, 0.4); }

        /* Financeiro com Eixo e Grid */
        .pc-finance-view { display: flex; flex-direction: column; gap: 12px; height: 100%; justify-content: space-between; }
        .pc-finance-summary { display: flex; justify-content: space-between; align-items: flex-end; }
        .pc-finance-summary small { font-size: 0.7rem; color: #64748b; display: block; }
        .pc-finance-summary strong { font-size: 1.3rem; color: #ffffff; display: block; margin-top: 2px; }
        .pc-chart-wrapper { position: relative; height: 130px; margin-top: 10px; }
        .pc-grid-lines { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; }
        .grid-line { border-bottom: 1px dashed rgba(255, 255, 255, 0.08); width: 100%; position: relative; }
        .grid-line.benchmark-line { border-bottom: 1px dashed rgba(0, 242, 178, 0.35); }
        .grid-line small { position: absolute; right: 0; top: -14px; font-size: 0.6rem; color: #64748b; }
        .grid-line.benchmark-line small { color: #00f2b2; }
        .pc-bars-container { display: flex; align-items: flex-end; justify-content: space-between; height: 100%; position: relative; z-index: 1; padding: 0 8px; }
        .pc-bar-col { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; height: 100%; justify-content: flex-end; }
        .pc-bar-fill { width: 12px; background: #00f2b2; border-radius: 3px 3px 0 0; }
        .pc-bar-col small { font-size: 0.65rem; color: #64748b; }

        /* Estoque & Equipe */
        .pc-stock-list { display: flex; flex-direction: column; gap: 8px; }
        .pc-stock-item { display: flex; align-items: center; gap: 10px; padding: 10px; background: rgba(255, 255, 255, 0.02); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.03); }
        .pc-product-thumb { width: 28px; height: 28px; background: rgba(255, 255, 255, 0.05); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #00f2b2; }
        .pc-stock-info strong { display: block; font-size: 0.78rem; color: #fff; }
        .pc-stock-info small { font-size: 0.68rem; color: #64748b; }
        .pc-stock-tag { margin-left: auto; font-size: 0.62rem; padding: 2px 6px; border-radius: 4px; background: rgba(255, 255, 255, 0.05); color: #94a3b8; }
        .pc-stock-tag.low { background: rgba(239, 68, 68, 0.15); color: #f87171; }
        .pc-stock-tag.pulse { animation: pulseAlert 1.5s infinite; }

        /* Relacionamento */
        .pc-user-card { display: flex; align-items: center; gap: 10px; background: rgba(255, 255, 255, 0.03); padding: 10px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.04); }
        .pc-user-card strong { display: block; font-size: 0.8rem; color: #fff; }
        .pc-user-card small { font-size: 0.7rem; color: #64748b; }
        .pc-alert-tag { margin-left: auto; font-size: 0.65rem; background: #f59e0b; color: #000; padding: 2px 6px; border-radius: 4px; font-weight: bold; }
        .pc-message-preview { background: rgba(0, 242, 178, 0.04); border: 1px solid rgba(0, 242, 178, 0.2); padding: 12px; border-radius: 8px; margin-top: 10px; }
        .pc-message-tag { font-size: 0.7rem; color: #00f2b2; display: flex; align-items: center; gap: 4px; margin-bottom: 6px; }
        .pc-message-preview p { font-size: 0.75rem; color: #cbd5e1; margin: 0 0 8px 0; line-height: 1.4; font-style: italic; }
        .pc-retention-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(0, 242, 178, 0.1); padding-top: 6px; }
        .pc-retention-footer small { font-size: 0.65rem; color: #64748b; display: flex; align-items: center; gap: 4px; }
        .pc-status-sent { font-size: 0.65rem; color: #00f2b2; font-weight: 600; }
        .dot-small { display: inline-block; width: 4px; height: 4px; background: #00f2b2; border-radius: 50%; }

        /* Centralização Vertical das Estatísticas Laterais (Sem Espaços Vazios) */
        .pc-sidebar-stats {
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.25);
          height: 100%;
          box-sizing: border-box;
        }

        .pc-sidebar-inner {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          margin: auto 0;
        }

        .pc-stat-card {
          background: rgba(255, 255, 255, 0.02);
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .pc-stat-card small { display: block; font-size: 0.65rem; color: #64748b; }
        .pc-stat-card strong { display: block; font-size: 0.95rem; color: #ffffff; margin: 2px 0; }
        .pc-stat-card span { display: block; font-size: 0.65rem; color: #94a3b8; }
        .pc-side-note { font-size: 0.6rem; color: #475569; text-align: center; display: block; margin-top: auto; }

        /* Animações dos elementos internos */
        .anim-fade-in { animation: fadeIn 0.35s ease-out forwards; }
        .anim-pop { animation: pop 0.3s ease-out forwards; }
        .anim-slide-right { animation: slideRight 0.35s ease-out forwards; }
        .anim-slide-up { animation: slideUp 0.35s ease-out forwards; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pop { 0% { opacity: 0; transform: scale(0.88); } 70% { transform: scale(1.02); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .anim-pop-1 { animation: pop 0.3s ease-out 0.05s forwards; opacity: 0; }
        .anim-pop-2 { animation: pop 0.3s ease-out 0.18s forwards; opacity: 0; }
        .anim-pop-3 { animation: pop 0.3s ease-out 0.32s forwards; opacity: 0; }
        .anim-pop-4 { animation: pop 0.3s ease-out 0.45s forwards; opacity: 0; }

        .bar-anim { animation: barGrow 0.6s ease-out forwards; }
        @keyframes barGrow { from { height: 0% !important; } }

        @keyframes pulseAlert { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        /* Responsividade */
        @media (max-width: 1024px) {
          .klip-header {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .klip-header-right p {
            padding-top: 0;
          }
          .klip-grid-3col {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 640px) {
          .klip-header-left h2 {
            font-size: 2.2rem;
          }
          .pc-screen-content {
            grid-template-columns: 1fr;
          }
          .pc-sidebar-stats {
            display: none;
          }
        }
      `}</style>

      <div className="klip-container">
        
        {/* Header Split com Animação Sequencial dos Textos */}
        <header className={`klip-header ${headerVisible ? 'animate-in' : ''}`}>
          <div className="klip-header-left">
            <span className="eyebrow">MENOS CONTROLE MANUAL. MAIS BARBEARIA.</span>
            <h2>UMA OPERAÇÃO INTEIRA.<br />EM UMA SÓ VISÃO.</h2>
          </div>
          <div className="klip-header-right">
            <p>Explore os seis pilares do KlipHub. Escolha uma área para ver uma prévia ilustrativa de como ela funciona.</p>
          </div>
        </header>

        {/* Board Principal com Animação de Placa Caindo */}
        <div 
          className={`klip-board-wrapper ${boardVisible ? 'animate-drop' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="klip-grid-3col">
            
            {/* 1. OPÇÕES DOS PILARES (ESQUERDA) */}
            <div className="klip-pills-column">
              <span className="pills-section-title">EXPLORE OS PILARES</span>
              {featureItems.map((feature) => (
                <button
                  key={feature.id}
                  className={`pill-item-btn ${activeId === feature.id ? 'is-active' : ''}`}
                  onClick={() => setActiveId(feature.id)}
                  type="button"
                >
                  <span className="pill-icon-box"><Icon name={feature.icon} /></span>
                  <div className="pill-copy-box">
                    <small>{feature.number}</small>
                    <strong>{feature.label}</strong>
                  </div>
                  <span className="pill-arrow"><Icon name="arrowRight" /></span>
                </button>
              ))}
            </div>

            {/* 2. TEXTO E DESCRIÇÃO DO PILAR ATIVO (CENTRO) */}
            <div className="klip-text-column" key={active.id}>
              <span className="pilar-kicker">{active.number} / {active.label.toUpperCase()}</span>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
            </div>

            {/* 3. SIMULADOR DO COMPUTADOR (DIREITA) */}
            <div className="pc-window-frame">
              <div className="pc-top-bar">
                <div className="pc-dots"><i></i><i></i><i></i></div>
                <span className="pc-title-label">{active.viewTitle}</span>
                <span className="pc-demo-label">Demonstração ilustrativa</span>
              </div>
              <div className="pc-screen-content">
                <div className="pc-main-pane" key={active.id + '-main'}>
                  <FeatureMainPreview id={active.id} onExplore={onExplore} />
                </div>
                <FeatureSidePreview id={active.id} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}