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
        <div class="section-badge"><span class="badge-icon">${zapIcon}</span> Simple & Fast</div>
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

      <!-- Comparison: On-Device vs Traditional Cloud Tools -->
      <div class="landing-block">
        <div class="section-badge"><span class="badge-icon">${shieldIcon}</span> Privacy Benchmark</div>
        <h3 class="section-title">Why docSpace is Superior to Cloud PDF Converters</h3>
        <div class="comparison-card">
          <div class="comparison-table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th class="highlight-col">docSpace (Client-Side)</th>
                  <th>Traditional Cloud Tools</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>File Privacy</strong></td>
                  <td class="highlight-col"><span class="table-badge good">${checkIcon} 100% on device</span></td>
                  <td><span class="table-badge bad">Uploaded to remote servers</span></td>
                </tr>
                <tr>
                  <td><strong>Processing Speed</strong></td>
                  <td class="highlight-col"><span class="table-badge good">${checkIcon} Instant WebAssembly</span></td>
                  <td><span class="table-badge bad">Slow upload & download queues</span></td>
                </tr>
                <tr>
                  <td><strong>Server Data Retention</strong></td>
                  <td class="highlight-col"><span class="table-badge good">${checkIcon} Zero retention</span></td>
                  <td><span class="table-badge bad">Files stored in remote disks</span></td>
                </tr>
                <tr>
                  <td><strong>Security Compliance</strong></td>
                  <td class="highlight-col"><span class="table-badge good">${checkIcon} Safe for NDA/Tax/Medical</span></td>
                  <td><span class="table-badge bad">Risk of data breaches</span></td>
                </tr>
                <tr>
                  <td><strong>Cost & Limits</strong></td>
                  <td class="highlight-col"><span class="table-badge good">${checkIcon} Completely Free</span></td>
                  <td><span class="table-badge bad">Paywalls & credit limits</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Specifications & Key Features -->
      <div class="landing-block">
        <div class="section-badge"><span class="badge-icon">${lockIcon}</span> Built for Scale</div>
        <h3 class="section-title">Key Specifications & Capabilities</h3>
        <div class="specs-grid">
          <div class="spec-card">
            <span class="spec-label">Capacity Limit</span>
            <span class="spec-val">Up to 50 files / 100 MB</span>
            <p class="spec-desc">Optimized memory management for desktop & mobile devices.</p>
          </div>
          <div class="spec-card">
            <span class="spec-label">Engine Technology</span>
            <span class="spec-val">pdf-lib • PDF.js • docx</span>
            <p class="spec-desc">Standard-compliant WebAssembly and Web Worker pipelines.</p>
          </div>
          <div class="spec-card">
            <span class="spec-label">Identity & Sync</span>
            <span class="spec-val">Supabase PostgreSQL RLS</span>
            <p class="spec-desc">Strict cryptographic row-level security for user preferences.</p>
          </div>
        </div>
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
            <a href="/${item.slug}" class="related-card" data-switch-tool="${item.id}">
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
