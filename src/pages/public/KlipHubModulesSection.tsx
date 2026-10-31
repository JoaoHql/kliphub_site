import React, { useEffect, useRef, useState } from 'react';

const PUBLIC_BASE = import.meta.env.BASE_URL;

const AUTO_ROTATION_INTERVAL = 5000;

type ModuleItem = {
  tag: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
  backTitle: string;
  points: Array<{ label: string; text: string }>;
};

const modules: ModuleItem[] = [
  {
    tag: 'AGENDA INTEGRADA',
    category: '01. Agendamento & Atendimento',
    title: 'Agenda da Barbearia',
    description: 'Controle total dos horários, disponibilidade da equipe e agendamento online automático.',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Tablet com a agenda da barbearia',
    icon: 'calendar',
    backTitle: 'Agenda & Atendimento',
    points: [
      { label: 'Grade individual:', text: 'visualização completa por barbeiro e cadeira.' },
      { label: 'Agendamento online:', text: 'seu cliente escolhe serviço e horário 24h.' },
      { label: 'Gestão de status:', text: 'confirmação, remarcação e cancelamentos.' },
      { label: 'Área do cliente:', text: 'acompanhamento direto dos atendimentos.' },
    ],
  },
  {
    tag: 'VITRINE DIGITAL',
    category: '02. Experiência do Cliente',
    title: 'Página Pública Exclusiva',
    description: 'Sua barbearia na internet com serviços, produtos, preços e identidade personalizada.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Cliente acessando a vitrine da barbearia pelo celular',
    icon: 'globe',
    backTitle: 'Página Pública & Vitrine',
    points: [
      { label: 'Identidade própria:', text: 'página personalizada com as cores e o logo da barbearia.' },
      { label: 'Catálogo completo:', text: 'serviços, profissionais e duração de cada atendimento.' },
      { label: 'Reserva de produtos:', text: 'vitrine de itens para retirada no local.' },
      { label: 'Planos & clube:', text: 'divulgação de assinaturas e combos mensais.' },
    ],
  },
  {
    tag: 'OPERAÇÃO TOTAL',
    category: '03. Gestão da Barbearia',
    title: 'Controle Operacional',
    description: 'Cadastro de clientes, controle de equipe, serviços, estoque e painel gerencial.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Painel de gestão da barbearia',
    icon: 'users',
    backTitle: 'Gestão da Barbearia',
    points: [
      { label: 'Histórico de clientes:', text: 'cadastro e relacionamento unificado.' },
      { label: 'Equipe & permissões:', text: 'controle de acesso por profissional.' },
      { label: 'Estoque integrado:', text: 'produtos para revenda e custos sob controle.' },
      { label: 'Painel de indicadores:', text: 'receita diária, atendimentos e cancelamentos.' },
    ],
  },
  {
    tag: 'PDV & COMANDAS',
    category: '04. Frente de Caixa & PDV',
    title: 'Vendas no Balcão',
    description: 'PDV rápido para lançamento de produtos, comanda, baixa de estoque e comissões.',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Vendas no balcão da barbearia',
    icon: 'wallet',
    backTitle: 'Vendas no Balcão & PDV',
    points: [
      { label: 'PDV ágil:', text: 'fechamento rápido de comandas de produtos e serviços.' },
      { label: 'Recebimento integrado:', text: 'múltiplas formas de pagamento no balcão.' },
      { label: 'Baixa automática:', text: 'atualização imediata do estoque vendido.' },
      { label: 'Cálculo de comissões:', text: 'repasse automático ao profissional.' },
    ],
  },
  {
    tag: 'FLUXO FINANCEIRO',
    category: '05. Módulo Financeiro',
    title: 'Gestão Financeira',
    description: 'Controle de despesas, receitas, DRE simplificada, comissões e ticket médio.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Relatórios de faturamento da barbearia',
    icon: 'chart',
    backTitle: 'Gestão Financeira & DRE',
    points: [
      { label: 'Controle de despesas:', text: 'lançamentos e filtros por categoria e prazo.' },
      { label: 'Relatórios detalhados:', text: 'faturamento por barbeiro e forma de pagamento.' },
      { label: 'Indicadores-chave:', text: 'ticket médio, margem e custos fixos.' },
      { label: 'Gestão de comissões:', text: 'apuração das comissões em tempo real.' },
    ],
  },
  {
    tag: 'CHECKOUT ONLINE',
    category: '06. Pagamentos Online',
    title: 'Gateways & Checkout',
    description: 'Integração com Mercado Pago e PagBank para Pix e cartão de crédito online.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Confirmação de pagamento pelo celular',
    icon: 'lock',
    backTitle: 'Pagamentos Online',
    points: [
      { label: 'Mercado Pago & PagBank:', text: 'Pix instantâneo e cartão de crédito.' },
      { label: 'Taxa de reserva:', text: 'garantia do agendamento antecipado.' },
      { label: 'Parcelamento:', text: 'opção de pagamento parcelado no checkout.' },
      { label: 'Perfil comercial:', text: 'configuração rápida dos métodos aceitos.' },
    ],
  },
  {
    tag: 'CLUBE & CLIENTES',
    category: '07. Planos & Assinaturas',
    title: 'Clube da Barbearia',
    description: 'Planos recorrentes para clientes, pacotes de cortes e gestão transparente da licença.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Cliente fidelizado no clube da barbearia',
    icon: 'heart',
    backTitle: 'Planos, Clube & Assinaturas',
    points: [
      { label: 'Clube de clientes:', text: 'planos mensais recorrentes criados pela sua barbearia.' },
      { label: 'Pacotes & combos:', text: 'descontos em pacotes acumulativos.' },
      { label: 'Assinatura do sistema:', text: 'gestão clara da sua licença KlipHub.' },
      { label: 'Créditos de mensagens:', text: 'saldo transparente para avisos.' },
    ],
  },
  {
    tag: 'AGENTE DE IA 24/7',
    category: '08. WhatsApp & Inteligência Artificial',
    title: 'Agente de IA & WhatsApp',
    description: 'Lembretes automáticos, radar de retenção e agente de IA atendendo 24h.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Atendimento automático pelo WhatsApp',
    icon: 'spark',
    backTitle: 'WhatsApp & Inteligência Artificial',
    points: [
      { label: 'Agente de IA 24/7:', text: 'responde dúvidas e agenda clientes pelo WhatsApp.' },
      { label: 'Radar de retenção:', text: 'identifica clientes inativos e sugere retorno.' },
      { label: 'Lembretes de corte:', text: 'envio automático para evitar faltas.' },
      { label: 'Avaliação & reputação:', text: 'acompanhamento da satisfação dos clientes.' },
    ],
  },
];

