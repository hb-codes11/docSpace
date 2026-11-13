// src/components/legal.js - Compliance, Privacy Policy, Terms of Service & About content for Google AdSense

export const privacyPolicyContent = `
  <h2>Privacy Policy</h2>
  <p class="legal-effective">Last updated: November 2026</p>

  <h3>1. 100% On-Device Processing Guarantee</h3>
  <p>At <strong>docSpace</strong>, we believe your personal, legal, and financial documents belong exclusively to you. Unlike traditional cloud-based document converters, <strong>docSpace processes all PDF and Word files entirely on your device</strong> using in-browser browser processing and JavaScript libraries (including pdf-lib, PDF.js, and docx).</p>
  <p><strong>Your files, filenames, text streams, and images are never transmitted to, uploaded to, or stored on any remote server.</strong> All operations execute locally in your computer or mobile device's transient memory.</p>

  <h3>2. Information We Collect</h3>
  <p>Because files are processed locally, we do not collect or log document contents. The only data processed externally includes:</p>
  <ul>
    <li><strong>Optional Account Data:</strong> If you choose to sign in via Supabase passwordless magic link, your email address, last-used tool preference, and per-tool usage counts are securely synced via Supabase Row Level Security (RLS). You can use docSpace completely anonymously without creating an account.</li>
    <li><strong>Browser Diagnostics:</strong> Standard technical information sent automatically by your browser (user agent, language, operating system) for rendering and responsive layout.</li>
  </ul>

  <h3>3. Advertising & Cookies (Google AdSense)</h3>
  <p>To keep docSpace free and scalable, we may display third-party advertisements served by Google AdSense:</p>
  <ul>
    <li>Google, as a third-party vendor, uses cookies to serve ads on docSpace based on your prior visits to this website or other websites on the Internet.</li>
    <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to docSpace and/or other sites on the Internet.</li>
    <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a> or by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener">www.aboutads.info</a>.</li>
  </ul>

  <h3>4. Data Security & Storage</h3>
  <p>All database interactions with Supabase are protected with PostgreSQL Row Level Security (RLS). Each authenticated user can access only their own row. Anonymous users have zero read or write access to database records.</p>

`;

export const termsOfServiceContent = `
  <h2>Terms of Service</h2>
  <p class="legal-effective">Last updated: November 2026</p>

  <h3>1. Acceptance of Terms</h3>
  <p>By accessing or using docSpace, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

  <h3>2. Description of Service</h3>
  <p>docSpace provides client-side document processing tools, including PDF merging, splitting, organization, compression, and format conversions. The services are provided "as is" and "as available".</p>

  <h3>3. User Responsibilities</h3>
  <p>You retain full ownership and copyright of all documents and files you process using docSpace. Because processing happens locally on your device, you are solely responsible for ensuring you have the legal right to view and modify any documents you open in the application.</p>

  <h3>4. Disclaimer of Warranties</h3>
  <p>docSpace is provided without warranty of any kind, express or implied. While we take pride in rigorous client-side testing, we do not warrant that results will be uninterrupted, error-free, or meet all specific formatting requirements for complex proprietary documents.</p>

  <h3>5. Limitation of Liability</h3>
  <p>Under no circumstances shall docSpace or its contributors be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the tools.</p>
`;

export const aboutContent = `
  <h2>About docSpace</h2>
  <p class="legal-effective">Built for speed, security, and privacy.</p>

  <p><strong>docSpace</strong> was engineered to solve a fundamental problem on the modern web: <em>why do users have to upload confidential tax returns, legal contracts, medical forms, and bank statements to mysterious cloud servers just to merge two PDFs or rotate a single page?</em></p>

  <h3>Modern Web Architecture</h3>
  <p>Using modern browser processing, Web Workers, and standards-compliant browser APIs, docSpace delivers desktop-grade PDF and Word utilities directly in your browser tab:</p>
  <ul>
    <li><strong>Zero File Uploads:</strong> Document bytes remain isolated in local sandbox memory.</li>
    <li><strong>Instant Speed:</strong> No waiting for multi-megabyte uploads, server queue processing, or download links.</li>
    <li><strong>Infinite Scaling:</strong> Because computation occurs on client hardware, docSpace scales effortlessly to millions of daily users with zero server bottlenecks.</li>
    <li><strong>Enterprise-Grade Row Level Security:</strong> User preferences and sessions are guarded by PostgreSQL RLS in Supabase.</li>
  </ul>
`;

