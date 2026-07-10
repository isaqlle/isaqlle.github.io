const pageConfig = {
    home: {
        title: 'IPR',
        heading: 'Isaque Pontes Romualdo',
        subtitle: 'Instrutor de Informática | SENAI',
        intro: 'Explore meus projetos, conheça um pouco mais sobre mim e entre em contato para conversar.'
    },
    about: {
        title: 'About Me | Isaque Pontes Romualdo',
        heading: 'About Me',
        intro: 'Use this chronological template to tell your story. Each item can be duplicated and edited later with your own text and photo.',
        timeline: [{
                year: '2024',
                title: 'Milestone Title',
                text: 'Write your story here. This section is designed to be easy to copy and reuse for each stage of your journey.',
                image: 'images/profile-placeholder.svg',
                alt: 'Placeholder for a milestone photo'
            },
            {
                year: '2022',
                title: 'Another Milestone',
                text: 'Add another event, achievement, or experience here. You can change the order or replace the image anytime.',
                image: 'images/profile-placeholder.svg',
                alt: 'Placeholder for a milestone photo'
            },
            {
                year: '2024',
                title: 'Milestone Title',
                text: 'Write your story here. This section is designed to be easy to copy and reuse for each stage of your journey.',
                image: 'images/profile-placeholder.svg',
                alt: 'Placeholder for a milestone photo'
            }
        ]
    },
    projects: {
        title: 'Projects | Isaque Pontes Romualdo',
        heading: 'Projects',
        intro: 'This template is designed for visual project pages. You can duplicate each project block and replace the images and text later.',
        projects: [{
                title: 'Project Title',
                description: 'Describe your project here. This section is easy to edit and can be reused for each new project.',
                tools: 'Edit this line with the technologies or tools used.',
                year: '2026',
                images: ['images/profile-placeholder.svg', 'images/profile-placeholder.svg', 'images/profile-placeholder.svg']
            },
            {
                title: 'Project Title 2',
                description: 'Describe your project here. This section is easy to edit and can be reused for each new project.',
                tools: 'Edit this line with the technologies or tools used.',
                year: '2026',
                images: ['images/profile-placeholder.svg', 'images/profile-placeholder.svg', 'images/profile-placeholder.svg']
            }
        ]
    },
    contacts: {
        title: 'Contacts | Isaque Pontes Romualdo',
        heading: 'Contacts',
        intro: 'You can reach me through the links below for professional or academic contact.',
        links: [
            { label: '💼 LinkedIn', url: 'https://www.linkedin.com/in/isaqlle/', target: '_blank' },
            { label: '💻 GitHub', url: 'https://github.com/isaqlle/', target: '_blank' },
            { label: '📚 Currículo Lattes', url: 'https://lattes.cnpq.br/9420821211096452', target: '_blank' },
            { label: '📸 Instagram', url: 'https://www.instagram.com/isaqlle/', target: '_blank' }
        ]
    }
};

function getPageName() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === 'about.html') return 'about';
    if (path === 'projects.html') return 'projects';
    if (path === 'contacts.html') return 'contacts';
    return 'home';
}

function renderPage() {
    const pageName = getPageName();
    const config = pageConfig[pageName];
    const main = document.querySelector('main');

    if (!main || !config) return;

    document.title = config.title;

    if (pageName === 'home') {
        main.innerHTML = `
      <div class="container">
        <div class="photo-frame">
          <img src="images/profile-placeholder.svg" alt="Foto de perfil">
        </div>
        <h1>${config.heading}</h1>
        <p>${config.subtitle}</p>
        <p class="home-intro">${config.intro}</p>
      </div>
    `;
        return;
    }

    if (pageName === 'about') {
        const timelineMarkup = config.timeline.map((item, index) => `
      <article class="timeline-item ${index % 2 === 1 ? 'timeline-item--reverse' : ''}">
        <div class="timeline-text">
          <span class="timeline-year">${item.year}</span>
          <h2>${item.title}</h2>
          <p>${item.text}</p>
        </div>
        <div class="timeline-media">
          <img src="${item.image}" alt="${item.alt}">
        </div>
      </article>
    `).join('');

        main.innerHTML = `
      <div class="container about-container">
        <div class="card">
          <h1>${config.heading}</h1>
          <p class="about-intro">${config.intro}</p>
          <div class="timeline">${timelineMarkup}</div>
        </div>
      </div>
    `;
        return;
    }

    if (pageName === 'projects') {
        const projectsMarkup = config.projects.map((project) => `
      <section class="project-card">
        <div class="project-carousel" data-carousel>
          <button class="carousel-btn carousel-btn--prev" type="button" aria-label="Previous image">&#10094;</button>
          <div class="carousel-track">
            ${project.images.map((image) => `<img src="${image}" alt="Project photo">`).join('')}
          </div>
          <button class="carousel-btn carousel-btn--next" type="button" aria-label="Next image">&#10095;</button>
        </div>
        <div class="project-content">
          <h2>${project.title}</h2>
          <p>${project.description}</p>
          <p><strong>Tools:</strong> ${project.tools}</p>
          <p><strong>Year:</strong> ${project.year}</p>
        </div>
      </section>
    `).join('');

    main.innerHTML = `
      <div class="container projects-container">
        <div class="card">
          <h1>${config.heading}</h1>
          <p class="about-intro">${config.intro}</p>
          ${projectsMarkup}
        </div>
      </div>
    `;
    return;
  }

  if (pageName === 'contacts') {
    const linksMarkup = config.links.map((link) => `
      <a href="${link.url}" class="link-btn" target="${link.target}" rel="noopener noreferrer">${link.label}</a>
    `).join('');

    main.innerHTML = `
      <div class="container">
        <div class="card">
          <h1>${config.heading}</h1>
          <p>${config.intro}</p>
          <div class="links">${linksMarkup}</div>
        </div>
      </div>
    `;
  }
}

async function includeHTML(elementId, fileName) {
  const target = document.getElementById(elementId);
  if (!target) return;

  const fallbackHTML = elementId === 'header'
    ? '<header class="page-header"><div class="container"><nav class="nav-menu" aria-label="Menu principal"><a class="nav-link" href="index.html">Home</a><a class="nav-link" href="about.html">About Me</a><a class="nav-link" href="projects.html">Projects</a><a class="nav-link" href="contacts.html">Contacts</a></nav></div></header>'
    : '<footer class="page-footer"><div class="container footer-content"><p>© 2026 Isaque Pontes Romualdo</p></div></footer>';

  try {
    const response = await fetch(fileName, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Falha ao carregar ${fileName}`);
    }
    target.innerHTML = await response.text();
  } catch (error) {
    console.warn(error.message);
    target.innerHTML = fallbackHTML;
  }
}

function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = carousel.querySelectorAll('img');
    let currentIndex = 0;

    const showSlide = (index) => {
      slides.forEach((slide, slideIndex) => {
        slide.style.display = slideIndex === index ? 'block' : 'none';
      });
    };

    if (slides.length > 0) {
      showSlide(currentIndex);
    }

    carousel.querySelector('.carousel-btn--prev')?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    carousel.querySelector('.carousel-btn--next')?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  renderPage();
  await includeHTML('header', 'header.html');
  await includeHTML('footer', 'footer.html');
  initCarousels();
});