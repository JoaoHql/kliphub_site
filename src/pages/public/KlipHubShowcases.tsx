import React, { useState } from 'react';

const PUBLIC_BASE = import.meta.env.BASE_URL;

type FeatureId = 'agenda' | 'caixa' | 'financeiro' | 'operacao' | 'relacionamento' | 'whatsapp';
type EcosystemId = 'software' | 'clube' | 'whatsapp';

const featureItems: Array<{
  id: FeatureId;
  number: string;
  label: string;
  icon: string;
  title: string;
  description: string;
  viewTitle: string;
}> = [
  {
    id: 'agenda', number: '01', label: 'Agenda', icon: 'calendar',
    title: 'Agenda organizada. Cadeira ocupada.',
    description: 'Visualize a disponibilidade da equipe e crie, confirme, remarque ou conclua atendimentos em um só lugar.',
    viewTitle: 'Agenda da barbearia',
  },
  {
    id: 'caixa', number: '02', label: 'Caixa e comissões', icon: 'wallet',
    title: 'Feche a conta. Não a sua visão.',
    description: 'Serviços e produtos registrados no PDV, com os recebimentos e as comissões reunidos no fechamento.',
    viewTitle: 'Comanda concluída',
  },
  {
    id: 'financeiro', number: '03', label: 'Financeiro', icon: 'chart',
    title: 'Saiba o que entra e o que sai.',
    description: 'Acompanhe receitas, despesas, comissões e o movimento da barbearia por período.',
    viewTitle: 'Resumo financeiro',
  },
  {
    id: 'operacao', number: '04', label: 'Equipe e estoque', icon: 'users',
    title: 'Tudo o que a operação precisa.',
    description: 'Organize equipe, clientes, serviços e produtos; acompanhe o estoque ligado às vendas.',
    viewTitle: 'Operação e estoque',
  },
  {
    id: 'relacionamento', number: '05', label: 'Relacionamento', icon: 'heart',
    title: 'Um bom corte traz. Uma boa relação mantém.',
    description: 'Fidelidade, avaliações e sinais de retorno para manter a conversa com os clientes.',
    viewTitle: 'Radar de relacionamento',
  },
  {
    id: 'whatsapp', number: '06', label: 'WhatsApp com IA', icon: 'message',
    title: 'Você atende na cadeira. A IA ajuda na conversa.',
    description: 'O agente de IA responde dúvidas e apoia ações de agenda dentro das regras definidas por você.',
    viewTitle: 'Atendimento pelo WhatsApp',
  },
];

function Icon({ name }: { name: string }) {
  return <svg aria-hidden="true"><use href={`${PUBLIC_BASE}icons.svg#${name}`}></use></svg>;
}

