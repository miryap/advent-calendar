//GLOBAL VARIABLES & FUNCTIONS
const date = (d, m, y = 2025) => new Date(y, m - 1, d); //nb. month array starts at 0; new Date(y, m, d) reflects local timezone's midnight, vs new Date('2025-12-25') for UTC, vs new Date().toLocaleDateString("en-GB") for DD/MM/YYYY string; function parameter y = 2025 (alt. new Date().getFullYear()) sets the current year as the default value when y isn't specified
const firstDay = date(1,12);
const lastDay = date(25,12);
let today = new Date();  // today in default format
const isToday = (dte) => dte.toDateString() === new Date().toDateString();

const animations = { //organised into one object for clearer structure than separate variables i.e. const Day1 = []; const Day2 = []; etc
  day1: ['present', 'GiftBoxFlapLeft', 'GiftBoxFlapRight'],
  // day2: ['tree', 'PicBaubleTop', 'PicBaubleSphere'],
  day2: ['pic-bauble', 'PicBaubleTop', 'PicBaubleSphere']
};

const litLightsTree = () => {
    const lightsTree = document.getElementById('lights-tree');
    const light = lightsTree.querySelectorAll('.light');
    light.forEach(l => l.classList.add('lightOn'));
}

//DISPLAY IN CORRECT LANGUAGE
const updateLanguage = (forcedLang) => {
    const storedLang = localStorage.getItem('manualLang');
    const lang = forcedLang || storedLang // prioritises parameter > stored parameter > browser detection
                || navigator.language || navigator.userLanguage; // returns en-US, de-DE, etc.
    const isGerman = lang.startsWith('de'); // covers de-DE, de-AT, de-CH, etc.
    const englishText = document.querySelectorAll('.lang-en');
    const germanText = document.querySelectorAll('.lang-de');

    if (isGerman) {
        englishText.forEach(en => en.hidden = true);
        germanText.forEach(de => de.hidden = false);
    } else {
        englishText.forEach(en => en.hidden = false);
        germanText.forEach(de => de.hidden = true);
    }
    // or short form:
    // englishText.forEach(el => el.hidden =  isGerman);
    // germanText.forEach(el  => el.hidden = !isGerman);

    document.documentElement.lang = isGerman ? 'de' : 'en'; // fallback for screen readers, changes lang attribute of html element
    
    document.querySelectorAll('button[data-title-en]').forEach(btn => {
        const langCode = isGerman ? 'de' : 'en';
        btn.title = btn.getAttribute(`data-title-${langCode}`);
        btn.setAttribute('aria-label', btn.getAttribute(`data-label-${langCode}`));
    });
};
['DOMContentLoaded', 'languagechange'].forEach(e =>
    //window.addEventListener(e, updateLanguage) // orig. no function brackets when the function had no parameters (as only reference expected)
    window.addEventListener(e, () => updateLanguage()) // checks for the function parameter i.e. a stored manual choice to use (else falls back to browser preference)
);
document.getElementById('language-toggle').addEventListener('click', () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'en' ? 'de' : 'en';
    localStorage.setItem('manualLang', newLang); 
    updateLanguage(newLang);
});

