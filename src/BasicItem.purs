module BasicItem 
  ( Message
  , Model
  , init
  , update
  , view
  )
  where

import Prelude

import Flame (Html)
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Flame.Html.Event as HV

import CommonCalculations (calcCostPrice, calcCraftingCost, calcCraftingTime, fromStr)
import UiFuncs (showGPs, showHours, showWeeks)

data Message = OnPriceChange Int

type Model =
  { baseCost :: Number
  , basePrice :: Int
  }

init :: Model
init = { baseCost: 0.0, basePrice: 0 }

update :: Model -> Message -> Model
update state (OnPriceChange n) = state { basePrice = n, baseCost = calcCostPrice n }

view :: Number -> Number -> Number -> Model -> Html Message
view output reduction asstCost state = 
  let
    craftingTime = calcCraftingTime state.basePrice output reduction
    craftingCost = calcCraftingCost state.baseCost craftingTime asstCost
  in
    HE.div [ HA.class' "grid" ] 
    (  mkRow (HE.label [ HA.for "base-price" ] [ HE.text "Base Item Cost" ]) (HE.input [ HA.id "base-price", HA.type' "text", HA.value (show state.basePrice), HV.onInput (\s -> OnPriceChange (fromStr s)) ] )
    <> mkRow (HE.label_ [ HE.text "Base Price" ]) (HE.text (showGPs (state.baseCost)))
    <> mkRow (HE.label_ [ HE.text "Time (weeks)" ]) (HE.text (showWeeks craftingTime))
    <> mkRow (HE.label_ [ HE.text "Time (hours)" ]) (HE.text (showHours craftingTime))
    <> mkRow (HE.label_ [ HE.text "Crafting Cost" ]) (HE.text (showGPs craftingCost))
    )

mkRow :: Html Message -> Html Message -> Array (Html Message)
mkRow caption content =
  [ HE.div [ HA.class' "s3" ] [ caption ]
  , HE.div [ HA.class' "s9" ] [ content ]
  ]