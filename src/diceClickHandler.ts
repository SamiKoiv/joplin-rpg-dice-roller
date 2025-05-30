import { DiceRoll } from '@dice-roller/rpg-dice-roller';

// This function will run in the webview context.
function setupDiceClickListenersInPage() {
  // Ensure this code runs only once per page load in the webview
  if ((window as any).diceClickListenersAttached) {
    // console.log('Dice click listeners already attached.');
    return;
  }
  (window as any).diceClickListenersAttached = true;

  document.addEventListener('click', (ev) => {
    const btn = (ev.target as HTMLElement).closest('.dice-btn') as HTMLButtonElement;
    if (!btn) return;

    const expr = btn.dataset.exp;
    if (!expr) {
      console.warn('Dice button clicked without data-exp attribute.');
      return;
    }

    try {
      // DiceRoll is now imported directly via Webpack bundling.
      const roll = new DiceRoll(expr);
      alert(roll.output);
    } catch (e) {
      console.error('Dice Roller Error:', e);
      alert('Invalid dice expression. Check console for details.');
    }
  });
  console.log('Dice button click listeners attached (diceClickHandler.js using bundled DiceRoll).');
}

// Immediately invoke the setup function when this script is loaded.
setupDiceClickListenersInPage(); 