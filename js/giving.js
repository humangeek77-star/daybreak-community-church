/**
 * Daybreak Community Church - Giving & Generosity Interactive Engine
 * Provides interactive giving options: Tithes, Lapel Food Pantry, Youth, Missions, Recovery
 */

(function () {
  const GIVING_FUNDS = {
    tithes: {
      id: 'tithes',
      name: 'Tithes & General Worship',
      tagline: 'Church Ministry & Campus Operations',
      image: 'assets/images/fund_tithes.jpg',
      desc: 'Supports weekly Sunday 10:45 AM worship, pastoral care with Pastor Andy Cole, biblical teaching, discipleship, and facility upkeep at 1219 Main St.',
      paypalItem: 'Daybreak Community Church - Tithes & General Ministry'
    },
    pantry: {
      id: 'pantry',
      name: 'Lapel Food Pantry & Student Hot Meals',
      tagline: 'Local Hunger Relief & Wednesday Dinners',
      image: 'assets/images/fund_food_pantry.jpg',
      desc: 'Supplies local emergency food packages in partnership with Lapelfoodpantry.com, and funds hot Wednesday dinners served to local school students.',
      paypalItem: 'Daybreak Community Church - Lapel Food Pantry & Student Meals'
    },
    youth: {
      id: 'youth',
      name: 'Revolution Youth & Children’s Ministry',
      tagline: 'Next Generation Discipleship',
      image: 'assets/images/fund_youth.jpg',
      desc: 'Empowers kids and teen ministries led by Alex & Naomi Small, camp scholarships, Sunday school resources, and 30+ young adults in community sports.',
      paypalItem: 'Daybreak Community Church - Children & Youth Ministries'
    },
    missions: {
      id: 'missions',
      name: 'Overseas & Global Missions',
      tagline: 'Global Compassion & Gospel Outreach',
      image: 'assets/images/fund_missions.jpg',
      desc: 'Provides humanitarian assistance, medical relief, and gospel empowerment to overseas partners and international missionaries.',
      paypalItem: 'Daybreak Community Church - Overseas Missions'
    },
    recovery: {
      id: 'recovery',
      name: 'Recovery & Sober Living Support',
      tagline: 'Freedom & Healing in Christ',
      image: 'assets/images/fund_recovery.jpg',
      desc: 'Provides Christ-centered recovery resources, encouragement, and supportive community for individuals and families walking through sobriety.',
      paypalItem: 'Daybreak Community Church - Recovery & Sober Living Support'
    },
    benevolence: {
      id: 'benevolence',
      name: 'Community Benevolence & Care',
      tagline: 'Local Assistance & Crisis Support',
      image: 'assets/images/fund_benevolence.jpg',
      desc: 'Provides emergency financial aid, utility & heating assistance, grocery support, and pastoral care for local Lapel families experiencing sudden hardship.',
      paypalItem: 'Daybreak Community Church - Community Benevolence & Care'
    }
  };

  let selectedFund = 'tithes';
  let selectedAmount = '100';
  let activeTab = 'online'; // 'online', 'mail', 'dropoff'

  function buildPaypalUrl(fundId, amount) {
    const fund = GIVING_FUNDS[fundId] || GIVING_FUNDS.tithes;
    const base = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=onlinedonations@lapeldaybreak.com';
    const itemParam = '&item_name=' + encodeURIComponent(fund.paypalItem);
    const currParam = '&currency_code=USD';
    let amtParam = '';
    const numericAmt = parseFloat(amount);
    if (!isNaN(numericAmt) && numericAmt > 0) {
      amtParam = '&amount=' + numericAmt.toFixed(2);
    }
    return base + itemParam + amtParam + currParam;
  }

  function injectModalHTML() {
    if (document.getElementById('giving-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'giving-modal';
    modal.className = 'giving-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'giving-modal-title');

    modal.innerHTML = `
      <div class="giving-modal-dialog">
        <button type="button" class="giving-modal-close" id="giving-modal-close-btn" aria-label="Close dialog">&times;</button>
        
        <div class="giving-modal-header">
          <div class="giving-modal-badge">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>Generosity &amp; Stewardship</span>
          </div>
          <h2 id="giving-modal-title" class="giving-modal-title">Support Daybreak Community Church</h2>
          <p class="giving-modal-verse">
            “Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.” 
            <span>&mdash; 2 Corinthians 9:7</span>
          </p>
        </div>

        <!-- Giving Methods Navigation Tabs -->
        <div class="giving-nav-tabs">
          <button type="button" class="giving-tab-btn active" data-tab="online">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
            Give Online (PayPal / Card)
          </button>
          <button type="button" class="giving-tab-btn" data-tab="mail">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            By Mail / In Person
          </button>
          <button type="button" class="giving-tab-btn" data-tab="dropoff">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l5.59-5.59L19 10l-7 7z"/></svg>
            Food Pantry Drop-Off
          </button>
        </div>

        <!-- TAB 1: GIVE ONLINE -->
        <div class="giving-tab-content active" id="tab-content-online">
          <!-- Step 1: Fund Selection -->
          <div class="giving-step-section">
            <label class="giving-section-label">
              <span class="giving-step-num">1</span> Select Ministry Fund:
            </label>
            <div class="giving-funds-grid" id="giving-funds-grid">
              ${Object.values(GIVING_FUNDS).map(f => `
                <div class="giving-fund-card ${f.id === selectedFund ? 'selected' : ''}" data-fund-id="${f.id}">
                  <div class="giving-fund-icon">
                    <img src="${f.image}" alt="${f.name}" class="giving-fund-thumb" />
                  </div>
                  <div class="giving-fund-info">
                    <div class="giving-fund-name">${f.name}</div>
                    <div class="giving-fund-tag">${f.tagline}</div>
                  </div>
                  <div class="giving-fund-check">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="giving-fund-desc-box" id="giving-fund-desc">
              ${GIVING_FUNDS[selectedFund].desc}
            </div>
          </div>

          <!-- Step 2: Amount Selection -->
          <div class="giving-step-section">
            <label class="giving-section-label">
              <span class="giving-step-num">2</span> Select Amount (USD):
            </label>
            <div class="giving-amounts-row">
              <button type="button" class="giving-amt-chip" data-amt="25">$25</button>
              <button type="button" class="giving-amt-chip" data-amt="50">$50</button>
              <button type="button" class="giving-amt-chip active" data-amt="100">$100</button>
              <button type="button" class="giving-amt-chip" data-amt="250">$250</button>
              <button type="button" class="giving-amt-chip" data-amt="500">$500</button>
              <div class="giving-custom-amt-wrapper">
                <span class="giving-custom-curr">$</span>
                <input type="number" id="giving-custom-input" class="giving-custom-input" placeholder="Custom" min="1" step="any" />
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="giving-action-wrapper">
            <a href="${buildPaypalUrl(selectedFund, selectedAmount)}" 
               id="giving-submit-btn" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="btn-pill btn-primary giving-submit-btn">
              <span>Give $${selectedAmount} to ${GIVING_FUNDS[selectedFund].name}</span>
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </a>
            <div class="giving-security-note">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
              <span>Processed securely via PayPal. Credit &amp; Debit cards accepted. No PayPal account required.</span>
            </div>
          </div>
        </div>

        <!-- TAB 2: GIVE BY MAIL OR IN PERSON -->
        <div class="giving-tab-content" id="tab-content-mail">
          <div class="giving-mail-box">
            <div class="giving-mail-item">
              <h4>1. Give In Person on Sundays &amp; Wednesdays</h4>
              <p>You can drop your tithes and gifts in the giving boxes located inside the main sanctuary during Sunday Worship (10:45 AM) or Wednesday Classes (6:00 PM).</p>
              <div class="giving-mail-address">
                <strong>Daybreak Campus Location:</strong><br/>
                1219 Main St, Lapel, IN 46051
              </div>
            </div>

            <div class="giving-mail-item">
              <h4>2. Mail a Check</h4>
              <p>Make checks payable to <strong>Daybreak Community Church</strong>. In the check memo line, write your preferred ministry designation (e.g. <em>“Tithes”</em>, <em>“Food Pantry”</em>, <em>“Youth Meals”</em>, or <em>“Missions”</em>).</p>
              <div class="giving-mail-address">
                <strong>Mailing Address:</strong><br/>
                Daybreak Community Church<br/>
                PO Box 312<br/>
                Lapel, IN 46051
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 3: FOOD PANTRY DROP-OFF -->
        <div class="giving-tab-content" id="tab-content-dropoff">
          <div class="giving-pantry-box">
            <div class="giving-pantry-badge">Community Outreach</div>
            <h3>Lapel Community Food Pantry Partnership</h3>
            <p>
              Daybreak Community Church is an official drop-off center partnering directly with 
              <a href="https://lapelfoodpantry.com" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); font-weight: 700; text-decoration: underline;">LapelFoodPantry.com</a>.
              We also cook and serve free hot meals to local students every Wednesday night during the school term.
            </p>
            <div class="giving-pantry-needs">
              <h4>Most Needed Items:</h4>
              <ul>
                <li>Canned meats (tuna, chicken)</li>
                <li>Peanut butter &amp; jelly</li>
                <li>Macaroni &amp; cheese, pasta, and pasta sauces</li>
                <li>Canned soups, vegetables, and beans</li>
                <li>Breakfast cereal, oatmeal, and pancake mix</li>
                <li>Kid-friendly individual snack packs</li>
              </ul>
            </div>
            <div class="giving-mail-address" style="margin-top: 16px;">
              <strong>Drop-Off Location:</strong> Daybreak Church Drop-Off Bins, 1219 Main St, Lapel, IN 46051<br/>
              <em>Call (765) 534-4555 for large volume drop-offs or volunteer opportunities.</em>
            </div>
          </div>
        </div>

        <!-- 501(c)(3) Footer Notice -->
        <div class="giving-modal-footer">
          <p>
            Daybreak Community Church is a registered 501(c)(3) religious nonprofit organization. 
            All financial contributions are tax-deductible to the full extent of the law. 
            Detailed year-end giving statements are provided.
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    attachModalEvents(modal);
  }

  function updateSubmitButton() {
    const btn = document.getElementById('giving-submit-btn');
    if (!btn) return;
    const fund = GIVING_FUNDS[selectedFund] || GIVING_FUNDS.tithes;
    const url = buildPaypalUrl(selectedFund, selectedAmount);
    btn.setAttribute('href', url);

    const amtText = selectedAmount && parseFloat(selectedAmount) > 0 ? `$${selectedAmount}` : 'Gift';
    btn.querySelector('span').textContent = `Give ${amtText} to ${fund.name}`;
  }

  function attachModalEvents(modal) {
    const closeBtn = document.getElementById('giving-modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeGivingModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeGivingModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeGivingModal();
      }
    });

    // Tab buttons
    const tabBtns = modal.querySelectorAll('.giving-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tabKey = btn.getAttribute('data-tab');

        modal.querySelectorAll('.giving-tab-content').forEach(c => c.classList.remove('active'));
        const target = document.getElementById(`tab-content-${tabKey}`);
        if (target) target.classList.add('active');
      });
    });

    // Fund cards
    const fundCards = modal.querySelectorAll('.giving-fund-card');
    const descBox = document.getElementById('giving-fund-desc');
    fundCards.forEach(card => {
      card.addEventListener('click', () => {
        fundCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedFund = card.getAttribute('data-fund-id');
        if (descBox && GIVING_FUNDS[selectedFund]) {
          descBox.textContent = GIVING_FUNDS[selectedFund].desc;
        }
        updateSubmitButton();
      });
    });

    // Amount chips
    const amtChips = modal.querySelectorAll('.giving-amt-chip');
    const customInput = document.getElementById('giving-custom-input');

    amtChips.forEach(chip => {
      chip.addEventListener('click', () => {
        amtChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        if (customInput) customInput.value = '';
        selectedAmount = chip.getAttribute('data-amt');
        updateSubmitButton();
      });
    });

    if (customInput) {
      customInput.addEventListener('input', (e) => {
        amtChips.forEach(c => c.classList.remove('active'));
        selectedAmount = e.target.value.trim();
        updateSubmitButton();
      });
    }
  }

  function openGivingModal(preferredFund) {
    injectModalHTML();
    const modal = document.getElementById('giving-modal');
    if (!modal) return;

    if (preferredFund && GIVING_FUNDS[preferredFund]) {
      selectedFund = preferredFund;
      const cards = modal.querySelectorAll('.giving-fund-card');
      cards.forEach(c => {
        if (c.getAttribute('data-fund-id') === preferredFund) {
          c.classList.add('selected');
        } else {
          c.classList.remove('selected');
        }
      });
      const descBox = document.getElementById('giving-fund-desc');
      if (descBox) descBox.textContent = GIVING_FUNDS[preferredFund].desc;
    }

    // Default to online tab
    const onlineTabBtn = modal.querySelector('.giving-tab-btn[data-tab="online"]');
    if (onlineTabBtn) onlineTabBtn.click();

    updateSubmitButton();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeGivingModal() {
    const modal = document.getElementById('giving-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Global listeners for buttons with .open-giving-modal or [data-open-giving]
  document.addEventListener('DOMContentLoaded', () => {
    injectModalHTML();

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.open-giving-modal, [data-open-giving], a[href*="_donations"]');
      if (trigger) {
        e.preventDefault();
        const fund = trigger.getAttribute('data-fund') || 'tithes';
        openGivingModal(fund);
      }
    });
  });

  // Expose API globally
  window.DaybreakGiving = {
    open: openGivingModal,
    close: closeGivingModal,
    funds: GIVING_FUNDS
  };
})();
