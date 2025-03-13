module MagicItem 
  ( Message
  , Model
  , MimicSpell
  , ReplicateItem
  , init
  , update
  , view
  )
  where

import Prelude

import Data.Int (toNumber)
import Data.Maybe (Maybe(..))
import Data.Number.Format (fixed, toStringWith)
import Flame (Html)
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Types (class Enumerable, class FromString, class Valueable, Rarity(..), fromString, getAll, getValue)
import UiFuncs (mkCheckbox, mkNumber, mkSelect, showGPs, showHours, showWeeks)

data MimicSpell 
  = No
  | YesButNoAccess
  | Cast1
  | Cast2
  | Cast3
  | Cast4 
  | Cast5
  | Cast6
  | Cast7

derive instance eqMimicSpell :: Eq MimicSpell

instance Show MimicSpell where
  show No             = "No"
  show YesButNoAccess = "Yes, but crafter has no access to it"
  show Cast1          = "Cast 1 time per week"
  show Cast2          = "Cast 2 times per week"
  show Cast3          = "Cast 3 times per week"
  show Cast4          = "Cast 4 times per week"
  show Cast5          = "Cast 5 times per week"
  show Cast6          = "Cast 6 times per week"
  show Cast7          = "Cast 7 times per week"

instance FromString MimicSpell where
  fromString  "No"                                   = No
  fromString  "Yes, but crafter has no access to it" = YesButNoAccess
  fromString  "Cast 1 time per week"                 = Cast1
  fromString  "Cast 2 times per week"                = Cast2
  fromString  "Cast 3 times per week"                = Cast3
  fromString  "Cast 4 times per week"                = Cast4
  fromString  "Cast 5 times per week"                = Cast5
  fromString  "Cast 6 times per week"                = Cast6
  fromString  "Cast 7 times per week"                = Cast7
  fromString _                                       = No

instance Valueable MimicSpell where
  getValue No             = 0.0
  getValue YesButNoAccess = 1.0
  getValue Cast1          = 2.0
  getValue Cast2          = 3.0
  getValue Cast3          = 4.0
  getValue Cast4          = 5.0
  getValue Cast5          = 6.0
  getValue Cast6          = 7.0
  getValue Cast7          = 8.0

instance Enumerable MimicSpell where
  getAll = [No, YesButNoAccess, Cast1, Cast2, Cast3, Cast4 , Cast5, Cast6, Cast7]

data ReplicateItem 
  = RINo
  | YesNoAccess
  | YesNotActive
  | YesActive

derive instance eqReplicateItem :: Eq ReplicateItem

instance Show ReplicateItem where
  show RINo = "No"
  show YesNoAccess = "Yes, but cast has no access to it"
  show YesNotActive = "Yes, but it is not active"
  show YesActive = "Yes, and it is active"

instance FromString ReplicateItem where
  fromString "No" = RINo
  fromString "Yes, but cast has no access to it" = YesNoAccess
  fromString "Yes, but it is not active" = YesNotActive
  fromString "Yes, and it is active" = YesActive
  fromString _ = RINo

instance Valueable ReplicateItem where
  getValue RINo         = 0.0
  getValue YesNoAccess  = 0.0
  getValue YesNotActive = 0.1
  getValue YesActive    = 0.25

instance Enumerable ReplicateItem where
  getAll = [RINo, YesNoAccess, YesNotActive, YesActive]

type Model =
  { itemRarity :: Rarity
  , mimicSpell :: MimicSpell
  , spellCount :: Int
  , accessToInstance :: Boolean
  , replication :: ReplicateItem
  }

init :: Model
init = { itemRarity: Common
       , mimicSpell: No
       , spellCount: 0
       , accessToInstance: false
       , replication: RINo
       }

data Message = ChangeRarity Rarity
             | ChangeMimicSpell MimicSpell
             | ChangeSpellCount Int
             | ChangeAccessToInstance Boolean
             | ChangeReplication ReplicateItem

