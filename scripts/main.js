const pageConfig = {
    home: {
        title: 'Início | Isaque Pontes Romualdo',
        heading: 'Isaque Pontes Romualdo',
        subtitle: 'Instrutor de Informática <br> SENAI',
        intro: '<br> Conheça um pouco mais sobre mim e entre em contato para conversar. <br> Pagina em desenvolvimento.'
    },
    about: {
        title: 'Sobre mim | Isaque Pontes Romualdo',
        heading: 'Sobre mim',
        intro: 'Abaixo, apresento a minha trajetória pessoal, acadêmica e profissional.',
        timeline: [{
                year: '17/03/2004',
                title: 'Nascimento',
                text: 'Nasci em Ceilandia - DF, Brasil. ',
                image: 'images/profile-placeholder.svg',
                alt: 'Espaço reservado para foto do marco'
            },
            {
                year: '2019 - 2022',
                title: 'Técnico em Administração',
                text: 'Ensino médio técnico concluído no Instituto Federal de Educação, Ciência e Tecnologia Goiano - Campus Campos Belos, com habilitação em Técnico em Administração.',
                image: 'images/profile-placeholder.svg',
                alt: 'Espaço reservado para foto do marco'
            },
            {
                year: '2022 - 2025',
                title: 'Bacharelado em Sistemas de Informação',
                text: 'Conclusão do curso de Bacharelado. Durante este período, desenvolvi e realizei a defesa do meu Trabalho de Conclusão de Curso intitulado "C2Digital".',
                image: 'images/profile-placeholder.svg',
                alt: 'Espaço reservado para foto do marco'
            },
            {
                year: '2026 - Atual',
                title: 'Instrutor de Informática no SENAI',
                text: 'Mudança para Goianésia para iniciar minha atuação profissional como Instrutor de Informática no SENAI, com vínculo também à SEDUC.',
                image: 'images/profile-placeholder.svg',
                alt: 'Espaço reservado para foto do marco'
            }
        ]
    },
    contacts: {
        title: 'Contatos | Isaque Pontes Romualdo',
        heading: 'Contatos',
        intro: 'Você pode me encontrar pelos links abaixo para contato profissional ou acadêmico. O meu currículo completo está disponível no Lattes.',
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
          <img src="images/profile-placeholder.jpeg" alt="Foto de perfil">
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
      <article class="timeline-item">
        <div class="timeline-text">
          <span class="timeline-year">${item.year}</span>
          <h2>${item.title}</h2>
          <p>${item.text}</p>
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

    const fallbackHTML = elementId === 'header' ?
        '<header class="page-header"><div class="container"><nav class="nav-menu" aria-label="Menu principal"><a class="nav-link" href="index.html">Início</a><a class="nav-link" href="about.html">Sobre mim</a><a class="nav-link" href="contacts.html">Contatos</a></nav></div></header>' :
        '<footer class="page-footer"><div class="container footer-content"><p>© 2026 Isaque Pontes Romualdo</p></div></footer>';

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

window.addEventListener('DOMContentLoaded', async() => {
    renderPage();
    await includeHTML('header', 'header.html');
    await includeHTML('footer', 'footer.html');
});