//TODAY'S ANIMATION (ON PAGE LOAD), 1st ~ 25th DECEMBER
// if (isToday(date(1,12))) {playStartAnimation(...animations.Day1)} //... = spread operator to unpack the array
// else if (isToday(date(2,12))) {playStartAnimation(...animations.Day2)}
if (isToday(date(27,10))) {
    document.getElementById('pic-bauble').addEventListener('animationend', () => {
        document.getElementById('PicBaubleTop').classList.remove('animatePicBaubleTop');
        document.getElementById('PicBaubleSphere').classList.remove('animatePicBaubleSphere');
    });
    document.getElementById('PicBaubleTop').classList.add('animatePicBaubleTop');
    document.getElementById('PicBaubleSphere').classList.add('animatePicBaubleSphere');
} else if (isToday(date(5,11))) {
    document.getElementById('dice').addEventListener('animationend', () => {
        document.getElementById('Dice').classList.remove('animateDice');
    });
    document.getElementById('Dice').classList.add('animateDice');
} else {
    litLightsTree();
    const giftBox = document.getElementById('present').querySelector('.cube'); // alt. document.querySelector('#present .cube')
    const leftFlap = giftBox.querySelector('.side.front-left'); // alt. document.querySelector('#present .side.front-left')
    const rightFlap = giftBox.querySelector('.side.front-right');
    const lastAnimatedObject = rightFlap; // only works if single animation on the element
    giftBox.classList.add('animateGiftBox');
    leftFlap.classList.add('animateLeftFlap');
    rightFlap.classList.add('animateRightFlap');
    lastAnimatedObject.addEventListener('animationend', () => { // doesn't work: document.getElementById('present').addEventListener('animationend', () => {
        giftBox.classList.remove('animateGiftBox');
        leftFlap.classList.remove('animateLeftFlap');
        rightFlap.classList.remove('animateRightFlap');
    });
};

//REFACTOR ALL (if reference more than once):
//document.querySelector('#present .cube') -> const present = document.getElementById('present'); present.querySelector('.cube') OR DIRECTLY const presentCube = document.querySelector('#present .cube');

//ANIMATION ON DEMAND (PLAY BUTTON), WHOLE STORY UP TO LATEST ADVENT CALENDAR DAY
document.getElementById('nav-toggle').addEventListener('click', () => {
    if (today < firstDay) {
        alert("Please come back in December :)");
        // document.body.classList.toggle('dark-mode');
    } else {
        // REVEAL MENU
        document.body.classList.toggle('dark-mode');
//         if (today >= firstDay) {playStartAnimation(...animations.Day1)};
//         if (today >= date(2,12)) {playNextAnimation(...animations.Day2)};
//         if (today >= date(3,12)) {playNextAnimation(...animations.Day3)};
//         if (today >= date(24,12)) {playNextAnimation(...animations.Day24)};
//         if (today >= lastDay) {playNextAnimation(...animations.Day25)};
    }
});

document.getElementById('play-selected').addEventListener('click', () => {
    const nav = document.querySelector('nav');
    const selectedDays = Array.from(nav.querySelectorAll('input:checked')) // creates an array of checked input elements
        .map(input => input.id) // converts array elements into their respective ids only
        .filter(Boolean); // removes any inputs w/out id
    selectedDays.forEach(id => someFunctionIHaventYetWritten(id));
});

//ANIMATION ON DEMAND, INDIVIDUALLY (ON CLICK) UP TO LATEST ADVENT CALENDAR DAY
// if (today >= firstDay) {playEncoreAnimation(...animations.Day1)};
// if (today >= date(2,12)) {playEncoreAnimation(...animations.Day2);
//                           playEncoreAnimation(...animations.Day2pink)};
// if (today >= date(3,12)) {playEncoreAnimation(...animations.Day3)};
// if (today >= date(24,12)) {playEncoreAnimation(...animations.Day24)};
// if (today >= lastDay) {playEncoreAnimation(...animations.Day25)};


// const present = document.getElementById('present');
// present.addEventListener('click', () => {
//     const giftBox = present.querySelector('.cube'); // alt. document.querySelector('#present .cube') or document.getElementById('present').querySelector('.cube')
//     const leftFlap = giftBox.querySelector('.side.front-left'); // alt. document.querySelector('#present .side.front-left')
//     const rightFlap = giftBox.querySelector('.side.front-right');
//     giftBox.classList.add('animateGiftBox');
//     leftFlap.classList.add('animateLeftFlap');
//     rightFlap.classList.add('animateRightFlap');
//     present.addEventListener('animationend', (e) => {
//         if (e.animationName === 'openCloseRightFlap') { // final animation in a series of animations (works even if last animated object runs multiple animations sequentially)
//             giftBox.classList.remove('animateGiftBox');
//             leftFlap.classList.remove('animateLeftFlap');
//             rightFlap.classList.remove('animateRightFlap');
//         }
//     }, {once: true}); //if omitted, animationend listener stays & new ones added w/ every click = remove code run more than once per animationend
// });

