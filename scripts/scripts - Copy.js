//https://www.digitalocean.com/community/tutorials/how-to-add-javascript-to-html
//https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
//Sider trouble shooting on date formats + locale 16/10/25
//DOM token list: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList

let today = new Date();  // today in default format
const date = (d, m, y = 2025) => new Date(y, m - 1, d); //nb. month array starts at 0; new Date(y, m, d) reflects local timezone's midnight, vs new Date('2025-12-25') for UTC, vs new Date().toLocaleDateString("en-GB") for DD/MM/YYYY string; function parameter y = 2025 (alt. new Date().getFullYear()) sets the current year as the default value when y isn't specified
const firstDay = date(1,12);
const lastDay = date(25,12);
const isSameDay = (dte) => new Date().toDateString() === dte.toDateString();

const animations = { //organised into one object for clearer structure than separate variables const Day1 = []; const Day2 = []; etc
  Day1: ['present', 'GiftBoxFlapLeft', 'GiftBoxFlapRight'],
  Day2: ['tree', 'PicBaubleTop', 'PicBaubleSphere'],
  Day2pink: ['pic-bauble', 'PicBaubleTop', 'PicBaubleSphere'],
  Day25: ['dice']
};

function toggleElements(...args) {
  args.forEach(arg => {
    let id, className;
    // If the arg is an array pair, destructure it
    if (Array.isArray(arg)) {
      [id, className] = arg;
    } 
    // Otherwise, assume className follows the "animate" + id pattern
    else {
      id = arg;
      className = `animate${id}`;
    }

    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle(className);
    } else {
      console.warn(`Element with ID "${id}" not found.`);
    }
  });
}

function resetToggles(...args) {
  args.forEach(arg => {
    let id, className;
    // If the arg is an array pair, destructure it
    if (Array.isArray(arg)) {
      [id, className] = arg;
    } 
    // Otherwise, assume className follows the "animate" + id pattern
    else {
      id = arg;
      className = `animate${id}`;
    }

    const el = document.getElementById(id);
    if (el) {
      el.classList.remove(className);
    } else {
      console.warn(`Element with ID "${id}" not found.`);
    }
  });
}

function playStartAnimation() {}
function playNextAnimation() {}
function playEncoreAnimation() {
    document.getElementById('present').addEventListener('click', () => {
        toggleElements('GiftBoxFlapLeft', 'GiftBoxFlapRight');
    });
    document.getElementById('present').addEventListener('animationend', () => {
        resetToggles('GiftBoxFlapLeft', 'GiftBoxFlapRight');
    });
}

// const playEncoreAnimation = (sectionId, ...children) => {
//   const section = document.getElementById(sectionId);
//   if (!section) {
//     console.warn(`Section element "${sectionId}" not found.`);
//     return;
//   }

//   // Preprocess all arguments into a tidy array of {id, className}
//   const childData = children.map(arg => {
//     if (Array.isArray(arg)) {
//       const [id, className] = arg;
//       return { id, className };
//     } else {
//       return { id: arg, className: `animate${arg}` };
//     }
//   });

//   // Click listener: toggle each child’s animation class
//   section.addEventListener('click', () => {
//     childData.forEach(({ id, className }) => {
//       const el = document.getElementById(id);
//       if (el) {
//         el.classList.toggle(className);
//       } else {
//         console.warn(`Child element "${id}" not found.`);
//       }
//     });
//   });

//   // Animation end listener: remove each child’s animation class
//   section.addEventListener('animationend', () => {
//     childData.forEach(({ id, className }) => {
//       const el = document.getElementById(id);
//       if (el) {
//         el.classList.remove(className);
//       } else {
//         console.warn(`Child element "${id}" not found.`);
//       }
//     });
//   });
// };

//element ids only:
const playEncoreAnimation = (sectionId, ...children) => {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.warn(`Section element "${sectionId}" not found.`);
    return;
  }

  // Preprocess arguments once
  const childData = children.map(arg => {
    if (Array.isArray(arg)) {
      const [id, className] = arg;
      return { id, className };
    } else {
      return { id: arg, className: `animate${arg}` };
    }
  });

  // Track which elements are currently animating
  const isAnimating = new Set();

  // On click: start animations if they're not already running
  section.addEventListener('click', () => {
    childData.forEach(({ id, className }) => {
      const el = document.getElementById(id);
      if (!el) {
        console.warn(`Child element "${id}" not found.`);
        return;
      }

      // Only add class if not already animating
      if (!isAnimating.has(id)) {
        el.classList.add(className);
        isAnimating.add(id);
      }
    });
  });

  // On animation end: remove class and reset state
  section.addEventListener('animationend', (e) => {
    const targetId = e.target.id;
    const targetData = childData.find(child => child.id === targetId);

    if (targetData) {
      const { id, className } = targetData;
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove(className);
        isAnimating.delete(id);
      }
    }
  });
};

//element ids + classes both accepted:
const playEncoreAnimation = (sectionId, ...children) => {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.warn(`Section element "${sectionId}" not found.`);
    return;
  }

  // 🧩 Preprocess arguments into clear objects
  const childData = children.map(arg => {
    if (Array.isArray(arg)) {
      const [selector, className] = arg;
      return { selector, className };
    } else {
      const selector = arg;
      const className = `animate${selector}`;
      return { selector, className };
    }
  });

  // Track animations currently playing (IDs or class selectors)
  const isAnimating = new Set();

  // Helper to safely toggle a list of elements for a given rule
  const runAnimation = (selector, className) => {
    const elements = selector.startsWith('.')
      ? document.querySelectorAll(selector)
      : [document.getElementById(selector)];

    elements.forEach(el => {
      if (!el) {
        console.warn(`Element "${selector}" not found.`);
        return;
      }

      // Skip if already animating
      if (!isAnimating.has(el)) {
        el.classList.add(className);
        isAnimating.add(el);

        // When the animation ends, clean up and allow retrigger
        el.addEventListener(
          'animationend',
          () => {
            el.classList.remove(className);
            isAnimating.delete(el);
          },
          { once: true } // auto‑removes the event handler
        );
      }
    });
  };

  // 🎬 Trigger animations on section click
  section.addEventListener('click', () => {
    childData.forEach(({ selector, className }) => {
      runAnimation(selector, className);
    });
  });
};

