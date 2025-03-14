# Crafting

## Crafting Output

Crafting output is measured in gold pieces value generated per week.

### Workers

Workers (including the artificer) contribute value based on the following table:

| Proficiency          | Value  |
| -------------------- | ------ |
| Unskilled            | 5 GP   |
| Partially Skilled    | 7 GP   |
| Skilled              | 15 GP  |
| Player Character     | 25 GP  |
| Expertise            | 30 GP  |
| Artificer            | 50 GP  |
| Specialist Artificer | 100 GP |

The artificers output is tripled if they have a mythic tool.  If they have a mythic tool that is also blessed by a thematically appropriate deity, it is multiplied by 7.

### Tools

Tools provide crafting output based on their quality:

| Quality     | Value  |
| ----------- | ------ |
| Substandard | -10 GP |
| Standard    | 0 GP   |
| Advanced    | 10 GP  |
| Masterwork  | 15 GP  |

### Environment

The crafting environment provides a multiplier to the total crafting output.  The base multiplier depends on the forge quality:

| Quality    | Multiplier |
| ---------- | ---------- |
| Very Crude | 0.73       |
| Crude      | 0.82       |
| Basic      | 1.00       |
| Advanced   | 1.18       |
| Expert     | 1.27       |
| Apex       | 1.35       |

Further modifiers are added to that multiplier based on attunement and sanctification.  

If the forge was specially built for this type of work, add 0.09 to the multiplier.

If the forge has been blessed by a deity, add 0.09 to the multiplier; unless the deity is thematically aligned with the item being made, in which case add 0.27.

The final value is the environment modifier, and multiply the total crafting output by the environment modifier to get your effective crafting output.

## Magical components

Magical components produce a reduction in the time taken to craft something, based on rarity.  Multiple components can be used, and the effects are cumulative.

| Rarity    | Time reduction in weeks |
| --------- | ----------------------- |
| Common    | 0.5                     |
| Uncommon  | 1                       |
| Rare      | 3                       |
| Very Rare | 8                       |
| Legendary | 16                      |

The value of components are improved if they have thematic or magical alignment with the item being created:

| Alignment | Multiplier |
| --------- | ---------- |
| Thematic  | x1.3       |
| Elemental | x1.5       |
| Divine    | x1.9       |
| Draconic  | x1.7       |
| Magical   | x1.4       |
| Unique    | x4         |

## Base Item Construction

Base Item Price (from DMs Guide) * 0.15 = Base Materials Cost

Time taken (weeks) = Base Materials Cost / Effective Crafting Output
Time taken (hours) = Time Taken (weeks) * 56

Cost = Base Materials Cost + sum (Assistants Cost) * Time taken (weeks)

## Non-magic item improvement

Calculate the "Base Item Price" as the final value - the initial value.

Costs and time calculations are exactly as per the "Base Item Constructions" calculations

## Item creation

The base creation cost for a magic item is based on the time it would take a specialist artificer to create one, from the table in the DMs Guide. A specialist artificer generates 100GP of value per week.

| Item Rarity | Work Weeks | Base Cost | Min Level |
| ----------- | ---------- | --------- | --------- |
| Common      | 1          | 100 GP    | 3rd       |
| Uncommon    | 2          | 200 GP    | 3rd       |
| Rare        | 10         | 1,000 GP  | 6th       |
| Very rare   | 25         | 2,500 GP  | 11th      |
| Legendary   | 50+        | 5,000+ GP | 17th      |

### Magic Item adept

If the artificer has the Magic Item Adept ability, the time taken to create a Common or Uncommon magic item is divided by 4, and the cost is halved.

## Base Item Improvement

Exactly as Item Creation, except the cost to improve an item is equal to the improved item cost, minus its original item cost.

So if you were improving a Common item (cost 100GP) to an Uncommon Item (cost 200GP), the cost to improve it is (200 - 100) 100GP.

Note that if the final rarity of the item is Uncommon or lower, the multipliers for Magic Item Adept apply.

## Potions

Base cost for a potion is determined by rarity. Components are explicitly removed from affecting the crafting time, as they are the primary essential ingredient.

Time and cost is calculated as for other magic items, with the following changes:

1. Components are essential, and do not reduce crafting time.
2. Cost and time for creation is half of what it would take to create a permanent magic item.

## Scrolls

Rarity is determined by spell level, as shown:

| Spell Level   | Scroll Rarity |
| ------------- | ------------- |
| Cantrip, 1st  | Common        |
| 2nd, 3rd      | Uncommon      |
| 4th, 5th      | Rare          |
| 6th, 7th, 8th | Very rare     |
| 9th           | Legendary     |

Base cost is determined by rarity.

Time and cost is calculated as for other magic items, with the following changes:

1. Access to the spell in question is essential, and does not reduce crafting time.
2. Cost and time for creation is half of what it would take to create a permanent magic item.
