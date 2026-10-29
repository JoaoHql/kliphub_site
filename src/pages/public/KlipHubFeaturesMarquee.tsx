import React, { useState } from 'react';

export interface CalibratedFeature {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
}

// 1. WhatsApp Oficial Meta e 2. Agendamento com IA 24/7 no início visível imediato
export const CALIBRATED_FEATURES: CalibratedFeature[] = [
  {
    id: 'whatsapp-meta',
    tag: 'META CLOUD API',
    title: 'WhatsApp Oficial Meta',
    subtitle: 'Estabilidade empresarial sem bloqueio',
  },
  {
    id: 'agendamento-ia',
    tag: '24/7 SEM ESPERA',
    title: 'Agendamento com IA 24/7',
    subtitle: 'Autônomo e sem atendente humano',
  },
  {
    id: 'gestor-ia',
    tag: 'AUTÔNOMO',
    title: 'Gestor de IA no Controle',
    subtitle: 'Gestão de negócio e controle do sistema',
  },
  {
    id: 'radar-retencao',
    tag: 'ANTI-CHURN',
    title: 'Radar de Retenção de Clientes',
    subtitle: 'Resgate automático de inativos',
  },
  {
    id: 'lembretes-anti-falta',
    tag: 'ZERO AUSÊNCIAS',
    title: 'Lembretes Anti-Falta Automáticos',
    subtitle: 'Disparo direto no WhatsApp',
  },
  {
    id: 'clube-assinatura',
    tag: 'RECEITA PREVISÍVEL',
    title: 'Clube de Assinatura Recorrente',
    subtitle: 'Planos mensais e receita fixa',
  },
  {
    id: 'app-pwa',
    tag: 'INSTALAÇÃO 1-CLIQUE',
    title: 'Aplicativo PWA no Celular',
    subtitle: 'Instalação instantânea sem app store',
  },
  {
    id: 'agenda-cockpit',
    tag: 'MULTICADEIRA',
    title: 'Agenda Cockpit em Tempo Real',
    subtitle: 'Organização por cadeira e barbeiro',
  },
  {
    id: 'pdv-caixa',
    tag: 'CHECKOUT ÁGIL',
    title: 'Frente de Caixa e PDV Ágil',
    subtitle: 'Checkout rápido e múltiplos pagamentos',
  },
  {
    id: 'comissoes-auto',
    tag: 'REPASSE AUTOMÁTICO',
    title: 'Cálculo Automático de Comissões',
    subtitle: 'Fechamento de repasses sem erro',
  },
  {
    id: 'dre-fluxo',
    tag: 'LUCRO REAL',
    title: 'DRE e Fluxo de Caixa',
    subtitle: 'Visão de lucro real e financeiro',
  },
  {
    id: 'inbox-multi',
    tag: 'NÚMERO ÚNICO',
    title: 'Inbox Multi-atendente WhatsApp',
    subtitle: 'Todas as conversas em uma tela',
  },
  {
    id: 'estoque-revenda',
    tag: 'ALERTA MÍNIMO',
    title: 'Controle de Estoque e Revenda',
    subtitle: 'Alerta de falta de produtos',
  },
  {
    id: 'vitrine-online',
    tag: 'SEM TAXAS POR CORTE',
    title: 'Vitrine e Link de Agendamento',
    subtitle: 'Autoatendimento sem taxas',
  },
  {
    id: 'metas-barbeiro',
    tag: 'PERFORMANCE',
    title: 'Metas por Barbeiro',
    subtitle: 'Acompanhamento de desempenho',
  },
  {
    id: 'avaliacoes-nps',
    tag: 'REPUTAÇÃO ONLINE',
    title: 'Avaliações e Feedback NPS',
    subtitle: 'Reputação online da barbearia',
  },
  {
    id: 'niveis-acesso',
    tag: 'ACESSO BLINDADO',
    title: 'Níveis de Acesso e Permissões',
    subtitle: 'Painel seguro para equipe e sócios',
  },
];

function TickerIcon({ name }: { name: string }) {
  const stroke = "currentColor";
  const sw = 1.8;

  switch (name) {
    case 'whatsapp-meta':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'agendamento-ia':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="m13 14-2 3h3l-2 3" />
        </svg>
      );
    case 'gestor-ia':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M9 9h6v6H9z" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
        </svg>
      );
    case 'app-pwa':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="3" />
          <path d="M12 18h.01" />
          <path d="m9 10 3 3 3-3" />
          <path d="M12 6v7" />
        </svg>
      );
    case 'radar-retencao':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
        </svg>
      );
    case 'lembretes-anti-falta':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          <path d="m9.5 9 1.5 1.5 3.5-3.5" />
        </svg>
      );
    case 'clube-assinatura':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 16h5v5" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'agenda-cockpit':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
          <path d="M15 21V9" />
        </svg>
      );
    case 'pdv-caixa':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <circle cx="6" cy="15" r="1" />
          <circle cx="10" cy="15" r="1" />
        </svg>
      );
    case 'comissoes-auto':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9h-4a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3h-4" />
          <line x1="12" y1="7" x2="12" y2="17" />
        </svg>
      );
    case 'dre-fluxo':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="m3 9 5-5 4 4 9-9" />
        </svg>
      );
    case 'inbox-multi':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 6.1H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5v3l3.5-3h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2z" />
          <path d="M23 8v8a2 2 0 0 1-2 2h-1.5v2.5l-3-2.5" />
        </svg>
      );
    case 'estoque-revenda':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case 'vitrine-online':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      );
    case 'metas-barbeiro':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    case 'avaliacoes-nps':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'niveis-acesso':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16.5" r="1.5" />
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export function KlipHubFeaturesMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section 
      aria-label="Ecossistema completo de recursos do KlipHub" 
      className="benefit-ribbon"
    >
      <div 
        className="benefit-ribbon-marquee"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
      >
        <div className={`benefit-ribbon-track ${isPaused ? 'is-paused' : ''}`}>
          {/* Trilho 1 */}
          <div className="benefit-ribbon-group">
            {CALIBRATED_FEATURES.map((item) => (
              <div key={`track1-${item.id}`} className="feature-ticker-card">
                <div className="feature-ticker-icon-box">
                  <TickerIcon name={item.id} />
                </div>
                <div className="feature-ticker-content">
                  <div className="feature-ticker-header">
                    <span className="feature-ticker-title">{item.title}</span>
                    <span className="feature-ticker-tag">{item.tag}</span>
                  </div>
                  <p className="feature-ticker-desc">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trilho 2 (Gêmeo idêntico para loop 100% contínuo sem emenda) */}
          <div className="benefit-ribbon-group" aria-hidden="true">
            {CALIBRATED_FEATURES.map((item) => (
              <div key={`track2-${item.id}`} className="feature-ticker-card">
                <div className="feature-ticker-icon-box">
                  <TickerIcon name={item.id} />
                </div>
                <div className="feature-ticker-content">
                  <div className="feature-ticker-header">
                    <span className="feature-ticker-title">{item.title}</span>
                    <span className="feature-ticker-tag">{item.tag}</span>
                  </div>
                  <p className="feature-ticker-desc">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default KlipHubFeaturesMarquee;
