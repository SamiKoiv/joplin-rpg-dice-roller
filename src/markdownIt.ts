function diceMarkdownItPlugin(md) {
  const anchoredDiceRegex = /^\[\[dice(?:\(([^)]+)\))?:([^\]]+)\]\]/;
  let styleInjected = false;

  md.inline.ruler.before('link', 'dice', (state, silent) => {
    if (state.src.charCodeAt(state.pos) !== 0x5B /* [ */ || 
        state.src.charCodeAt(state.pos + 1) !== 0x5B /* [ */) {
      return false;
    }

    const match = anchoredDiceRegex.exec(state.src.slice(state.pos));
    if (!match) return false;

    const customText = match[1];
    const diceExpression = match[2];

    if (!silent) {
      if (!styleInjected) {
        state.tokens.push(Object.assign(new state.Token('html_inline', '', 0), {
          content: `<style>
            .dice-btn {
              font-family: monospace;
              font-size: 1.0em;
              border-radius: 3px;
              border: 1px solid #888;
              background: #f5f5f5;
              color: #333;
              cursor: pointer;
              transition: background 0.2s, box-shadow 0.2s;
            }
            .dice-btn:hover {
              background: #e0e0e0;
              box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            }
          </style>`
        }));
        styleInjected = true;
      }
      const openToken = state.push('dice_open', 'button', 1);
      openToken.attrs = [
        ['class', 'dice-btn'],
        ['data-exp', diceExpression],
        ['title', diceExpression],
        ['data-original-text', customText || diceExpression]
      ];
      
      const textToken = state.push('text', '', 0);
      textToken.content = `🎲 ${customText || diceExpression}`;
      
      state.push('dice_close', 'button', -1);
    }
    state.pos += match[0].length;
    return true;
  });

  md.renderer.rules.dice_open = (tokens, idx) => {
    const token = tokens[idx];
    const attrs = token.attrs ? token.attrs.map(([k, v]) => `${k}="${v}"`).join(' ') : '';
    return `<button ${attrs}>`;
  };
  md.renderer.rules.dice_close = () => '</button>';

  md.core.ruler.before('normalize', 'reset_style_injected', (state) => {
    styleInjected = false;
  });
}

module.exports = {
  default: function(_context) {
    return {
      plugin: diceMarkdownItPlugin,
      assets: function() {
        return [
          { name: 'diceClickHandler.js', type: 'js' } 
        ];
      },
    };
  },
}; 