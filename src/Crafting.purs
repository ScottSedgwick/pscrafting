module Crafting( Message, Model, init, update, view, subscribe ) where

-- | This unit is the master view - it pulls all the other views together

import Prelude

import BasicItem as BI
import Components as CM
import CraftingInputs as CI
import Flame (Html, Subscription)
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Flame.Html.Event as HV
import ItemImprovement as II
import MagicItem as MI
import Potion as P
import Scroll as S
import Types (Tabs(..), getAll)

-- | The model represents the state of the app
type Model = 
    { craftingInputs :: CI.Model
    , activeTab :: Tabs
    , basicItem :: BI.Model
    , magicItem :: MI.Model
    , itemImprovement :: II.Model
    , components :: CM.Model
    , potion :: P.Model
    , scroll :: S.Model
    }

-- | Data type used to represent events
data Message = CraftingInputMessage CI.Message
             | TabChange Tabs
             | BasicItemMessage BI.Message
             | MagicItemMessage MI.Message
             | ItemImprovementMessage II.Message
             | ComponentsMessage CM.Message
             | PotionsMessage P.Message
             | ScrollsMessage S.Message

-- | Initial state of the app
init :: Model
init = { craftingInputs: CI.init
       , activeTab: TabBasicItem
       , basicItem: BI.init
       , magicItem: MI.init
       , itemImprovement: II.init
       , components: CM.init
       , potion: P.init
       , scroll: S.init
       }

-- | `update` is called to handle events
update :: Model -> Message -> Model
update model = case _ of
      CraftingInputMessage m -> model { craftingInputs = CI.update model.craftingInputs m }
      TabChange m -> model { activeTab = m }
      BasicItemMessage m -> model { basicItem = BI.update model.basicItem m }
      MagicItemMessage m -> model { magicItem = MI.update model.magicItem m }
      ItemImprovementMessage m -> model { itemImprovement = II.update model.itemImprovement m }
      ComponentsMessage m -> model { components = CM.update model.components m }
      PotionsMessage m -> model { potion = P.update model.potion m }
      ScrollsMessage m -> model { scroll = S.update model.scroll m }

-- | `view` is called whenever the model is updated
view :: Model -> Html Message
view model = 
    HE.main "main"
    [ HE.h1_ [ HE.text "Crafting Calculator" ]
    , HE.article_
      [ CraftingInputMessage <$> CI.view model.craftingInputs 
      , ComponentsMessage <$> CM.view model.components 
      , HE.article_
        ( [ HE.div [ HA.class' "tabs" ] ( map (mkTab model) (getAll :: Array Tabs) )
          ]  <> map (mkTabContent model) (getAll :: Array Tabs)
        )
      ]
    ]

mkTab :: Model -> Tabs -> Html Message
mkTab model tab = 
  let
    classes = if (model.activeTab == tab) then "active" else "inactive"
  in
    HE.button [HA.class' classes, HV.onClick (TabChange tab), HA.selected (model.activeTab == tab)] [HE.text (show tab)]

mkTabContent :: Model -> Tabs -> Html Message
mkTabContent model tab =
  let 
    classes = if (model.activeTab == tab) then "page padding active" else "page padding"
    output = CI.effectiveOutput model.craftingInputs
    reduction = CM.componentsValue model.components
    asstCost = CI.weeklyCost model.craftingInputs
    adept = model.craftingInputs.itemAdept
    localview = 
      case tab of
        TabBasicItem -> BasicItemMessage <$> BI.view output reduction asstCost model.basicItem
        TabMagicItem -> MagicItemMessage <$> MI.view output reduction asstCost adept model.magicItem
        TabItemImprovement -> ItemImprovementMessage <$> II.view output reduction asstCost model.itemImprovement
        TabPotion -> PotionsMessage <$> P.view output reduction asstCost model.potion
        TabScroll -> ScrollsMessage <$> S.view output reduction asstCost model.scroll
  in
    HE.div [ HA.class' classes ]
    [ localview ]

-- | Events that come from outside the `view`
subscribe :: Array (Subscription Message)
subscribe = []