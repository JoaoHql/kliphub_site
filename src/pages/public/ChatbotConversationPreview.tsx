import React, { useEffect, useState } from 'react';

type Stage = 'typing' | 'thinking' | 'answer';

const conversations = [
  {
    question: 'Quais clientes estão na hora de voltar e ainda não agendaram?',
    answer: 'Encontrei 18 clientes que já passaram do intervalo habitual de retorno. São cerca de R$ 900 em serviços potenciais para a sua barbearia.',
  },
  {
    question: 'Onde minha agenda está vazia nesta semana?',
    answer: 'A quinta-feira à tarde, entre 14h e 17h, e a sexta pela manhã têm mais horários livres. Que tal avisar seus clientes?',
  },
  {
    question: 'Qual serviço teve maior demanda este mês?',
    answer: 'Corte + Hidratação lidera: foram 42 atendimentos concluídos nos últimos 30 dias, com R$ 4.200 em receita registrada.',
  },
];

export default function ChatbotConversationPreview() {
  const [conversation, setConversation] = useState(0);
  const [stage, setStage] = useState<Stage>('typing');
  const [typedQuestion, setTypedQuestion] = useState('');

  useEffect(() => {
    const question = conversations[conversation].question;
    if (stage === 'typing') {
      let character = 0;
      setTypedQuestion('');
      const typing = window.setInterval(() => {
        character += 1;
        setTypedQuestion(question.slice(0, character));
        if (character >= question.length) {
          window.clearInterval(typing);
          window.setTimeout(() => setStage('thinking'), 450);
        }
      }, 29);
      return () => window.clearInterval(typing);
    }
    if (stage === 'thinking') {
      const timer = window.setTimeout(() => setStage('answer'), 1150);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => {
      setConversation((current) => (current + 1) % conversations.length);
      setStage('typing');
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [conversation, stage]);

  const current = conversations[conversation];
  return (
    <div className="chatbot-preview" aria-label="Demonstração animada de uma conversa com o Gestor de IA do KlipHub">
      <div className="chatbot-browser" aria-hidden="true">
        <span className="chatbot-browser-dots"><i /><i /><i /></span>
        <span className="chatbot-browser-address"><svg viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0 1 10 0v3m-12 0h14v11H5z" /></svg> kliphub.com.br/gestor-ia</span>
        <span className="chatbot-browser-menu">···</span>
      </div>
      <div className="chatbot-topbar">
        <div className="chatbot-app-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-5.4a2.5 2.5 0 0 1-1-2.1z" /><path d="M8 9h8M8 12h5" /></svg></div>
        <div className="chatbot-title"><strong>Gestor de IA</strong><span>Seu copiloto na gestão da barbearia</span></div>
        <span className="chatbot-ready"><i /> PRONTO</span>
      </div>
      <div className="chatbot-conversation" aria-live="polite" aria-atomic="false">
        <div className="chatbot-date"><span /> HOJE <span /></div>
        <div className="chatbot-user-message" key={`question-${conversation}`}>
          <span className="chatbot-user-avatar">JO</span>
          <div className="chatbot-message-content"><div className="chatbot-bubble chatbot-user-bubble">{typedQuestion}<span className={stage === 'typing' ? 'chatbot-caret is-visible' : 'chatbot-caret'} /></div><small>Você · agora <span>✓✓</span></small></div>
        </div>
        {(stage === 'thinking' || stage === 'answer') && (
          <div className="chatbot-ai-message" key={`answer-${conversation}`}>
            <span className="chatbot-ai-avatar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></svg></span>
            <div className="chatbot-message-content"><div className="chatbot-bubble chatbot-ai-bubble">{stage === 'thinking' ? <span className="chatbot-typing-dots"><i /><i /><i /></span> : current.answer}</div>{stage === 'answer' && <small>Gestor de IA · agora</small>}</div>
          </div>
        )}
      </div>
      <div className="chatbot-input" aria-hidden="true"><span>Pergunte algo sobre sua barbearia...</span><span className="chatbot-send"><svg viewBox="0 0 24 24"><path d="m21 3-7.2 18-3.9-7.9L2 9.2 21 3Zm0 0L9.9 13.1" /></svg></span></div>
      <div className="chatbot-caption"><span className="chatbot-live-dot" /> GESTOR DE IA · CONVERSA DEMONSTRATIVA</div>
    </div>
  );
}
