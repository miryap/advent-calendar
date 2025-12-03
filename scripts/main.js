//PAN & ZOOM
function zoomAndMove(zoom = 2, viewRight = 0, viewDown = 0, duration = 1) {
  const viewport = document.getElementById('viewport');
  viewport.style.transition = `transform ${duration}s ease`;
  viewport.style.transformOrigin = 'center center';
                            // negate values so that:
  const moveX = -viewRight; // +X = world moves right (camera left)
  const moveY = -viewDown;  // +Y = world moves down  (camera up)

  viewport.style.transform = `scale(${zoom}) translate(${moveX}vw, ${moveY}vh)`;
}
zoomAndMove(3, -15, 0, 0);

//GLOBAL VARIABLES & FUNCTIONS
const date = (d, m, y = 2025) => new Date(y, m - 1, d); //nb. month array starts at 0; new Date(y, m, d) reflects local timezone's midnight, vs new Date('2025-12-25') for UTC, vs new Date().toLocaleDateString("en-GB") for DD/MM/YYYY string; function parameter y = 2025 (alt. new Date().getFullYear()) sets the current year as the default value when y isn't specified
const firstDay = date(1,12);
const lastDay = date(25,12);
let today = new Date();  // today in default format
const isToday = (dte) => dte.toDateString() === new Date().toDateString();

//DAY 1
const candlePair = document.getElementById('candles-pair');
const candles = candlePair.querySelectorAll('.candle');
const playDay1 = () => {
    const tallCandle = candlePair.querySelector('.candle1');
    const shortCandle = candlePair.querySelector('.candle2');
    const tallCandleEyes = tallCandle.querySelectorAll('.tall-candle-eye');
    const tallCandleMouth = tallCandle.querySelector('.candle1__mouth');
    const shortCandleEye1 = shortCandle.querySelector('.candle2__eyes-one');
    const shortCandleEye2 = shortCandle.querySelector('.candle2__eyes-two');
    const shortCandleStick = shortCandle.querySelector('.candle2__stick');
    const shortCandleFire = shortCandle.querySelector('.candle2__fire');
    const shortCandleSmoke1 = shortCandle.querySelector('.candle__smoke-one');
    const shortCandleSmoke2 = shortCandle.querySelector('.candle__smoke-two');
    [tallCandle, shortCandle, tallCandleMouth, shortCandleEye1, shortCandleEye2, shortCandleStick, shortCandleFire, shortCandleSmoke1, shortCandleSmoke2].forEach(el =>  // can shorten w/ array-list ONLY IF there's only one of each i.e. each array item is not an array itself
        el.classList.remove('animateTallCandleBody', 'animateTallCandleMouth', 'animateShortCandleBody', 'animateShortCandleEye1', 'animateShortCandleEye2', 'animateShortCandleStick', 'animateShortCandleFire', 'animateShortCandleSmoke1', 'animateShortCandleSmoke2'));
    tallCandleEyes.forEach(eye => eye.classList.remove('animateTallCandleEyes'));
    void candlePair.offsetWidth;
    tallCandle.classList.add('animateTallCandleBody');
    tallCandleEyes.forEach(eye => eye.classList.add('animateTallCandleEyes'));
    tallCandleMouth.classList.add('animateTallCandleMouth');
    shortCandle.classList.add('animateShortCandleBody');
    shortCandleEye1.classList.add('animateShortCandleEye1');
    shortCandleEye2.classList.add('animateShortCandleEye2');
    shortCandleStick.classList.add('animateShortCandleStick');
    shortCandleFire.classList.add('animateShortCandleFire');
    shortCandleSmoke1.classList.add('animateShortCandleSmoke1');
    shortCandleSmoke2.classList.add('animateShortCandleSmoke2');
};
//DAY 2
const baubleTree = document.getElementById('bauble-tree');
const baubles = baubleTree.querySelectorAll('.bauble');
const playDay2 = () => {
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
};
//DAY 3
const postcard = document.getElementById('postcard');
const playDay3 = () => {
    const writing = document.querySelector('.large-writing.postcard');
    console.log('Postcard animated!');
    postcard.classList.remove('animatePostcard');
    writing.classList.remove('animateWriting');
    void postcard.offsetWidth;
    void writing.offsetWidth;
    postcard.classList.add('animatePostcard');
    writing.classList.add('animateWriting');
}
//DAY 4
const tv = document.getElementById('tv');
const playDay4 = () => {
    const mountain = tv.querySelector('.mountain');
    const hill = tv.querySelector('.hill');
    const trees = tv.querySelectorAll('.tree');
    const [tree1, tree2, tree3] = trees; // cleaner than using :nth-child(2) etc
    const rock = tv.querySelector('.rock');
    const truck = tv.querySelector('.truck');
    const wheels = tv.querySelector('.wheels');
    [mountain, hill, tree1, tree2, tree3, rock, truck, wheels].forEach(el =>
        el.classList.remove('animateMountain', 'animateHill', 'animateTree1', 'animateTree2', 'animateTree3', 'animateRock', 'animateTruck', 'animateWind', 'animateWheels'));
    void tv.offsetWidth;
    mountain.classList.add('animateMountain');
    hill.classList.add('animateHill');
    tree1.classList.add('animateTree1');
    tree2.classList.add('animateTree2');
    tree3.classList.add('animateTree3');
    rock.classList.add('animateRock');
    truck.classList.add('animateTruck', 'animateWind'); // animateWind handled via ::before rule in css file
    wheels.classList.add('animateWheels');
}

