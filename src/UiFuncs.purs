module UiFuncs where

import Prelude
import Data.Int (round)
import Data.Maybe (Maybe(..))
import Data.Number.Format (fixed, toStringWith)
import Flame (Html)
import Flame.Html.Attribute as HA
import Flame.Html.Element as HE
import Flame.Html.Event as HV

import CommonCalculations (fromStr)

mkSelect :: forall a b. Show a => Eq a => String -> (String -> b) -> Array a -> Maybe a -> Html b
mkSelect id msg opts value = 
  let
    mkOption x = HE.option [ HA.value (show x), HA.selected (Just x == value) ] (show x)
  in
    HE.select [ HA.id id, HV.onInput msg, HA.class' "width90" ] (map mkOption opts)

mkCheckbox :: forall a. String -> (Boolean -> a) -> Boolean -> Html a
mkCheckbox id msg value = 
  HE.input [HA.type' "checkbox", HA.id id, HA.checked value, HV.onCheck msg, HA.class' "width90" ]

mkNumber :: forall a. String -> (Int -> a) -> Int -> Html a
mkNumber id msg value = 
  HE.input [HA.type' "number", HA.id id, HA.value (show value), HV.onInput (\x -> msg (fromStr x)) ]

showGPs :: Number -> String
showGPs n = show (round n) <> " gp"

showHours :: Number -> String
showHours weeks = toStringWith (fixed 2) (weeks * 56.0)

showWeeks :: Number -> String
showWeeks weeks = toStringWith (fixed 3) weeks

tooltipCaption :: forall a. String -> String -> Html a
tooltipCaption tooltip caption = HE.span [ HA.createAttribute "data-tooltip" tooltip ] [ HE.text caption ]