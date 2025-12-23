/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle')

// Toggle menu visibility
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.toggle('show-menu')
    })
}

/*=============== HIDE MENU ON LINK CLICK ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SCROLL REVEAL ANIMATIONS ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: false // Animations happen only once for a cleaner look
})

// Reveal Hero components
sr.reveal(`.hero__title`)
sr.reveal(`.hero__description`, {delay: 500})
sr.reveal(`.hero__info`, {delay: 600, origin: 'bottom'})

// Reveal Section Headers
sr.reveal(`.section__title, .section__subtitle`, {interval: 100})

// Reveal Skills (Sequential reveal from left to right)
sr.reveal(`.skills__content`, {interval: 150, origin: 'left'})

// Reveal Experience & Projects (Pop up from bottom)
sr.reveal(`.qualification__item, .project__card`, {
    interval: 200, 
    origin: 'bottom',
    distance: '40px'
})

// Reveal Contact info
sr.reveal(`.footer__socials`, {delay: 500})

/*=============== AUTO THEME (light/dark based on background) ===============*/
function hexToRgb(hex) {
    hex = hex.replace('#','').trim();
    if(hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const bigint = parseInt(hex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function luminanceFromRgb([r,g,b]){
    // relative luminance (0..1)
    const srgb = [r,g,b].map(v => v/255).map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function applyAutoTheme(){
    const rootStyles = getComputedStyle(document.documentElement);
    let bodyColor = rootStyles.getPropertyValue('--body-color').trim();

    // If the value is 'transparent' or gradient, fall back to a sensible default
    if(!bodyColor || bodyColor.startsWith('linear-gradient') || bodyColor === 'transparent'){
        // try to read first color stop from --body-gradient if set
        const grad = rootStyles.getPropertyValue('--body-gradient').trim();
        const match = grad.match(/#([0-9a-fA-F]{3,6})/);
        if(match) bodyColor = `#${match[1]}`;
    }

    if(bodyColor && bodyColor.startsWith('#')){
        const rgb = hexToRgb(bodyColor);
        const lum = luminanceFromRgb(rgb);
        if(lum < 0.5){
            document.documentElement.classList.add('theme-dark');
        } else {
            document.documentElement.classList.remove('theme-dark');
        }
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', applyAutoTheme);

// Optionally re-run when window resizes (in case background is replaced dynamically)
window.addEventListener('resize', applyAutoTheme);