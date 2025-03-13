module Main where

import Prelude

import Crafting (init, view, update, subscribe)
import Effect (Effect)
import Flame (QuerySelector(..))
import Flame.Application.NoEffects as FAN

-- | Mount the application on the given selector
main :: Effect Unit
main = FAN.mount_ (QuerySelector "body") 
       { init
       , view
       , update
       , subscribe
       }
