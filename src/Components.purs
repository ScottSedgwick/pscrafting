module Components 
  ( Component
  , ComponentAlignment
  , ComponentRarity
  , Message
  , Model
  , init
  , update
  , view
  , componentsValue
  )
  where

-- | This unit is for crafting inputs - crafter type, assistants, tools, workspaces

import Prelude

import Data.Array (concatMap, index, modifyAt)
import Data.Foldable (sum)
import Data.Maybe (Maybe(..))
import Data.Number.Format (fixed, toStringWith)
import Flame (Html)
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE

import Types (class Enumerable, class FromString, class Valueable, fromString, getAll, getValue)
import UiFuncs (mkSelect)

data ComponentRarity
  = NoComponent
  | Common
  | Uncommon
  | Rare
  | VeryRare
  | Legendary

derive instance eqComponentRarity :: Eq ComponentRarity

instance Show ComponentRarity where
  show NoComponent = "None"
  show Common      = "Common"
  show Uncommon    = "Uncommon"
  show Rare        = "Rare"
  show VeryRare    = "Very Rare"
  show Legendary   = "Legendary"

instance FromString ComponentRarity where
  fromString "None"      = NoComponent
  fromString "Common"    = Common
  fromString "Uncommon"  = Uncommon
  fromString "Rare"      = Rare
  fromString "Very Rare" = VeryRare
  fromString "Legendary" = Legendary
  fromString _           = NoComponent

instance Valueable ComponentRarity where
  getValue NoComponent = 0.0
  getValue Common      = 0.5
  getValue Uncommon    = 1.0
  getValue Rare        = 3.0
  getValue VeryRare    = 8.0
  getValue Legendary   = 16.0

instance Enumerable ComponentRarity where
  getAll = [NoComponent, Common, Uncommon, Rare, VeryRare, Legendary]

data ComponentAlignment
  = NoAlignment
  | Thematic
  | Magical
  | Elemental
  | Draconic
  | Divine
  | Unique

derive instance eqComponentAlignment :: Eq ComponentAlignment

instance Show ComponentAlignment where
  show NoAlignment = "None"
  show Thematic    = "Thematic"
  show Magical     = "Magical"
  show Elemental   = "Elemental"
  show Draconic    = "Draconic"
  show Divine      = "Divine"
  show Unique      = "Unique"

instance FromString ComponentAlignment where
  fromString "None"      = NoAlignment
  fromString "Thematic"  = Thematic   
  fromString "Magical"   = Magical    
  fromString "Elemental" = Elemental  
  fromString "Draconic"  = Draconic   
  fromString "Divine"    = Divine     
  fromString "Unique"    = Unique  
  fromString _           = NoAlignment

instance Valueable ComponentAlignment where
  getValue NoAlignment = 1.0
  getValue Thematic    = 1.3
  getValue Magical     = 1.4
  getValue Elemental   = 1.5
  getValue Draconic    = 1.7
  getValue Divine      = 1.9
  getValue Unique      = 4.0

instance Enumerable ComponentAlignment where
  getAll = [NoAlignment, Thematic, Magical, Elemental, Draconic, Divine, Unique]

type Component =
  { rarity :: ComponentRarity
  , alignment :: ComponentAlignment
  }

defComponent :: Component
defComponent = 
  { rarity: NoComponent
  , alignment: NoAlignment
  }

componentValue :: Component -> Number
componentValue c = (getValue c.rarity) * (getValue c.alignment)

mComponentValue :: Maybe Component -> Number
mComponentValue Nothing  = 0.0
mComponentValue (Just c) = componentValue c

type Model = 
  { components :: Array Component
  }

componentsValue :: Model -> Number
componentsValue state = sum (map componentValue state.components)

init :: Model
init = 
  { components : [defComponent, defComponent, defComponent, defComponent, defComponent]
  }

data Message = ComponentRarityChanged Int String
             | ComponentAlignmentChanged Int String

update :: Model -> Message -> Model
update state (ComponentRarityChanged    n s) = changeRarity state n (fromString s)
update state (ComponentAlignmentChanged n s) = changeAlignment state n (fromString s)

changeRarity :: Model -> Int -> ComponentRarity -> Model
changeRarity state n r =
  let
    f c = c { rarity = r }
  in
    case modifyAt n f state.components of
      Nothing -> state
      Just a  -> state { components = a }

changeAlignment :: Model -> Int -> ComponentAlignment -> Model
changeAlignment state n a =
  let
    f c = c { alignment = a }
  in
    case modifyAt n f state.components of
      Nothing -> state
      Just xs -> state { components = xs }

view :: Model -> Html Message
view state =
  HE.article_
  [
    HE.details_
    [ HE.summary_ (viewSummary state)
    , HE.div_ (viewDetail state)
    ]
  ]

viewSummary :: Model -> Html Message
viewSummary state = 
  HE.article [ HA.class' "round primary no-elevate" ] 
  [ HE.div_ [ HE.text ("Component Time Reduction: " <> (toStringWith (fixed 3) (componentsValue state)) <> " weeks.") ]
  ]

viewDetail :: Model -> Html Message
viewDetail state = 
  HE.article_
  [ HE.h3_ "Components"
  , HE.div [HA.class' "grid"] 
    (  mkRow (HE.strong_ [ HE.text "Rarity" ] ) (HE.strong_ [ HE.text "Alignment" ] ) (HE.strong_ [ HE.text "Time reduction" ] )
    <> concatMap (mkComponentRow state) [1,2,3,4,5]
    )
  ]

mkComponentRow :: Model -> Int -> Array (Html Message)
mkComponentRow state n = mkComponentRow' (index state.components n) n

mkComponentRow' :: Maybe Component -> Int -> Array (Html Message)
mkComponentRow' c n = mkRow 
  ( mkSelect ("component-rarity-"    <> show n) (ComponentRarityChanged n)    (getAll :: Array ComponentRarity)    ((\x -> x.rarity) <$> c) )
  ( mkSelect ("component-alignment-" <> show n) (ComponentAlignmentChanged n) (getAll :: Array ComponentAlignment) ((\x -> x.alignment) <$> c) )
  ( HE.text (toStringWith (fixed 3) (mComponentValue c)) )

mkRow :: Html Message -> Html Message -> Html Message -> Array (Html Message)
mkRow caption content postscript =
  [ HE.div [ HA.class' "s4" ] [ caption ]
  , HE.div [ HA.class' "s4" ] [ content ]
  , HE.div [ HA.class' "s4" ] [ postscript ]
  ]