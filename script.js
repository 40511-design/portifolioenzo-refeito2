/* Interações do portfólio: menu mobile, animações de entrada, navegação e copiar e-mail. */
(() => {
  const menuToggle = document.querySelector("#menuToggle");
  const nav = document.querySelector("#nav");
  const navLinks = [...document.querySelectorAll(".nav a")];
  const copyButton = document.querySelector("#copyEmail");
  const copyFeedback = document.querySelector("#copyFeedback");
  const glow = document.querySelector(".cursor-glow");
  const themeToggle = document.querySelector("#themeToggle");
  const themeIcon = themeToggle?.querySelector(".theme-icon");
  const themeLabel = themeToggle?.querySelector(".theme-label");

  // Tema claro/escuro: respeita a preferência salva e permite alternar manualmente.
  const savedTheme = (() => {
    try { return localStorage.getItem("enzo-portfolio-theme"); } catch { return null; }
  })();
  const systemPrefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;
  const initialTheme = savedTheme || (systemPrefersLight ? "light" : "dark");

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const isLight = theme === "light";
    if (themeIcon) themeIcon.textContent = isLight ? "☾" : "☼";
    if (themeLabel) themeLabel.textContent = isLight ? "MODO ESCURO" : "MODO CLARO";
    themeToggle?.setAttribute("aria-label", isLight ? "Ativar modo escuro" : "Ativar modo claro");
    themeToggle?.setAttribute("aria-pressed", String(isLight));
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute("content", isLight ? "#f4f5ef" : "#08090b");
  }
  applyTheme(initialTheme);
  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    try { localStorage.setItem("enzo-portfolio-theme", nextTheme); } catch { /* armazenamento opcional */ }
  });

  // Menu responsivo acessível.
  function closeMenu() {
    nav?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
  }
  menuToggle?.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  navLinks.forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  // Animações leves ao entrar na tela; conteúdo continua visível se JS/observer não estiver disponível.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 65}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Marca a seção atual no menu.
  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", active);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Brilho discreto que acompanha o mouse apenas em dispositivos com ponteiro fino.
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", event => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  // Copiar e-mail com fallback para navegadores sem Clipboard API.
  copyButton?.addEventListener("click", async () => {
    const email = copyButton.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      copyFeedback.textContent = "E-mail copiado para a área de transferência.";
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "absolute";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();
      copyFeedback.textContent = copied ? "E-mail copiado para a área de transferência." : `E-mail: ${email}`;
    }
    window.setTimeout(() => { copyFeedback.textContent = ""; }, 3500);
  });

  // Atualiza o ano automaticamente no rodapé.
  const year = document.querySelector(".footer-year");
  if (year) year.textContent = `© ${new Date().getFullYear()}`;
})();
