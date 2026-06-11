/* app.js — lightweight interaction layer for Travana Tacos
   Static-site friendly. No dependencies. Respects reduced motion.
*/
(() => {
  const SITE = window.SITE || {};
  const brand = SITE.brand || {};
  const ops = SITE.operations || {};
  const banner = SITE.banner || {};
  const event = SITE.firstEvent || {};
  const today = SITE.today || {};
  const contact = SITE.contact || {};
  const menu = SITE.menu || {};
  const imgs = SITE.images || {};

  const $ = (id) => document.getElementById(id);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getPath = (path) => {
    const map = {
      "brand.name": brand.name,
      "brand.city": brand.city,
      "brand.tagline": brand.tagline,
      "brand.mantra": brand.mantra,
      "event.name": event.name,
      "event.dates": event.dates,
      "event.schedule": event.servingSchedule || event.schedule,
      "event.where": `${event.locationName || ""}${event.locationName && event.address ? " — " : ""}${event.address || ""}`.trim(),
      "event.admission": event.admission,
      "event.highlights": event.highlights,
      "event.music": event.music,
      "event.parking": event.parkingTransit || event.parking,
      "contact.email": contact.email,
      "contact.instagram": contact.instagramHandle ? `@${contact.instagramHandle}` : "",
      "menu.name": menu.featuredItemName,
      "menu.desc": menu.featuredItemDesc,
      "menu.pricingNote": menu.pricingNote,
      "today.status": ops.inOperation ? today.status : "Not currently in operation",
      "today.hours": ops.inOperation ? today.hours : (event.name ? `Next service: ${event.name} (Fri–Sun)` : "Next service: coming soon"),
      "year": String(new Date().getFullYear())
    };
    return map[path];
  };

  const hydrateText = () => {
    $$('[data-site-text]').forEach((el) => {
      const value = getPath(el.getAttribute('data-site-text'));
      if (value !== undefined && value !== null && String(value).trim()) el.textContent = value;
    });

    // Backward-compatible IDs from the previous site files.
    const legacy = {
      brandName: brand.name,
      brandName2: brand.name,
      brandSub: brand.city,
      tagline: brand.tagline,
      mantra: brand.mantra,
      eventName: event.name,
      eventDates: event.dates,
      eventWhere: getPath('event.where'),
      eventSchedule: event.servingSchedule || event.schedule,
      eventAdmission: event.admission,
      eventHighlights: event.highlights,
      eventMusic: event.music,
      eventParking: event.parkingTransit || event.parking,
      itemName: menu.featuredItemName,
      itemDesc: menu.featuredItemDesc,
      featuredDesc: menu.featuredItemDesc,
      pricingNote: menu.pricingNote,
      y: String(new Date().getFullYear())
    };
    Object.entries(legacy).forEach(([id, value]) => {
      const el = $(id);
      if (el && value !== undefined && value !== null && String(value).trim()) el.textContent = value;
    });
  };

  const hydrateLinks = () => {
    const instagramHref = contact.instagramHandle ? `https://instagram.com/${contact.instagramHandle}` : "";
    const mailHref = contact.email ? `mailto:${contact.email}` : "";
    const mapHref = ops.inOperation ? today.maps : event.maps;

    $$('[data-site-href]').forEach((el) => {
      const key = el.getAttribute('data-site-href');
      const value = {
        "contact.email": mailHref,
        "contact.instagram": instagramHref,
        "event.link": event.link,
        "event.maps": event.maps,
        "today.maps": mapHref,
        "menu": "/menu.html"
      }[key];
      if (value) el.setAttribute('href', value);
    });

    const legacyLinks = {
      igBtn: instagramHref,
      igLink: instagramHref,
      igLink2: instagramHref,
      emailBtn: mailHref,
      emailLink: mailHref,
      emailLink2: mailHref,
      eventLink: event.link,
      eventMaps: event.maps,
      eventMaps2: event.maps,
      mapsBtn: mapHref,
      navlink: mapHref
    };
    Object.entries(legacyLinks).forEach(([id, href]) => {
      const el = $(id);
      if (el && href) el.setAttribute('href', href);
    });
  };

  const hydrateImages = () => {
    const imageMap = {
      heroImg1: imgs.hero1,
      heroImg2: imgs.hero2,
      aboutImg1: imgs.about1,
      aboutImg2: imgs.about2,
      brandLogo: brand.logoSrc
    };
    Object.entries(imageMap).forEach(([id, src]) => {
      const el = $(id);
      if (el && src) el.setAttribute('src', src);
      if (id === 'brandLogo' && el && brand.logoAlt) el.setAttribute('alt', brand.logoAlt);
    });
  };

  const fillList = (id, items) => {
    const el = $(id);
    if (!el || !Array.isArray(items)) return;
    el.innerHTML = '';
    items.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      el.appendChild(li);
    });
  };

  const hydrateConfig = () => {
    hydrateText();
    hydrateLinks();
    hydrateImages();

    const pillCity = $('pillCity');
    if (pillCity) pillCity.textContent = `${brand.city || 'Rochester, NY'} pop-up`;
    const pillCashless = $('pillCashless');
    if (pillCashless) pillCashless.textContent = ops.cardOnly ? 'Card only (no cash)' : 'Payment options vary';

    const statusLabel = $('statusLabel');
    if (statusLabel) statusLabel.textContent = ops.inOperation ? 'Today:' : 'Status:';
    const todaySpot = $('todaySpot') || $('spot');
    const todayHours = $('todayHours') || $('hours');
    if (todaySpot) todaySpot.textContent = ops.inOperation ? (today.status || 'Open today') : 'Not currently in operation';
    if (todayHours) todayHours.textContent = ops.inOperation ? (today.hours || 'Hours TBD') : (event.name ? `Next service: ${event.name} (Fri–Sun)` : 'Next service: coming soon');

    fillList('includesList', menu.includes);
    fillList('menuIncludes', menu.includes);
    fillList('menuAddons', menu.addOns);
    fillList('menuDrinks', menu.drinks);

    if (banner.enabled) {
      const b = $('banner');
      if (b) {
        b.hidden = false;
        b.classList.add('notice-visible');
      }
      const b1 = $('banner1');
      const b2 = $('banner2');
      if (b1) b1.textContent = banner.line1 || '';
      if (b2) b2.textContent = banner.line2 || '';
    }

    const mapEmbed = $('mapEmbed');
    if (mapEmbed) {
      const q = ops.inOperation ? (today.maps || '') : (event.address || event.locationName || brand.city || 'Rochester, NY');
      mapEmbed.setAttribute('src', `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`);
    }
  };

  const initNav = () => {
    const toggle = $('navToggle');
    const nav = $('primaryNav');
    const root = document.documentElement;

    const close = () => {
      root.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    };

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const isOpen = root.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      $$('a', nav).forEach((a) => a.addEventListener('click', close));

      document.addEventListener('click', (event) => {
        const target = event.target;
        if (!target || !root.classList.contains('nav-open')) return;
        if (toggle.contains(target) || nav.contains(target)) return;
        close();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') close();
      });
    }

    const path = (window.location.pathname || '/').replace(/\/index\.html$/, '/');
    $$('[data-nav-link]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      const hrefPath = (href.split('#')[0] || '/').replace(/\/index\.html$/, '/');
      const active = hrefPath === path || (path === '/' && href === '/');
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  };

  const initMotion = () => {
    if (!prefersReducedMotion) {
      let raf = 0;
      window.addEventListener('pointermove', (event) => {
        if (raf) return;
        raf = window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mx', `${Math.round(event.clientX)}px`);
          document.documentElement.style.setProperty('--my', `${Math.round(event.clientY)}px`);
          raf = 0;
        });
      }, { passive: true });
    }

    const revealEls = $$('.reveal, [data-reveal]');
    if (!revealEls.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('in');
        observer.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -12% 0px' });

    revealEls.forEach((el, index) => {
      if (!el.style.getPropertyValue('--delay')) el.style.setProperty('--delay', `${Math.min(index % 6, 5) * 70}ms`);
      observer.observe(el);
    });
  };

  const initScrollPolish = () => {
    const topbar = document.querySelector('.topbar');
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);

    const toTop = document.createElement('button');
    toTop.className = 'toTop';
    toTop.type = 'button';
    toTop.setAttribute('aria-label', 'Back to top');
    toTop.innerHTML = '<span aria-hidden="true">↑</span>';
    document.body.appendChild(toTop);
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));

    const floating = document.querySelector('.floating-menu-cta');
    const hero = document.querySelector('.hero-cinematic, .page-masthead');
    const parallaxEls = $$('[data-parallax]');

    let ticking = false;
    const update = () => {
      const y = window.scrollY || 0;
      if (topbar) topbar.classList.toggle('is-scrolled', y > 18);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.style.transform = `scaleX(${Math.min(1, y / max)})`;
      toTop.classList.toggle('show', y > 700);

      if (floating && hero) {
        const rect = hero.getBoundingClientRect();
        floating.classList.toggle('show', rect.bottom < 120);
      }

      if (!prefersReducedMotion) {
        parallaxEls.forEach((el) => {
          const speed = Number(el.getAttribute('data-parallax') || 0.06);
          const rect = el.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;
          const offset = (rect.top - window.innerHeight * 0.45) * speed;
          el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        });
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  };

  const initCopyButtons = () => {
    $$('[data-copy]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const targetId = btn.getAttribute('data-copy');
        const target = targetId ? $(targetId) : null;
        const text = target ? (target.value || target.textContent || '') : '';
        if (!text.trim() || !navigator.clipboard) return;
        const original = btn.textContent;
        try {
          await navigator.clipboard.writeText(text.trim());
          btn.textContent = 'Copied';
          btn.classList.add('is-copied');
          window.setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove('is-copied');
          }, 1200);
        } catch (_) {}
      });
    });
  };

  const initMailtoForm = () => {
    const form = $('mailtoForm');
    if (!form || !contact.email) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const reason = String(fd.get('reason') || '').trim();
      const date = String(fd.get('date') || '').trim();
      const headcount = String(fd.get('headcount') || '').trim();
      const phone = String(fd.get('phone') || '').trim();
      const details = String(fd.get('details') || '').trim();

      const subject = `Travana Tacos Inquiry — ${reason || 'Question'}`;
      const body = [
        'Hi Travana Tacos,',
        '',
        name ? `My name is ${name}.` : 'My name is …',
        reason ? `I’m reaching out about: ${reason}` : 'I’m reaching out about: …',
        date ? `Date/time: ${date}` : 'Date/time: …',
        headcount ? `Expected headcount: ${headcount}` : 'Expected headcount: …',
        phone ? `Phone: ${phone}` : 'Phone: …',
        '',
        'Details:',
        details || '…',
        '',
        'Thanks!',
        name || ''
      ].join('\n');

      window.location.href = `mailto:${encodeURIComponent(contact.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  };

  hydrateConfig();
  initNav();
  initMotion();
  initScrollPolish();
  initCopyButtons();
  initMailtoForm();
})();
