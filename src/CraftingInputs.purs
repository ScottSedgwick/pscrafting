module CraftingInputs (Message, State, init, update, view) where

import Prelude

import Elmish (Dispatch, ReactElement, Transition)
import Elmish.HTML.Styled as H

import Components (textinput)

data Message = WordChanged String

type State = { count :: String }

init :: State
init = { count : "World" }

update :: State -> Message -> Transition Message State
update state (WordChanged s) = pure state { count = s }

view :: State -> Dispatch Message -> ReactElement
view state dispatch =
  H.div "row"
  [ H.div "col-3"
    [ textinput {id: "name", label: "Name", getter: (\s -> s.count), event: WordChanged} state dispatch
    ]
  ]

-- dropdown :: Boolean -> Array String -> Maybe String -> State -> ReactElement
-- dropdown isOpen availableItems selectedItem st =
--   H.div "row"
--   [ H.button_
--     [ H.text $ fromMaybe "Click me to view some items" selectedItem 
--     , if isOpen
--       then H.ul ((\item -> H.li "" { text: item }) <$> availableItems)
--       else H.text ""
--     ]
--   ]