const animationCombo = (sectionId, ...children) => {
    const section = document.getElementById(sectionId);
    if (!section) {
        console.warn(`Section element "${sectionId}" not found.`);
        return;
    }

    children.forEach(arg => {
        let id, className;
        if (Array.isArray(arg)) {
            [id, className] = arg;
        } else {
            id = arg;
            className = `animate${id}`;
        }

        const el = document.getElementById(id);
        if (el) {
            el.classList.toggle(className);
        } else {
            console.warn(`Child element "${id}" not found.`);
        }
    })
}

function playEncoreAnimation = (sectionId, ...children) => {
    const section = document.getElementById(sectionId);

    section.addEventListener('click', () => {
        children.forEach(arg => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.toggle(className);
            } else {
                console.warn(`Child element "${id}" not found.`);
            }
        })
    })

    section.addEventListener('animationend', () => {
        children.forEach(arg => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove(className);
            } else {
                console.warn(`Child element "${id}" not found.`);
            }
        })
    })
}

//TODAY'S ANIMATION (ON PAGE LOAD), 1st ~ 25th DECEMBER
if (isSameDay(date(1,12))) {playStartAnimation(...animations.Day1)} //... = spread operator to unpack the array
else if (isSameDay(date(2,12))) {playStartAnimation(...animations.Day2)}
else if (isSameDay(date(25,12))) {playStartAnimation(...animations.Day25)}
if (isSameDay(date(18,10))) {
    document.getElementById('pic-bauble').addEventListener('animationend', () => {
        document.getElementById('PicBaubleTop').classList.remove('animatePicBaubleTop');
        document.getElementById('PicBaubleSphere').classList.remove('animatePicBaubleSphere');
    });
    document.getElementById('PicBaubleTop').classList.toggle('animatePicBaubleTop');
    document.getElementById('PicBaubleSphere').classList.toggle('animatePicBaubleSphere');
} else if (isSameDay(date(19,10))) {
    document.getElementById('present').addEventListener('animationend', () => {
        document.getElementById('GiftBoxFlapLeft').classList.remove('animateGiftBoxFlapLeft');
        document.getElementById('GiftBoxFlapRight').classList.remove('animateGiftBoxFlapRight');
    });
    document.getElementById('GiftBoxFlapLeft').classList.toggle('animateGiftBoxFlapLeft');
    document.getElementById('GiftBoxFlapRight').classList.toggle('animateGiftBoxFlapRight');
}

//ANIMATION ON DEMAND (PLAY BUTTON), WHOLE STORY UP TO LATEST ADVENT CALENDAR DAY
document.getElementById('theme-toggle').addEventListener('click', () => {
    if (today < firstDay) {
        alert("Please come back in December :)");
        document.body.classList.toggle('dark-mode');
    } else {
        if (today >= firstDay) {playStartAnimation(...animations.Day1)};
        if (today >= date(2,12)) {playNextAnimation(...animations.Day2)};
        if (today >= date(3,12)) {playNextAnimation(...animations.Day3)};
        if (today >= date(24,12)) {playNextAnimation(...animations.Day24)};
        if (today >= lastDay) {playNextAnimation(...animations.Day25)};
    }
});

//ANIMATION ON DEMAND, INDIVIDUALLY (ON CLICK) UP TO LATEST ADVENT CALENDAR DAY
if (today >= firstDay) {playEncoreAnimation(...animations.Day1)};
if (today >= date(2,12)) {playEncoreAnimation(...animations.Day2);
                          playEncoreAnimation(...animations.Day2pink)};
if (today >= date(3,12)) {playEncoreAnimation(...animations.Day3)};
if (today >= date(24,12)) {playEncoreAnimation(...animations.Day24)};
if (today >= lastDay) {playEncoreAnimation(...animations.Day25)};

document.getElementById('dice').addEventListener('click', () => {
    document.getElementById('dice').classList.toggle('animateDice');
});

document.getElementById('present').addEventListener('click', () => {
    document.getElementById('GiftBoxFlapLeft').classList.toggle('animateGiftBoxFlapLeft');
    document.getElementById('GiftBoxFlapRight').classList.toggle('animateGiftBoxFlapRight');
});
document.getElementById('present').addEventListener('animationend', () => {
    document.getElementById('GiftBoxFlapLeft').classList.remove('animateGiftBoxFlapLeft');
    document.getElementById('GiftBoxFlapRight').classList.remove('animateGiftBoxFlapRight');
});

document.getElementById('pic-bauble').addEventListener('click', () => {
    document.getElementById('PicBaubleTop').classList.toggle('animatePicBaubleTop');
    document.getElementById('PicBaubleSphere').classList.toggle('animatePicBaubleSphere');
});
document.getElementById('pic-bauble').addEventListener('animationend', () => {
    document.getElementById('PicBaubleTop').classList.remove('animatePicBaubleTop');
    document.getElementById('PicBaubleSphere').classList.remove('animatePicBaubleSphere');
});