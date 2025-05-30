export const diceDialogHtml = `
<style>
.dice-dialog-container { padding: 20px; min-width: 320px; }
.dice-dialog-label { margin-bottom: 10px; display: block; }
.dice-dialog-input { width: 100%; margin-bottom: 10px; padding: 4px; font-size: 1em; }
.dice-dialog-presets { margin-bottom: 10px; }
.dice-dialog-presets button { margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; font-size: 1em; cursor: pointer; }
</style>
<div class="dice-dialog-container">
  <label class="dice-dialog-label" for="dice-expression">Enter dice expression (e.g., 2d6+3):</label>
  <input class="dice-dialog-input" id="dice-expression" name="expression" type="text" autofocus />
  <div class="dice-dialog-presets">
    <button type="button" data-value="d20">d20</button>
    <button type="button" data-value="2d6">2d6</button>
    <button type="button" data-value="2d20kh1">adv (2d20kh1)</button>
    <button type="button" data-value="2d20kl1">dis (2d20kl1)</button>
  </div>
  <div>
    <button type="submit">OK</button>
    <button type="button" id="dice-cancel">Cancel</button>
  </div>
</div>
<script>
(function() {
  const input = document.getElementById('dice-expression');
  document.querySelectorAll('.dice-dialog-presets button').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.getAttribute('data-value');
      input.focus();
    });
  });
  document.getElementById('dice-cancel').addEventListener('click', () => {
    window.close();
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      input.form && input.form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  });
})();
</script>
`; 