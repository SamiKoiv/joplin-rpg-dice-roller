# Dice Roller Test Page

This page tests various dice roll configurations supported by the `[[dice:EXPRESSION]]` markdown token.

## Basic Rolls

- **d20:** [[dice:d20]]
- **2d6 (sum):** [[dice:2d6]]
- **d100 (percentage):** [[dice:d100]]
- **3d8+4 (modifier):** [[dice:3d8+4]]
- **1d4-1 (negative modifier):** [[dice:1d4-1]]

## Custom Labels

- **Simple Label:** [[dice(My D20 Roll):d20]]
- **Label with Spaces:** [[dice(Attack with Longsword):1d20+7]]
- **Label for Basic Sum:** [[dice(HP Recovery):2d8+2]]
- **Label for Complex Expression:** [[dice(Advantage Fireball):2d20kh1!+8d6!]]

## Keep Highest/Lowest

- **4d6kh3 (Keep Highest 3 of 4d6):** [[dice:4d6kh3]]
- **4d6kl3 (Keep Lowest 3 of 4d6):** [[dice:4d6kl3]]
- **2d20kh1 (Advantage - Keep Highest 1 of 2d20):** [[dice:2d20kh1]]
- **With Custom Label:** [[dice(Advantage Roll):2d20kh1]]
- **2d20kl1 (Disadvantage - Keep Lowest 1 of 2d20):** [[dice:2d20kl1]]
- **With Custom Label:** [[dice(Disadvantage Roll):2d20kl1]]

## Drop Highest/Lowest

- **4d6dh1 (Drop Highest 1 from 4d6):** [[dice:4d6dh1]]
- **4d6dl1 (Drop Lowest 1 from 4d6):** [[dice:4d6dl1]]

## Exploding Dice

- **3d6! (Explode on max):** [[dice:3d6!]]
- **3d6e (Alternative Explode syntax):** [[dice:3d6e]]
- **3d6!5 (Explode on 5 or 6):** [[dice:3d6!5]]
- **3d6!! (Penetrating/Infinite Explodes):** [[dice:3d6!!]]
- **3d6ie (Alternative Penetrating Explode):** [[dice:3d6ie]]

## Compounding Dice (variant of exploding)

- **3d6!c (Compound on max):** [[dice:3d6!c]]
- **3d6ec (Alternative Compound syntax):** [[dice:3d6ec]]

## Success Counting (Target Number)

- **5d10>7 (Count successes >= 7 on 5d10):** [[dice:5d10>7]]
- **5d10>=7 (Alternative syntax):** [[dice:5d10>=7]]
- **6d6<3 (Count successes <= 3 on 6d6):** [[dice:6d6<3]]

## Critical Success/Failure Ranges

- **1d20cs>=18 (Critical Success on 18+):** [[dice:1d20cs>=18]]
- **1d20cf<=3 (Critical Failure on 3-):** [[dice:1d20cf<=3]]

## Re-rolling Dice

- **2d10r<3 (Re-roll 1s and 2s once):** [[dice:2d10r<3]]
- **2d10rr<3 (Re-roll 1s and 2s continuously):** [[dice:2d10rr<3]]

## Sorting Results (Output shows individual dice)

- **4d6s (Sort ascending):** [[dice:4d6s]]
- **4d6sd (Sort descending):** [[dice:4d6sd]]

## Fate/Fudge Dice

- **4dF (Roll 4 Fate/Fudge dice):** [[dice:4dF]]

## Grouped Rolls & Math (Syntax may vary; test basic math)

- **(1d6*2)+5:** [[dice:(1d6*2)+5]]
- **1d10/2:** [[dice:1d10/2]]

## Potentially Invalid or Edge Cases (for robustness testing)

- **No dice (should show error or handle gracefully):** [[dice:]]
- **Invalid characters:** [[dice:1d20+ wartość]]
- **Just a number:** [[dice:10]]
- **Missing d:** [[dice:120]]
- **Very large number of dice (performance test, might be slow):** [[dice:100d6]]

---
*This file can be used to test the Joplin Dice Roller plugin.* 