//ANIMATION ON DEMAND, INDIVIDUALLY (ON CLICK) UP TO LATEST ADVENT CALENDAR DAY
if (today >= firstDay) {
    candles.forEach(candle => {
        candle.addEventListener('click', () => {
            // console.log('Comic candle clicked!');
            playDay1();
            });
    });}
if (today >= date(2,12)) {
    baubles.forEach(bauble => {
        bauble.addEventListener('click', () => {
    // baubleTree.addEventListener('click', () => {
            // console.log('Bauble tree clicked!');
            playDay2();
            });
    });}
if (today >= date(3,12)) {
    postcard.addEventListener('click', () => {
            // console.log('Postcard clicked!');
            playDay3();
    });}
if (today >= date(4,12)) {
    tv.addEventListener('click', () => {
            console.log('TV clicked!');
            playDay4();
    });}
// } else {
//     console.log(`No clickable animations before 1st Dec 2025`);
// }

//TODAY'S ANIMATION (ON PAGE LOAD), 1st ~ 25th DECEMBER
// if (isToday(date(1,12))) {playStartAnimation(...animations.Day1)} //... = spread operator to unpack the array
// else if (isToday(date(2,12))) {playStartAnimation(...animations.Day2)}
window.addEventListener("load", () => { //nb use of load not DOMContentLoaded - latter fires once the DOM HTML has loaded even when images, external sources, etc are still loading
    if (isToday(date(1,12))) {
        candlePair.classList.add('animateTodaysAnimation');
        candlePair.addEventListener('animationend', (e) => {
            if (e.animationName === 'highlightTodaysAnimation') {
                candlePair.classList.remove('animateTodaysAnimation');
                playDay1();
            }
        }, { once: true }); // without this, would play indefinitely!
    } else if (isToday(date(2,12))) {
        baubleTree.classList.add('animateTodaysAnimation');
        baubleTree.addEventListener('animationend', (e) => {
            if (e.animationName === 'highlightTodaysAnimation') {
                baubleTree.classList.remove('animateTodaysAnimation');
                playDay2();
            }
        }, { once: true });
    } else if (isToday(date(3,12))) {
        postcard.classList.add('animateTodaysAnimation');
        postcard.addEventListener('animationend', (e) => {
            if (e.animationName === 'highlightTodaysAnimation') {
                postcard.classList.remove('animateTodaysAnimation');
                playDay3();
            }
        }, { once: true });
    } else if (isToday(date(4,12))) {
        tv.classList.add('animateTodaysAnimation');
        tv.addEventListener('animationend', (e) => {
            if (e.animationName === 'highlightTodaysAnimation') {
                tv.classList.remove('animateTodaysAnimation');
                playDay4();
            }
        }, { once: true });
    } else {
        console.log(`No animation triggered on loading the page outside of 1~25 Dec 2025`);
    }
});

// function focusOnGridSection(section, zoom = 2.5, duration = 2000) {
//   const viewport = document.getElementById('viewport');
//   const scene = document.getElementById('scene');

//   const sceneRect = scene.getBoundingClientRect();
//   const targetRect = section.getBoundingClientRect();

//   const targetCenterX = targetRect.left - sceneRect.left + targetRect.width / 2;
//   const targetCenterY = targetRect.top  - sceneRect.top  + targetRect.height / 2;

//   const windowCenterX = window.innerWidth / 2;
//   const windowCenterY = window.innerHeight / 2;

//   const translateX = -(targetCenterX - windowCenterX);
//   const translateY = -(targetCenterY - windowCenterY);

//   viewport.style.transition = `transform ${duration}ms ease-in-out`;
//   viewport.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoom})`;
// }

// function focusAtGridCell(rowIndex, colIndex, zoom = 2.5, duration = 2000) {
//   const viewport = document.getElementById('viewport');
//   const cell = parseFloat(getComputedStyle(document.documentElement)
//     .getPropertyValue('--grid-cell-length')) || 0;

//   // approximate the scene's center area inside the viewport
//   const scene = document.getElementById('scene');
//   const sceneRect = scene.getBoundingClientRect();

//   // target’s coordinates *in scene space*
//   const targetX = (colIndex - 0.5) * cell;
//   const targetY = (rowIndex - 0.5) * cell;

//   // window center (screen-space)
//   const windowCenterX = window.innerWidth / 2;
//   const windowCenterY = window.innerHeight / 2;

//   const translateX = windowCenterX - targetX;
//   const translateY = windowCenterY - targetY;

