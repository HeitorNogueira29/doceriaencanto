const form = document.querySelector('form');
const feedbackList = document.getElementById('feedback-list');

function mostrarFeedbacks() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacksDoceria') || '[]');
    feedbackList.innerHTML = feedbacks.map((f, i) =>
        `<div class="feedback">
            <strong>${f.nome}:</strong>
            <p>${f.mensagem}</p>
            <button class="apagar-feedback" data-index="${i}">Apagar</button>
        </div>`
    ).join('');

    // Adiciona evento aos botões de apagar
    document.querySelectorAll('.apagar-feedback').forEach(btn => {
        btn.addEventListener('click', function() {
            apagarFeedback(this.dataset.index);
        });
    });
}

function apagarFeedback(index) {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacksDoceria') || '[]');
    feedbacks.splice(index, 1);
    localStorage.setItem('feedbacksDoceria', JSON.stringify(feedbacks));
    mostrarFeedbacks();
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = form.nome.value;
    const mensagem = form.mensagem.value;
    const feedbacks = JSON.parse(localStorage.getItem('feedbacksDoceria') || '[]');
    feedbacks.push({ nome, mensagem });
    localStorage.setItem('feedbacksDoceria', JSON.stringify(feedbacks));
    form.reset();
    mostrarFeedbacks();
    alert('Feedback enviado! Obrigado pela sua mensagem.');
});

mostrarFeedbacks();