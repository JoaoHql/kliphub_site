import React from 'react';

export default function CustomerStorefrontPreview() {
  return (
    <div className="storefront-preview" aria-label="Prévia animada da vitrine de agendamento online da barbearia">
      <div className="storefront-browser" aria-hidden="true">
        <span className="storefront-browser-dots"><i /><i /><i /></span>
        <span className="storefront-address"><svg viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0 1 10 0v3m-12 0h14v11H5z" /></svg> kliphub.com.br/barbearia</span>
        <span className="storefront-browser-menu">···</span>
      </div>

      <div className="storefront-content">
        <div className="storefront-brand">
          <div className="storefront-brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19M7 3l2 2m6 14 2 2M3 7l2 2m14 6 2 2" /></svg></div>
          <div><strong>Barbearia Central</strong><span>ESTILO EM CADA DETALHE</span></div>
          <span className="storefront-open"><i /> Aberta</span>
        </div>

        <div className="storefront-welcome">
          <span className="storefront-eyebrow">AGENDE SEU HORÁRIO</span>
          <h3>Seu próximo corte<br />começa por aqui.</h3>
          <p>Escolha o serviço, o profissional e o melhor horário.</p>
        </div>

        <div className="storefront-section-heading"><strong>Escolha seu serviço</strong><span>Ver todos <b>→</b></span></div>
        <div className="storefront-service is-highlighted">
          <div className="storefront-service-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3v4m10-4v4M5 9h14M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Zm3 8h3m-3 3h6" /></svg></div>
          <div className="storefront-service-copy"><strong>Corte + Barba</strong><span>45 min · inclui acabamento</span></div>
          <div className="storefront-service-price"><strong>R$ 65</strong><span>›</span></div>
          <span className="storefront-select-pulse" aria-hidden="true" />
        </div>
        <div className="storefront-service storefront-service-secondary">
          <div className="storefront-service-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3v4m10-4v4M5 9h14M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Z" /></svg></div>
          <div className="storefront-service-copy"><strong>Corte masculino</strong><span>30 min · tesoura ou máquina</span></div>
          <div className="storefront-service-price"><strong>R$ 40</strong><span>›</span></div>
        </div>

        <div className="storefront-booking-row">
          <div className="storefront-step"><span>02</span><div><strong>Profissional</strong><small>Escolha quem vai atender</small></div></div>
          <div className="storefront-staff"><span className="storefront-avatar">RM</span><span><strong>Rafael Martins</strong><small>Barbeiro</small></span><i>✓</i></div>
        </div>
        <div className="storefront-booking-row storefront-time-row">
          <div className="storefront-step"><span>03</span><div><strong>Horários disponíveis</strong><small>Quinta-feira, 24 de outubro</small></div></div>
          <div className="storefront-times"><span>14:00</span><span className="is-selected">14:30</span><span>15:00</span><span>15:30</span></div>
        </div>
        <button className="storefront-confirm" type="button" tabIndex={-1} aria-hidden="true">Confirmar agendamento <span>→</span></button>
      </div>

      <div className="storefront-success" aria-hidden="true"><span className="storefront-success-check">✓</span><span><strong>Horário reservado!</strong><small>Agendamento confirmado para 14:30</small></span><span className="storefront-success-spark">✦</span></div>
      <div className="storefront-caption"><span className="storefront-live-dot" />VITRINE ONLINE · EXPERIÊNCIA DO CLIENTE</div>
    </div>
  );
}
