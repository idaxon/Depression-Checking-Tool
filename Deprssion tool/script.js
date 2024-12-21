document.getElementById('submit-btn').addEventListener('click', function () {
    const questions = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;

    questions.forEach((question) => {
        score += parseInt(question.value, 10);
    });

    const maxScore = 25;
    const percentage = Math.round((score / maxScore) * 100);
    const resultDiv = document.getElementById('result');
    const scoreText = document.getElementById('score-text');
    const recommendation = document.getElementById('recommendation');
    const ctx = document.getElementById('depression-chart').getContext('2d');

    resultDiv.classList.remove('hidden');
    scoreText.innerText = `Your depression level: ${percentage}%`;

    if (percentage <= 20) {
        recommendation.innerText = "Low depression. Keep maintaining a healthy lifestyle.";
    } else if (percentage <= 50) {
        recommendation.innerText = "Mild depression. Talk to someone you trust.";
    } else if (percentage <= 80) {
        recommendation.innerText = "Moderate depression. Seek professional help.";
    } else {
        recommendation.innerHTML = `
            Severe depression detected.<br>
            <b>Emergency Helpline:</b> 123-456-7890<br>
            <b>Recommended Doctor:</b> Dr. Jane Doe, Contact: 987-654-3210
        `;
    }

    const cureChances = percentage <= 20 ? 90 : percentage <= 50 ? 70 : percentage <= 80 ? 50 : 30;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Depression Severity', 'Chance of Cure'],
            datasets: [{
                data: [percentage, cureChances],
                backgroundColor: ['#ff6384', '#36a2eb']
            }]
        }
    });
});

document.getElementById('reset-btn').addEventListener('click', function () {
    document.getElementById('assessment-form').reset();
    document.getElementById('result').classList.add('hidden');
});

document.getElementById('save-btn').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Depression Assessment Report', 10, 10);
    doc.text(`Your depression level: ${document.getElementById('score-text').innerText}`, 10, 20);
    doc.text(document.getElementById('recommendation').innerText, 10, 30);

    doc.save('depression-report.pdf');
});
