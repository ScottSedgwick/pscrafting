module ItemImprovement 
  ( Message
  , Model
  , ValueUnits
  , Value
  , init
  , update
  , view
  )
  where

import Prelude

import Data.Int (round, toNumber)
import Data.Maybe (Maybe(..))
import Flame (Html)
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE

import CommonCalculations (calcCostPrice, calcCraftingCost, calcCraftingTime)
import Types (class Enumerable, class FromString, Rarity(..), fromString, getAll, getMaybeRarity, isUncommon)
import UiFuncs (mkNumber, mkSelect, showGPs, showHours, showWeeks)

data ValueUnits = UnitsGoldPieces
                | UnitsRarity
                
derive instance eqValueUnits :: Eq ValueUnits

instance Show ValueUnits where
  show UnitsGoldPieces = "Gold Pieces"
  show UnitsRarity     = "Rarity"

instance FromString ValueUnits where
  fromString "Gold Pieces" = UnitsGoldPieces
  fromString "Rarity"      = UnitsRarity
  fromString _             = UnitsRarity

instance Enumerable ValueUnits where
  getAll = [UnitsGoldPieces, UnitsRarity]

data Value = GoldPieces Int
           | Rarity Rarity

type Model =
  { valueUnits :: ValueUnits
  , initialValue :: Value
  , finalValue :: Value
  }

init :: Model
init = { valueUnits: UnitsRarity 
       , initialValue: Rarity Common
       , finalValue: Rarity Uncommon
       }

data Message = ValueUnitsChanged String
             | InitialRarityChanged String
             | FinalRarityChanged String
             | InitialValueChanged Int
             | FinalValueChanged Int

update :: Model -> Message -> Model
update state (ValueUnitsChanged s)    = state { valueUnits = fromString s }
update state (InitialRarityChanged s) = state { initialValue = Rarity (fromString s) }
update state (FinalRarityChanged s)   = state { finalValue = Rarity (fromString s) } 
update state (InitialValueChanged n)  = state { initialValue = GoldPieces n }
update state (FinalValueChanged n)    = state { finalValue = GoldPieces n } 

view :: Number -> Number -> Number -> Boolean -> Model -> Html Message
view output reduction asstCost adept state = 
  let subview = case state.valueUnits of
                  UnitsGoldPieces -> viewGold
                  UnitsRarity     -> viewRarity
  in
    HE.div [ HA.class' "grid"] 
    ( [ HE.div [ HA.class' "s3" ] [ HE.text "Value Units:" ]
      , HE.div [ HA.class' "s9" ] [ mkSelect "improvement-units" ValueUnitsChanged (getAll :: Array ValueUnits) (Just state.valueUnits) ]
      ] <> subview output reduction asstCost adept state
    )

viewGold :: Number -> Number -> Number -> Boolean -> Model -> Array (Html Message)
viewGold output reduction asstCost _ state = 
  let
    initVal   = getGPs state.initialValue
    finalVal  = getGPs state.finalValue
    basePrice = if ((finalVal - initVal) < 0) then 0 else finalVal - initVal
    costPrice = calcCostPrice basePrice
    craftTime = calcCraftingTime basePrice output reduction
    craftCost = calcCraftingCost costPrice craftTime asstCost
  in
    (  mkRow "Initial Value:"         ( mkNumber "initial-value" InitialValueChanged initVal )
    <> mkRow "Final Value:"           ( mkNumber "final-value" FinalValueChanged finalVal )
    <> mkRow "Crafting Time (weeks):" ( HE.text (showWeeks craftTime) )
    <> mkRow "Crafting Time (hours):" ( HE.text (showHours craftTime) )
    <> mkRow "Crafting Cost:"         ( HE.text (showGPs craftCost) )
    )

isMaybeUncommon :: Maybe Rarity -> Boolean
isMaybeUncommon Nothing  = false
isMaybeUncommon (Just r) = isUncommon r

viewRarity :: Number -> Number -> Number -> Boolean -> Model -> Array (Html Message)
viewRarity output reduction asstCost adept state = 
  let
    initRar   = getRarity state.initialValue
    finalRar  = getRarity state.finalValue
    initVal   = getMaybeRarity initRar
    finalVal  = getMaybeRarity finalRar
    basePrice = if ((finalVal - initVal) < 0.0) then 0 else round (finalVal - initVal)
    adjPrice  = if isMaybeUncommon finalRar then basePrice / 2 else basePrice
    costPrice = calcCostPrice adjPrice
    craftTime = calcCraftingTime adjPrice output reduction
    craftCost = calcCraftingCost costPrice craftTime asstCost
  in
    (  mkRow "Initial Rarity:"        ( mkSelect "initial-rarity" InitialRarityChanged (getAll :: Array Rarity) initRar )
    <> mkRow "Final Rarity:"          ( mkSelect "final-rarity" FinalRarityChanged (getAll :: Array Rarity) finalRar )
    <> mkRow "Value Difference:"      ( HE.text (showGPs (toNumber adjPrice)) )
    <> mkRow "Crafting Time (weeks):" ( HE.text (showWeeks craftTime) )
    <> mkRow "Crafting Time (hours):" ( HE.text (showHours craftTime) )
    <> mkRow "Crafting Cost:"         ( HE.text (showGPs craftCost) )
    )

mkRow :: String -> Html Message -> Array (Html Message)
mkRow caption content =
  [ HE.div [ HA.class' "s3" ] [ HE.text caption ]
  , HE.div [ HA.class' "s9" ] [ content ]
  ]

getRarity :: Value -> Maybe Rarity
getRarity (Rarity r) = Just r
getRarity _          = Nothing

getGPs :: Value -> Int
getGPs (GoldPieces g) = g
getGPs _              = 0