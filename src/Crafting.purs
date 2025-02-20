module Crafting( def, Message(..), State ) where

import Prelude

import Data.Bifunctor (bimap)
import Elmish (ComponentDef, Dispatch, ReactElement, Transition)
import Elmish.HTML.Styled as H

import CraftingInputs as I

data Message = Input I.Message 
             | PageChange

type State = { inputs :: I.State }

init :: Transition Message State
init = pure { inputs: I.init }


update :: State -> Message -> Transition Message State
update state (Input m)  = bimap Input state { inputs = _ } $ I.update state.inputs m
update state PageChange = pure state

view :: State -> Dispatch Message -> ReactElement
view s dispatch = 
  H.div "row"
  [ H.div "col-3"
    [ H.div "" "Count"
    , I.view s.inputs (dispatch <<< Input)
    ]
  , H.div "col-3"
    [ H.div "" s.inputs.count
    ]
  ]

def :: ComponentDef Message State
def = { init, update, view }