//   viewport.style.transition = `transform ${duration}ms ease-in-out`;
//   viewport.style.transformOrigin = "top left";
//   viewport.style.transform = `scale(${zoom}) translate(${translateX / zoom}px, ${translateY / zoom}px)`;
// }

// window.addEventListener("DOMContentLoaded", () => {
//   const homeSection = document.querySelector("section.building.home.overflow");
//   const scene = document.getElementById("scene");
//   const viewport = document.getElementById("viewport");

//   const rectS = scene.getBoundingClientRect();
//   const rectH = homeSection.getBoundingClientRect();

//   console.table({
//     "scene.left": rectS.left,
//     "scene.top": rectS.top,
//     "scene.width": rectS.width,
//     "home.left": rectH.left,
//     "home.top": rectH.top,
//     "home.width": rectH.width,
//   });
// });

// function focusOnSection(section, zoom = 2.5, duration = 2000) {
//   const viewport = document.getElementById("viewport");
//   const scene = document.getElementById("scene");

//   const sceneRect  = scene.getBoundingClientRect();
//   const targetRect = section.getBoundingClientRect();

//   const sceneOffsetX = sceneRect.left;
//   const sceneOffsetY = sceneRect.top; // ← 250 px from your log

//   const targetCenterX = targetRect.left - sceneOffsetX + targetRect.width / 2;
//   const targetCenterY = targetRect.top  - sceneOffsetY + targetRect.height / 2;

//   const windowCenterX = window.innerWidth / 2;
//   const windowCenterY = window.innerHeight / 2;

//   // include the vertical offset so we move "down" into actual scene
//   const translateX = windowCenterX - targetCenterX + sceneOffsetX;
//   const translateY = windowCenterY - targetCenterY + sceneOffsetY;

//   viewport.style.transition = `transform ${duration}ms ease-in-out`;
//   viewport.style.transformOrigin = "top left";
//   viewport.style.transform =
//     `scale(${zoom}) translate(${translateX / zoom}px, ${translateY / zoom}px)`;
// }

// window.addEventListener('DOMContentLoaded', () => {
//   const homeSection = document.querySelector('section.building.home.overflow');
//   focusOnGridSection(homeSection, 2.5, 500);
// });

// window.addEventListener("DOMContentLoaded", () => {
//   const rowStart = 10, rowEnd = 13; // G6‑G9-ish
//   const colStart = 1,  colEnd = 6;  // A‑F
//   const midRow = (rowStart + rowEnd) / 2;
//   const midCol = (colStart + colEnd) / 2;

//   focusAtGridCell(midRow, midCol, 2.5, 500);
// });

// window.addEventListener("DOMContentLoaded", () => {
//   const home = document.querySelector("section.building.home.overflow");
//   focusOnSection(home, 2.5, 800);
// });


// function focusOn(element, zoom = 2, duration = 2000) {
//   const viewport = document.getElementById('viewport');

//   const rect = element.getBoundingClientRect();
//   const { innerWidth: w, innerHeight: h } = window;

//   // Compute center offsets (center of target relative to viewport center)
//   const x = (rect.left + rect.width / 2) - (w / 2);
//   const y = (rect.top + rect.height / 2) - (h / 2);

//   viewport.style.transition = `transform ${duration}ms ease-in-out`;
//   viewport.style.transform = `translate(${-x}px, ${-y}px) scale(${zoom})`;
// }

// window.addEventListener('DOMContentLoaded', () => {
//   const homeSection = document.querySelector('section.building.home.overflow');
//   focusOn(homeSection, 2.5, 0);
// });
// window.addEventListener('DOMContentLoaded', () => {
//   const windowSection = document.querySelector('.window.right');
//   focusOn(windowSection, 5, 500);
// });
// window.addEventListener('DOMContentLoaded', () => {
//   const baubleTree = document.getElementById('bauble-tree');
//   focusOn(baubleTree, 1.5, 500);
// });

// function focusOn(section, zoom = 2, duration = 2000) {
//   const viewport = document.getElementById('viewport');
//   const sceneRect = viewport.getBoundingClientRect();
//   const targetRect = section.getBoundingClientRect();

//   // Center of the element relative to the viewport
//   const targetCenterX = targetRect.left - sceneRect.left + targetRect.width / 2;
//   const targetCenterY = targetRect.top - sceneRect.top + targetRect.height / 2;

//   // Center of the visible screen
//   const windowCenterX = window.innerWidth / 2;
//   const windowCenterY = window.innerHeight / 2;

//   // How far to move the scene so that the section's center meets the window center
//   const translateX = -(targetCenterX - windowCenterX);
//   const translateY = -(targetCenterY - windowCenterY);

//   viewport.style.transition = `transform ${duration}ms ease-in-out`;
//   viewport.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoom})`;
// }

// window.addEventListener('DOMContentLoaded', () => {
//   const homeSection = document.querySelector('section.building.home.overflow');
//   focusOn(homeSection, 2.5, 0);
// });