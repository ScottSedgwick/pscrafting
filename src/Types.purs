module Types
  ( CrafterType(..)
  , CraftingEnvironment(..)
  , CraftingSanctification(..)
  , Environment(..)
  , Rarity(..)
  , Tabs(..)
  , ToolRecord(..)
  , ToolBonus(..)
  , ToolQuality(..)
  , ToolSanctification(..)
  , class Enumerable
  , class FromString
  , class Valueable
  , attunementValue
  , defEnvironment
  , defTool
  , fromString
  , getAll
  , getMaybeRarity
  , getValue
  , toolValue
  )
  where

import Prelude

import Data.Foldable (sum)
import Data.Maybe (Maybe(..))

class FromString a where
  fromString :: String -> a

class Valueable a where
  getValue :: a -> Number

instance Valueable a => Valueable (Maybe a) where
  getValue Nothing  = 0.0
  getValue (Just x) = getValue x

instance Valueable a => Valueable (Array a) where
  getValue a = sum (map getValue a)

class Enumerable a where
  getAll :: Array a

-- ############## CrafterType ##############
data CrafterType = NoCrafter
                 | Unskilled
                 | PartlySkilled
                 | Skilled
                 | PlayerCharacter
                 | Expertise
                 | Artificer
                 | Specialist

derive instance eqCrafterType :: Eq CrafterType

instance Show CrafterType where
  show NoCrafter       = "None"
  show Unskilled       = "Unskilled"
  show PartlySkilled   = "Partially Skilled"
  show Skilled         = "Skilled"
  show PlayerCharacter = "Player Character"
  show Expertise       = "Expertise"
  show Artificer       = "Artificer (non-specialist)"
  show Specialist      = "Artificer (specialist)"

instance FromString CrafterType where
  fromString "None"                       = NoCrafter
  fromString "Unskilled"                  = Unskilled
  fromString "Partially Skilled"          = PartlySkilled
  fromString "Skilled"                    = Skilled
  fromString "Player Character"           = PlayerCharacter
  fromString "Expertise"                  = Expertise
  fromString "Artificer (non-specialist)" = Artificer
  fromString "Artificer (specialist)"     = Specialist
  fromString _                            = NoCrafter

instance Valueable CrafterType where
  getValue NoCrafter       = 0.0
  getValue Unskilled       = 5.0
  getValue PartlySkilled   = 7.0
  getValue Skilled         = 15.0
  getValue PlayerCharacter = 25.0
  getValue Expertise       = 30.0
  getValue Artificer       = 50.0
  getValue Specialist      = 100.0

instance Enumerable CrafterType where
  getAll = [NoCrafter, Unskilled, PartlySkilled, Skilled, PlayerCharacter, Expertise, Artificer, Specialist]

-- ############## ToolQuality ##############
data ToolQuality = TqNone
                 | TqSubStandard
                 | TqStandard
                 | TqAdvanced
                 | TqMasterwork

derive instance eqToolQuality :: Eq ToolQuality

instance Show ToolQuality where
  show TqNone        = "None"
  show TqSubStandard = "SubStandard"
  show TqStandard    = "Standard"
  show TqAdvanced    = "Advanced"
  show TqMasterwork  = "Masterwork"

instance FromString ToolQuality where
  fromString "SubStandard" = TqSubStandard
  fromString "Standard"    = TqStandard
  fromString "Advanced"    = TqAdvanced
  fromString "Masterwork"  = TqMasterwork
  fromString _             = TqNone

instance Valueable ToolQuality where
  getValue TqNone        = 0.0
  getValue TqSubStandard = -10.0
  getValue TqStandard    = 0.0
  getValue TqAdvanced    = 10.0
  getValue TqMasterwork  = 15.0

instance Enumerable ToolQuality where
  getAll = [TqNone, TqSubStandard, TqStandard, TqAdvanced, TqMasterwork]

-- ############## ToolBonus ##############
data ToolBonus = NoToolBonus
               | PlusZero
               | PlusOne
               | PlusTwo
               | PlusThree

derive instance eqToolBonus :: Eq ToolBonus

instance Show ToolBonus where
  show NoToolBonus = "None"
  show PlusZero    = "Magical"
  show PlusOne     = "PlusOne"
  show PlusTwo     = "PlusTwo"
  show PlusThree   = "PlusThree"

instance FromString ToolBonus where
  fromString "None"      = NoToolBonus
  fromString "Magical"   = PlusZero
  fromString "PlusOne"   = PlusOne
  fromString "PlusTwo"   = PlusTwo
  fromString "PlusThree" = PlusThree
  fromString _           = NoToolBonus

instance Valueable ToolBonus where
  getValue NoToolBonus = 0.0
  getValue PlusZero    = 5.0
  getValue PlusOne     = 10.0
  getValue PlusTwo     = 15.0
  getValue PlusThree   = 20.0

instance Enumerable ToolBonus where
  getAll = [NoToolBonus, PlusZero, PlusOne, PlusTwo, PlusThree]

-- ############## ToolSanctification ##############
data ToolSanctification = NoSanctification
                        | Basic
                        | Themed

derive instance eqToolSanctification :: Eq ToolSanctification

instance Show ToolSanctification where
  show NoSanctification = "None"
  show Basic            = "Basic"
  show Themed           = "Themed"

instance FromString ToolSanctification where
  fromString "Basic"  = Basic
  fromString "Themed" = Themed
  fromString _        = NoSanctification

