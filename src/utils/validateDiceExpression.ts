export function validateDiceExpression(expression: string): boolean {
  return /^\s*\d*d\d+([+-]\d+)?\s*$/i.test(expression.trim());
} 