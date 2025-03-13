module Potion 
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
import Types (Tabs(..))

data Message 
  = NullMessage

type Model =
  { name :: String
  }

init :: Model
init = { name: show TabPotion
       }

update :: Model -> Message -> Model
update state _ = state

view :: Number -> Number -> Number -> Model -> Html Message
view output reduction asstCost state = 
  HE.text (state.name <> " : Not done yet")