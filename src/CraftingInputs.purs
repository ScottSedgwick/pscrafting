module CraftingInputs
  ( Message
  , Model
  , init
  , update
  , view
  , effectiveOutput
  , weeklyCost
  )
  where

-- | This unit is for crafting inputs - crafter type, assistants, tools, workspaces

import Prelude

import Data.Array (concatMap, index, modifyAt, updateAt)
import Data.Foldable (any, sum)
import Data.Maybe (Maybe(..))
import Flame (Html)
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Types (CrafterType(..), CraftingEnvironment(..), CraftingSanctification, Environment, ToolBonus(..), ToolQuality(..), ToolRecord, ToolSanctification(..), defEnvironment, defTool, fromString, getAll, getValue, toolValue)
import UiFuncs (mkCheckbox, mkSelect, showGPs)
                 
type Model = 
  { crafterType :: CrafterType 
  , assistants :: Array CrafterType
  , itemAdept :: Boolean
  , mythicTool :: Boolean
  , tools :: Array ToolRecord
  , environment :: Environment
  }

init :: Model
init = 
  { crafterType : Specialist 
  , assistants : [Specialist, Specialist, Specialist, NoCrafter, NoCrafter]
  , itemAdept : true
  , mythicTool : false
  , tools : [ defTool { quality = TqAdvanced, bonus = PlusTwo }, defTool { quality = TqAdvanced }, defTool, defTool, defTool ]
  , environment : defEnvironment { craftingEnvironment = CeAdvanced }
  }

data Message = CrafterTypeChanged String
             | AssistantChanged Int String
             | ItemAdeptChecked Boolean
             | MythicToolChecked Boolean
             | ToolQualityChanged Int String
             | ToolBonusChanged Int String
             | ToolSanctificationChanged Int String
             | CraftingEnvironmentChanged String
             | CraftingAttunmentChanged Boolean
             | CraftingSanctificationChanged String

update :: Model -> Message -> Model
update state (CrafterTypeChanged s)            = state { crafterType = fromString s }
update state (AssistantChanged n s)            = changeAssistant state n (fromString s)
update state (ItemAdeptChecked b)              = state { itemAdept = b }
update state (MythicToolChecked b)             = state { mythicTool = b }
update state (ToolQualityChanged n s)          = changeToolQuality state n (fromString s)
update state (ToolBonusChanged n s)            = changeToolBonus state n (fromString s)
update state (ToolSanctificationChanged n s)   = changeToolSanctification state n (fromString s)
update state (CraftingEnvironmentChanged s)    = state { environment { craftingEnvironment = fromString s } }
update state (CraftingAttunmentChanged b)      = state { environment { environmentAttuned = b } }
update state (CraftingSanctificationChanged s) = state { environment { environmentSanctified = fromString s } }

changeAssistant :: Model -> Int -> CrafterType -> Model
changeAssistant state n asst =
  case updateAt n asst state.assistants of
    Nothing -> state
    Just a  -> state { assistants = a }

changeToolQuality :: Model -> Int -> ToolQuality -> Model
changeToolQuality state n toolQuality = 
  let
    chQual t = t { quality = toolQuality }
  in
    case modifyAt n chQual state.tools of
      Nothing -> state
      Just a  -> state { tools = a }

changeToolBonus :: Model -> Int -> ToolBonus -> Model
changeToolBonus state n toolBonus = 
  let
    chBonus t = t { bonus = toolBonus }
  in
    case modifyAt n chBonus state.tools of
      Nothing -> state
      Just a  -> state { tools = a }

changeToolSanctification :: Model -> Int -> ToolSanctification -> Model
changeToolSanctification state n toolSanc = 
  let
    chSanc t = t { sanctification = toolSanc }
  in
    case modifyAt n chSanc state.tools of
      Nothing -> state
      Just a  -> state { tools = a }

