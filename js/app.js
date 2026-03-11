// ============================================================
// Planville News Dashboard — Main Application (v2)
// ============================================================

(function () {
  'use strict';

  // === TOOLTIP DEFINITIONS ===
  const TIPS = {
    newsFeed: 'Automatisch gesammelte Nachrichten, Reddit-Posts und Social-Media-Trends aus der Energiebranche.',
    contentBoard: 'Verwalte Content-Ideen vom ersten Entwurf bis zur Veröffentlichung per Drag & Drop.',
    ideenGenerator: 'KI-gestützte Content-Vorschläge basierend auf aktuellen Trends — Hooks, Talking Points und Hashtags inklusive.',
    statsArticles: 'Anzahl der Artikel, die den aktuellen Filtern entsprechen.',
    statsSentiment: 'Anteil positiver Artikel an der Gesamtzahl — zeigt die Branchenstimmung.',
    statsIdeas: 'Summe aller vorgeschlagenen Content-Ideen aus den angezeigten Artikeln.',
    statsPublished: 'Anzahl der Inhalte, die im Content-Board als „Veröffentlicht" markiert sind.',
    relevance: 'KI-Bewertung der Relevanz für Planville (0–100%). Je höher, desto wichtiger für euer Marketing.',
    sentiment: 'Stimmungsanalyse: Positiv, Neutral oder Negativ — zeigt den Grundton des Artikels.',
    aiInsight: 'KI-generierte Einschätzung, warum dieser Artikel für euer Marketing relevant ist und was ihr damit machen könnt.',
    contentIdeas: 'Konkrete Vorschläge für Posts, Reels, Blogs etc. mit fertigen Hooks und Hashtags.',
    addToBoard: 'Fügt diese Idee als neue Karte in das Content-Board ein.',
    sourceLink: 'Öffnet die Originalquelle in einem neuen Tab.',
    dateNav: 'Navigiere zwischen Tagen, um ältere Artikel zu sehen — ideal für den Montag-Morgen-Rückblick.',
    searchBox: 'Durchsucht Titel, Zusammenfassungen und Quellen nach Stichwörtern.',
    refreshIndicator: 'Im Live-Betrieb werden alle 30 Minuten automatisch neue Artikel abgerufen.',
    topicFilter: 'Filtere Artikel nach Planville-Geschäftsbereichen.',
    sourceFilter: 'Filtere nach Nachrichtentyp: Presse, Reddit-Diskussionen oder Social-Media-Posts.',
    themeToggle: 'Zwischen hellem und dunklem Design wechseln.',
    kanbanDrag: 'Ziehe Karten per Drag & Drop zwischen den Spalten.',
    generatorTopic: 'Gib ein Thema ein, zu dem du Content-Ideen haben möchtest.',
    generatorFormat: 'Wähle das gewünschte Format: Reel, Karussell, Story, LinkedIn oder Blog.',
    generatorTone: 'Bestimme den Tonfall: informativ, emotional, provokant oder humorvoll.',
  };

  function tip(key, className = '') {
    const text = TIPS[key] || key;
    return `<span class="info-tip ${className}" aria-label="${text}"><i data-lucide="info" width="14" height="14"></i><span class="tip-text">${text}</span></span>`;
  }

  // === STATE ===
  const state = {
    currentView: 'feed',
    theme: localStorage.getItem('pv-theme') || 'dark',
    selectedDate: new Date(),
    activeTopic: null,
    activeSource: null,
    searchQuery: '',
    articles: [],
    kanbanItems: [],
    sidebarOpen: false,
    expandedCards: new Set(),
    lastRefresh: new Date(),
    generatorLoading: false,
    generatedIdeas: [],
  };

  // === INIT ===
  function init() {
    document.documentElement.setAttribute('data-theme', state.theme);
    state.articles = generateDemoArticles();
    // Clear old demo kanban data (one-time migration)
    const savedKanban = JSON.parse(localStorage.getItem('pv-kanban') || '[]');
    const hasDemoIds = savedKanban.some(i => /^k\d+$/.test(i.id));
    state.kanbanItems = hasDemoIds ? [] : savedKanban;
    if (hasDemoIds) localStorage.removeItem('pv-kanban');
    render();
    setupAutoRefresh();
    if (typeof lucide !== 'undefined') { try { lucide.createIcons(); } catch(e) {} }
  }

  // === HELPERS ===
  function $(sel, ctx = document) { return ctx.querySelector(sel); }
  function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now - d;
    const diffH = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMin = Math.floor(diffMs / (1000 * 60));
    if (diffMin < 60) return `vor ${diffMin} Min.`;
    if (diffH < 24) return `vor ${diffH} Std.`;
    if (diffH < 48) return 'Gestern';
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function formatDateLabel(date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.floor((today - target) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Heute';
    if (diffDays === 1) return 'Gestern';
    if (diffDays < 7) return `Vor ${diffDays} Tagen`;
    return date.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  }

  function getTopicLabel(id) { const t = TOPICS.find(t => t.id === id); return t ? t.label : id; }
  function getTopicIcon(id) { const t = TOPICS.find(t => t.id === id); return t ? t.icon : 'tag'; }

  function getFilteredArticles() {
    let articles = [...state.articles];
    const selectedDay = new Date(state.selectedDate);
    selectedDay.setHours(0, 0, 0, 0);
    const nextDay = new Date(selectedDay);
    nextDay.setDate(nextDay.getDate() + 1);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const isToday = selectedDay.getTime() === today.getTime();
    if (!isToday) {
      articles = articles.filter(a => { const ad = new Date(a.date); return ad >= selectedDay && ad < nextDay; });
    }
    if (state.activeTopic) articles = articles.filter(a => a.topic === state.activeTopic);
    if (state.activeSource) articles = articles.filter(a => a.source === state.activeSource);
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      articles = articles.filter(a => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.outlet.toLowerCase().includes(q));
    }
    return articles;
  }

  function saveKanban() { localStorage.setItem('pv-kanban', JSON.stringify(state.kanbanItems)); }

  function scrollToTop() {
    const main = $('.main-content');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
    const area = $('.content-area');
    if (area) area.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // === RENDER ===
  function render() {
    const app = $('#app');
    app.innerHTML = renderApp();
    bindEvents();
    if (typeof lucide !== 'undefined') { try { lucide.createIcons(); } catch(e) {} }
  }

  function renderApp() {
    return `
      <div class="demo-banner">
        <i data-lucide="newspaper" width="16" height="16"></i>
        <span>Kuratierte Branchennews — Manuell gepflegt von Planville</span>
      </div>
      <div class="app-layout">
        <div class="sidebar-overlay ${state.sidebarOpen ? 'active' : ''}" id="sidebarOverlay"></div>
        ${renderSidebar()}
        <div class="main-content">
          ${renderMainHeader()}
          ${state.currentView === 'feed' ? renderStatsBar() : ''}
          ${renderViewTabs()}
          <div class="content-area">
            ${state.currentView === 'feed' ? renderNewsFeed() : ''}
            ${state.currentView === 'kanban' ? renderKanban() : ''}
            ${state.currentView === 'generator' ? renderGenerator() : ''}
          </div>
        </div>
      </div>
      ${renderModal()}
    `;
  }

  // --- SIDEBAR ---
  function renderSidebar() {
    // Count articles per topic
    const topicCounts = {};
    state.articles.forEach(a => { topicCounts[a.topic] = (topicCounts[a.topic] || 0) + 1; });

    // Count articles per source
    const sourceCounts = {};
    state.articles.forEach(a => { sourceCounts[a.source] = (sourceCounts[a.source] || 0) + 1; });

    return `
      <aside class="sidebar ${state.sidebarOpen ? 'open' : ''}">
        <div class="sidebar-header">
          <div class="header-logo sidebar-logo-large" id="sidebarLogo" title="Zurück nach oben">
            <img src="logo-dark.png" alt="Planville" class="logo-dark">
            <img src="logo-light.png" alt="Planville" class="logo-light">
          </div>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-section-label">Dashboard</div>
          <div class="nav-item ${state.currentView === 'feed' ? 'active' : ''}" data-view="feed">
            <i data-lucide="newspaper" class="nav-icon" width="20" height="20"></i>
            News-Feed
            ${tip('newsFeed')}
            <span class="nav-badge">${state.articles.length}</span>
          </div>
          <div class="nav-item ${state.currentView === 'kanban' ? 'active' : ''}" data-view="kanban">
            <i data-lucide="pin" class="nav-icon" width="20" height="20"></i>
            Content-Board
            ${tip('contentBoard')}
            <span class="nav-badge">${state.kanbanItems.length}</span>
          </div>
          <div class="nav-item ${state.currentView === 'generator' ? 'active' : ''}" data-view="generator">
            <i data-lucide="sparkles" class="nav-icon" width="20" height="20"></i>
            Ideen-Generator
            ${tip('ideenGenerator')}
          </div>

          <div class="nav-section-label" style="margin-top: var(--space-4);">Themen ${tip('topicFilter')}</div>
          <div class="topic-filters-vertical">
            <div class="topic-filter-item ${!state.activeTopic ? 'active' : ''}" data-topic="">
              <i data-lucide="layers" class="filter-icon" width="18" height="18"></i>
              Alle Themen
              <span class="filter-count">${state.articles.length}</span>
            </div>
            ${TOPICS.map(t => `
              <div class="topic-filter-item ${state.activeTopic === t.id ? 'active' : ''}" data-topic="${t.id}">
                <i data-lucide="${t.icon}" class="filter-icon" width="18" height="18"></i>
                ${t.label}
                <span class="filter-count">${topicCounts[t.id] || 0}</span>
              </div>
            `).join('')}
          </div>

          <div class="nav-section-label" style="margin-top: var(--space-2);">Quellen ${tip('sourceFilter')}</div>
          <div class="topic-filters-vertical">
            <div class="topic-filter-item ${!state.activeSource ? 'active' : ''}" data-source="">
              <i data-lucide="layers" class="filter-icon" width="18" height="18"></i>
              Alle Quellen
              <span class="filter-count">${state.articles.length}</span>
            </div>
            <div class="topic-filter-item ${state.activeSource === 'news' ? 'active' : ''}" data-source="news">
              <i data-lucide="globe" class="filter-icon" width="18" height="18"></i>
              Nachrichten
              <span class="filter-count">${sourceCounts['news'] || 0}</span>
            </div>
            <div class="topic-filter-item ${state.activeSource === 'reddit' ? 'active' : ''}" data-source="reddit">
              <i data-lucide="message-circle" class="filter-icon" width="18" height="18"></i>
              Reddit
              <span class="filter-count">${sourceCounts['reddit'] || 0}</span>
            </div>
            <div class="topic-filter-item ${state.activeSource === 'social' ? 'active' : ''}" data-source="social">
              <i data-lucide="share-2" class="filter-icon" width="18" height="18"></i>
              Social Media
              <span class="filter-count">${sourceCounts['social'] || 0}</span>
            </div>
          </div>
        </nav>
      </aside>
    `;
  }

  // --- MAIN HEADER ---
  function renderMainHeader() {
    return `
      <header class="main-header">
        <div class="main-header-left">
          <button class="mobile-menu-btn" id="mobileMenuBtn">
            <i data-lucide="menu" width="24" height="24"></i>
          </button>
          <div class="header-title-text">
            <span class="header-title-main">Planville's Automatic Curated News & Trends</span>
          </div>
        </div>
        <div class="header-actions">
          <div class="date-nav">
            <button class="date-nav-btn" id="datePrev" title="Vorheriger Tag"><i data-lucide="chevron-left" width="16" height="16"></i></button>
            <span class="date-nav-label" id="dateLabel">${formatDateLabel(state.selectedDate)}</span>
            <button class="date-nav-btn" id="dateNext" title="Nächster Tag"><i data-lucide="chevron-right" width="16" height="16"></i></button>
            <button class="date-nav-btn" id="dateToday" title="Heute"><i data-lucide="calendar" width="16" height="16"></i></button>
            ${tip('dateNav')}
          </div>
          <div class="search-box">
            <i data-lucide="search" class="search-icon" width="16" height="16"></i>
            <input type="text" placeholder="Suchen..." id="searchInput" value="${state.searchQuery}">
            ${tip('searchBox')}
          </div>
          <div class="refresh-indicator">
            <span class="refresh-dot"></span>
            <span>Live</span>
            ${tip('refreshIndicator')}
          </div>
          <button class="theme-toggle-btn" id="themeToggleBtn" title="${state.theme === 'dark' ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln'}">
            <i data-lucide="${state.theme === 'dark' ? 'sun' : 'moon'}" width="18" height="18"></i>
          </button>
        </div>
      </header>
    `;
  }

  // --- VIEW TABS ---
  function renderViewTabs() {
    return `
      <div style="padding: var(--space-4) var(--space-6) 0; background: var(--bg-primary); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
        <div class="view-tabs">
          <button class="view-tab ${state.currentView === 'feed' ? 'active' : ''}" data-view="feed">
            <i data-lucide="newspaper" width="14" height="14" style="vertical-align: -2px; margin-right: 4px;"></i> News-Feed
          </button>
          <button class="view-tab ${state.currentView === 'kanban' ? 'active' : ''}" data-view="kanban">
            <i data-lucide="pin" width="14" height="14" style="vertical-align: -2px; margin-right: 4px;"></i> Content-Board
          </button>
          <button class="view-tab ${state.currentView === 'generator' ? 'active' : ''}" data-view="generator">
            <i data-lucide="sparkles" width="14" height="14" style="vertical-align: -2px; margin-right: 4px;"></i> Ideen-Generator
          </button>
        </div>
        <div class="refresh-indicator" style="font-size: 12px;">
          Zuletzt aktualisiert: ${state.lastRefresh.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr
          &nbsp;&middot;&nbsp; Nächstes Update in 30 Min.
        </div>
      </div>
    `;
  }

  // --- STATS BAR ---
  function renderStatsBar() {
    const articles = getFilteredArticles();
    const positiveCount = articles.filter(a => a.sentiment === 'positiv').length;
    const sentimentPct = articles.length ? Math.round((positiveCount / articles.length) * 100) : 0;
    const totalIdeas = articles.reduce((sum, a) => sum + (a.contentIdeas?.length || 0), 0);

    return `
      <div class="stats-bar">
        <div class="stat-card">
          <div class="stat-icon green"><i data-lucide="newspaper" width="20" height="20"></i></div>
          <div>
            <div class="stat-value">${articles.length}</div>
            <div class="stat-label">Artikel gefunden ${tip('statsArticles')}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon blue"><i data-lucide="trending-up" width="20" height="20"></i></div>
          <div>
            <div class="stat-value">${sentimentPct}%</div>
            <div class="stat-label">Positives Sentiment ${tip('statsSentiment')}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon amber"><i data-lucide="lightbulb" width="20" height="20"></i></div>
          <div>
            <div class="stat-value">${totalIdeas}</div>
            <div class="stat-label">Content-Ideen ${tip('statsIdeas')}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon pink"><i data-lucide="check-circle" width="20" height="20"></i></div>
          <div>
            <div class="stat-value">${state.kanbanItems.filter(i => i.status === 'published').length}</div>
            <div class="stat-label">Veröffentlicht ${tip('statsPublished')}</div>
          </div>
        </div>
      </div>
    `;
  }

  // --- NEWS FEED ---
  function renderNewsFeed() {
    const articles = getFilteredArticles();
    if (articles.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-state-icon"><i data-lucide="search" width="28" height="28"></i></div>
          <div class="empty-state-title">Keine Artikel gefunden</div>
          <div class="empty-state-text">Versuche einen anderen Filter, ein anderes Datum oder passe deine Suchbegriffe an.</div>
        </div>
      `;
    }
    return `<div class="news-feed">${articles.map(a => renderNewsCard(a)).join('')}</div>`;
  }

  function renderNewsCard(article) {
    const isExpanded = state.expandedCards.has(article.id);
    const relevanceClass = article.relevance >= 85 ? 'high' : article.relevance >= 70 ? 'medium' : 'low';

    return `
      <article class="news-card" data-id="${article.id}">
        <div class="news-card-header">
          <div class="news-card-meta">
            <span class="source-badge ${article.source}">
              <i data-lucide="${article.source === 'news' ? 'globe' : article.source === 'reddit' ? 'message-circle' : 'share-2'}" width="12" height="12"></i>
              ${SOURCE_LABELS[article.source]}
            </span>
            <span class="topic-badge">
              <i data-lucide="${getTopicIcon(article.topic)}" width="12" height="12"></i>
              ${getTopicLabel(article.topic)}
            </span>
            <span class="time-badge">${formatDate(article.date)}</span>
          </div>
          <span class="relevance-badge ${relevanceClass}">
            <i data-lucide="target" width="12" height="12"></i>
            ${article.relevance}% Relevanz
            ${tip('relevance')}
          </span>
        </div>

        <h3 class="news-card-title">${article.title}</h3>
        <div class="news-card-outlet">${article.outlet} &middot; ${article.readTime} Min. Lesezeit</div>
        <p class="news-card-summary">${article.summary}</p>

        <div class="sentiment-bar">
          <span class="sentiment-indicator ${article.sentiment}">
            <span class="sentiment-dot ${article.sentiment}"></span>
            Sentiment: ${article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
          </span>
          ${tip('sentiment')}
        </div>

        <div class="ai-insight">
          <div class="ai-insight-header">
            <i data-lucide="sparkles" width="14" height="14"></i>
            KI-Einschätzung für Planville Marketing
            ${tip('aiInsight')}
          </div>
          <div class="ai-insight-text">${article.aiInsight}</div>
        </div>

        <button class="expand-toggle" data-toggle="${article.id}">
          <i data-lucide="${isExpanded ? 'chevron-up' : 'chevron-down'}" width="16" height="16"></i>
          ${isExpanded ? 'Content-Ideen ausblenden' : `${article.contentIdeas.length} Content-Ideen anzeigen`}
          ${tip('contentIdeas')}
        </button>

        <div class="collapsible ${isExpanded ? '' : 'collapsed'}" id="ideas-${article.id}">
          <div class="content-ideas-list" style="margin-top: var(--space-3);">
            ${article.contentIdeas.map((idea, idx) => `
              <div class="content-idea-item">
                <span class="idea-type-badge">${idea.type}</span>
                <div style="flex: 1; min-width: 0;">
                  <div class="idea-hook">${idea.hook}</div>
                  <div class="idea-hashtags">${idea.hashtags}</div>
                </div>
                <div class="idea-actions">
                  <button class="idea-action-btn" title="Zum Board hinzufügen" data-add-kanban="${article.id}-${idx}">
                    <i data-lucide="plus" width="14" height="14"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="news-card-footer">
          <div class="card-actions">
            <button class="card-action-btn" data-add-all-kanban="${article.id}">
              <i data-lucide="pin" width="14" height="14"></i>
              Zum Board
              ${tip('addToBoard')}
            </button>
            <a class="source-link-btn" href="${article.sourceUrl || '#'}" target="_blank" rel="noopener noreferrer">
              <i data-lucide="external-link" width="14" height="14"></i>
              Quelle öffnen
            </a>
          </div>
          <div class="engagement-info">
            <span><i data-lucide="bar-chart-3" width="12" height="12" style="vertical-align: -2px;"></i> ${article.engagement} Interaktionen</span>
          </div>
        </div>
      </article>
    `;
  }

  // --- KANBAN BOARD ---
  function renderKanban() {
    return `
      <div style="margin-bottom: var(--space-4); display: flex; align-items: center; gap: var(--space-2);">
        <span style="font-size: 13px; color: var(--text-muted);">
          <i data-lucide="grip-horizontal" width="14" height="14" style="vertical-align: -2px;"></i>
          Ziehe Karten zwischen Spalten per Drag & Drop
        </span>
        ${tip('kanbanDrag')}
      </div>
      <div class="kanban-board">
        ${KANBAN_COLUMNS.map(col => {
          const items = state.kanbanItems.filter(i => i.status === col.id);
          return `
            <div class="kanban-column" data-column="${col.id}">
              <div class="kanban-column-header">
                <div class="kanban-column-title" style="color: ${col.color};">
                  <i data-lucide="${col.icon}" width="16" height="16"></i>
                  ${col.label}
                </div>
                <span class="kanban-column-count">${items.length}</span>
              </div>
              <div class="kanban-items" data-status="${col.id}">
                ${items.map(item => renderKanbanItem(item)).join('')}
              </div>
              <button class="kanban-add-btn" data-add-col="${col.id}">
                <i data-lucide="plus" width="16" height="16"></i>
                Hinzufügen
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderKanbanItem(item) {
    return `
      <div class="kanban-item" draggable="true" data-kanban-id="${item.id}">
        <div class="kanban-item-title">${item.title}</div>
        <div class="kanban-item-meta">
          <span class="kanban-type-badge">${item.type}</span>
          <span class="priority-dot ${item.priority}" title="Priorität: ${item.priority === 'high' ? 'Hoch' : item.priority === 'medium' ? 'Mittel' : 'Niedrig'}"></span>
          <span class="kanban-item-date">${item.createdAt ? formatDate(item.createdAt) : ''}</span>
        </div>
      </div>
    `;
  }

  // --- CONTENT GENERATOR ---
  function renderGenerator() {
    return `
      <div class="generator-panel">
        <div class="generator-header">
          <div class="generator-icon">
            <i data-lucide="sparkles" width="22" height="22"></i>
          </div>
          <div>
            <div class="generator-title">KI Content-Ideen Generator ${tip('ideenGenerator')}</div>
            <div class="generator-subtitle">Basierend auf aktuellen Trends, generiert mit Claude AI</div>
          </div>
        </div>

        <div class="generator-input-row">
          <input class="generator-input" type="text" id="generatorTopic" placeholder="Thema eingeben, z.B. 'Wärmepumpe im Altbau'" value="">
          <select class="generator-select" id="generatorFormat">
            <option value="">Format wählen...</option>
            <option value="reel">Reel / TikTok</option>
            <option value="karussell">Karussell-Post</option>
            <option value="story">Story-Serie</option>
            <option value="linkedin">LinkedIn-Post</option>
            <option value="blog">Blogartikel</option>
            <option value="all">Alle Formate</option>
          </select>
          <select class="generator-select" id="generatorTone">
            <option value="informativ">Informativ</option>
            <option value="emotional">Emotional</option>
            <option value="provokant">Provokant</option>
            <option value="humorvoll">Humorvoll</option>
          </select>
          <button class="generate-btn ${state.generatorLoading ? 'loading' : ''}" id="generateBtn">
            <i data-lucide="${state.generatorLoading ? 'loader-2' : 'wand-2'}" width="18" height="18" ${state.generatorLoading ? 'class="spin"' : ''}></i>
            ${state.generatorLoading ? 'Generiere...' : 'Generieren'}
          </button>
        </div>

        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: var(--space-4); display: flex; align-items: flex-start; gap: 6px;">
          <i data-lucide="lightbulb" width="14" height="14" style="flex-shrink: 0; margin-top: 2px; color: var(--color-primary);"></i>
          <span><strong>Tipp:</strong> Wähle ein Thema aus dem News-Feed oder gib ein eigenes ein. Die KI generiert maßgeschneiderte Content-Ideen mit Hooks, Talking Points und Hashtags — alles auf Deutsch.</span>
        </div>

        ${state.generatedIdeas.length > 0 ? `
          <div class="generated-ideas">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
              <h3 style="font-size: 16px; font-weight: 600;">Generierte Ideen</h3>
              <span style="font-size: 12px; color: var(--text-muted);">${state.generatedIdeas.length} Ideen</span>
            </div>
            ${state.generatedIdeas.map((idea, i) => renderGeneratedIdea(idea, i)).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderGeneratedIdea(idea, index) {
    return `
      <div class="generated-idea-card">
        <div class="generated-idea-header">
          <span class="generated-idea-type">${idea.format}</span>
          <div class="card-actions">
            <button class="card-action-btn" data-gen-to-kanban="${index}">
              <i data-lucide="pin" width="14" height="14"></i>
              Zum Board
            </button>
          </div>
        </div>
        <div class="generated-idea-hook">${idea.hook}</div>
        <div class="generated-idea-body">${idea.body}</div>
        <div class="generated-idea-section-title">Talking Points</div>
        <ul class="generated-talking-points">
          ${idea.talkingPoints.map(tp => `<li>${tp}</li>`).join('')}
        </ul>
        <div class="generated-idea-section-title">Hashtags</div>
        <div class="generated-hashtags">${idea.hashtags}</div>
      </div>
    `;
  }

  // --- MODAL ---
  function renderModal() {
    return `<div class="modal-overlay" id="modalOverlay"><div class="modal" id="modalContent"></div></div>`;
  }

  function showAddKanbanModal(prefillTitle = '', prefillType = '', prefillTopic = '') {
    const overlay = $('#modalOverlay');
    const content = $('#modalContent');
    content.innerHTML = `
      <div class="modal-header">
        <div class="modal-title">Content-Idee hinzufügen</div>
        <button class="modal-close" id="modalClose"><i data-lucide="x" width="18" height="18"></i></button>
      </div>
      <div class="modal-form-group">
        <label>Titel</label>
        <input type="text" id="kanbanTitle" value="${prefillTitle}" placeholder="z.B. Reel: Stromrechnung vorher/nachher">
      </div>
      <div class="modal-form-group">
        <label>Format</label>
        <select id="kanbanType">
          <option value="Reel" ${prefillType === 'Reel' || prefillType === 'Reel/TikTok' ? 'selected' : ''}>Reel / TikTok</option>
          <option value="Karussell" ${prefillType === 'Karussell' ? 'selected' : ''}>Karussell</option>
          <option value="Story-Serie" ${prefillType === 'Story-Serie' ? 'selected' : ''}>Story-Serie</option>
          <option value="LinkedIn-Post" ${prefillType === 'LinkedIn-Post' ? 'selected' : ''}>LinkedIn-Post</option>
          <option value="Blogartikel" ${prefillType === 'Blogartikel' ? 'selected' : ''}>Blogartikel</option>
        </select>
      </div>
      <div class="modal-form-group">
        <label>Thema</label>
        <select id="kanbanTopicSelect">
          ${TOPICS.map(t => `<option value="${t.id}" ${prefillTopic === t.id ? 'selected' : ''}>${t.label}</option>`).join('')}
        </select>
      </div>
      <div class="modal-form-group">
        <label>Priorität</label>
        <select id="kanbanPriority">
          <option value="high">Hoch</option>
          <option value="medium" selected>Mittel</option>
          <option value="low">Niedrig</option>
        </select>
      </div>
      <div class="modal-actions">
        <button class="card-action-btn" id="modalCancel">Abbrechen</button>
        <button class="card-action-btn primary" id="modalSave"><i data-lucide="plus" width="14" height="14"></i> Hinzufügen</button>
      </div>
    `;
    overlay.classList.add('active');
    if (typeof lucide !== 'undefined') { try { lucide.createIcons(); } catch(e) {} }
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalCancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    $('#modalSave').addEventListener('click', () => {
      const title = $('#kanbanTitle').value.trim();
      if (!title) return;
      state.kanbanItems.push({
        id: 'k' + Date.now(),
        title, type: $('#kanbanType').value, topic: $('#kanbanTopicSelect').value,
        status: 'new', priority: $('#kanbanPriority').value, createdAt: new Date().toISOString(),
      });
      saveKanban(); closeModal(); render();
    });
  }

  function closeModal() { $('#modalOverlay').classList.remove('active'); }

  // === DEMO CONTENT GENERATOR ===
  const GENERATED_TEMPLATES = [
    {
      format: 'Reel',
      hook: '"${topic} — was die meisten nicht wissen" (Attention Grabber)',
      body: 'Erstelle ein kurzes Reel (15-30 Sek.), das mit einem überraschenden Fakt zum Thema startet. Zeige Planville-Projekte als Beweis. Schließe mit einem klaren Call-to-Action zur Beratung.',
      talkingPoints: ['Überraschende Statistik als Einstieg verwenden', 'Planville-Projektbilder zeigen (vorher/nachher)', 'Lokalen Bezug zu Aachen/NRW herstellen', 'CTA: "Link in Bio für kostenlose Beratung"'],
      hashtags: '#Planville #${topicHash} #Energiewende #NRW #Aachen',
    },
    {
      format: 'Karussell-Post',
      hook: '"5 Dinge, die du über ${topic} wissen musst" (Swipe-Through Education)',
      body: 'Ein informativer Karussell-Post mit 5-7 Slides. Jede Slide behandelt einen Aspekt. Starke erste Slide als Hook, letzte Slide mit CTA. Design im Planville-Branding (Grün/Weiß).',
      talkingPoints: ['Slide 1: Hook-Statement mit Zahl oder Frage', 'Slides 2-6: Je ein Fakt/Tipp mit kurzer Erklärung', 'Letzte Slide: CTA + Planville-Kontaktinfo', 'Caption mit ausführlicher Erklärung und Hashtags'],
      hashtags: '#${topicHash} #Planville #Energietipps #Eigenheim #Wissen',
    },
    {
      format: 'LinkedIn-Post',
      hook: '"Warum ${topic} die Zukunft gehört — eine ehrliche Einschätzung aus der Praxis" (Thought Leadership)',
      body: 'Ein längerer LinkedIn-Text (800-1200 Zeichen) im Storytelling-Stil. Startet mit einer persönlichen Erfahrung oder Beobachtung, bringt Daten, und schließt mit einer Vision. Professionell aber authentisch.',
      talkingPoints: ['Mit persönlicher Anekdote oder Kundenstory starten', 'Aktuelle Marktzahlen und Trends einbauen', 'Position von Planville als Branchenexperte stärken', 'Zum Dialog auffordern: "Was ist eure Erfahrung?"'],
      hashtags: '#${topicHash} #Energiewende #Handwerk #GreenEnergy #Nachhaltigkeit',
    },
    {
      format: 'Story-Serie',
      hook: '"Behind the Scenes: So installiert Planville ${topic}" (Authentischer Einblick)',
      body: 'Eine 5-7 teilige Story-Serie, die einen Planville-Arbeitstag zeigt. Nahbar und authentisch. Mitarbeiter zu Wort kommen lassen. Zeigt Expertise und Teamgeist gleichzeitig.',
      talkingPoints: ['Morgens: Team-Vorbereitung, Material-Check', 'Auf der Baustelle: Installation dokumentieren', 'Mitarbeiter-Interview: "Warum mache ich diesen Job?"', 'Ergebnis zeigen: Fertiges Projekt, zufriedener Kunde', 'Poll/Frage als letzte Story für Engagement'],
      hashtags: '#TeamPlanville #BehindTheScenes #${topicHash} #Handwerk #Energiewende',
    },
    {
      format: 'Blogartikel',
      hook: '"Alles, was du über ${topic} in 2026 wissen musst — der ultimative Guide" (SEO-Content)',
      body: 'Ein umfassender Blogartikel (1500-2500 Wörter) mit SEO-Optimierung. Strukturiert mit Zwischenüberschriften, FAQ-Abschnitt, und internen Links. Ziel: Google-Ranking für relevante Suchbegriffe.',
      talkingPoints: ['H1: Hauptkeyword + Jahreszahl für Aktualität', 'Abschnitte: Was, Warum, Wie, Kosten, Förderung, FAQ', 'Interne Verlinkung zu Planville-Leistungsseiten', 'FAQ-Schema-Markup für Google Rich Results', 'CTA-Buttons in jedem Abschnitt einbauen'],
      hashtags: '#${topicHash} #Ratgeber #Planville #Energieberatung #Eigenheim',
    },
  ];

  function simulateGeneration(topic, format, tone) {
    const topicHash = topic.replace(/\s+/g, '').replace(/[^a-zA-ZäöüÄÖÜß]/g, '');
    let templates = [...GENERATED_TEMPLATES];
    if (format && format !== 'all') {
      const formatMap = { reel: 'Reel', karussell: 'Karussell-Post', story: 'Story-Serie', linkedin: 'LinkedIn-Post', blog: 'Blogartikel' };
      templates = templates.filter(t => t.format === formatMap[format]);
      if (templates.length === 0) templates = [GENERATED_TEMPLATES[0]];
    }
    const count = format === 'all' ? 4 : Math.min(templates.length, 2);
    const shuffled = templates.sort(() => Math.random() - 0.5).slice(0, count);
    return shuffled.map(t => ({
      format: t.format,
      hook: t.hook.replace(/\$\{topic\}/g, topic).replace(/\$\{topicHash\}/g, topicHash),
      body: t.body.replace(/\$\{topic\}/g, topic).replace(/\$\{topicHash\}/g, topicHash),
      talkingPoints: t.talkingPoints,
      hashtags: t.hashtags.replace(/\$\{topicHash\}/g, topicHash),
    }));
  }

  // === AUTO REFRESH ===
  function setupAutoRefresh() {
    setInterval(() => { state.lastRefresh = new Date(); }, 30000);
  }

  // === EVENT BINDING ===
  function bindEvents() {
    // View navigation
    $$('[data-view]').forEach(el => {
      el.addEventListener('click', () => { state.currentView = el.dataset.view; state.sidebarOpen = false; render(); });
    });

    // Topic filters (vertical) — always switch to feed view
    $$('[data-topic]').forEach(el => {
      el.addEventListener('click', () => { state.activeTopic = el.dataset.topic || null; state.currentView = 'feed'; render(); });
    });

    // Source filters (vertical) — always switch to feed view
    $$('[data-source]').forEach(el => {
      el.addEventListener('click', () => { state.activeSource = el.dataset.source || null; state.currentView = 'feed'; render(); });
    });

    // Theme toggle button in header
    const themeBtn = $('#themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('pv-theme', state.theme);
        document.documentElement.setAttribute('data-theme', state.theme);
        render();
      });
    }

    // Logo click → scroll to top & reset all filters
    $$('.header-logo').forEach(logo => {
      logo.addEventListener('click', () => {
        state.activeTopic = null;
        state.activeSource = null;
        state.searchQuery = '';
        state.currentView = 'feed';
        state.selectedDate = new Date();
        render();
        setTimeout(() => scrollToTop(), 50);
      });
    });

    // Date navigation
    const datePrev = $('#datePrev');
    const dateNext = $('#dateNext');
    const dateToday = $('#dateToday');
    if (datePrev) datePrev.addEventListener('click', () => { state.selectedDate = new Date(state.selectedDate.getTime() - 86400000); render(); });
    if (dateNext) {
      dateNext.addEventListener('click', () => {
        const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
        const next = new Date(state.selectedDate.getTime() + 86400000);
        if (next <= tomorrow) { state.selectedDate = next; render(); }
      });
    }
    if (dateToday) dateToday.addEventListener('click', () => { state.selectedDate = new Date(); render(); });

    // Search
    const searchInput = $('#searchInput');
    if (searchInput) {
      let debounce;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          state.searchQuery = e.target.value;
          render();
          const newInput = $('#searchInput');
          if (newInput) { newInput.focus(); newInput.setSelectionRange(newInput.value.length, newInput.value.length); }
        }, 300);
      });
    }

    // Mobile menu
    const mobileBtn = $('#mobileMenuBtn');
    if (mobileBtn) mobileBtn.addEventListener('click', () => { state.sidebarOpen = !state.sidebarOpen; render(); });
    const sidebarOverlay = $('#sidebarOverlay');
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => { state.sidebarOpen = false; render(); });

    // Expand/collapse content ideas
    $$('[data-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.toggle;
        if (state.expandedCards.has(id)) state.expandedCards.delete(id);
        else state.expandedCards.add(id);
        render();
      });
    });

    // Add single idea to kanban
    $$('[data-add-kanban]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const raw = btn.dataset.addKanban;
        const lastDash = raw.lastIndexOf('-');
        const articleId = raw.substring(0, lastDash);
        const ideaIdx = raw.substring(lastDash + 1);
        const article = state.articles.find(a => a.id === articleId);
        if (article && article.contentIdeas[ideaIdx]) {
          const idea = article.contentIdeas[ideaIdx];
          showAddKanbanModal(`${idea.type}: ${idea.hook.replace(/"/g, '').substring(0, 60)}...`, idea.type, article.topic);
        }
      });
    });

    // Add all ideas from article to kanban
    $$('[data-add-all-kanban]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const article = state.articles.find(a => a.id === btn.dataset.addAllKanban);
        if (article) showAddKanbanModal('', '', article.topic);
      });
    });

    // Generator
    const generateBtn = $('#generateBtn');
    if (generateBtn) {
      generateBtn.addEventListener('click', () => {
        const topic = ($('#generatorTopic')?.value || '').trim();
        const format = $('#generatorFormat')?.value || 'all';
        const tone = $('#generatorTone')?.value || 'informativ';
        if (!topic) { $('#generatorTopic').focus(); $('#generatorTopic').style.borderColor = 'var(--color-error)'; setTimeout(() => { $('#generatorTopic').style.borderColor = ''; }, 2000); return; }
        state.generatorLoading = true; render();
        setTimeout(() => { state.generatedIdeas = simulateGeneration(topic, format, tone); state.generatorLoading = false; render(); }, 1500 + Math.random() * 1000);
      });
    }

    // Generated idea to kanban
    $$('[data-gen-to-kanban]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idea = state.generatedIdeas[parseInt(btn.dataset.genToKanban)];
        if (idea) showAddKanbanModal(`${idea.format}: ${idea.hook.replace(/"/g, '').substring(0, 60)}...`, idea.format, '');
      });
    });

    // Kanban add buttons
    $$('[data-add-col]').forEach(btn => { btn.addEventListener('click', () => { showAddKanbanModal(); }); });

    // Kanban drag & drop
    setupDragAndDrop();
  }

  // === DRAG & DROP ===
  function setupDragAndDrop() {
    let draggedItem = null;
    $$('.kanban-item[draggable]').forEach(el => {
      el.addEventListener('dragstart', (e) => { draggedItem = el.dataset.kanbanId; el.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; });
      el.addEventListener('dragend', () => { el.classList.remove('dragging'); draggedItem = null; $$('.kanban-items').forEach(col => col.style.background = ''); });
    });
    $$('.kanban-items').forEach(col => {
      col.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; col.style.background = 'var(--color-primary-light)'; col.style.borderRadius = 'var(--radius-md)'; });
      col.addEventListener('dragleave', () => { col.style.background = ''; });
      col.addEventListener('drop', (e) => {
        e.preventDefault(); col.style.background = '';
        if (draggedItem) {
          const item = state.kanbanItems.find(i => i.id === draggedItem);
          if (item) { item.status = col.dataset.status; saveKanban(); render(); }
        }
      });
    });
  }

  // === START ===
  document.addEventListener('DOMContentLoaded', init);
})();