const present = document.getElementById('present');
present.addEventListener('click', () => {
    const giftBox = present.querySelector('.cube'); // alt. document.querySelector('#present .cube') or document.getElementById('present').querySelector('.cube')
    const leftFlap = giftBox.querySelector('.side.front-left'); // alt. document.querySelector('#present .side.front-left')
    const rightFlap = giftBox.querySelector('.side.front-right');
    [giftBox, leftFlap, rightFlap].forEach(el =>  // can shorten w/ array-list ONLY IF each array item is not an array itself (there's only one of giftBox, leftFlap etc each)
        el.classList.remove('animateGiftBox', 'animateLeftFlap', 'animateRightFlap'));
    void present.offsetWidth; // hack to ensure code above is fully run before next code (=forced synchronous reflow). Can be any layout property (offsetWidth, clientHeight, scrollTop, etc); void = discard the number that is read
    giftBox.classList.add('animateGiftBox');
    leftFlap.classList.add('animateLeftFlap');
    rightFlap.classList.add('animateRightFlap');
});

const bgTrees = document.getElementById('bg-trees');
bgTrees.addEventListener('click', () => {
    const spheres = bgTrees.querySelectorAll('.sphere');
    const bgTree1 = document.getElementById('bg-tree1').querySelectorAll('.sphere');
    const bgTree2 = document.getElementById('bg-tree2').querySelectorAll('.sphere');
    const bgTree3 = document.getElementById('bg-tree3').querySelectorAll('.sphere');
    spheres.forEach(el =>
        el.classList.remove('animateTree1', 'animateTree2', 'animateTree3'));
    void bgTrees.offsetWidth;
    bgTree1.forEach(sph => sph.classList.add('animateTree1'));
    bgTree2.forEach(sph => sph.classList.add('animateTree2'));
    bgTree3.forEach(sph => sph.classList.add('animateTree3'));
});

const lightsTree = document.getElementById('lights-tree');
lightsTree.addEventListener('click', () => {
    const light = lightsTree.querySelectorAll('.light');
    light.forEach(l => l.classList.remove('lightOn'));
    light.forEach(l => l.classList.remove('animateLight'));
    void lightsTree.offsetWidth;
    light.forEach(l => l.classList.add('animateLight'));
});

const baubleTree = document.getElementById('bauble-tree');
baubleTree.addEventListener('click', () => {
    const tree = baubleTree.querySelector('.canvas');
    const freeBaubleTop = baubleTree.querySelectorAll('.bauble.free .top');
    const freeBaubleSphere = baubleTree.querySelectorAll('.bauble.free .sphere');
    const constrictedBaubleTop = baubleTree.querySelectorAll('.bauble.constricted .top');
    const constrictedBaubleSphere = baubleTree.querySelectorAll('.bauble.constricted .sphere');
    tree.classList.remove('animateTree');
    freeBaubleTop.forEach(top => top.classList.remove('animateFreeBaubleTop'));
    freeBaubleSphere.forEach(sph => sph.classList.remove('animateFreeBaubleSphere'));
    constrictedBaubleTop.forEach(top => top.classList.remove('animateConstrictedBaubleTop'));
    constrictedBaubleSphere.forEach(sph => sph.classList.remove('animateConstrictedBaubleSphere'));
    void baubleTree.offsetWidth;
    tree.classList.add('animateTree');
    freeBaubleTop.forEach(top => top.classList.add('animateFreeBaubleTop'));
    freeBaubleSphere.forEach(sph => sph.classList.add('animateFreeBaubleSphere'));
    constrictedBaubleTop.forEach(top => top.classList.add('animateConstrictedBaubleTop'));
    constrictedBaubleSphere.forEach(sph => sph.classList.add('animateConstrictedBaubleSphere'));
});


document.getElementById('dice').addEventListener('click', () => {
    document.getElementById('Dice').classList.add('animateDice');
});
document.getElementById('dice').addEventListener('animationend', () => {
    document.getElementById('Dice').classList.remove('animateDice');
});