// src/components/landing.js - Dynamic SEO Landing page sections for each tool

import checkIcon from 'lucide-static/icons/check.svg?raw';
import zapIcon from 'lucide-static/icons/zap.svg?raw';
import shieldIcon from 'lucide-static/icons/shield-check.svg?raw';
import lockIcon from 'lucide-static/icons/lock.svg?raw';
import { tools } from '../tools-data.js';

export function renderToolLanding(tool) {
  const otherTools = Object.values(tools).filter(t => t.id !== tool.id).slice(0, 4);

  return `
    <section class="landing-section" aria-label="Tool Information and Guides">
      <!-- 3-Step How-To Guide -->
      <div class="landing-block">
        <h3 class="section-title">How to ${tool.title} in 3 Simple Steps</h3>
        <div class="steps-grid">
          ${tool.steps.map((step, idx) => `
            <div class="step-card">
              <span class="step-num">${idx + 1}</span>
              <h4 class="step-title">${step.title}</h4>
              <p class="step-desc">${step.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="landing-block">
        <h3 class="section-title">Your files stay on this device</h3>
        <p>Document processing runs in your browser. Download your result or continue in another tool. Closing or reloading the page clears the current workspace.</p>
      </div>

      <!-- Frequently Asked Questions -->
      <div class="landing-block faq-block">
        <h3 class="section-title">Frequently Asked Questions</h3>
        <div class="faq-list">
          ${tool.faqs.map(faq => `
            <details class="faq-item">
              <summary class="faq-question">
                <span>${faq.q}</span>
              </summary>
              <div class="faq-answer">
                <p>${faq.a}</p>
              </div>
            </details>
          `).join('')}
        </div>
      </div>

      <!-- Related Tools Grid -->
      <div class="landing-block">
        <h3 class="section-title">Explore More PDF Tools</h3>
        <div class="related-grid">
          ${otherTools.map(item => `
            <a href="/#/${item.slug}" class="related-card" data-switch-tool="${item.id}">
              <span class="related-icon">${item.icon}</span>
              <div class="related-info">
                <strong>${item.title}</strong>
                <span>${item.summary}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
