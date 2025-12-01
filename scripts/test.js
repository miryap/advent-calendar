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

//PAN & ZOOM
function zoomAndMove(zoom = 2, viewRight = 0, viewDown = 0, duration = 1) {
  const viewport = document.getElementById('viewport');
  viewport.style.transition = `transform ${duration}s ease`;
  viewport.style.transformOrigin = 'center center';

  // negate values so that:
  //   +X  = world moves right (camera left)
  //   +Y  = world moves down  (camera up)
  const moveX = -viewRight;
  const moveY = -viewDown;

  viewport.style.transform =
    `scale(${zoom}) translate(${moveX}vw, ${moveY}vh)`;
}

zoomAndMove(3, -15, 0, 0);

//ANIMATION ON DEMAND, INDIVIDUALLY (ON CLICK) UP TO LATEST ADVENT CALENDAR DAY
const baubleTree = document.getElementById('bauble-tree');
baubleTree.addEventListener('click', () => {
    // console.log('Tree clicked!');
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

//TODAY'S ANIMATION (ON PAGE LOAD), 1st ~ 25th DECEMBER
// if (isToday(date(1,12))) {playStartAnimation(...animations.Day1)} //... = spread operator to unpack the array
// else if (isToday(date(2,12))) {playStartAnimation(...animations.Day2)}
if (isToday(date(1,12))) {
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
} else if (isToday(date(2,12))) {
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
} else {
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