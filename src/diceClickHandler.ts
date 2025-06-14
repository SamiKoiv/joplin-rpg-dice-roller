import { DiceRoll } from '@dice-roller/rpg-dice-roller';

// This function will run in the webview context.
function setupDiceClickListenersInPage() {
  // Ensure this code runs only once per page load in the webview
  if ((window as any).diceClickListenersAttached) {
    // console.log('Dice click listeners already attached.');
    return;
  }
  (window as any).diceClickListenersAttached = true;
  console.log('Dice Roller: Attaching click listeners...');

  document.addEventListener('click', (ev) => {
    console.log('Dice Roller: Document clicked. Target:', ev.target);
    const btn = (ev.target as HTMLElement).closest('.dice-btn') as HTMLButtonElement;
    
    if (!btn) {
      // This is not a dice button, ignore.
      return;
    }
    console.log('Dice Roller: Dice button found.', btn);

    if (btn.disabled) {
      console.log('Dice Roller: Button is disabled, ignoring click.');
      return;
    }

    const expr = btn.dataset.exp;
    if (!expr) {
      console.warn('Dice Roller: Dice button clicked without data-exp attribute.');
      return;
    }
    console.log(`Dice Roller: Found expression: ${expr}`);

    // v1: Original text is not stored, so we retrieve it before modifying.
    // v2: We store the original text in a data attribute to prevent issues with re-rolls.
    let originalText = btn.dataset.originalText;

    if (!originalText) {
      // This is likely a pre-v2 button.
      // We'll parse the current text and store it for future clicks.
      const currentText = btn.textContent || '';
      const textParts = currentText.split(':');
      const baseText = textParts[0].replace('🎲', '').trim();
      originalText = baseText || expr; // Fallback to expression if text is empty
      btn.dataset.originalText = originalText;
    }

    btn.disabled = true;

    try {
      console.log('Dice Roller: Rolling dice...');
      // DiceRoll is now imported directly via Webpack bundling.
      const roll = new DiceRoll(expr);
      btn.textContent = `🎲 ${originalText}: ${roll.total}`;
      btn.title = roll.output;
      console.log(`Dice Roller: Roll result: ${roll.output}`);
    } catch (e) {
      console.error('Dice Roller Error:', e);
      btn.textContent = 'Error';
      btn.title = e.message;
    } finally {
      // Re-enable the button to allow for re-rolls.
      btn.disabled = false;
    }
  });
  console.log('Dice button click listeners attached (diceClickHandler.js using bundled DiceRoll).');
}

// Immediately invoke the setup function when this script is loaded.
setupDiceClickListenersInPage(); 