instance Valueable ToolSanctification where
  getValue NoSanctification = 0.0
  getValue Basic            = 25.0
  getValue Themed           = 50.0

instance Enumerable ToolSanctification where
  getAll = [NoSanctification, Basic, Themed]

-- ############## Tool ##############

type ToolRecord = 
  { quality :: ToolQuality
  , bonus :: ToolBonus
  , sanctification :: ToolSanctification
  }

defTool :: ToolRecord
defTool = 
  { quality : TqNone
  , bonus : NoToolBonus
  , sanctification : NoSanctification
  }

toolValue :: Maybe ToolRecord -> Number
toolValue Nothing  = 0.0
toolValue (Just t) = getValue t.quality + getValue t.bonus + getValue t.sanctification

-- ############## CraftingEnvironment ##############

data CraftingEnvironment 
  = CeVeryCrude
  | CeCrude
  | CeBasic
  | CeAdvanced
  | CeExpert
  | CeApex

derive instance eqCraftingEnvironment :: Eq CraftingEnvironment

instance Show CraftingEnvironment where
  show CeVeryCrude = "Very Crude"
  show CeCrude     = "Crude"
  show CeBasic     = "Basic"
  show CeAdvanced  = "Advanced"
  show CeExpert    = "Expert"
  show CeApex      = "Apex"

instance FromString CraftingEnvironment where
  fromString "Very Crude" = CeVeryCrude
  fromString "Crude"      = CeCrude
  fromString "Basic"      = CeBasic
  fromString "Advanced"   = CeAdvanced
  fromString "Expert"     = CeExpert
  fromString "Apex"       = CeApex
  fromString _            = CeBasic

instance Valueable CraftingEnvironment where
  getValue CeVeryCrude = -0.27
  getValue CeCrude     = -0.18
  getValue CeBasic     = 0.0
  getValue CeAdvanced  = 0.18
  getValue CeExpert    = 0.27
  getValue CeApex      = 0.35

instance Enumerable CraftingEnvironment where
  getAll = [CeVeryCrude, CeCrude, CeBasic, CeAdvanced, CeExpert, CeApex]

-- ############## CraftingSanctification ##############

data CraftingSanctification
  = CsNone
  | CsBasic
  | CsThemed

derive instance eqCraftingSanctification :: Eq CraftingSanctification

instance Show CraftingSanctification where
  show CsNone   = "None"
  show CsBasic  = "Basic"
  show CsThemed = "Themed"

instance FromString CraftingSanctification where
  fromString "None"   = CsNone
  fromString "Basic"  = CsBasic
  fromString "Themed" = CsThemed
  fromString _        = CsNone

instance Valueable CraftingSanctification where
  getValue CsNone   = 0.0
  getValue CsBasic  = 0.09
  getValue CsThemed = 0.27

instance Enumerable CraftingSanctification where
  getAll = [CsNone, CsBasic, CsThemed]

-- ############## Environment ##############

type Environment =
  { craftingEnvironment :: CraftingEnvironment
  , environmentAttuned :: Boolean
  , environmentSanctified :: CraftingSanctification
  }

defEnvironment :: Environment
defEnvironment =
  { craftingEnvironment : CeBasic
  , environmentAttuned : false
  , environmentSanctified : CsNone
  }

attunementValue :: Boolean -> Number
attunementValue false = 0.0
attunementValue true  = 0.09

-- ############## Tabs ##############

data Tabs 
  = TabBasicItem
  | TabMagicItem
  | TabItemImprovement
  | TabPotion
  | TabScroll

derive instance eqTabs :: Eq Tabs

instance Show Tabs where
  show TabBasicItem = "Item Construction"
  show TabMagicItem = "Magic Item Creation"
  show TabItemImprovement = "Item Improvement"
  show TabPotion = "Potions"
  show TabScroll = "Scrolls"

instance Enumerable Tabs where
  getAll = [TabBasicItem, TabItemImprovement, TabMagicItem, TabPotion, TabScroll]

-- ############## Rarity ##############

data Rarity
  = Common
  | Uncommon
  | Rare
  | VeryRare
  | Legendary

derive instance eqRarity :: Eq Rarity

instance Show Rarity where
  show Common      = "Common"
  show Uncommon    = "Uncommon"
  show Rare        = "Rare"
  show VeryRare    = "Very Rare"
  show Legendary   = "Legendary"

instance FromString Rarity where
  fromString "Common"    = Common
  fromString "Uncommon"  = Uncommon
  fromString "Rare"      = Rare
  fromString "Very Rare" = VeryRare
  fromString "Legendary" = Legendary
  fromString _           = Common


instance Valueable Rarity where
  getValue Common    = 100.0
  getValue Uncommon  = 200.0
  getValue Rare      = 1000.0
  getValue VeryRare  = 2500.0
  getValue Legendary = 5000.0

-- | Item Rarity | Work Weeks | Base Cost | Min Level |
-- | ----------- | ---------- | --------- | --------- |
-- | Common      | 1          | 100 GP    | 3rd       |
-- | Uncommon    | 2          | 200 GP    | 3rd       |
-- | Rare        | 10         | 1,000 GP  | 6th       |
-- | Very rare   | 25         | 2,500 GP  | 11th      |
-- | Legendary   | 50+        | 5,000+ GP | 17th      |

instance Enumerable Rarity where
  getAll = [Common, Uncommon, Rare, VeryRare, Legendary]

getMaybeRarity :: Maybe Rarity -> Number
getMaybeRarity r = getValue r