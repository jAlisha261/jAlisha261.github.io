'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });

const projects = {
  mapping: {
    title: 'Beneath the Surface',
    category: 'SPATIAL EXPLORATION / INTERACTIVE PROTOTYPE',
    intro: 'A mapping prototype exploring the relationship between South LA’s storm-drain infrastructure and reports of homeless encampments.',
    image: 'assets/alisha-map-workspace.jpg',
    alt: 'Beneath the Surface outreach workspace with an illustrative map of South LA and neighborhood screening factors',
    url: 'https://claude.ai/artifact/2VYXQ3qFWz3q3PnDkZg54A',
    sections: [
      { title: 'The question', text: 'How can an interface make a complex spatial question easier to investigate, while keeping the people behind the data in mind?' },
      { title: 'Explore the prototype', items: ['Follow a six-step guided investigation.', 'Switch to the outreach workspace.', 'Explore neighborhood summaries, map layers, and screening factors.'] },
      { title: 'Design focus', text: 'A guided path introduces the question before opening a more detailed workspace. Neighborhood-level summaries and contextual notes help communicate uncertainty alongside the visual patterns.' },
      { title: 'Project context', text: 'An interactive prototype shared through Claude. The demo brings together map-based exploration, data presentation, and interface design.' }
    ],
    note: 'This prototype uses illustrative data. Its counts, scores, and patterns are demonstration content, not verified research results or evidence about any individual. Spatial association does not establish causation.'
  },
  culture: {
    title: 'Cultural Clue',
    category: 'WEB EXPERIENCE / INTERACTIVE STORYTELLING',
    intro: 'A browser-based detective game set in a mansion of cultural ambassadors. Players use conversations and clues to investigate a fictional mystery.',
    image: 'assets/alisha-cultural-clue-game.jpg',
    alt: 'Cultural Clue game with mansion rooms, ambassador characters, and a question-based investigation interface',
    url: 'https://culture-quest--jalisha7300.replit.app',
    sections: [
      { title: 'The idea', text: 'Bring a fictional mystery into an interactive web experience where the player decides whom to question and how to use a limited number of questions.' },
      { title: 'Try the experience', items: ['Choose from three difficulty levels.', 'Explore the mansion and six ambassador characters.', 'Question suspects, compare clues, and make an accusation.'] },
      { title: 'Interaction focus', text: 'The interface connects character profiles, conversation, a remaining-question counter, and a final suspect selection into one playable investigation.' },
      { title: 'Project context', text: 'Hosted on Replit at the Culture Quest URL, with the live game titled Cultural Clue. This project explores web development, conversation design, and interactive storytelling.' }
    ],
    note: 'The game is a fictional detective story. Its characters and events are part of the game narrative.'
  },
  storymap: {
    title: 'StoryMap AI',
    category: 'GENERATIVE AI / VISUAL STORYTELLING',
    intro: 'An AI storytelling interface designed to pair a generated story with an illustrated map of its world, starting from a prompt and a set of creative preferences.',
    image: 'assets/storymap-ai.png',
    alt: 'StoryMap AI screenshot showing story customization, map controls, prompt suggestions, and story history navigation',
    url: 'assets/storymap-ai.png',
    linkLabel: 'View full screenshot',
    linkAria: 'View the full StoryMap AI screenshot in a new tab',
    sections: [
      { title: 'The idea', text: 'Give a story a sense of place by pairing its narrative with an illustrated map. A single creation screen brings together the story prompt and choices for both the writing and the world visualization.' },
      { title: 'What the interface shows', items: ['Controls for genre, story length, and writing style.', 'Map style and map perspective selectors.', 'Quick prompt suggestions and a Story History entry point.'] },
      { title: 'AI in the workflow', text: 'The interface identifies GPT-4o for story generation and DALL-E for illustrated maps, bringing text and image generation into the same creative workflow.' },
      { title: 'Interaction focus', text: 'Customization controls sit alongside the prompt field, helping a user describe both the story they want and how its setting should be represented.' }
    ],
    note: 'Shown here: the story creation screen. Open the full screenshot for a closer look at the interface and customization controls.'
  }
};
const dialog = document.querySelector('#project-dialog');
let activeProjectButton = null;
function renderProject(id, trigger) {
  const project = projects[id];
  if (!project) return;
  activeProjectButton = trigger;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-intro').textContent = project.intro;
  const img = document.querySelector('#dialog-image');
  img.src = project.image; img.alt = project.alt;
  const content = document.querySelector('#dialog-content');
  content.replaceChildren();
  project.sections.forEach(section => {
    const wrapper = document.createElement('section');
    const heading = document.createElement('h3'); heading.textContent = section.title; wrapper.append(heading);
    if (section.items) {
      const list = document.createElement('ul');
      section.items.forEach(item => { const li = document.createElement('li'); li.textContent = item; list.append(li); });
      wrapper.append(list);
    } else { const text = document.createElement('p'); text.textContent = section.text; wrapper.append(text); }
    content.append(wrapper);
  });
  const note = document.createElement('div'); note.className = 'dialog-note';
  const noteText = document.createElement('p'); noteText.textContent = project.note; note.append(noteText); content.append(note);
  const projectLink = document.querySelector('#dialog-demo');
  projectLink.href = project.url;
  projectLink.textContent = (project.linkLabel || 'Open project') + ' ↗';
  projectLink.setAttribute('aria-label', project.linkAria || 'Open ' + project.title + ' in a new tab');
  dialog.classList.toggle('screenshot-project', id === 'storymap');
  document.querySelector('#dialog-discuss').href = 'mailto:jalisha7300@gmail.com?subject=' + encodeURIComponent('Your project: ' + project.title);
  dialog.showModal(); dialog.scrollTop = 0; document.body.classList.add('dialog-open');
  document.querySelector('.dialog-close').focus();
}
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => renderProject(button.dataset.case, button)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); activeProjectButton?.focus(); });

const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
copyButton.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('jalisha7300@gmail.com');
    copyStatus.textContent = 'Email address copied.';
    copyButton.querySelector('span').textContent = 'Copied!';
  } catch {
    copyStatus.textContent = 'Select the address above to copy it, or click it to open your email app.';
  }
});

if ('IntersectionObserver' in window) {
  const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => { if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
