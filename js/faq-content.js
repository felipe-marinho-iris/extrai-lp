// Script para atualizar o conteúdo das perguntas frequentes
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar texto introdutório
    const faqIntro = document.querySelector('#faq-area .section-heading p');
    if (faqIntro) {
        faqIntro.textContent = 'Respostas para as dúvidas mais comuns sobre a ExtrAi e como nosso serviço funciona.';
    }
    
    // Atualizar conteúdo das perguntas e respostas
    const faqData = [
        {
            question: '1. Preciso instalar algum aplicativo para usar a Extrai?',
            answer: 'Não. A Extrai funciona 100% na nuvem. Basta conectar seu grupo de WhatsApp através do nosso painel com poucos cliques.'
        },
        {
            question: '2. A Extrai lê mensagens privadas?',
            answer: 'Não. A Extrai apenas analisa dados dos grupos que você autoriza e que estão vinculados à sua conta. A privacidade e a segurança das informações são prioridades.'
        },
        {
            question: '3. Em quanto tempo os dados aparecem no painel?',
            answer: 'Os dados são atualizados periodicamente ao longo do dia, de forma automática, sem necessidade de ação manual.'
        },
        {
            question: '4. Posso cancelar o plano a qualquer momento?',
            answer: 'Sim. Todos os planos são mensais, sem fidelidade. Você pode cancelar ou mudar de plano quando quiser, direto pela sua conta.'
        }
    ];
    
    // Selecionar todos os painéis de perguntas
    const panels = document.querySelectorAll('#accordion .panel');
    
    // Atualizar o conteúdo de cada painel
    for (let i = 0; i < Math.min(panels.length, faqData.length); i++) {
        const panel = panels[i];
        const titleElement = panel.querySelector('.panel-title a');
        const answerElement = panel.querySelector('.panel-body p');
        
        if (titleElement) {
            titleElement.textContent = faqData[i].question;
        }
        
        if (answerElement) {
            answerElement.textContent = faqData[i].answer;
        }
    }
});
