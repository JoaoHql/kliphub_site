import React, { useState, useEffect, useRef } from 'react';

const PUBLIC_BASE = import.meta.env.BASE_URL;

type FeatureId = 'agenda' | 'caixa' | 'financeiro' | 'operacao' | 'relacionamento' | 'whatsapp';
type EcosystemId = 'software' | 'clube' | 'whatsapp';

// Ícones SVG customizados com visual limpo
function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
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
  return (icons[name] as React.ReactElement) || (
    <svg aria-hidden="true"><use href={`${PUBLIC_BASE}icons.svg#${name}`}></use></svg>
  );
}

const featureItems: Array<{
  id: FeatureId;
  number: string;
  label: string;
  title: string;
  description: string;
}> = [
  {
    id: 'agenda',
    number: '01',
    label: 'Agenda',
    title: 'Agenda organizada.\nCadeira ocupada.',
    description: 'Visualize a disponibilidade por barbeiro e confirme, remarque ou encaixe horários sem papel e sem conflito.',
  },
  {
    id: 'caixa',
    number: '02',
    label: 'Caixa e comissões',
    title: 'Feche a conta.\nNão a sua visão.',
    description: 'Serviços e produtos na mesma comanda, com o percentual da casa e de cada profissional calculado na hora.',
  },
  {
    id: 'financeiro',
    number: '03',
    label: 'Financeiro',
    title: 'O financeiro\ndo seu negócio\nna palma da mão.',
    description: 'Sem planilhas confusas: entradas, custos e lucro real calculados na hora para você decidir sem errar.',
  },
  {
    id: 'operacao',
    number: '04',
    label: 'Equipe e estoque',
    title: 'Tudo o que a rotina\nda barbearia pede.',
    description: 'Acompanhe o ritmo de atendimentos da equipe e receba aviso quando um produto de bancada ou revenda estiver acabando.',
  },
  {
    id: 'relacionamento',
    number: '05',
    label: 'Relacionamento',
    title: 'Um bom corte traz.\nUma boa relação mantém.',
    description: 'Saiba quem passou do tempo habitual de cortar e envie um lembrete amigável no momento certo.',
  },
  {
    id: 'whatsapp',
    number: '06',
    label: 'WhatsApp',
    title: 'Você atende na cadeira.\nO sistema responde no celular.',
    description: 'Atendimento automático dentro das suas regras: tira dúvidas, mostra horários livres e já grava na agenda.',
  },
];