function FeatureMainPreview({ id, onExplore }: { id: FeatureId; onExplore: () => void }) {
  if (id === 'whatsapp') {
    return (
      <div className="showcase-chat-window">
        <div className="showcase-chat-head">
          <span className="showcase-avatar">M</span>
          <span><strong>Marcos Oliveira</strong><small>Conversa de exemplo</small></span>
          <span className="showcase-online"><i></i> WhatsApp</span>
        </div>
        <div className="showcase-chat-thread" aria-label="Exemplo ilustrativo de conversa no WhatsApp">
          <p className="showcase-chat-bubble from-client">Oi! Tem horário para corte na sexta?</p>
          <p className="showcase-chat-bubble from-agent">Olá, Marcos! Tenho opções às 10h30 e às 14h. Qual fica melhor para você?</p>
          <p className="showcase-chat-bubble from-client">Pode ser às 14h.</p>
          <p className="showcase-chat-bubble from-agent">Pronto, seu horário ficou reservado. Até sexta!</p>
        </div>
        <button className="showcase-chat-cta" onClick={onExplore}>
          Conhecer o KlipHub <Icon name="arrow" />
        </button>
      </div>
    );
  }

  if (id === 'agenda') {
    return (
      <div className="showcase-agenda-view">
        <div className="showcase-view-heading"><strong>Agenda de exemplo</strong><span>Prévia</span></div>
        {[
          ['09:00', 'Rafael M.', 'Corte · João'],
          ['10:30', 'André L.', 'Corte + barba · Caio'],
          ['13:00', 'Horário disponível', 'Livre para agendar'],
          ['14:30', 'Bruno S.', 'Corte · João'],
        ].map(([time, client, service], index) => (
          <div className={`showcase-appointment ${client === 'Horário disponível' ? 'is-open' : ''}`} key={time}>
            <time>{time}</time><span className="showcase-appointment-mark" aria-hidden="true"></span>
            <span className="showcase-appointment-copy"><strong>{client}</strong><small>{service}</small></span>
            {index === 2 && <span className="showcase-open-tag">Disponível</span>}
          </div>
        ))}
      </div>
    );
  }

  if (id === 'caixa') {
    return (
      <div className="showcase-receipt">
        <div className="showcase-view-heading"><strong>Comanda #048 · Exemplo</strong><span className="showcase-state">Concluída</span></div>
        <div className="showcase-receipt-person"><span className="showcase-avatar">R</span><span><strong>Rafael Martins</strong><small>Atendimento ilustrativo</small></span></div>
        <div className="showcase-receipt-row"><span>Corte + barba</span><strong>R$ 85,00</strong></div>
        <div className="showcase-receipt-row"><span>Pagamento</span><strong>Cartão de débito</strong></div>
        <div className="showcase-receipt-total"><span>Total recebido</span><strong>R$ 85,00</strong></div>
      </div>
    );
  }

  if (id === 'financeiro') {
    const bars = [42, 62, 48, 78, 56, 91, 68];
    return (
      <div className="showcase-finance-view">
        <div className="showcase-view-heading"><strong>Movimento da semana</strong><span>Exemplo</span></div>
        <div className="showcase-finance-total"><small>Receita registrada</small><strong>R$ 4.280,00</strong><span>Dados ilustrativos</span></div>
        <div className="showcase-bars" role="img" aria-label="Gráfico ilustrativo do movimento semanal; barras relativas de segunda a domingo, sem valores exatos">
          {bars.map((height, index) => <span className="showcase-bar-column" key={index}><i style={{ height: `${height}%` }}></i><small>{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][index]}</small></span>)}
        </div>
      </div>
    );
  }

  if (id === 'operacao') {
    return (
      <div className="showcase-stock-view">
        <div className="showcase-view-heading"><strong>Produtos em estoque</strong><span>Visão da operação</span></div>
        {[
          ['Pomada modeladora', '12 un.', 'Em estoque'],
          ['Óleo para barba', '3 un.', 'Estoque baixo'],
          ['Shampoo profissional', '8 un.', 'Em estoque'],
        ].map(([product, quantity, status]) => (
          <div className="showcase-stock-row" key={product}>
            <span aria-hidden="true" className="showcase-product-icon">P</span>
            <span className="showcase-stock-copy"><strong>{product}</strong><small>{quantity}</small></span>
            <span className={`showcase-stock-status ${status === 'Estoque baixo' ? 'is-low' : ''}`}>{status}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="showcase-retention-view">
      <div className="showcase-view-heading"><strong>Radar de retorno</strong><span>Exemplo ilustrativo</span></div>
      <div className="showcase-retention-profile">
        <span className="showcase-avatar">L</span>
        <span><strong>Lucas Ferreira</strong><small>Último atendimento · há 45 dias</small></span>
        <span className="showcase-retention-badge">Retomar contato</span>
      </div>
      <div className="showcase-retention-message">
        <span className="showcase-message-label"><Icon name="message" /> WhatsApp</span>
        <p>Oi, Lucas! Já faz um tempinho desde seu último corte. Quer ver os horários disponíveis desta semana?</p>
        <small><i></i> Mensagem enviada · aguardando resposta</small>
      </div>
    </div>
  );
}

function FeatureSidePreview({ id }: { id: FeatureId }) {
  const cards: Record<FeatureId, Array<{ label: string; value: string; detail: string }>> = {
    agenda: [
      { label: 'Próximo horário', value: '14:30', detail: 'com João' },
      { label: 'Disponibilidade', value: '3 horários', detail: 'para hoje' },
    ],
    caixa: [
      { label: 'Comissão · exemplo', value: 'R$ 34,00', detail: '40% ilustrativo' },
      { label: 'Barbearia', value: 'R$ 51,00', detail: '60% ilustrativo' },
    ],
    financeiro: [
      { label: 'Despesas', value: 'R$ 1.120', detail: 'dados ilustrativos' },
      { label: 'Atendimentos', value: '48', detail: 'no período exemplo' },
    ],
    operacao: [
      { label: 'Estoque baixo', value: '1 produto', detail: 'revisar reposição' },
      { label: 'Equipe', value: '4 pessoas', detail: 'cadastro ilustrativo' },
    ],
    relacionamento: [
      { label: 'Cliente inativo', value: '45 dias', detail: 'sinal para contato' },
      { label: 'Ação', value: 'Mensagem', detail: 'enviada pelo WhatsApp' },
    ],
    whatsapp: [
      { label: 'Agente de IA', value: 'Ativo', detail: 'regras da barbearia' },
      { label: 'Resultado', value: 'Horário reservado', detail: 'na própria conversa' },
    ],
  };

  return (
    <aside className="showcase-side-preview" aria-label="Resumo ilustrativo">
      {cards[id].map((card) => (
        <div className="showcase-side-stat" key={card.label}>
          <small>{card.label}</small><strong>{card.value}</strong><span>{card.detail}</span>
        </div>
      ))}
      <span className="showcase-data-note">Prévia ilustrativa</span>
    </aside>
  );
}

export function FeatureShowcase({ onExplore }: { onExplore: () => void }) {
  const [activeId, setActiveId] = useState<FeatureId>('whatsapp');
  const active = featureItems.find((feature) => feature.id === activeId) ?? featureItems[0];

  const handleTabKey = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? featureItems.length - 1
      : (index + (event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1) + featureItems.length) % featureItems.length;
    setActiveId(featureItems[nextIndex].id);
    requestAnimationFrame(() => document.getElementById(`feature-tab-${featureItems[nextIndex].id}`)?.focus());
  };

  return (
    <section className="section container feature-showcase-section" id="funcionalidades">
      <div className="section-heading split-heading feature-showcase-heading">
        <div>
          <div className="eyebrow">MENOS CONTROLE MANUAL. MAIS BARBEARIA.</div>
          <h2>Uma operação inteira.<br />Em uma só visão.</h2>
        </div>
        <p>Explore os seis pilares do KlipHub. Escolha uma área para ver uma prévia ilustrativa de como ela funciona.</p>
      </div>

      <div className="feature-showcase-layout">
        <div className="feature-showcase-nav" role="tablist" aria-label="Pilares do KlipHub" aria-orientation="vertical">
          <span className="feature-showcase-nav-title">EXPLORE OS PILARES</span>
          {featureItems.map((feature, index) => (
            <button
              aria-controls="feature-showcase-panel"
              aria-selected={activeId === feature.id}
              className={`feature-showcase-tab ${activeId === feature.id ? 'is-active' : ''}`}
              id={`feature-tab-${feature.id}`}
              key={feature.id}
              onClick={() => setActiveId(feature.id)}
              onKeyDown={(event) => handleTabKey(event, index)}
              role="tab"
              tabIndex={activeId === feature.id ? 0 : -1}
              type="button"
            >
              <span className="feature-showcase-tab-icon"><Icon name={feature.icon} /></span>
              <span className="feature-showcase-tab-copy"><small>{feature.number}</small><strong>{feature.label}</strong></span>
              <Icon name="arrow" />
            </button>
          ))}
        </div>

        <div aria-labelledby={`feature-tab-${active.id}`} className="feature-showcase-panel" id="feature-showcase-panel" role="tabpanel" tabIndex={0}>
          <div className="feature-showcase-copy">
            <span className="feature-showcase-kicker">{active.number} / {active.label.toUpperCase()}</span>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            {active.id !== 'whatsapp' && (
              <button className="feature-showcase-action" onClick={onExplore} type="button">
                Conhecer o KlipHub <Icon name="arrow" />
              </button>
            )}
          </div>

          <div className={`feature-showcase-canvas feature-showcase-canvas--${active.id}`} key={active.id}>
            <div className="showcase-window-bar">
              <span className="showcase-window-dots"><i></i><i></i><i></i></span>
              <span>{active.viewTitle}</span>
              <span className="showcase-window-label">Demonstração ilustrativa</span>
            </div>
            <div className="showcase-bento-screen">
              <div className="showcase-main-preview"><FeatureMainPreview id={active.id} onExplore={onExplore} /></div>
              <FeatureSidePreview id={active.id} />
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
