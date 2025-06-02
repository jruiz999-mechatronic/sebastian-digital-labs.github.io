/**
* Template Name: Personal
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Updated: Mar 05 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  // Initialize Isotope filtering/layout
function initIsotope() {
  // Grab the container that holds your .portfolio-item elements
  const grid = document.querySelector('.isotope-container');
  if (!grid) return;

  // Create the Isotope instance
  // assumes you’ve already loaded isotope.pkgd.min.js via <script> before this file
  new Isotope(grid, {
    itemSelector: '.portfolio-item',
    layoutMode: 'masonry',           // or 'fitRows', etc.
    percentPosition: true,
    masonry: {
      columnWidth: '.portfolio-item'
    }
  });
}

// Initialize GLightbox galleries
function initGlightbox() {
  if (typeof GLightbox !== 'function') return;
  GLightbox({
    selector: '.glightbox'
  });
}



document.addEventListener('DOMContentLoaded', async () => {
  // 1. Carga e inyección de los proyectos
  const resp      = await fetch('assets/data/portfolio.json');
  const projects  = await resp.json();
  const container = document.getElementById('portfolio-items');
  

  projects.forEach(p => {
    const categoryClasses = p.categories.join(' ');
    const html = `
      <div class="col-lg-4 col-md-6 portfolio-item ${categoryClasses}">
        <div class="portfolio-content h-100">
          <img src="${p.thumb}" class="img-fluid" loading="lazy" alt="${p.title}">
          <div class="portfolio-info">
            <h4>${p.title}</h4>
            <p>${p.shortDesc}</p>
            <a href="${p.images[0]}" data-gallery="gallery-${p.id}" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
            <a href="portfolio-details.html?id=${p.id}" class="details-link"><i class="bi bi-link-45deg"></i></a>
          </div>
        </div>
      </div>`;
    container.insertAdjacentHTML('beforeend', html);
  });

  // 2. Espera a que terminen de cargar las imágenes
  imagesLoaded(container, () => {
    // 3. Inicializa Isotope
    const iso = new Isotope(container, {
      itemSelector: '.portfolio-item',
      layoutMode:   'masonry',
      percentPosition: true,
      masonry: { columnWidth: '.portfolio-item' }
    });

    // 4. Reajusta la altura del contenedor automáticamente
    const ajustarAltura = () => {
      let maxBottom = 0;
      container.querySelectorAll('.portfolio-item').forEach(item => {
        const b = item.offsetTop + item.offsetHeight;
        if (b > maxBottom) maxBottom = b;
      });
      container.style.height = maxBottom + 'px';
    };

    // 5. Aplica filtro inicial según parámetro URL
    const params      = new URLSearchParams(window.location.search);
    const filterValue = params.get('filter') || '*';
    const selector    = filterValue === '*' ? '*' : `.${filterValue}`;
    iso.arrange({ filter: selector });
    ajustarAltura();

    // 6. Configura los enlaces de filtro
    const filterLinks = document.querySelectorAll('.portfolio-filters [data-filter]');
    filterLinks.forEach(link => {
      // Marca el filtro activo al cargar la página
      if (link.getAttribute('data-filter') === selector) {
        link.classList.add('filter-active');
      } else {
        link.classList.remove('filter-active');
      }

      link.addEventListener('click', function(e) {
        e.preventDefault();
        // 6.1 Limpia clases y añade la activa
        filterLinks.forEach(l => l.classList.remove('filter-active'));
        this.classList.add('filter-active');

        // 6.2 Aplica el filtro en Isotope
        const f = this.getAttribute('data-filter');
        iso.arrange({ filter: f });

        // 6.3 Actualiza la URL
        if (f !== '*') {
          window.history.pushState({}, '', `portfolio.html?filter=${f.substring(1)}`);
        } else {
          window.history.pushState({}, '', 'portfolio.html');
        }

        // 6.4 Reajusta altura tras el filtro
        ajustarAltura();
      });
    });

    // 7. Inicializa GLightbox (u otros plugins)
    GLightbox({ selector: '.glightbox' });
  });
});

  

})();