function FeatureMainPreview({ id }: { id: FeatureId }) {
  if (id === 'whatsapp') {
    return (
      <div className="kh-surface-body anim-fade-in">
        <div className="kh-surface-head">
          <span>CONVERSA NO WHATSAPP · MARCOS OLIVEIRA</span>
          <span className="kh-meta-tag">Atendimento automático</span>
        </div>

        <div className="kh-chat-list">
          <div className="kh-chat-msg from-client anim-pop-1">
            <p>Boa tarde! Tem horário pra corte hoje com o João?</p>
            <time>14:12</time>
          </div>

          <div className="kh-chat-msg from-shop anim-pop-2">
            <p>Fala, Marcos! Com o João tenho vaga hoje às <strong>16:30</strong> ou às <strong>18:00</strong>. Qual fica melhor pra você?</p>
            <time>14:12</time>
          </div>

          <div className="kh-chat-msg from-client anim-pop-3">
            <p>Pode marcar às 16:30.</p>
            <time>14:13</time>
          </div>

          <div className="kh-chat-msg from-shop anim-pop-4">
            <p>Combinado! Seu horário das <strong>16:30</strong> com João Silva está reservado. Até mais tarde!</p>
            <span className="kh-chat-note">Agendamento gravado na Cadeira 01</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'agenda') {
    return (
      <div className="kh-surface-body anim-fade-in">
        <div className="kh-surface-head">
          <span>SEXTA-FEIRA · 2 CADEIRAS ATIVAS</span>
          <span className="kh-meta-tag">18 de 21 horários ocupados</span>
        </div>

        <div className="kh-agenda-cols">
          <div className="kh-agenda-col">
            <div className="kh-col-title">
              <strong>João Silva</strong>
              <span>Cadeira 01</span>
            </div>

            <div className="kh-slot-row is-now">
              <time>10:30</time>
              <span className="kh-slot-bar"></span>
              <div className="kh-slot-info">
                <strong>André Lucas</strong>
                <small>Corte + barba · 45 min</small>
              </div>
              <span className="kh-slot-state active">Na cadeira</span>
            </div>

            <div className="kh-slot-row">
              <time>11:30</time>
              <span className="kh-slot-bar"></span>
              <div className="kh-slot-info">
                <strong>Bruno Silveira</strong>
                <small>Degradê navalhado</small>
              </div>
              <span className="kh-slot-state">Confirmado</span>
            </div>

            <div className="kh-slot-row">
              <time>14:00</time>
              <span className="kh-slot-bar"></span>
              <div className="kh-slot-info">
                <strong>Diego Ramos</strong>
                <small>Plano mensal · Corte</small>
              </div>
              <span className="kh-slot-state">Assinante</span>
            </div>
          </div>

          <div className="kh-agenda-col">
            <div className="kh-col-title">
              <strong>Caio Santos</strong>
              <span>Cadeira 02</span>
            </div>

            <div className="kh-slot-row is-done">
              <time>10:00</time>
              <span className="kh-slot-bar muted"></span>
              <div className="kh-slot-info">
                <strong>Marcos Vinícius</strong>
                <small>Corte social</small>
              </div>
              <span className="kh-slot-state muted">Concluído</span>
            </div>

            <div className="kh-slot-row is-now">
              <time>11:00</time>
              <span className="kh-slot-bar"></span>
              <div className="kh-slot-info">
                <strong>Felipe Costa</strong>
                <small>Barba + toalha quente</small>
              </div>
              <span className="kh-slot-state active">Na cadeira</span>
            </div>

            <div className="kh-slot-row is-open">
              <time>12:00</time>
              <span className="kh-slot-bar open"></span>
              <div className="kh-slot-info">
                <strong>Horário vago</strong>
                <small>Visível no link de agendamento</small>
              </div>
              <span className="kh-slot-state open">Livre</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'caixa') {
    return (
      <div className="kh-surface-body anim-fade-in">
        <div className="kh-surface-head">
          <span>FECHAMENTO DE COMANDAS · HOJE</span>
          <span className="kh-meta-tag">Caixa aberto</span>
        </div>

        <div className="kh-ledger-table">
          <div className="kh-ledger-row">
            <div className="kh-ledger-main">
              <strong>André Lucas</strong>
              <small>Corte + Pomada Matte · Profissional: Caio</small>
            </div>
            <span className="kh-ledger-method">PIX</span>
            <strong className="kh-ledger-val">R$ 115,00</strong>
          </div>

          <div className="kh-ledger-row">
            <div className="kh-ledger-main">
              <strong>Rafael Mendes</strong>
              <small>Corte degradê + barba · Profissional: João</small>
            </div>
            <span className="kh-ledger-method">Crédito</span>
            <strong className="kh-ledger-val">R$ 85,00</strong>
          </div>
        </div>

        <div className="kh-split-summary">
          <div className="kh-split-head">
            <span>Comissão da equipe (40%) · <strong>R$ 736,00</strong></span>
            <span>Caixa da barbearia (60%) · <strong className="kh-text-accent">R$ 1.104,00</strong></span>
          </div>
          <div className="kh-split-track">
            <span style={{ width: '40%' }}></span>
            <span className="kh-track-accent" style={{ width: '60%' }}></span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'financeiro') {
    return (
      <div className="kh-surface-body anim-fade-in">
        <div className="kh-surface-head">
          <span>RESUMO DA SEMANA <span className="kh-head-range">· TERÇA A DOMINGO</span></span>
          <span className="kh-meta-tag">Semana atual</span>
        </div>

        <div className="kh-fin-panel">
          <div className="kh-fin-split">
            <div className="kh-fin-cell">
              <span className="kh-fin-label">Entradas da semana</span>
              <strong className="kh-fin-value">R$ 7.460</strong>
              <span className="kh-fin-note">Faturamento bruto dos atendimentos</span>
            </div>

            <div className="kh-fin-cell">
              <span className="kh-fin-label">Custos e repasses</span>
              <strong className="kh-fin-value kh-fin-value-cost">R$ 3.580</strong>
              <span className="kh-fin-note">Comissões, despesas e custos fixos</span>
            </div>
          </div>

          <div className="kh-fin-profit">
            <div className="kh-fin-profit-main">
              <span className="kh-fin-label">Lucro líquido no bolso</span>
              <strong className="kh-fin-value">R$ 3.880</strong>
              <span className="kh-fin-note">O que sobra depois de todos os custos</span>
            </div>

            <div className="kh-fin-margin">
              <strong>52%</strong>
              <small>Margem de lucro</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'operacao') {
    return (
      <div className="kh-surface-body anim-fade-in">
        <div className="kh-surface-head">
          <span>EQUIPE E PRODUTOS DE GIRO</span>
          <span className="kh-meta-tag">Baixa integrada ao PDV</span>
        </div>

        <div className="kh-ops-grid">
          <div className="kh-ops-block">
            <span className="kh-block-label">PROFISSIONAIS HOJE</span>
            <div className="kh-ops-line">
              <strong>João Silva</strong>
              <span>8 atendimentos · Cadeira 01</span>
            </div>
            <div className="kh-ops-line">
              <strong>Caio Santos</strong>
              <span>7 atendimentos · Cadeira 02</span>
            </div>
          </div>

          <div className="kh-ops-block">
            <span className="kh-block-label">CONTROLE DE ESTOQUE</span>
            <div className="kh-ops-line">
              <strong>Pomada Matte Efeito Seco</strong>
              <span className="kh-stock-ok">14 un. disponíveis</span>
            </div>
            <div className="kh-ops-line">
              <strong>Óleo para Barba 30ml</strong>
              <span className="kh-stock-low">Restam 2 un. · Repor</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kh-surface-body anim-fade-in">
      <div className="kh-surface-head">
        <span>FREQUÊNCIA DE CLIENTES · CICLO DE CORTE</span>
        <span className="kh-meta-tag">Acompanhamento ativo</span>
      </div>

      <div className="kh-return-panel">
        <div className="kh-return-client">
          <div>
            <strong>Lucas Ferreira</strong>
            <small>Última visita há 38 dias · Costuma cortar a cada 21 dias</small>
          </div>
          <span className="kh-cycle-flag">Passou do prazo</span>
        </div>

        <div className="kh-return-msg">
          <small>Mensagem enviada pelo WhatsApp</small>
          <p>"Oi, Lucas! Já faz um tempinho desde o último corte. Quer garantir seu horário com o João para sexta?"</p>
          <span>Respondido pelo cliente · Horário reservado para sexta às 17h</span>
        </div>
      </div>
    </div>
  );
}

function FeatureFooterMetrics({ id }: { id: FeatureId }) {
  const metrics: Record<FeatureId, Array<{ label: string; value: string }>> = {
    agenda: [
      { label: 'Ocupação média do dia', value: '88%' },
      { label: 'Horários confirmados', value: '18 de 21' },
      { label: 'Faltas com lembrete prévio', value: 'Zero' },
    ],
    caixa: [
      { label: 'Movimento registrado hoje', value: 'R$ 1.840' },
      { label: 'Repasse dos barbeiros', value: 'R$ 736' },
      { label: 'Líquido da barbearia', value: 'R$ 1.104' },
    ],
    financeiro: [
      { label: 'Faturamento do mês', value: 'R$ 38.450' },
      { label: 'Custos fixos cobertos no', value: 'Dia 11' },
    ],
    operacao: [
      { label: 'Cadeiras em operação', value: '100%' },
      { label: 'Itens abaixo do estoque mínimo', value: '1 produto' },
      { label: 'Avaliação média dos clientes', value: '4,9 ★' },
    ],
    relacionamento: [
      { label: 'Clientes que voltam no prazo', value: '84%' },
      { label: 'Retornos recuperados no mês', value: '19 clientes' },
      { label: 'Membros no clube da barbearia', value: '46 ativos' },
    ],
    whatsapp: [
      { label: 'Conexão oficial WhatsApp', value: 'Estável' },
      { label: 'Tempo médio de resposta', value: '2 seg' },
      { label: 'Atendimento fora do expediente', value: '24h' },
    ],
  };

  return (
    <div className={`kh-surface-footer${id === 'financeiro' ? ' is-finance' : ''}`}>
      {metrics[id].map((m) => (
        <div className="kh-footer-stat" key={m.label}>
          <small>{m.label}</small>
          <strong>{m.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function FeatureShowcase({ onExplore = () => {} }: { onExplore?: () => void }) {
  const [activeId, setActiveId] = useState<FeatureId>('agenda');

  // Avança automaticamente a cada 4 segundos (reinicia o contador se o usuário clicar em uma aba)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const currentIndex = featureItems.findIndex((item) => item.id === activeId);
      const nextIndex = (currentIndex + 1) % featureItems.length;
      setActiveId(featureItems[nextIndex].id);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [activeId]);

  const active = featureItems.find((feature) => feature.id === activeId) ?? featureItems[0];

  return (
    <section className="kh-showcase-section" id="funcionalidades">
      <style>{`
        /* ==========================================================================
           SEÇÃO 3 · EDITORIAL & ARQUITETÔNICO (SEM CLICHÊS DE TEMPLATE IA)
           ========================================================================== */
        .kh-showcase-section {
          background-color: var(--bg, #070707);
          color: var(--ink, #f5f5f5);
          font-family: var(--font-body, 'Inter', sans-serif);
          padding: clamp(4.5rem, 7vw, 6.5rem) 0;
          border-top: 1px solid var(--line, #262626);
          border-bottom: 1px solid var(--line, #262626);
        }

        .kh-container {
          max-width: 1216px;
          width: calc(100% - 96px);
          margin-inline: auto;
        }

        /* 1. CABEÇALHO EDITORIAL ALINHADO À ESQUERDA (COMO O RESTO DO SITE) */
        .kh-top-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 3rem;
          margin-bottom: 2.75rem;
        }

        .kh-top-header .eyebrow {
          margin-bottom: 1rem;
        }

        .kh-top-header h2 {
          font-family: var(--font-display, 'Oswald', sans-serif);
          font-size: clamp(2.35rem, 4.2vw, 3.35rem);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.045em;
          color: var(--ink, #f5f5f5);
          margin: 0;
        }

        .kh-top-header > p {
          max-width: 36ch;
          color: var(--muted, #a3a3a3);
          font-size: 0.95rem;
          line-height: 1.65;
          margin: 0 0 0.25rem;
        }

        /* 2. RÉGUA DE NAVEGAÇÃO ARQUITETÔNICA (SEM PÍLULAS FLUTUANTES) */
        .kh-index-rail {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          border-top: 1px solid var(--line, #262626);
          border-bottom: 1px solid var(--line, #262626);
          background: #090909;
        }

        .kh-index-tab {
          position: relative;
          display: flex;
          align-items: baseline;
          gap: 0.55rem;
          padding: 1.05rem 1rem;
          background: transparent;
          border: 0;
          border-right: 1px solid #1c1c1c;
          color: var(--muted, #a3a3a3);
          text-align: left;
          cursor: pointer;
          transition: color 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          outline: none;
        }

        .kh-index-tab:last-child {
          border-right: 0;
        }

        .kh-index-tab:hover {
          color: var(--ink, #f5f5f5);
          background: #0d0d0d;
        }

        .kh-index-tab.is-active {
          color: var(--ink, #f5f5f5);
          background: #0f0f0f;
        }

        .kh-index-tab.is-active::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 2px;
          background: rgba(20, 184, 166, 0.22);
        }

        .kh-index-tab.is-active::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          height: 2px;
          width: 100%;
          background: var(--orange, #14b8a6);
          transform-origin: left center;
          animation: khTabProgress 4s linear forwards;
        }

        @keyframes khTabProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .kh-index-num {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.7rem;
          font-weight: 600;
          color: #666;
          transition: color 0.18s ease;
        }

        .kh-index-tab.is-active .kh-index-num {
          color: var(--orange, #14b8a6);
        }

        .kh-index-label {
          font-size: 0.84rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* 3. GRADE ASSIMÉTRICA: TEXTO EDITORIAL (ESQ) + SUPERFÍCIE REAL (DIR) */
        .kh-stage-grid {
          display: grid;
          grid-template-columns: minmax(250px, 0.36fr) minmax(0, 0.64fr);
          border-bottom: 1px solid var(--line, #262626);
          background: #0b0b0b;
        }

        .kh-stage-copy {
          padding: clamp(2rem, 4vw, 3.25rem) clamp(1.5rem, 3vw, 2.75rem);
          border-right: 1px solid var(--line, #262626);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #070707;
        }

        .kh-copy-kicker {
          display: block;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--orange, #14b8a6);
          margin-bottom: 1.1rem;
        }

        .kh-stage-copy h3 {
          font-family: var(--font-display, 'Oswald', sans-serif);
          font-size: clamp(1.75rem, 2.6vw, 2.35rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: var(--ink, #f5f5f5);
          margin: 0 0 1rem;
          white-space: pre-line;
        }

        .kh-stage-copy p {
          color: var(--muted, #a3a3a3);
          font-size: 0.92rem;
          line-height: 1.7;
          margin: 0 0 2rem;
          max-width: 34ch;
        }

        .kh-stage-link {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: none;
          border: 0;
          padding: 0;
          color: var(--ink, #f5f5f5);
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          align-self: flex-start;
          transition: color 0.16s ease, gap 0.16s ease;
        }

        .kh-stage-link svg {
          color: var(--orange, #14b8a6);
        }

        .kh-stage-link:hover {
          color: var(--orange-deep, #2dd4bf);
          gap: 0.85rem;
        }

        /* 4. SUPERFÍCIE DIRETA DO SISTEMA (SEM MOLDURA FALSA DE BROWSER) */
        .kh-stage-surface {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #0c0c0c;
          min-height: 390px;
        }

        .kh-surface-body {
          padding: clamp(1.5rem, 3vw, 2.25rem);
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .kh-surface-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid #1e1e1e;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #8a8a8a;
        }

        .kh-meta-tag {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0;
          color: var(--orange-deep, #2dd4bf);
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* MÓDULO 01: AGENDA */
        .kh-agenda-cols {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
        }

        .kh-col-title {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding-bottom: 0.6rem;
          margin-bottom: 0.35rem;
          border-bottom: 1px solid #222;
        }

        .kh-col-title strong {
          font-size: 0.86rem;
          color: #f5f5f5;
        }

        .kh-col-title span {
          font-size: 0.72rem;
          color: #777;
        }

        .kh-slot-row {
          display: grid;
          grid-template-columns: 2.75rem 3px minmax(0, 1fr) auto;
          align-items: center;
          gap: 0.7rem;
          padding: 0.7rem 0;
          border-bottom: 1px solid #191919;
        }

        .kh-slot-row:last-child {
          border-bottom: 0;
        }

        .kh-slot-row time {
          font-size: 0.75rem;
          color: #999;
          font-variant-numeric: tabular-nums;
        }

        .kh-slot-bar {
          height: 1.9rem;
          background: var(--orange, #14b8a6);
          border-radius: 2px;
        }

        .kh-slot-bar.muted {
          background: #333;
        }

        .kh-slot-bar.open {
          background: transparent;
          border: 1px dashed #14b8a6;
        }

        .kh-slot-info strong {
          display: block;
          font-size: 0.82rem;
          color: #f0f0f0;
          font-weight: 600;
        }

        .kh-slot-info small {
          display: block;
          font-size: 0.72rem;
          color: #7d7d7d;
          margin-top: 2px;
        }

        .kh-slot-state {
          font-size: 0.68rem;
          color: #999;
          font-weight: 500;
        }

        .kh-slot-state.active {
          color: var(--orange-deep, #2dd4bf);
          font-weight: 600;
        }

        .kh-slot-state.open {
          color: var(--orange, #14b8a6);
        }

        .kh-slot-state.muted {
          color: #666;
        }

        /* MÓDULO 02: CAIXA */
        .kh-ledger-table {
          display: flex;
          flex-direction: column;
        }

        .kh-ledger-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto auto;
          align-items: center;
          gap: 1.25rem;
          padding: 0.9rem 0;
          border-bottom: 1px solid #1d1d1d;
        }

        .kh-ledger-main strong {
          display: block;
          font-size: 0.88rem;
          color: #f5f5f5;
        }

        .kh-ledger-main small {
          display: block;
          font-size: 0.75rem;
          color: #808080;
          margin-top: 3px;
        }

        .kh-ledger-method {
          font-size: 0.72rem;
          color: #a3a3a3;
          padding: 0.2rem 0.55rem;
          border: 1px solid #2a2a2a;
          border-radius: 4px;
        }

        .kh-ledger-val {
          font-size: 0.95rem;
          color: #f5f5f5;
          font-variant-numeric: tabular-nums;
        }

        .kh-split-summary {
          margin-top: 1.25rem;
          padding-top: 1rem;
        }

        .kh-split-head {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          font-size: 0.78rem;
          color: #999;
          margin-bottom: 0.6rem;
        }

        .kh-split-head strong {
          color: #f5f5f5;
        }

        .kh-text-accent {
          color: var(--orange-deep, #2dd4bf) !important;
        }

        .kh-text-muted {
          color: #999 !important;
        }

        .kh-split-track {
          display: flex;
          height: 6px;
          gap: 4px;
          background: #161616;
        }

        .kh-split-track span {
          background: #383838;
        }

        .kh-split-track .kh-track-accent {
          background: var(--orange, #14b8a6);
        }

        /* MÓDULO 03: FINANCEIRO */
        .kh-fin-panel {
          display: flex;
          flex-direction: column;
          border: 1px solid #202020;
          border-radius: 8px;
          background: #0d0d0d;
          overflow: hidden;
        }

        .kh-fin-split {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .kh-fin-cell {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 1.15rem 1.25rem 1.2rem;
          min-width: 0;
        }

        .kh-fin-cell + .kh-fin-cell {
          border-left: 1px solid #1e1e1e;
        }

        .kh-fin-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.64rem;
          font-weight: 600;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: #969696;
        }

        .kh-fin-value {
          font-family: var(--font-display, 'Oswald', sans-serif);
          font-size: clamp(1.55rem, 2.2vw, 1.9rem);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #f5f5f5;
          font-variant-numeric: tabular-nums;
        }

        .kh-fin-value-cost {
          color: #bdbdbd;
        }

        .kh-fin-note {
          font-size: 0.72rem;
          line-height: 1.5;
          color: #808080;
        }

        .kh-fin-profit {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 1.5rem;
          padding: 1.2rem 1.25rem;
          border-top: 1px solid rgba(4, 33, 29, 0.18);
          background: linear-gradient(135deg, #17c6b4 0%, #0d9c8f 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
        }

        .kh-fin-profit-main {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          min-width: 0;
        }

        .kh-fin-profit .kh-fin-label {
          color: rgba(4, 33, 29, 0.74);
        }

        .kh-fin-profit .kh-fin-value {
          font-size: clamp(2rem, 3.1vw, 2.5rem);
          color: #04211d;
        }

        .kh-fin-profit .kh-fin-note {
          color: rgba(4, 33, 29, 0.72);
        }

        .kh-fin-margin {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.2rem;
          padding-left: 1.35rem;
          border-left: 1px solid rgba(4, 33, 29, 0.22);
          text-align: right;
        }

        .kh-fin-margin strong {
          font-family: var(--font-display, 'Oswald', sans-serif);
          font-size: clamp(1.7rem, 2.5vw, 2.1rem);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #04211d;
          font-variant-numeric: tabular-nums;
        }

        .kh-fin-margin small {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(4, 33, 29, 0.78);
          white-space: nowrap;
        }

        /* MÓDULO 04: OPERAÇÃO */
        .kh-ops-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2rem;
        }

        .kh-block-label {
          display: block;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #777;
          margin-bottom: 0.75rem;
        }

        .kh-ops-line {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #1d1d1d;
        }

        .kh-ops-line strong {
          font-size: 0.84rem;
          color: #f0f0f0;
        }

        .kh-ops-line span {
          font-size: 0.75rem;
          color: #888;
        }

        .kh-stock-ok {
          color: var(--orange-deep, #2dd4bf) !important;
        }

        .kh-stock-low {
          color: #e0a96d !important;
        }

        /* MÓDULO 05: RELACIONAMENTO */
        .kh-return-panel {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .kh-return-client {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #1d1d1d;
        }

        .kh-return-client strong {
          display: block;
          font-size: 0.92rem;
          color: #f5f5f5;
        }

        .kh-return-client small {
          display: block;
          font-size: 0.76rem;
          color: #858585;
          margin-top: 3px;
        }

        .kh-cycle-flag {
          font-size: 0.7rem;
          color: #e0a96d;
          border: 1px solid rgba(224, 169, 109, 0.35);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          white-space: nowrap;
        }

        .kh-return-msg {
          padding-left: 1rem;
          border-left: 2px solid var(--orange, #14b8a6);
        }

        .kh-return-msg small {
          display: block;
          font-size: 0.7rem;
          color: #808080;
          margin-bottom: 0.35rem;
        }

        .kh-return-msg p {
          font-size: 0.86rem;
          color: #e5e5e5;
          line-height: 1.55;
          margin: 0 0 0.5rem;
        }

        .kh-return-msg span {
          font-size: 0.74rem;
          color: var(--orange-deep, #2dd4bf);
          font-weight: 500;
        }

        /* MÓDULO 06: WHATSAPP */
        .kh-chat-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .kh-chat-msg {
          max-width: 82%;
          padding: 0.65rem 0.9rem;
          border-radius: 8px;
          font-size: 0.8rem;
          line-height: 1.45;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .kh-chat-msg p {
          margin: 0;
          flex: 1;
          min-width: 180px;
        }

        .kh-chat-msg time {
          font-size: 0.65rem;
          color: #777;
          font-variant-numeric: tabular-nums;
        }

        .kh-chat-msg.from-client {
          align-self: flex-start;
          background: #141414;
          border: 1px solid #242424;
          color: #e5e5e5;
        }

        .kh-chat-msg.from-shop {
          align-self: flex-end;
          background: #0d2420;
          border: 1px solid #164e44;
          color: #f5f5f5;
        }

        .kh-chat-note {
          width: 100%;
          font-size: 0.68rem;
          color: var(--orange-deep, #2dd4bf);
          padding-top: 0.25rem;
        }

        /* RODAPÉ DE DADOS DA SUPERFÍCIE */
        .kh-surface-footer {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid #1e1e1e;
          background: #090909;
        }

        .kh-surface-footer.is-finance {
          grid-template-columns: repeat(2, 1fr);
        }

        .kh-footer-stat {
          padding: 0.95rem 1.35rem;
          border-right: 1px solid #191919;
        }

        .kh-footer-stat:last-child {
          border-right: 0;
        }

        .kh-footer-stat small {
          display: block;
          font-size: 0.7rem;
          color: #7d7d7d;
          margin-bottom: 0.2rem;
        }

        .kh-footer-stat strong {
          font-family: var(--font-display, 'Oswald', sans-serif);
          font-size: 1.25rem;
          font-weight: 600;
          color: #f5f5f5;
          letter-spacing: -0.02em;
        }

        .kh-footer-stat:first-child strong {
          color: var(--orange-deep, #2dd4bf);
        }

        /* Transições suaves e escalonadas na troca de abas */
        @keyframes khCopyEnter {
          0% {
            opacity: 0;
            transform: translate3d(0, 10px, 0);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        @keyframes khSurfaceEnter {
          0% {
            opacity: 0;
            transform: translate3d(12px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        @keyframes khItemGlide {
          0% {
            opacity: 0;
            transform: translate3d(0, 8px, 0);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        .kh-stage-copy .kh-copy-kicker {
          animation: khCopyEnter 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .kh-stage-copy h3 {
          animation: khCopyEnter 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.04s both;
        }
        .kh-stage-copy p {
          animation: khCopyEnter 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
        }
        .kh-stage-copy .kh-stage-link {
          animation: khCopyEnter 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both;
        }

        .anim-fade-in {
          animation: khSurfaceEnter 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .kh-slot-row:nth-child(2),
        .kh-ledger-row:nth-child(1),
        .kh-ops-block:nth-child(1) {
          animation: khItemGlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
        }
        .kh-slot-row:nth-child(3),
        .kh-ledger-row:nth-child(2),
        .kh-ops-block:nth-child(2) {
          animation: khItemGlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }
        .kh-slot-row:nth-child(4),
        .kh-split-summary,
        .kh-return-msg {
          animation: khItemGlide 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }

        .kh-footer-stat:nth-child(1) {
          animation: khItemGlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.06s both;
        }
        .kh-footer-stat:nth-child(2) {
          animation: khItemGlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.11s both;
        }
        .kh-footer-stat:nth-child(3) {
          animation: khItemGlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both;
        }

        .anim-pop-1 { animation: khItemGlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.04s both; }
        .anim-pop-2 { animation: khItemGlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both; }
        .anim-pop-3 { animation: khItemGlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both; }
        .anim-pop-4 { animation: khItemGlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both; }

        /* Responsividade */
        @media (max-width: 960px) {
          .kh-container {
            width: calc(100% - 48px);
          }
          .kh-top-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .kh-index-rail {
            display: flex;
            overflow-x: auto;
          }
          .kh-index-tab {
            flex: 0 0 auto;
            min-width: 155px;
          }
          .kh-stage-grid {
            grid-template-columns: 1fr;
          }
          .kh-stage-copy {
            border-right: 0;
            border-bottom: 1px solid var(--line, #262626);
          }
        }

        @media (max-width: 640px) {
          .kh-container {
            width: calc(100% - 32px);
          }
          .kh-agenda-cols,
          .kh-ops-grid,
          .kh-fin-split,
          .kh-surface-footer,
          .kh-surface-footer.is-finance {
            grid-template-columns: 1fr;
          }
          .kh-fin-cell + .kh-fin-cell {
            border-left: 0;
            border-top: 1px solid #1e1e1e;
          }
          .kh-fin-profit {
            grid-template-columns: 1fr;
            gap: 0.85rem;
            padding: 1.15rem 1.15rem 1.2rem;
          }
          .kh-head-range {
            display: none;
          }
          .kh-fin-margin {
            flex-direction: row;
            align-items: baseline;
            justify-content: space-between;
            gap: 0.75rem;
            padding: 0.8rem 0 0;
            border-left: 0;
            border-top: 1px solid rgba(4, 33, 29, 0.22);
            text-align: left;
          }
          .kh-footer-stat {
            border-right: 0;
            border-bottom: 1px solid #191919;
          }
          .kh-footer-stat:last-child {
            border-bottom: 0;
          }
        }
      `}</style>

      <div className="kh-container">
        <header className="kh-top-header">
          <div>
            <div className="eyebrow">MENOS CONTROLE MANUAL. MAIS BARBEARIA.</div>
            <h2>Uma operação inteira.<br />Em uma só visão.</h2>
          </div>
          <p>
            Da cadeira ao fechamento do caixa, acompanhe cada parte da barbearia sem precisar trocar de tela ou anotar no papel.
          </p>
        </header>

        <div>
          {/* Régua de navegação numerada (01 a 06) com avanço automático */}
          <div className="kh-index-rail" role="tablist" aria-label="Áreas do sistema KlipHub">
            {featureItems.map((feature) => {
              const isActive = activeId === feature.id;
              return (
                <button
                  key={feature.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`kh-index-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveId(feature.id)}
                  type="button"
                >
                  <span className="kh-index-num">{feature.number}</span>
                  <span className="kh-index-label">{feature.label}</span>
                </button>
              );
            })}
          </div>

          {/* Palco Assimétrico Editorial */}
          <div className="kh-stage-grid" role="tabpanel">
            <div className="kh-stage-copy" key={active.id}>
              <div>
                <span className="kh-copy-kicker">{active.number} / {active.label.toUpperCase()}</span>
                <h3>{active.title}</h3>
                <p>{active.description}</p>
              </div>

              <button className="kh-stage-link" onClick={onExplore} type="button">
                Conhecer o KlipHub <Icon name="arrowRight" />
              </button>
            </div>

            <div className="kh-stage-surface" key={active.id + '-surface'}>
              <FeatureMainPreview id={active.id} />
              <FeatureFooterMetrics id={active.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ecosystemItems: Array<{
  id: EcosystemId;
  tab: string;
  nodeTitle: string;
  nodeDetail: string;
  kicker: string;
  title: string;
  description: string;
}> = [
  {
    id: 'software', tab: 'Software', nodeTitle: 'Você · KlipHub', nodeDetail: 'Gestão da operação',
    kicker: '01 / OPERAÇÃO', title: 'Você organiza a casa.',
    description: 'Agenda, caixa e clientes ficam reunidos no sistema que sua barbearia usa para operar.',
  },
  {
    id: 'clube', tab: 'Clube de Assinaturas', nodeTitle: 'Seu cliente', nodeDetail: 'Clube de benefícios',
    kicker: '02 / RECORRÊNCIA', title: 'Seu cliente encontra motivos para voltar.',
    description: 'Crie planos e pacotes com benefícios definidos pela sua barbearia e apresente-os na vitrine.',
  },
  {
    id: 'whatsapp', tab: 'Disparos WhatsApp', nodeTitle: 'A ponte', nodeDetail: 'Créditos + WhatsApp',
    kicker: '03 / COMUNICAÇÃO', title: 'A conversa aproxima de novo.',
    description: 'Créditos dão suporte às comunicações da plataforma; lembretes e mensagens ajudam a reabrir o ciclo de atendimento.',
  },
];

function EcosystemPreview({ id }: { id: EcosystemId }) {
  if (id === 'clube') {
    return (
      <div className="ecosystem-preview-content ecosystem-preview-club">
        <div className="ecosystem-preview-title"><span>VITRINE DA BARBEARIA</span><span className="ecosystem-preview-status"><i></i> Publicada</span></div>
        <div className="ecosystem-membership-card">
          <span className="ecosystem-membership-icon"><Icon name="heart" /></span>
          <span className="ecosystem-preview-eyebrow">CLUBE DA BARBEARIA</span>
          <strong>Seu plano mensal</strong>
          <p>Serviços, pacotes e benefícios definidos por você.</p>
          <span className="ecosystem-membership-link">Ver benefícios <Icon name="arrow" /></span>
        </div>
        <div className="ecosystem-preview-footnote">O clube é criado e oferecido pela própria barbearia.</div>
      </div>
    );
  }

  if (id === 'whatsapp') {
    return (
      <div className="ecosystem-preview-content ecosystem-preview-whatsapp">
        <div className="ecosystem-preview-title"><span>RELACIONAMENTO · EXEMPLO</span><span className="ecosystem-preview-status"><i></i> Mensagem enviada</span></div>
        <div className="ecosystem-return-card">
          <span className="ecosystem-return-label">SINAL DE RETORNO</span>
          <strong>Cliente ausente há 45 dias</strong>
          <span className="ecosystem-return-state"><Icon name="check-circle" /> Mensagem enviada · aguardando resposta</span>
        </div>
        <div className="ecosystem-message-bubble">
          Oi, Lucas! Já faz um tempinho desde seu último corte. Quer ver os horários disponíveis desta semana?
        </div>
        <div className="ecosystem-preview-footnote">A comunicação usa os créditos disponíveis na plataforma.</div>
      </div>
    );
  }

  return (
    <div className="ecosystem-preview-content ecosystem-preview-software">
      <div className="ecosystem-preview-title"><span>PAINEL KLIPHUB · EXEMPLO</span><span className="ecosystem-preview-status"><i></i> Sua operação</span></div>
      <div className="ecosystem-dashboard">
        <div className="ecosystem-dashboard-main">
          <span className="ecosystem-preview-eyebrow">VISÃO DO DIA</span>
          <strong>Sua barbearia, em ordem.</strong>
          <div className="ecosystem-dashboard-row"><Icon name="calendar" /><span>Agenda</span><strong>Atendimentos organizados</strong></div>
          <div className="ecosystem-dashboard-row"><Icon name="wallet" /><span>Caixa</span><strong>Vendas e comissões</strong></div>
          <div className="ecosystem-dashboard-row"><Icon name="users" /><span>Clientes</span><strong>Histórico e relacionamento</strong></div>
        </div>
        <div className="ecosystem-dashboard-aside">
          <span className="ecosystem-preview-eyebrow">TUDO CONECTADO</span>
          <div className="ecosystem-dashboard-orbit"><Icon name="monitor" /></div>
          <span>Gestão no mesmo lugar</span>
        </div>
      </div>
    </div>
  );
}

export function EcosystemSection() {
  const [activeId, setActiveId] = useState<EcosystemId>('software');
  const active = ecosystemItems.find((item) => item.id === activeId) ?? ecosystemItems[0];

  const selectByIndex = (index: number) => setActiveId(ecosystemItems[index].id);
  const handleTabKey = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? ecosystemItems.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : -1) + ecosystemItems.length) % ecosystemItems.length;
    selectByIndex(nextIndex);
    requestAnimationFrame(() => document.getElementById(`ecosystem-tab-${ecosystemItems[nextIndex].id}`)?.focus());
  };

  return (
    <section className="club-section ecosystem-section" id="planos">
      <div className="container">
        <div className="ecosystem-layout">
          <div className="ecosystem-explainer">
            <div className="eyebrow">CLIENTE QUE VOLTA. NEGÓCIO QUE CRESCE.</div>
            <h2>Gestão, benefícios e conversa.<br />No mesmo ciclo.</h2>
            <p>O KlipHub organiza a operação, sua barbearia cria o clube, e a comunicação ajuda a manter o relacionamento com os clientes.</p>
            <div className="ecosystem-tabs" role="tablist" aria-label="Partes do ecossistema">
              {ecosystemItems.map((item, index) => (
                <button
                  aria-controls="ecosystem-preview-panel"
                  aria-selected={activeId === item.id}
                  className={`ecosystem-tab ${activeId === item.id ? 'is-active' : ''}`}
                  id={`ecosystem-tab-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={(event) => handleTabKey(event, index)}
                  role="tab"
                  tabIndex={activeId === item.id ? 0 : -1}
                  type="button"
                >
                  <span>{item.tab}</span><Icon name="arrow" />
                </button>
              ))}
            </div>
            <div className="ecosystem-active-copy" aria-live="polite">
              <span>{active.kicker}</span>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
            </div>
          </div>

          <div aria-labelledby={`ecosystem-tab-${active.id}`} className="ecosystem-preview-panel" id="ecosystem-preview-panel" key={active.id} role="tabpanel" tabIndex={0}>
            <div className="ecosystem-preview-window-bar">
              <span className="showcase-window-dots"><i></i><i></i><i></i></span>
              <span>{active.tab}</span>
              <span className="showcase-window-label">Prévia ilustrativa</span>
            </div>
            <EcosystemPreview id={active.id} />
          </div>
        </div>

        <div className="ecosystem-flow" aria-label="Fluxo entre KlipHub, clube de benefícios e comunicação por WhatsApp">
          <div className="ecosystem-flow-caption"><span>UM CICLO CONECTADO</span><span>operação → relacionamento → retorno</span></div>
          <div className="ecosystem-node-track">
            <div aria-hidden="true" className="ecosystem-flow-connectors"><i></i><i></i><i></i></div>
            {ecosystemItems.map((item, index) => (
              <button
                aria-label={`${item.nodeTitle}: ${item.nodeDetail}. Selecionar ${item.tab}.`}
                className={`ecosystem-node ${activeId === item.id ? 'is-active' : ''}`}
                key={item.id}
                onClick={() => setActiveId(item.id)}
                type="button"
              >
                <span className="ecosystem-node-index">0{index + 1}</span>
                <strong>{item.nodeTitle}</strong>
                <small>{item.nodeDetail}</small>
              </button>
            ))}
          </div>
          <svg aria-hidden="true" className="ecosystem-loopback" preserveAspectRatio="none" viewBox="0 0 1000 48">
            <defs><linearGradient id="ecosystem-loop-gradient" x1="0" x2="1"><stop offset="0" stopColor="#17c9a5" stopOpacity=".15" /><stop offset=".5" stopColor="#17c9a5" stopOpacity=".7" /><stop offset="1" stopColor="#17c9a5" stopOpacity=".15" /></linearGradient></defs>
            <path d="M 835 2 C 835 34 785 43 740 43 H 260 C 215 43 165 34 165 2" fill="none" markerEnd="url(#ecosystem-loop-arrow)" stroke="url(#ecosystem-loop-gradient)" strokeWidth="1.5" />
            <defs><marker id="ecosystem-loop-arrow" markerHeight="7" markerWidth="7" orient="auto" refX="5" refY="3"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#17c9a5" strokeWidth="1.2" /></marker></defs>
          </svg>
          <p className="ecosystem-loop-label">A conversa traz o cliente de volta para a agenda.</p>
        </div>

        <p className="ecosystem-disclaimer">A assinatura do software, o clube da barbearia e os créditos de mensagens são recursos distintos. Os benefícios do clube são definidos por você.</p>
      </div>
    </section>
  );
}

export default FeatureShowcase;