function ModuleCardIcon({ name }: { name: string }) {
  return (
    <svg aria-hidden="true" className="module-icon" viewBox="0 0 24 24">
      <use href={`${PUBLIC_BASE}icons.svg#${name}`}></use>
    </svg>
  );
}

export default function KlipHubModulesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [ignoredHoverCard, setIgnoredHoverCard] = useState<number | null>(null);
  const [revealStage, setRevealStage] = useState(0);
  const [canHover] = useState(() => window.matchMedia('(hover: hover)').matches);

  const hoveredCardRef = useRef<number | null>(null);
  const revealStageRef = useRef(0);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const secondRowRef = useRef<HTMLDivElement | null>(null);

  hoveredCardRef.current = hoveredCard;
  revealStageRef.current = revealStage;

  // Revelação em duas etapas: primeira fileira ao entrar na seção,
  // segunda fileira depois de mais dois passos de rolagem.
  useEffect(() => {
    const grid = gridRef.current;
    const secondRow = secondRowRef.current;

    if (!grid || !secondRow || typeof IntersectionObserver === 'undefined') {
      setRevealStage(2);
      return;
    }

    const firstObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setRevealStage((stage) => Math.max(stage, 1));
        firstObserver.disconnect();
      },
      { threshold: 0.04, rootMargin: '0px 0px -10% 0px' },
    );

    const secondObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setRevealStage((stage) => Math.max(stage, 2));
        secondObserver.disconnect();
      },
      { threshold: 0.02, rootMargin: '0px 0px -38% 0px' },
    );

    firstObserver.observe(grid);
    secondObserver.observe(secondRow);

    return () => {
      firstObserver.disconnect();
      secondObserver.disconnect();
    };
  }, []);

  // Apresentação automática permanente: sorteia um módulo a cada 5 segundos.
  useEffect(() => {
    let interval: number | undefined;

    const rotate = () => {
      if (hoveredCardRef.current !== null || document.hidden || revealStageRef.current < 1) return;

      const visibleCount = revealStageRef.current >= 2 ? modules.length : 4;

      setActiveCard((current) => {
        if (visibleCount <= 1) return current;
        let next = current;
        while (next === current || next >= visibleCount) {
          next = Math.floor(Math.random() * visibleCount);
        }
        return next;
      });
    };

    const firstRotation = window.setTimeout(() => {
      rotate();
      interval = window.setInterval(rotate, AUTO_ROTATION_INTERVAL);
    }, 2000);

    return () => {
      window.clearTimeout(firstRotation);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  const toggleCard = (index: number) => {
    if (activeCard === index) {
      setActiveCard(null);
      setIgnoredHoverCard(index);
      return;
    }

    setActiveCard(index);
    setIgnoredHoverCard(null);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleCard(index);
  };

  return (
    <section aria-labelledby="modules-title" className="section modules-section" id="agendamento">
      <div className="container">
        <header className="modules-heading">
          <h2 id="modules-title">
            Sua barbearia inteira,<br />
            <span className="modules-accent">módulo a módulo.</span>
          </h2>

          <div className="modules-heading-copy">
            <div className="eyebrow">
              <span className="status-dot pulse"></span>
              O PRÓXIMO HORÁRIO COMEÇA ONLINE
            </div>

            <p>
              Agenda, vitrine, caixa, financeiro, pagamentos, clube e WhatsApp: conheça os 8 módulos
              do KlipHub e veja como eles se conectam na rotina da sua barbearia.
              <span className="modules-hint">Passe o mouse ou toque no card para ver os detalhes.</span>
            </p>
          </div>
        </header>

        <div className="modules-grid" ref={gridRef}>
          {modules.map((module, index) => {
            const isFlipped =
              activeCard === index || (hoveredCard === index && ignoredHoverCard !== index);
            const isSecondRow = index >= 4;
            const isRevealed = isSecondRow ? revealStage >= 2 : revealStage >= 1;

            return (
              <div
                className={`module-reveal ${isRevealed ? 'is-revealed' : ''}`}
                key={module.category}
                ref={index === 4 ? secondRowRef : undefined}
                style={{ transitionDelay: `${(index % 4) * 90 + (isSecondRow ? 70 : 0)}ms` }}
              >
                <div
                  aria-hidden={!isRevealed}
                  aria-pressed={isFlipped}
                  className={`module-card ${isFlipped ? 'is-flipped' : ''}`}
                  onClick={() => toggleCard(index)}
                  onKeyDown={(event) => handleCardKeyDown(event, index)}
                  onMouseEnter={canHover ? () => setHoveredCard(index) : undefined}
                  onMouseLeave={
                    canHover
                      ? () => {
                          setHoveredCard(null);
                          setIgnoredHoverCard(null);
                        }
                      : undefined
                  }
                  role="button"
                  tabIndex={isRevealed ? 0 : -1}
                >
                <div className="module-card-inner">
                  {/* FRENTE */}
                  <div aria-hidden={isFlipped} className="module-face module-front">
                    <div className="module-media">
                      <img
                        alt={module.imageAlt}
                        decoding="async"
                        height={400}
                        loading="lazy"
                        onError={(event) => {
                          const image = event.currentTarget;
                          image.onerror = null;
                          image.src = 'https://placehold.co/800x400/0B0F0E/14B8A6?text=KlipHub';
                        }}
                        src={module.image}
                        width={800}
                      />
                      <span className="module-media-shade" aria-hidden="true"></span>
                      <span className="module-tag">{module.tag}</span>
                    </div>

                    <div className="module-front-copy">
                      <span className="module-category">{module.category}</span>
                      <h3>{module.title}</h3>
                      <p>{module.description}</p>
                    </div>

                    <span className="module-open" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <use href={`${PUBLIC_BASE}icons.svg#arrow`}></use>
                      </svg>
                    </span>
                  </div>

                  {/* VERSO */}
                  <div aria-hidden={!isFlipped} className="module-face module-back">
                    <div className="module-back-head">
                      <span className="module-back-label">
                        <ModuleCardIcon name={module.icon} />
                        Módulo {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="module-back-count">
                        {String(index + 1).padStart(2, '0')}/08
                      </span>
                    </div>

                    <div className="module-back-copy">
                      <h4>{module.backTitle}</h4>
                      <ul>
                        {module.points.map((point) => (
                          <li key={point.label}>
                            <strong>{point.label}</strong> {point.text}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="module-back-footer">
                      <svg aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M3 12a9 9 0 1 0 3-6.7L3 8"></path>
                        <path d="M3 3v5h5"></path>
                      </svg>
                      <span>Voltar à imagem</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
