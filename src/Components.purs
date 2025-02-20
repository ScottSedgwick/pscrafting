module Components (textinput) where

import Elmish (Dispatch, ReactElement, (<|))
import Elmish.HTML.Events as E
import Elmish.HTML.Styled as H

type Textdata s m =
  { id     :: String
  , label  :: String
  , getter :: s -> String
  , event  :: String -> m
  }

textinput :: forall (s :: Type). forall (m :: Type). (Textdata s m) -> s -> Dispatch m -> ReactElement
textinput textstate state dispatch =
  H.div "row" 
  [ H.label textstate.id textstate.label
  , H.input_ textstate.id 
    { type: "text"
    , value: textstate.getter state
    , onChange: dispatch <| \event -> textstate.event (E.inputText event)
    }
  ]