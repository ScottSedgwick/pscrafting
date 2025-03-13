module CommonCalculations
  ( calcCostPrice
  , calcCraftingCost
  , calcCraftingTime
  , fromStr
  ) where

import Prelude
import Data.Int (fromString, toNumber)
import Data.Maybe (Maybe(..))

calcCostPrice :: Int -> Number
calcCostPrice basePrice = (toNumber basePrice) * 0.15

calcCraftingCost :: Number -> Number -> Number -> Number 
calcCraftingCost costPrice craftingTimeInWeeks asstCostPerWeek = asstCostPerWeek * craftingTimeInWeeks + costPrice

calcCraftingTime :: Int -> Number -> Number -> Number
calcCraftingTime basePrice crafterOutput componentReduction = 
  let
    costPrice = calcCostPrice basePrice
    result = (costPrice / crafterOutput) - componentReduction
  in
    if (result < 0.0) then 0.0 else result

fromStr :: String -> Int
fromStr s =
  case fromString s of
    Nothing -> 0
    Just i  -> i