module Main ( main ) where

import Prelude

import Effect (Effect)
import Elmish.Boot (defaultMain)
import Crafting (def)

main :: Effect Unit
main = defaultMain { elementId: "app", def }
