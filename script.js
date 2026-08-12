/* ==========================================================================
   Goodwin Michael - Interactive Portal Functions
   Includes: Navigation, Services Tabs, CBT Analysis Engine, PHQ-9 Screener
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile Navigation Toggle */
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

  /* PHQ-9 Calc Listener */
  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', calculatePHQ9);
  }

});

/* --- Interactive Services Tab Switcher --- */
function switchServiceTab(tabId, event) {
  document.querySelectorAll('.portal-tab-content').forEach(content => {
    content.style.display = 'none';
  });

  document.querySelectorAll('.portal-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const selectedContent = document.getElementById(tabId);
  if (selectedContent) {
    selectedContent.style.display = 'block';
  }

  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
}

/* --- CBT Exercises Tab Switcher --- */
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
  }
}

/* --- Thought Reframer with Automated Analysis --- */
function generateSimpleReframing() {
  const situation = document.getElementById('cbt-situation').value.trim();
  const unhelpful = document.getElementById('cbt-unhelpful').value.trim();
  const balanced = document.getElementById('cbt-balanced').value.trim();

  if (!unhelpful || !balanced) {
    alert("Please enter both your unhelpful thought and your balanced alternative thought.");
    return;
  }

  const resultHTML = `
    <p style="margin-bottom:0.5rem;"><strong>Trigger / Situation:</strong> ${situation || 'General Trigger'}</p>
    <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:0.75rem; border-radius:4px; margin-bottom:0.75rem;">
      <strong style="color:#b91c1c;">Original Unhelpful Reaction:</strong>
      <p style="color:#7f1d1d; margin:0; font-size:0.9rem;">"${unhelpful}"</p>
    </div>
    <div style="background:#e0f2fe; border-left:4px solid #0284c7; padding:0.75rem; border-radius:4px;">
      <strong style="color:#0369a1;">Reframed Balanced Perspective:</strong>
      <p style="color:#0c4a6e; margin:0; font-size:0.9rem;">"${balanced}"</p>
    </div>
  `;

  document.getElementById('cbt-simple-text').innerHTML = resultHTML;
  document.getElementById('cbt-simple-result').style.display = 'block';
  document.getElementById('cbt-simple-result').scrollIntoView({ behavior: 'smooth' });
}

/* --- Worry Balancer Logic --- */
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
    <p style="color:#dc2626;">🔴 <strong>Worst-Case:</strong> ${worst}</p>
    <p style="color:#16a34a;">🟢 <strong>Best-Case:</strong> ${best || 'Not specified'}</p>
    <p style="color:#0284c7;">🔵 <strong>Most Likely Reality:</strong> ${likely}</p>
  `;

  document.getElementById('decat-result-text').innerHTML = resultHTML;
  document.getElementById('decat-result-box').style.display = 'block';
}

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
      descText.innerHTML = "<strong>Interpretation: Minimal or no depression symptoms.</strong> Your responses indicate minimal psychological distress.";
    } else if (score <= 9) {
      descText.innerHTML = "<strong>Interpretation: Mild depression symptoms.</strong> You may be experiencing mild mood distress. Early therapeutic support or stress management can help.";
    } else if (score <= 14) {
      descText.innerHTML = "<strong>Interpretation: Moderate depression symptoms.</strong> Your score suggests noticeable distress affecting daily activities. A structured consultation is recommended.";
    } else if (score <= 19) {
      descText.innerHTML = "<strong>Interpretation: Moderately severe depression symptoms.</strong> Your responses indicate significant distress. Professional clinical support (such as CBT) is strongly advised.";
    } else {
      descText.innerHTML = "<strong>Interpretation: Severe depression symptoms.</strong> Your score indicates severe depressive symptoms. Please schedule a clinical consultation.";
    }

    resultsDiv.style.display = "block";
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
  }
}
