import { DiceRoll } from 'rpg-dice-roller';

export function rollDice(expression: string): string {
  try {
    const roll = new DiceRoll(expression);
    return roll.output;
  } catch (error) {
    console.error('Dice roll error:', error);
    return `Invalid expression: ${expression}`;
  }
} 