update :: Model -> Message -> Model
update state (ChangeRarity r)           = state { itemRarity = r }
update state (ChangeMimicSpell m)       = state { mimicSpell = m }
update state (ChangeSpellCount n)       = state { spellCount = n }
update state (ChangeAccessToInstance b) = state { accessToInstance = b }
update state (ChangeReplication r)      = state { replication = r }

view :: Number -> Number -> Number -> Boolean -> Model -> Html Message
view craftingOutputPerWeek componentReduction assistantCostPerWeek isMagicItemAdept state = 
  let
    baseCost = getValue state.itemRarity
    baseTime = baseCost / craftingOutputPerWeek
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
    , HE.div [ HA.class' "s6" ] [ HE.small_ [ HE.text "Base Cost / Effective Crafting Output" ] ]
    
    , HE.div [ HA.class' "s3" ] [ HE.text "Time multiplier" ]
    , HE.div [ HA.class' "s3" ] [ HE.text (toStringWith (fixed 3) timeMult) ]
    , HE.div [ HA.class' "s6" ] [ HE.small_ [ HE.text "Spell mimic adjustment * Artificer Common/Uncommon multiplier - Access to identical item bonus - Replicate Item bonus" ] ]

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
    uncommon = if (isUncommon state.itemRarity && isMagicAdept) then 0.25 else 1.0
    access = if (state.accessToInstance) then 0.1 else 0.0
    mimic = (56.0 - (toNumber state.spellCount * getValue state.mimicSpell)) / 56.0
  in
    (mimic * uncommon) - access - getValue state.replication

viewRarity :: Boolean -> Model -> Array (Html Message)
viewRarity isMagicItemAdept state =
  mkRow (HE.text "Item Rarity:") (mkSelect "rarity" (\s -> ChangeRarity (fromString s)) getAll (Just state.itemRarity))
  <> mkRow (HE.text "Base Cost:") (HE.text (showGPs (getValue state.itemRarity)))
  <> mkRow (tooltipCaption adeptTooltip "Magic Item Adept:") (HE.text (boolToStr isMagicItemAdept))
  <> mkRow (tooltipCaption adeptTooltip "Common/Uncommon:") (HE.text (boolToStr (isUncommon state.itemRarity)))

mimicMessage :: String
mimicMessage = "Reduce the time required by a multiplying by ((56 - (number of spells mimic'd * number of times cast per week))/56)"

identicalMessage :: String
identicalMessage = "If crafter has access to an identical item, reduce the crafting time required by 10%"

viewSpellCasting :: Model -> Array (Html Message)
viewSpellCasting state =
  mkRow (tooltipCaption mimicMessage "Does item mimic a spell:")  (mkSelect "casting" (\s -> ChangeMimicSpell (fromString s)) getAll (Just state.mimicSpell))
  <> mkRow (tooltipCaption mimicMessage "Number of mimic'd spells:") (mkNumber "spell-count" ChangeSpellCount state.spellCount)
  <> mkRow (tooltipCaption identicalMessage "Access to identical item:") (mkCheckbox "identical-item" ChangeAccessToInstance state.accessToInstance)
  <> mkRow (HE.text "Can Replicate this item:")  (mkSelect "replication" (\s -> ChangeReplication (fromString s)) getAll (Just state.replication))

tooltipCaption :: String -> String -> Html Message
tooltipCaption tooltip caption = HE.span [ HA.createAttribute "data-tooltip" tooltip ] [ HE.text caption ]

adeptTooltip :: String
adeptTooltip = "If the crafter is a magic item adept, and the item is Uncommon or Common, divide the Base Enchantment Cost by 2 and the Base Enchantment Time by 4. Use these totals for the rest of the worksheet before applying any other modifiers"

mkRow :: Html Message -> Html Message -> Array (Html Message)
mkRow caption content =
  [ HE.div [ HA.class' "s6" ] [ caption ]
  , HE.div [ HA.class' "s6" ] [ content ]
  ]

isUncommon :: Rarity -> Boolean
isUncommon Common   = true
isUncommon Uncommon = true
isUncommon _        = false

boolToStr :: Boolean -> String
boolToStr false = "No"
boolToStr true  = "Yes"