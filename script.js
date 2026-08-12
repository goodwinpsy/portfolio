/* ==========================================================================
   Goodwin Michael - Clinical Psychologist Interactive JavaScript
   Includes: Navigation toggle, FAQ accordion, PHQ-9 Screener & CBT Tools
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile Navigation Toggle --- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  /* --- FAQ Accordion Logic --- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const isActive = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const ans = item.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!isActive) {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* --- PHQ-9 Calc Button Listener --- */
  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', calculatePHQ9);
  }

});

/* ==========================================================================
   Global Functions (Exposed for HTML onclick events)
   ========================================================================== */

/* --- PHQ-9 Screener Logic --- */
function calculatePHQ9() {
  const form = document.getElementById('phq9-form');
  if (!form) return;

  let score = 0;
  let answeredCount = 0;

  for (let i = 1; i <= 9; i++) {
    const radios = form.elements['q' + i];
    if (radios) {
      for (let radio of radios) {
        if (radio.checked) {
          score += parseInt(radio.value, 10);
          answeredCount++;
          break;
        }
      }
    }
  }

  if (answeredCount < 9) {
    alert("Please answer all 9 questions to receive your automated assessment result.");
    return;
  }

  const resultsDiv = document.getElementById('quiz-results');
  const scoreText = document.getElementById('result-score');
  const descText = document.getElementById('result-desc');

  if (scoreText && descText && resultsDiv) {
    scoreText.innerHTML = "<strong>Total PHQ-9 Score: " + score + " / 27</strong>";

    if (score <= 4) {
      descText.innerHTML = "<strong>Interpretation: Minimal or no depression symptoms.</strong> Your responses indicate minimal psychological distress. If you have specific concerns, feel free to schedule an exploratory consultation.";
    } else if (score <= 9) {
      descText.innerHTML = "<strong>Interpretation: Mild depression symptoms.</strong> You may be experiencing mild mood distress or fatigue. Early therapeutic support or stress management can prevent symptom progression.";
    } else if (score <= 14) {
      descText.innerHTML = "<strong>Interpretation: Moderate depression symptoms.</strong> Your score suggests noticeable distress affecting daily activities. A structured clinical consultation is recommended to formulate a personalized coping plan.";
    } else if (score <= 19) {
      descText.innerHTML = "<strong>Interpretation: Moderately severe depression symptoms.</strong> Your responses indicate significant distress. Professional clinical support (such as Cognitive Behavioral Therapy) is strongly advised.";
    } else {
      descText.innerHTML = "<strong>Interpretation: Severe depression symptoms.</strong> Your score indicates severe depressive symptoms. Please schedule a clinical consultation or reach out for professional healthcare support.";
    }

    resultsDiv.style.display = "block";
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
  }
}

/* --- CBT Tools Tab Switching --- */
function switchCbtTool(toolId, event) {
  const tool1 = document.getElementById('thought-modifier');
  const tool2 = document.getElementById('grounding-tool');
  const tool3 = document.getElementById('decatastrophizer');

  if (tool1) tool1.style.display = 'none';
  if (tool2) tool2.style.display = 'none';
  if (tool3) tool3.style.display = 'none';

  document.querySelectorAll('.cbt-tab-btn').forEach(btn => btn.classList.remove('active'));

  const selectedTool = document.getElementById(toolId);
  if (selectedTool) {
    selectedTool.style.display = 'block';
  }

  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  } else if (event && event.target) {
    event.target.classList.add('active');
  }
}

/* --- CBT Tool 1: Simple Reframing Logic --- */
function generateSimpleReframing() {
  const situation = document.getElementById('cbt-situation').value.trim();
  const unhelpful = document.getElementById('cbt-unhelpful').value.trim();
  const balanced = document.getElementById('cbt-balanced').value.trim();

  if (!unhelpful || !balanced) {
    alert("Please enter both your unhelpful thought and your balanced alternative thought.");
    return;
  }

  const resultHTML = `
    <p><strong>Trigger / Situation:</strong> ${situation || 'General Trigger'}</p>
    <p style="color: #dc2626;"><strong>Unhelpful Thought:</strong> "${unhelpful}"</p>
    <p style="color: #0284c7;"><strong>Balanced Reframe:</strong> "${balanced}"</p>
  `;

  document.getElementById('cbt-simple-text').innerHTML = resultHTML;
  document.getElementById('cbt-simple-result').style.display = 'block';
}

/* --- CBT Tool 3: Decatastrophizing Logic --- */
function generateDecatSummary() {
  const topic = document.getElementById('decat-topic').value.trim();
  const worst = document.getElementById('decat-worst').value.trim();
  const best = document.getElementById('decat-best').value.trim();
  const likely = document.getElementById('decat-likely').value.trim();

  if (!worst || !likely) {
    alert("Please fill in at least the worst-case and most likely scenarios.");
    return;
  }

  const resultHTML = `
    <p><strong>Worry Topic:</strong> ${topic || 'General Worry'}</p>
    <p>🔴 <strong>Worst-Case:</strong> ${worst}</p>
    <p>🟢 <strong>Best-Case:</strong> ${best || 'Not specified'}</p>
    <p>🔵 <strong>Most Likely Reality:</strong> ${likely}</p>
  `;

  document.getElementById('decat-result-text').innerHTML = resultHTML;
  document.getElementById('decat-result-box').style.display = 'block';
}