view :: Model -> Html Message
view state =
  HE.article_
  [
    HE.details [ HA.name "crafting-inputs" ]
    [ HE.summary [ HA.name "crafting-inputs-summary" ] (viewSummary state)
    , HE.div [ HA.class' "detail" ] (viewDetail state)
    ]
  ]

viewSummary :: Model -> Html Message
viewSummary model = 
  HE.article [ HA.class' "round primary no-elevate" ]
  [
    HE.div [ HA.class' "grid" ] 
    [ HE.div [ HA.class' "s3" ] [ HE.text ("Crafting Output: " <> showGPs (totalInput model)) ]
    , HE.div [ HA.class' "s3" ] [ HE.text ("Environment Multiplier: x" <> show (environmentMultiplier model.environment)) ]
    , HE.div [ HA.class' "s3" ] [ HE.text ("Effective Output per week: " <> showGPs (effectiveOutput model)) ]
    , HE.div [ HA.class' "s3" ] [ HE.text ("Weekly cost: " <> (showGPs (weeklyCost model))) ]
    ]
  ]

totalInput :: Model -> Number
totalInput state = totalCraftingInput state + totalToolInput state

totalCraftingInput :: Model -> Number
totalCraftingInput state = getCrafterValue state + getValue state.assistants

weeklyCost :: Model -> Number
weeklyCost state = getValue state.assistants

totalToolInput :: Model -> Number
totalToolInput state = sum (map (\t -> toolValue (Just t)) state.tools)

environmentMultiplier :: Environment -> Number
environmentMultiplier env 
  = 1.0 
  + getValue env.craftingEnvironment 
  + getValue env.environmentSanctified
  + if env.environmentAttuned then 0.09 else 0.0

effectiveOutput :: Model -> Number
effectiveOutput state = totalInput state * environmentMultiplier state.environment

viewDetail :: Model -> Html Message
viewDetail state = 
  HE.div [ HA.class' "grid" ]
  [ HE.div [ HA.class' "s6"  ] [ crafterDetail state ]
  , HE.div [ HA.class' "s6"  ] [ toolDetail state ]
  , HE.div [ HA.class' "s12" ] [ environmentDetail state ]
  ]
  

crafterDetail :: Model -> Html Message
crafterDetail state =
  HE.article_
  [ HE.h3_ "Workers"
  , HE.div [ HA.class' "grid" ]
    (  mkRow3 (HE.strong_ [HE.text "Worker"]) (HE.strong_ [HE.text "Worker Type"]) (HE.strong_ [HE.text "Value per week"])
    <> mkRow3 (HE.text "Crafter") (mkSelect "crafter-type" CrafterTypeChanged (getAll :: Array CrafterType) (Just state.crafterType)) (HE.text (showGPs (getCrafterValue state)))
    <> concatMap (mkAssistant state) [0, 1, 2, 3, 4] 
    <> mkRow3 (HE.text "Magic Item Adept") (mkCheckbox "item-adept" ItemAdeptChecked state.itemAdept) (HE.text "------------")
    <> mkRow3 (HE.text "Mythic Tool") (mkCheckbox "mythic-tool" MythicToolChecked state.mythicTool) (HE.text (showGPs (totalCraftingInput state)))
    )
  ] 

mkRow3 :: Html Message -> Html Message -> Html Message -> Array (Html Message)
mkRow3 caption content postscript =
  [ HE.div [ HA.class' "s3" ] [ caption ]
  , HE.div [ HA.class' "s6" ] [ content ]
  , HE.div [ HA.class' "s3" ] [ postscript ]
  ]

mkAssistant :: Model -> Int -> Array (Html Message)
mkAssistant state n = mkRow3 (HE.text ("Assistant " <> show (n + 1))) 
                            (mkSelect ("assistant-type-" <> show n) (AssistantChanged n) (getAll :: Array CrafterType) (index state.assistants n))
                            (HE.text (showGPs (getValue (index state.assistants n))))

getCrafterValue :: Model -> Number
getCrafterValue state =
  let 
    multiplier = if state.mythicTool 
                 then if anyThemed state.tools then 7.0 else 3.0 
                 else 1.0
  in
    getValue state.crafterType * multiplier

anyThemed :: Array ToolRecord -> Boolean
anyThemed tools = any (\t -> t.sanctification == Themed) tools

toolDetail :: Model -> Html Message
toolDetail state =
  HE.article_
  [ HE.h3_ "Tools"
  , HE.div [ HA.class' "grid" ]
    (  mkRow5 (HE.strong_ [HE.text "Tool"]) (HE.strong_ [HE.text "Quality"]) (HE.strong_ [HE.text "Bonus"]) (HE.strong_ [HE.text "Sanctification"]) (HE.strong_ [HE.text "Value per week"])
    <> concatMap (mkTool state) [0, 1, 2, 3, 4]
    <> mkRow5 (HE.text "") (HE.text "") (HE.text "") (HE.text "Total") (HE.text (showGPs (totalToolInput state)))
    ) 
  ]

mkTool :: Model -> Int -> Array (Html Message)
mkTool state n = mkRow5
  (HE.text ("Tool " <> show (n + 1)))
  (mkSelect ("tool-quality-" <> show n) (ToolQualityChanged n) (getAll :: Array ToolQuality) (mQual state n))
  (mkSelect ("tool-bonus-" <> show n) (ToolBonusChanged n) (getAll :: Array ToolBonus) (mBonus state n))
  (mkSelect ("tool-sanctification-" <> show n) (ToolSanctificationChanged n) (getAll :: Array ToolSanctification) (mSanctification state n))
  (HE.text (showGPs (toolValue (index state.tools n))))

mkRow5 :: Html Message -> Html Message -> Html Message -> Html Message -> Html Message -> Array (Html Message)
mkRow5 col1 col2 col3 col4 col5 =
  [ HE.div [ HA.class' "s2" ] [ col1 ]
  , HE.div [ HA.class' "s3" ] [ col2 ]
  , HE.div [ HA.class' "s2" ] [ col3 ]
  , HE.div [ HA.class' "s2" ] [ col4 ]
  , HE.div [ HA.class' "s3" ] [ col5 ]
  ]
  
mQual :: Model -> Int -> Maybe ToolQuality
mQual state n = map (\t -> t.quality) (index state.tools n)
  
mBonus :: Model -> Int -> Maybe ToolBonus
mBonus state n = map (\t -> t.bonus) (index state.tools n)
  
mSanctification :: Model -> Int -> Maybe ToolSanctification
mSanctification state n = map (\t -> t.sanctification) (index state.tools n)

environmentDetail :: Model -> Html Message
environmentDetail state =
  HE.article_
  [ HE.h3_ "Environment"
  , HE.div [ HA.class' "grid" ]
    (  mkRowT (HE.strong_ [ HE.text "Environment" ]) (HE.strong_ [ HE.text "Attunment" ]) (HE.strong_ [ HE.text "Sanctification" ])
    <> mkRowT ( mkSelect "crafting-environment" CraftingEnvironmentChanged (getAll :: Array CraftingEnvironment) (Just state.environment.craftingEnvironment) )
              ( mkCheckbox "environment-attuned" CraftingAttunmentChanged state.environment.environmentAttuned )
              ( mkSelect "crafting-sanctification" CraftingSanctificationChanged (getAll :: Array CraftingSanctification) (Just state.environment.environmentSanctified) )
    )
  ]


mkRowT :: Html Message -> Html Message -> Html Message -> Array (Html Message)
mkRowT caption content postscript =
  [ HE.div [ HA.class' "s4" ] [ caption ]
  , HE.div [ HA.class' "s4" ] [ content ]
  , HE.div [ HA.class' "s4" ] [ postscript ]
  ]