module Scroll 
  ( Message
  , Model
  , SpellLevel
  , init
  , update
  , view
  )
  where

import Prelude
import Data.Maybe (Maybe(..))
import Data.Number.Format (fixed, toStringWith)
import Flame (Html)
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Types (class Enumerable, class FromString, Rarity(..), fromString, getAll, getValue, isUncommon)
import UiFuncs (mkCheckbox, mkSelect, showGPs, showHours, showWeeks, tooltipCaption)

data SpellLevel 
  = Cantrip
  | First
  | Second
  | Third
  | Fourth
  | Fifth
  | Sixth
  | Seventh
  | Eighth
  | Ninth

derive instance eqSpellLevel :: Eq SpellLevel

instance Show SpellLevel where
  show Cantrip = "Cantrip"
  show First   = "First"
  show Second  = "Second"
  show Third   = "Third"
  show Fourth  = "Fourth"
  show Fifth   = "Fifth"
  show Sixth   = "Sixth"
  show Seventh = "Seventh"
  show Eighth  = "Eighth"
  show Ninth   = "Ninth"

instance FromString SpellLevel where
  fromString "Cantrip" = Cantrip
  fromString "First"   = First  
  fromString "Second"  = Second 
  fromString "Third"   = Third  
  fromString "Fourth"  = Fourth 
  fromString "Fifth"   = Fifth  
  fromString "Sixth"   = Sixth  
  fromString "Seventh" = Seventh
  fromString "Eighth"  = Eighth 
  fromString "Ninth"   = Ninth
  fromString _         = Cantrip

instance Enumerable SpellLevel where
  getAll = [Cantrip, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth]

type Model =
  { spellLevel :: SpellLevel
  , accessToInstance :: Boolean
  }

init :: Model
init = { spellLevel: Cantrip
       , accessToInstance: false
       }

data Message = ChangeSpellLevel SpellLevel
             | ChangeAccessToInstance Boolean

update :: Model -> Message -> Model
update state (ChangeSpellLevel s)       = state { spellLevel = s }
update state (ChangeAccessToInstance b) = state { accessToInstance = b }

view :: Number -> Number -> Number -> Boolean -> Model -> Html Message
view craftingOutputPerWeek componentReduction assistantCostPerWeek isMagicItemAdept state = 
  let
    rarity = spellLevelToRarity state.spellLevel
    baseCost = getValue rarity
    baseTime = baseCost / (craftingOutputPerWeek * 2.0)
    timeMult = timeMultiplier isMagicItemAdept state
    baseWeeks = baseTime * timeMult - componentReduction
    weeksNeeded = if baseWeeks < 0.0 then 0.0 else baseWeeks
    asstCost = (baseCost / 10.0) + (assistantCostPerWeek * weeksNeeded)
  in
    HE.div [ HA.class' "grid" ]
    [ HE.div [ HA.class' "s6" ] [ HE.div [ HA.class' "grid" ] (viewRarity isMagicItemAdept state) ]
    , HE.div [ HA.class' "s6" ] [ HE.div [ HA.class' "grid" ] (viewSpellCasting state) ]
    , HE.div [ HA.class' "s12" ] [ HE.h3_ "Time and Cost" ]

    , HE.div [ HA.class' "s3" ] [ HE.text "Base Time (weeks)" ]
    , HE.div [ HA.class' "s3" ] [ HE.text (showWeeks baseTime) ]
    , HE.div [ HA.class' "s6" ] [ HE.small_ [ HE.text "Base Cost / (2 * Effective Crafting Output)" ] ]
    
    , HE.div [ HA.class' "s3" ] [ HE.text "Time multiplier" ]
    , HE.div [ HA.class' "s3" ] [ HE.text (toStringWith (fixed 3) timeMult) ]
    , HE.div [ HA.class' "s6" ] [ HE.small_ [ HE.text "Artificer Common/Uncommon multiplier - Access to identical item bonus" ] ]

    , HE.div [ HA.class' "s3" ] [ HE.text "Time required (weeks)" ]
    , HE.div [ HA.class' "s3" ] [ HE.text (showWeeks weeksNeeded) ]
    , HE.div [ HA.class' "s6" ] [ HE.small_ [ HE.text "Base Time * Time Multiplier - Component Time Reduction (Minimum 0)" ] ]

    , HE.div [ HA.class' "s3" ] [ HE.text "Time required (hours)" ]
    , HE.div [ HA.class' "s3" ] [ HE.text (showHours weeksNeeded) ]
    , HE.div [ HA.class' "s6" ] [ HE.small_ [ HE.text "Time required (weeks) * 56" ] ]

    , HE.div [ HA.class' "s3" ] [ HE.text "Cost" ]
    , HE.div [ HA.class' "s3" ] [ HE.text (showGPs asstCost) ]
    , HE.div [ HA.class' "s6" ] [ HE.small_ [ HE.text "Base Cost / 10 + Assistant Cost * Time (weeks)" ] ]
    ]

timeMultiplier :: Boolean -> Model -> Number
timeMultiplier isMagicAdept state =
  let
    rarity = spellLevelToRarity state.spellLevel
    uncommon = if (isUncommon rarity && isMagicAdept) then 0.25 else 1.0
    access = if (state.accessToInstance) then 0.1 else 0.0
  in
    uncommon - access

viewRarity :: Boolean -> Model -> Array (Html Message)
viewRarity isMagicItemAdept state =
  let
    rarity = spellLevelToRarity state.spellLevel
  in
    mkRow (HE.text "Item Rarity:") (mkSelect "rarity" (\s -> ChangeSpellLevel (fromString s)) getAll (Just state.spellLevel))
    <> mkRow (HE.text "Base Cost:") (HE.text (showGPs (getValue rarity)))
    <> mkRow (tooltipCaption adeptTooltip "Magic Item Adept:") (HE.text (boolToStr isMagicItemAdept))
    <> mkRow (tooltipCaption adeptTooltip "Common/Uncommon:") (HE.text (boolToStr (isUncommon rarity)))

spellLevelToRarity :: SpellLevel -> Rarity
spellLevelToRarity Cantrip = Common
spellLevelToRarity First   = Common
spellLevelToRarity Second  = Uncommon
spellLevelToRarity Third   = Uncommon
spellLevelToRarity Fourth  = Rare
spellLevelToRarity Fifth   = Rare
spellLevelToRarity Sixth   = VeryRare
spellLevelToRarity Seventh = VeryRare
spellLevelToRarity Eighth  = VeryRare
spellLevelToRarity Ninth   = Legendary

identicalMessage :: String
identicalMessage = "If crafter has access to an identical item, reduce the crafting time required by 10%"

viewSpellCasting :: Model -> Array (Html Message)
viewSpellCasting state =
  mkRow (tooltipCaption identicalMessage "Access to identical item:") (mkCheckbox "identical-item" ChangeAccessToInstance state.accessToInstance)

adeptTooltip :: String
adeptTooltip = "If the crafter is a magic item adept, and the item is Uncommon or Common, divide the Base Enchantment Cost by 2 and the Base Enchantment Time by 4. Use these totals for the rest of the worksheet before applying any other modifiers"

mkRow :: Html Message -> Html Message -> Array (Html Message)
mkRow caption content =
  [ HE.div [ HA.class' "s6" ] [ caption ]
  , HE.div [ HA.class' "s6" ] [ content ]
  ]

boolToStr :: Boolean -> String
boolToStr false = "No"
boolToStr true  = "Yes"
