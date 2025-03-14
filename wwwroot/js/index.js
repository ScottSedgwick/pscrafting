(() => {
  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };
  var fromStringAsImpl = function(just) {
    return function(nothing) {
      return function(radix) {
        var digits;
        if (radix < 11) {
          digits = "[0-" + (radix - 1).toString() + "]";
        } else if (radix === 11) {
          digits = "[0-9a]";
        } else {
          digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
        }
        var pattern = new RegExp("^[\\+\\-]?" + digits + "+$", "i");
        return function(s) {
          if (pattern.test(s)) {
            var i = parseInt(s, radix);
            return (i | 0) === i ? just(i) : nothing;
          } else {
            return nothing;
          }
        };
      };
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq4) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq4 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;
  var eqCharImpl = refEq;

  // output/Data.Eq/index.js
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };
  var numAdd = function(n1) {
    return function(n2) {
      return n1 + n2;
    };
  };
  var numMul = function(n1) {
    return function(n2) {
      return n1 * n2;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringNumber = {
    add: numAdd,
    zero: 0,
    mul: numMul,
    one: 1
  };
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ring/index.js
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };

  // output/Data.Ord/index.js
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var max = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare3(x)(y);
        if (v instanceof LT) {
          return y;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return x;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
      };
    };
  };
  var min = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare3(x)(y);
        if (v instanceof LT) {
          return x;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return y;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 172, column 3 - line 175, column 12): " + [v.constructor.name]);
      };
    };
  };
  var clamp = function(dictOrd) {
    var min1 = min(dictOrd);
    var max1 = max(dictOrd);
    return function(low) {
      return function(hi) {
        return function(x) {
          return min1(hi)(max1(low)(x));
        };
      };
    };
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result = new Array(l * k);
      var n = 0;
      for (var i = 0; i < l; i++) {
        var f = fs[i];
        for (var j = 0; j < k; j++) {
          result[n++] = f(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map11 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply1(map11($$const(identity2))(a))(b);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var when = function(dictApplicative) {
    var pure1 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure1(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure1 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply2(pure1(f))(a);
      };
    };
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      function(c, i) {
        switch (c) {
          case '"':
          case "\\":
            return "\\" + c;
          case "\x07":
            return "\\a";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "	":
            return "\\t";
          case "\v":
            return "\\v";
        }
        var k = i + 1;
        var empty4 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty4;
      }
    ) + '"';
  };

  // output/Data.Show/index.js
  var showUnit = {
    show: function(v) {
      return "unit";
    }
  };
  var showString = {
    show: showStringImpl
  };
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var fromMaybe = function(a) {
    return maybe(a)(identity3);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var eqMaybe = function(dictEq) {
    var eq4 = eq(dictEq);
    return {
      eq: function(x) {
        return function(y) {
          if (x instanceof Nothing && y instanceof Nothing) {
            return true;
          }
          ;
          if (x instanceof Just && y instanceof Just) {
            return eq4(x.value0)(y.value0);
          }
          ;
          return false;
        };
      }
    };
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var round = Math.round;

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromStringAs = /* @__PURE__ */ function() {
    return fromStringAsImpl(Just.create)(Nothing.value);
  }();
  var fromString = /* @__PURE__ */ fromStringAs(10);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var round2 = function($37) {
    return unsafeClamp(round($37));
  };

  // output/CommonCalculations/index.js
  var fromStr = function(s) {
    var v = fromString(s);
    if (v instanceof Nothing) {
      return 0;
    }
    ;
    if (v instanceof Just) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at CommonCalculations (line 28, column 3 - line 30, column 17): " + [v.constructor.name]);
  };
  var calcCraftingCost = function(costPrice) {
    return function(craftingTimeInWeeks) {
      return function(asstCostPerWeek) {
        return asstCostPerWeek * craftingTimeInWeeks + costPrice;
      };
    };
  };
  var calcCostPrice = function(basePrice) {
    return toNumber(basePrice) * 0.15;
  };
  var calcCraftingTime = function(basePrice) {
    return function(crafterOutput) {
      return function(componentReduction) {
        var costPrice = calcCostPrice(basePrice);
        var result = costPrice / crafterOutput - componentReduction;
        var $8 = result < 0;
        if ($8) {
          return 0;
        }
        ;
        return result;
      };
    };
  };

  // output/Flame.Html.Attribute.Internal/foreign.js
  var classData = 2;
  var propertyData = 3;
  var attributeData = 4;
  function createProperty(name3) {
    return function(value2) {
      return [propertyData, name3, value2];
    };
  }
  function createAttribute(name3) {
    return function(value2) {
      return [attributeData, name3, value2];
    };
  }
  function createClass(array) {
    return [classData, array];
  }

  // output/Data.Array/foreign.js
  var replicateFill = function(count, value2) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value2);
  };
  var replicatePolyfill = function(count, value2) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value2;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons2(head2, tail2) {
      this.head = head2;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head2) {
      return function(tail2) {
        return new Cons2(head2, tail2);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr2, xs) {
      return listToArray(foldr2(curryCons)(emptyList)(xs));
    };
  }();
  var indexImpl = function(just, nothing, xs, i) {
    return i < 0 || i >= xs.length ? nothing : just(xs[i]);
  };
  var _updateAt = function(just, nothing, i, a, l) {
    if (i < 0 || i >= l.length)
      return nothing;
    var l1 = l.slice();
    l1[i] = a;
    return just(l1);
  };
  var filterImpl = function(f, xs) {
    return xs.filter(f);
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to3) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to3 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
      if (to3 - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to3);
      i = from3;
      j = mid;
      k = from3;
      while (i < mid && j < to3) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to3) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2, fromOrdering, xs) {
      var out;
      if (xs.length < 2)
        return xs;
      out = xs.slice(0);
      mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
      return out;
    };
  }();

  // output/Control.Bind/foreign.js
  var arrayBind = typeof Array.prototype.flatMap === "function" ? function(arr) {
    return function(f) {
      return arr.flatMap(f);
    };
  } : function(arr) {
    return function(f) {
      var result = [];
      var l = arr.length;
      for (var i = 0; i < l; i++) {
        var xs = f(arr[i]);
        var k = xs.length;
        for (var j = 0; j < k; j++) {
          result.push(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind2 = bind(dictMonad.Bind1());
    var pure4 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind2(f)(function(f$prime) {
          return bind2(a)(function(a$prime) {
            return pure4(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name3, moduleName, init11) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init11();
      state2 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$new = _new;

  // output/Data.Array.ST/foreign.js
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to3) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to3 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
      if (to3 - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to3);
      i = from3;
      j = mid;
      k = from3;
      while (i < mid && j < to3) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to3) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2, fromOrdering, xs) {
      if (xs.length < 2)
        return xs;
      mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
      return xs;
    };
  }();

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b) {
    return !b;
  };

  // output/Data.HeytingAlgebra/index.js
  var not = function(dict) {
    return dict.not;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a) {
      return function(b) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init11) {
      return function(xs) {
        var acc = init11;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init11) {
      return function(xs) {
        var acc = init11;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();

  // output/Data.Monoid.Disj/index.js
  var Disj = function(x) {
    return x;
  };
  var semigroupDisj = function(dictHeytingAlgebra) {
    var disj2 = disj(dictHeytingAlgebra);
    return {
      append: function(v) {
        return function(v1) {
          return disj2(v)(v1);
        };
      }
    };
  };
  var monoidDisj = function(dictHeytingAlgebra) {
    var semigroupDisj1 = semigroupDisj(dictHeytingAlgebra);
    return {
      mempty: ff(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupDisj1;
      }
    };
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v) {
            return coerce2;
          };
        };
      };
    };
  };

  // output/Data.Foldable/index.js
  var alaF2 = /* @__PURE__ */ alaF()()()();
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond2 = applySecond(dictApplicative.Apply0());
    var pure4 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr2 = foldr(dictFoldable);
      return function(f) {
        return foldr2(function($454) {
          return applySecond2(f($454));
        })(pure4(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_1 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_1(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var sum = function(dictFoldable) {
    var foldl2 = foldl(dictFoldable);
    return function(dictSemiring) {
      return foldl2(add(dictSemiring))(zero(dictSemiring));
    };
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr2 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append8 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldr2(function(x) {
          return function(acc) {
            return append8(f(x))(acc);
          };
        })(mempty2);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var any = function(dictFoldable) {
    var foldMap2 = foldMap(dictFoldable);
    return function(dictHeytingAlgebra) {
      return alaF2(Disj)(foldMap2(monoidDisj(dictHeytingAlgebra)));
    };
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn2 = function(fn) {
    return function(a) {
      return function(b) {
        return fn(a, b);
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return fn(a, b, c, d);
          };
        };
      };
    };
  };
  var runFn5 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return function(e) {
              return fn(a, b, c, d, e);
            };
          };
        };
      };
    };
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map11) {
        return function(pure4) {
          return function(f) {
            return function(array) {
              function go(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure4([]);
                  case 1:
                    return map11(array1)(f(array[bot]));
                  case 2:
                    return apply2(map11(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map11(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply2(map11(concat2)(go(bot, pivot)))(go(pivot, top3));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Array/index.js
  var updateAt = /* @__PURE__ */ function() {
    return runFn5(_updateAt)(Just.create)(Nothing.value);
  }();
  var singleton2 = function(a) {
    return [a];
  };
  var index = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var modifyAt = function(i) {
    return function(f) {
      return function(xs) {
        var go = function(x) {
          return updateAt(i)(f(x))(xs);
        };
        return maybe(Nothing.value)(go)(index(xs)(i));
      };
    };
  };
  var filter = /* @__PURE__ */ runFn2(filterImpl);
  var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _singleton = function(fallback) {
    return hasFromCodePoint ? String.fromCodePoint : fallback;
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Enum/index.js
  var bottom1 = /* @__PURE__ */ bottom(boundedChar);
  var top1 = /* @__PURE__ */ top(boundedChar);
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var toEnumWithDefaults = function(dictBoundedEnum) {
    var toEnum1 = toEnum(dictBoundedEnum);
    var fromEnum1 = fromEnum(dictBoundedEnum);
    var bottom22 = bottom(dictBoundedEnum.Bounded0());
    return function(low) {
      return function(high) {
        return function(x) {
          var v = toEnum1(x);
          if (v instanceof Just) {
            return v.value0;
          }
          ;
          if (v instanceof Nothing) {
            var $140 = x < fromEnum1(bottom22);
            if ($140) {
              return low;
            }
            ;
            return high;
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
        };
      };
    };
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
      return new Just(fromCharCode(v));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

  // output/Data.String.CodeUnits/foreign.js
  var singleton3 = function(c) {
    return c;
  };
  var length2 = function(s) {
    return s.length;
  };
  var drop = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i) {
    return function(s) {
      if (i >= 0 && i < s.length)
        return s.charAt(i);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.Common/foreign.js
  var split = function(sep) {
    return function(s) {
      return s.split(sep);
    };
  };
  var toLower = function(s) {
    return s.toLowerCase();
  };
  var toUpper = function(s) {
    return s.toUpperCase();
  };

  // output/Data.String.Common/index.js
  var $$null = function(s) {
    return s === "";
  };

  // output/Data.String.CodePoints/index.js
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var div2 = /* @__PURE__ */ div(euclideanRingInt);
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons = function(s) {
    var v = length2(s);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum2(charAt(0)(s)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum2(charAt(1)(s));
    var cu0 = fromEnum2(charAt(0)(s));
    var $43 = isLead(cu0) && isTrail(cu1);
    if ($43) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop(2)(s)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop(1)(s)
    });
  };
  var fromCharCode2 = /* @__PURE__ */ function() {
    var $75 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
    return function($76) {
      return singleton3($75($76));
    };
  }();
  var singletonFallback = function(v) {
    if (v <= 65535) {
      return fromCharCode2(v);
    }
    ;
    var lead = div2(v - 65536 | 0)(1024) + 55296 | 0;
    var trail = mod2(v - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode2(lead) + fromCharCode2(trail);
  };
  var singleton4 = /* @__PURE__ */ _singleton(singletonFallback);

  // output/Data.String.Regex/foreign.js
  var regexImpl = function(left) {
    return function(right) {
      return function(s1) {
        return function(s2) {
          try {
            return right(new RegExp(s1, s2));
          } catch (e) {
            return left(e.message);
          }
        };
      };
    };
  };
  var _replaceBy = function(just) {
    return function(nothing) {
      return function(r) {
        return function(f) {
          return function(s) {
            return s.replace(r, function(match) {
              var groups = [];
              var group4, i = 1;
              while (typeof (group4 = arguments[i++]) !== "number") {
                groups.push(group4 == null ? nothing : just(group4));
              }
              return f(match)(groups);
            });
          };
        };
      };
    };
  };

  // output/Data.String.Regex.Flags/index.js
  var global = {
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    sticky: false,
    unicode: false
  };

  // output/Data.String.Regex/index.js
  var replace$prime = /* @__PURE__ */ function() {
    return _replaceBy(Just.create)(Nothing.value);
  }();
  var renderFlags = function(v) {
    return function() {
      if (v.global) {
        return "g";
      }
      ;
      return "";
    }() + (function() {
      if (v.ignoreCase) {
        return "i";
      }
      ;
      return "";
    }() + (function() {
      if (v.multiline) {
        return "m";
      }
      ;
      return "";
    }() + (function() {
      if (v.dotAll) {
        return "s";
      }
      ;
      return "";
    }() + (function() {
      if (v.sticky) {
        return "y";
      }
      ;
      return "";
    }() + function() {
      if (v.unicode) {
        return "u";
      }
      ;
      return "";
    }()))));
  };
  var regex = function(s) {
    return function(f) {
      return regexImpl(Left.create)(Right.create)(s)(renderFlags(f));
    };
  };

  // output/Foreign.Object/foreign.js
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Flame.Html.Attribute.Internal/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var crashWith2 = /* @__PURE__ */ crashWith();
  var show2 = /* @__PURE__ */ show(showString);
  var map2 = /* @__PURE__ */ map(functorArray);
  var toClassListString = {
    to: /* @__PURE__ */ function() {
      var $46 = filter(function() {
        var $49 = not(heytingAlgebraBoolean);
        return function($50) {
          return $49($$null($50));
        };
      }());
      var $47 = split(" ");
      return function($48) {
        return $46($47($48));
      };
    }()
  };
  var value = /* @__PURE__ */ createProperty("value");
  var type$prime = /* @__PURE__ */ createProperty("type");
  var to = function(dict) {
    return dict.to;
  };
  var name = /* @__PURE__ */ createProperty("name");
  var id = /* @__PURE__ */ createProperty("id");
  var $$for = /* @__PURE__ */ createAttribute("for");
  var caseify = function(name$prime) {
    if (name$prime === toUpper(name$prime)) {
      return toLower(name$prime);
    }
    ;
    if (otherwise) {
      var v = fromJust2(uncons(name$prime));
      var replacer = function($133) {
        return $$const(function(v1) {
          return "-" + v1;
        }(toLower($133)));
      };
      var regex2 = function() {
        var v1 = regex("[A-Z]")(global);
        if (v1 instanceof Right) {
          return v1.value0;
        }
        ;
        if (v1 instanceof Left) {
          return crashWith2(show2(v1.value0));
        }
        ;
        throw new Error("Failed pattern match at Flame.Html.Attribute.Internal (line 90, column 40 - line 92, column 57): " + [v1.constructor.name]);
      }();
      var hyphenated = replace$prime(regex2)(replacer)(v.tail);
      return toLower(singleton4(v.head)) + hyphenated;
    }
    ;
    throw new Error("Failed pattern match at Flame.Html.Attribute.Internal (line 83, column 1 - line 83, column 26): " + [name$prime.constructor.name]);
  };
  var class$prime = function(dictToClassList) {
    var $134 = map2(caseify);
    var $135 = to(dictToClassList);
    return function($136) {
      return createClass($134($135($136)));
    };
  };
  var booleanToFalsyString = function(v) {
    if (v) {
      return "true";
    }
    ;
    if (!v) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at Flame.Html.Attribute.Internal (line 66, column 7 - line 68, column 23): " + [v.constructor.name]);
  };
  var checked = /* @__PURE__ */ function() {
    var $140 = createProperty("checked");
    return function($141) {
      return $140(booleanToFalsyString($141));
    };
  }();
  var selected = /* @__PURE__ */ function() {
    var $170 = createProperty("selected");
    return function($171) {
      return $170(booleanToFalsyString($171));
    };
  }();

  // output/Flame.Html.Element/foreign.js
  var textNode = 1;
  var elementNode = 2;
  var styleData = 1;
  var classData2 = 2;
  var propertyData2 = 3;
  var attributeData2 = 4;
  var keyData = 7;
  function createElementNode(tag) {
    return function(nodeData) {
      return function(potentialChildren) {
        let children = potentialChildren, text2 = void 0;
        if (potentialChildren.length === 1 && potentialChildren[0].nodeType == textNode) {
          children = void 0;
          text2 = potentialChildren[0].text;
        }
        return {
          nodeType: elementNode,
          node: void 0,
          tag,
          nodeData: fromNodeData(nodeData),
          children,
          text: text2
        };
      };
    };
  }
  function createDatalessElementNode(tag) {
    return function(potentialChildren) {
      let children = potentialChildren, text2 = void 0;
      if (potentialChildren.length === 1 && potentialChildren[0].nodeType == textNode) {
        children = void 0;
        text2 = potentialChildren[0].text;
      }
      return {
        nodeType: elementNode,
        node: void 0,
        tag,
        nodeData: {},
        children,
        text: text2
      };
    };
  }
  function createSingleElementNode(tag) {
    return function(nodeData) {
      return {
        nodeType: elementNode,
        node: void 0,
        tag,
        nodeData: fromNodeData(nodeData)
      };
    };
  }
  function text(value2) {
    return {
      nodeType: textNode,
      node: void 0,
      text: value2
    };
  }
  function fromNodeData(allData) {
    let nodeData = {};
    if (allData !== void 0)
      for (let data of allData) {
        let dataOne = data[1];
        switch (data[0]) {
          case styleData:
            if (nodeData.styles === void 0)
              nodeData.styles = {};
            for (let key in dataOne)
              nodeData.styles[key] = dataOne[key];
            break;
          case classData2:
            if (nodeData.classes === void 0)
              nodeData.classes = [];
            nodeData.classes = nodeData.classes.concat(dataOne);
            break;
          case propertyData2:
            if (nodeData.properties === void 0)
              nodeData.properties = {};
            nodeData.properties[dataOne] = data[2];
            break;
          case attributeData2:
            if (nodeData.attributes === void 0)
              nodeData.attributes = {};
            nodeData.attributes[dataOne] = data[2];
            break;
          case keyData:
            nodeData.key = dataOne;
            break;
          default:
            if (nodeData.events === void 0)
              nodeData.events = {};
            if (nodeData.events[dataOne] === void 0)
              nodeData.events[dataOne] = [];
            nodeData.events[dataOne].push(data[2]);
        }
      }
    return nodeData;
  }

  // output/Flame.Html.Element/index.js
  var toNodeStringNodeData = {
    toNode: function($776) {
      return singleton2(id($776));
    }
  };
  var toNodeStringHtml = {
    toNode: function($777) {
      return singleton2(text($777));
    }
  };
  var toNodeNodeDataNodeData = {
    toNode: singleton2
  };
  var toNodeHtmlHtml = {
    toNode: singleton2
  };
  var toNode = function(dict) {
    return dict.toNode;
  };
  var toNodeArray = function(dictToNode) {
    return {
      toNode: concatMap(toNode(dictToNode))
    };
  };
  var createElement_ = function(tag) {
    return function(dictToNode) {
      var toNode1 = toNode(dictToNode);
      return function(children) {
        return createDatalessElementNode(tag)(toNode1(children));
      };
    };
  };
  var details_ = function(dictToNode) {
    return createElement_("details")(dictToNode);
  };
  var div_ = function(dictToNode) {
    return createElement_("div")(dictToNode);
  };
  var h1_ = function(dictToNode) {
    return createElement_("h1")(dictToNode);
  };
  var h3_ = function(dictToNode) {
    return createElement_("h3")(dictToNode);
  };
  var label_ = function(dictToNode) {
    return createElement_("label")(dictToNode);
  };
  var small_ = function(dictToNode) {
    return createElement_("small")(dictToNode);
  };
  var strong_ = function(dictToNode) {
    return createElement_("strong")(dictToNode);
  };
  var summary_ = function(dictToNode) {
    return createElement_("summary")(dictToNode);
  };
  var createElement$prime = function(tag) {
    return function(dictToNode) {
      var toNode1 = toNode(dictToNode);
      return function(nodeData) {
        return createSingleElementNode(tag)(toNode1(nodeData));
      };
    };
  };
  var input = function(dictToNode) {
    return createElement$prime("input")(dictToNode);
  };
  var createElement = function(tag) {
    return function(dictToNode) {
      var toNode1 = toNode(dictToNode);
      return function(dictToNode1) {
        var toNode2 = toNode(dictToNode1);
        return function(nodeData) {
          return function(children) {
            return createElementNode(tag)(toNode1(nodeData))(toNode2(children));
          };
        };
      };
    };
  };
  var details = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("details")(dictToNode)(dictToNode1);
    };
  };
  var div3 = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("div")(dictToNode)(dictToNode1);
    };
  };
  var label = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("label")(dictToNode)(dictToNode1);
    };
  };
  var main = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("main")(dictToNode)(dictToNode1);
    };
  };
  var option = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("option")(dictToNode)(dictToNode1);
    };
  };
  var select = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("select")(dictToNode)(dictToNode1);
    };
  };
  var span = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("span")(dictToNode)(dictToNode1);
    };
  };
  var summary = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("summary")(dictToNode)(dictToNode1);
    };
  };
  var button = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("button")(dictToNode)(dictToNode1);
    };
  };
  var article_ = function(dictToNode) {
    return createElement_("article")(dictToNode);
  };
  var article = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("article")(dictToNode)(dictToNode1);
    };
  };

  // output/Flame.Html.Event/foreign.js
  var messageEventData = 5;
  var rawEventData = 6;
  function createEvent_(name3) {
    return function(message2) {
      return [messageEventData, name3, message2];
    };
  }
  function createRawEvent_(name3) {
    return function(handler) {
      return [rawEventData, name3, handler];
    };
  }
  function nodeValue_(event) {
    if (event.target.contentEditable === true || event.target.contentEditable === "true" || event.target.contentEditable === "")
      return event.target.innerText;
    return event.target.value;
  }
  function checkedValue_(event) {
    if (event.target.tagName === "INPUT" && (event.target.type === "checkbox" || event.target.type === "radio"))
      return event.target.checked;
    return false;
  }

  // output/Effect.Uncurried/foreign.js
  var runEffectFn1 = function runEffectFn12(fn) {
    return function(a) {
      return function() {
        return fn(a);
      };
    };
  };
  var runEffectFn2 = function runEffectFn22(fn) {
    return function(a) {
      return function(b) {
        return function() {
          return fn(a, b);
        };
      };
    };
  };
  var runEffectFn4 = function runEffectFn42(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return function() {
              return fn(a, b, c, d);
            };
          };
        };
      };
    };
  };

  // output/Flame.Html.Event/index.js
  var map3 = /* @__PURE__ */ map(functorEffect);
  var nodeValue = /* @__PURE__ */ runEffectFn1(nodeValue_);
  var createRawEvent = function(name3) {
    return function(handler) {
      return createRawEvent_(name3)(handler);
    };
  };
  var onInput = function(constructor) {
    var handler = function(event) {
      return map3(function($6) {
        return Just.create(constructor($6));
      })(nodeValue(event));
    };
    return createRawEvent("input")(handler);
  };
  var createEvent = function(name3) {
    return function(message2) {
      return createEvent_(name3)(message2);
    };
  };
  var onClick = /* @__PURE__ */ createEvent("click");
  var checkedValue = /* @__PURE__ */ runEffectFn1(checkedValue_);
  var onCheck = function(constructor) {
    var handler = function(event) {
      return map3(function($9) {
        return Just.create(constructor($9));
      })(checkedValue(event));
    };
    return createRawEvent("input")(handler);
  };

  // output/Data.Number.Format/foreign.js
  function wrap(method) {
    return function(d) {
      return function(num) {
        return method.apply(num, [d]);
      };
    };
  }
  var toPrecisionNative = wrap(Number.prototype.toPrecision);
  var toFixedNative = wrap(Number.prototype.toFixed);
  var toExponentialNative = wrap(Number.prototype.toExponential);

  // output/Data.Number.Format/index.js
  var clamp2 = /* @__PURE__ */ clamp(ordInt);
  var Precision = /* @__PURE__ */ function() {
    function Precision2(value0) {
      this.value0 = value0;
    }
    ;
    Precision2.create = function(value0) {
      return new Precision2(value0);
    };
    return Precision2;
  }();
  var Fixed = /* @__PURE__ */ function() {
    function Fixed2(value0) {
      this.value0 = value0;
    }
    ;
    Fixed2.create = function(value0) {
      return new Fixed2(value0);
    };
    return Fixed2;
  }();
  var Exponential = /* @__PURE__ */ function() {
    function Exponential2(value0) {
      this.value0 = value0;
    }
    ;
    Exponential2.create = function(value0) {
      return new Exponential2(value0);
    };
    return Exponential2;
  }();
  var toStringWith = function(v) {
    if (v instanceof Precision) {
      return toPrecisionNative(v.value0);
    }
    ;
    if (v instanceof Fixed) {
      return toFixedNative(v.value0);
    }
    ;
    if (v instanceof Exponential) {
      return toExponentialNative(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Data.Number.Format (line 59, column 1 - line 59, column 43): " + [v.constructor.name]);
  };
  var fixed = /* @__PURE__ */ function() {
    var $9 = clamp2(0)(20);
    return function($10) {
      return Fixed.create($9($10));
    };
  }();

  // output/UiFuncs/index.js
  var toNodeArray2 = /* @__PURE__ */ toNodeArray(toNodeNodeDataNodeData);
  var toNodeArray1 = /* @__PURE__ */ toNodeArray(toNodeHtmlHtml);
  var span2 = /* @__PURE__ */ span(toNodeArray2)(toNodeArray1);
  var show3 = /* @__PURE__ */ show(showInt);
  var option2 = /* @__PURE__ */ option(toNodeArray2)(toNodeStringHtml);
  var select2 = /* @__PURE__ */ select(toNodeArray2)(toNodeArray1);
  var class$prime2 = /* @__PURE__ */ class$prime(toClassListString);
  var map4 = /* @__PURE__ */ map(functorArray);
  var input2 = /* @__PURE__ */ input(toNodeArray2);
  var tooltipCaption = function(tooltip) {
    return function(caption) {
      return span2([createAttribute("data-tooltip")(tooltip)])([text(caption)]);
    };
  };
  var showWeeks = function(weeks) {
    return toStringWith(fixed(3))(weeks);
  };
  var showHours = function(weeks) {
    return toStringWith(fixed(2))(weeks * 56);
  };
  var showGPs = function(n) {
    return show3(round2(n)) + " gp";
  };
  var mkSelect = function(dictShow) {
    var show12 = show(dictShow);
    return function(dictEq) {
      var eq4 = eq(eqMaybe(dictEq));
      return function(id3) {
        return function(msg) {
          return function(opts) {
            return function(value2) {
              var mkOption = function(x) {
                return option2([value(show12(x)), selected(eq4(new Just(x))(value2))])(show12(x));
              };
              return select2([id(id3), onInput(msg), class$prime2("width90")])(map4(mkOption)(opts));
            };
          };
        };
      };
    };
  };
  var mkNumber = function(id3) {
    return function(msg) {
      return function(value2) {
        return input2([type$prime("number"), id(id3), value(show3(value2)), onInput(function(x) {
          return msg(fromStr(x));
        })]);
      };
    };
  };
  var mkCheckbox = function(id3) {
    return function(msg) {
      return function(value2) {
        return input2([type$prime("checkbox"), id(id3), checked(value2), onCheck(msg), class$prime2("width90")]);
      };
    };
  };

  // output/BasicItem/index.js
  var toNodeArray3 = /* @__PURE__ */ toNodeArray(toNodeNodeDataNodeData);
  var toNodeArray12 = /* @__PURE__ */ toNodeArray(toNodeHtmlHtml);
  var div4 = /* @__PURE__ */ div3(toNodeArray3)(toNodeArray12);
  var class$prime3 = /* @__PURE__ */ class$prime(toClassListString);
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var label2 = /* @__PURE__ */ label(toNodeArray3)(toNodeArray12);
  var input3 = /* @__PURE__ */ input(toNodeArray3);
  var show4 = /* @__PURE__ */ show(showInt);
  var label_2 = /* @__PURE__ */ label_(toNodeArray12);
  var OnPriceChange = /* @__PURE__ */ function() {
    function OnPriceChange2(value0) {
      this.value0 = value0;
    }
    ;
    OnPriceChange2.create = function(value0) {
      return new OnPriceChange2(value0);
    };
    return OnPriceChange2;
  }();
  var update = function(state2) {
    return function(v) {
      return {
        basePrice: v.value0,
        baseCost: calcCostPrice(v.value0)
      };
    };
  };
  var mkRow = function(caption) {
    return function(content) {
      return [div4([class$prime3("s3")])([caption]), div4([class$prime3("s9")])([content])];
    };
  };
  var view = function(output) {
    return function(reduction) {
      return function(asstCost) {
        return function(state2) {
          var craftingTime = calcCraftingTime(state2.basePrice)(output)(reduction);
          var craftingCost = calcCraftingCost(state2.baseCost)(craftingTime)(asstCost);
          return div4([class$prime3("grid")])(append2(mkRow(label2([$$for("base-price")])([text("Base Item Cost")]))(input3([id("base-price"), type$prime("text"), value(show4(state2.basePrice)), onInput(function(s) {
            return new OnPriceChange(fromStr(s));
          })])))(append2(mkRow(label_2([text("Base Price")]))(text(showGPs(state2.baseCost))))(append2(mkRow(label_2([text("Time (weeks)")]))(text(showWeeks(craftingTime))))(append2(mkRow(label_2([text("Time (hours)")]))(text(showHours(craftingTime))))(mkRow(label_2([text("Crafting Cost")]))(text(showGPs(craftingCost))))))));
        };
      };
    };
  };
  var init = {
    baseCost: 0,
    basePrice: 0
  };

  // output/Types/index.js
  var sum2 = /* @__PURE__ */ sum(foldableArray)(semiringNumber);
  var map5 = /* @__PURE__ */ map(functorArray);
  var NoSanctification = /* @__PURE__ */ function() {
    function NoSanctification2() {
    }
    ;
    NoSanctification2.value = new NoSanctification2();
    return NoSanctification2;
  }();
  var Basic = /* @__PURE__ */ function() {
    function Basic2() {
    }
    ;
    Basic2.value = new Basic2();
    return Basic2;
  }();
  var Themed = /* @__PURE__ */ function() {
    function Themed2() {
    }
    ;
    Themed2.value = new Themed2();
    return Themed2;
  }();
  var TqNone = /* @__PURE__ */ function() {
    function TqNone2() {
    }
    ;
    TqNone2.value = new TqNone2();
    return TqNone2;
  }();
  var TqSubStandard = /* @__PURE__ */ function() {
    function TqSubStandard2() {
    }
    ;
    TqSubStandard2.value = new TqSubStandard2();
    return TqSubStandard2;
  }();
  var TqStandard = /* @__PURE__ */ function() {
    function TqStandard2() {
    }
    ;
    TqStandard2.value = new TqStandard2();
    return TqStandard2;
  }();
  var TqAdvanced = /* @__PURE__ */ function() {
    function TqAdvanced2() {
    }
    ;
    TqAdvanced2.value = new TqAdvanced2();
    return TqAdvanced2;
  }();
  var TqMasterwork = /* @__PURE__ */ function() {
    function TqMasterwork2() {
    }
    ;
    TqMasterwork2.value = new TqMasterwork2();
    return TqMasterwork2;
  }();
  var NoToolBonus = /* @__PURE__ */ function() {
    function NoToolBonus2() {
    }
    ;
    NoToolBonus2.value = new NoToolBonus2();
    return NoToolBonus2;
  }();
  var PlusZero = /* @__PURE__ */ function() {
    function PlusZero2() {
    }
    ;
    PlusZero2.value = new PlusZero2();
    return PlusZero2;
  }();
  var PlusOne = /* @__PURE__ */ function() {
    function PlusOne2() {
    }
    ;
    PlusOne2.value = new PlusOne2();
    return PlusOne2;
  }();
  var PlusTwo = /* @__PURE__ */ function() {
    function PlusTwo2() {
    }
    ;
    PlusTwo2.value = new PlusTwo2();
    return PlusTwo2;
  }();
  var PlusThree = /* @__PURE__ */ function() {
    function PlusThree2() {
    }
    ;
    PlusThree2.value = new PlusThree2();
    return PlusThree2;
  }();
  var TabBasicItem = /* @__PURE__ */ function() {
    function TabBasicItem2() {
    }
    ;
    TabBasicItem2.value = new TabBasicItem2();
    return TabBasicItem2;
  }();
  var TabMagicItem = /* @__PURE__ */ function() {
    function TabMagicItem2() {
    }
    ;
    TabMagicItem2.value = new TabMagicItem2();
    return TabMagicItem2;
  }();
  var TabItemImprovement = /* @__PURE__ */ function() {
    function TabItemImprovement2() {
    }
    ;
    TabItemImprovement2.value = new TabItemImprovement2();
    return TabItemImprovement2;
  }();
  var TabPotion = /* @__PURE__ */ function() {
    function TabPotion2() {
    }
    ;
    TabPotion2.value = new TabPotion2();
    return TabPotion2;
  }();
  var TabScroll = /* @__PURE__ */ function() {
    function TabScroll2() {
    }
    ;
    TabScroll2.value = new TabScroll2();
    return TabScroll2;
  }();
  var RINo = /* @__PURE__ */ function() {
    function RINo2() {
    }
    ;
    RINo2.value = new RINo2();
    return RINo2;
  }();
  var YesNoAccess = /* @__PURE__ */ function() {
    function YesNoAccess2() {
    }
    ;
    YesNoAccess2.value = new YesNoAccess2();
    return YesNoAccess2;
  }();
  var YesNotActive = /* @__PURE__ */ function() {
    function YesNotActive2() {
    }
    ;
    YesNotActive2.value = new YesNotActive2();
    return YesNotActive2;
  }();
  var YesActive = /* @__PURE__ */ function() {
    function YesActive2() {
    }
    ;
    YesActive2.value = new YesActive2();
    return YesActive2;
  }();
  var Common = /* @__PURE__ */ function() {
    function Common3() {
    }
    ;
    Common3.value = new Common3();
    return Common3;
  }();
  var Uncommon = /* @__PURE__ */ function() {
    function Uncommon3() {
    }
    ;
    Uncommon3.value = new Uncommon3();
    return Uncommon3;
  }();
  var Rare = /* @__PURE__ */ function() {
    function Rare3() {
    }
    ;
    Rare3.value = new Rare3();
    return Rare3;
  }();
  var VeryRare = /* @__PURE__ */ function() {
    function VeryRare3() {
    }
    ;
    VeryRare3.value = new VeryRare3();
    return VeryRare3;
  }();
  var Legendary = /* @__PURE__ */ function() {
    function Legendary3() {
    }
    ;
    Legendary3.value = new Legendary3();
    return Legendary3;
  }();
  var No = /* @__PURE__ */ function() {
    function No2() {
    }
    ;
    No2.value = new No2();
    return No2;
  }();
  var YesButNoAccess = /* @__PURE__ */ function() {
    function YesButNoAccess2() {
    }
    ;
    YesButNoAccess2.value = new YesButNoAccess2();
    return YesButNoAccess2;
  }();
  var Cast1 = /* @__PURE__ */ function() {
    function Cast12() {
    }
    ;
    Cast12.value = new Cast12();
    return Cast12;
  }();
  var Cast2 = /* @__PURE__ */ function() {
    function Cast22() {
    }
    ;
    Cast22.value = new Cast22();
    return Cast22;
  }();
  var Cast3 = /* @__PURE__ */ function() {
    function Cast32() {
    }
    ;
    Cast32.value = new Cast32();
    return Cast32;
  }();
  var Cast4 = /* @__PURE__ */ function() {
    function Cast42() {
    }
    ;
    Cast42.value = new Cast42();
    return Cast42;
  }();
  var Cast5 = /* @__PURE__ */ function() {
    function Cast52() {
    }
    ;
    Cast52.value = new Cast52();
    return Cast52;
  }();
  var Cast6 = /* @__PURE__ */ function() {
    function Cast62() {
    }
    ;
    Cast62.value = new Cast62();
    return Cast62;
  }();
  var Cast7 = /* @__PURE__ */ function() {
    function Cast72() {
    }
    ;
    Cast72.value = new Cast72();
    return Cast72;
  }();
  var CsNone = /* @__PURE__ */ function() {
    function CsNone2() {
    }
    ;
    CsNone2.value = new CsNone2();
    return CsNone2;
  }();
  var CsBasic = /* @__PURE__ */ function() {
    function CsBasic2() {
    }
    ;
    CsBasic2.value = new CsBasic2();
    return CsBasic2;
  }();
  var CsThemed = /* @__PURE__ */ function() {
    function CsThemed2() {
    }
    ;
    CsThemed2.value = new CsThemed2();
    return CsThemed2;
  }();
  var CeVeryCrude = /* @__PURE__ */ function() {
    function CeVeryCrude2() {
    }
    ;
    CeVeryCrude2.value = new CeVeryCrude2();
    return CeVeryCrude2;
  }();
  var CeCrude = /* @__PURE__ */ function() {
    function CeCrude2() {
    }
    ;
    CeCrude2.value = new CeCrude2();
    return CeCrude2;
  }();
  var CeBasic = /* @__PURE__ */ function() {
    function CeBasic2() {
    }
    ;
    CeBasic2.value = new CeBasic2();
    return CeBasic2;
  }();
  var CeAdvanced = /* @__PURE__ */ function() {
    function CeAdvanced2() {
    }
    ;
    CeAdvanced2.value = new CeAdvanced2();
    return CeAdvanced2;
  }();
  var CeExpert = /* @__PURE__ */ function() {
    function CeExpert2() {
    }
    ;
    CeExpert2.value = new CeExpert2();
    return CeExpert2;
  }();
  var CeApex = /* @__PURE__ */ function() {
    function CeApex2() {
    }
    ;
    CeApex2.value = new CeApex2();
    return CeApex2;
  }();
  var NoCrafter = /* @__PURE__ */ function() {
    function NoCrafter2() {
    }
    ;
    NoCrafter2.value = new NoCrafter2();
    return NoCrafter2;
  }();
  var Unskilled = /* @__PURE__ */ function() {
    function Unskilled2() {
    }
    ;
    Unskilled2.value = new Unskilled2();
    return Unskilled2;
  }();
  var PartlySkilled = /* @__PURE__ */ function() {
    function PartlySkilled2() {
    }
    ;
    PartlySkilled2.value = new PartlySkilled2();
    return PartlySkilled2;
  }();
  var Skilled = /* @__PURE__ */ function() {
    function Skilled2() {
    }
    ;
    Skilled2.value = new Skilled2();
    return Skilled2;
  }();
  var PlayerCharacter = /* @__PURE__ */ function() {
    function PlayerCharacter2() {
    }
    ;
    PlayerCharacter2.value = new PlayerCharacter2();
    return PlayerCharacter2;
  }();
  var Expertise = /* @__PURE__ */ function() {
    function Expertise2() {
    }
    ;
    Expertise2.value = new Expertise2();
    return Expertise2;
  }();
  var Artificer = /* @__PURE__ */ function() {
    function Artificer2() {
    }
    ;
    Artificer2.value = new Artificer2();
    return Artificer2;
  }();
  var Specialist = /* @__PURE__ */ function() {
    function Specialist2() {
    }
    ;
    Specialist2.value = new Specialist2();
    return Specialist2;
  }();
  var valueableToolSanctificati = {
    getValue: function(v) {
      if (v instanceof NoSanctification) {
        return 0;
      }
      ;
      if (v instanceof Basic) {
        return 25;
      }
      ;
      if (v instanceof Themed) {
        return 50;
      }
      ;
      throw new Error("Failed pattern match at Types (line 180, column 1 - line 183, column 35): " + [v.constructor.name]);
    }
  };
  var valueableToolQuality = {
    getValue: function(v) {
      if (v instanceof TqNone) {
        return 0;
      }
      ;
      if (v instanceof TqSubStandard) {
        return -10;
      }
      ;
      if (v instanceof TqStandard) {
        return 0;
      }
      ;
      if (v instanceof TqAdvanced) {
        return 10;
      }
      ;
      if (v instanceof TqMasterwork) {
        return 15;
      }
      ;
      throw new Error("Failed pattern match at Types (line 119, column 1 - line 124, column 32): " + [v.constructor.name]);
    }
  };
  var valueableToolBonus = {
    getValue: function(v) {
      if (v instanceof NoToolBonus) {
        return 0;
      }
      ;
      if (v instanceof PlusZero) {
        return 5;
      }
      ;
      if (v instanceof PlusOne) {
        return 10;
      }
      ;
      if (v instanceof PlusTwo) {
        return 15;
      }
      ;
      if (v instanceof PlusThree) {
        return 20;
      }
      ;
      throw new Error("Failed pattern match at Types (line 153, column 1 - line 158, column 30): " + [v.constructor.name]);
    }
  };
  var valueableReplicateItem = {
    getValue: function(v) {
      if (v instanceof RINo) {
        return 0;
      }
      ;
      if (v instanceof YesNoAccess) {
        return 0;
      }
      ;
      if (v instanceof YesNotActive) {
        return 0.1;
      }
      ;
      if (v instanceof YesActive) {
        return 0.25;
      }
      ;
      throw new Error("Failed pattern match at Types (line 443, column 1 - line 447, column 31): " + [v.constructor.name]);
    }
  };
  var valueableRarity = {
    getValue: function(v) {
      if (v instanceof Common) {
        return 100;
      }
      ;
      if (v instanceof Uncommon) {
        return 200;
      }
      ;
      if (v instanceof Rare) {
        return 1e3;
      }
      ;
      if (v instanceof VeryRare) {
        return 2500;
      }
      ;
      if (v instanceof Legendary) {
        return 5e3;
      }
      ;
      throw new Error("Failed pattern match at Types (line 342, column 1 - line 347, column 30): " + [v.constructor.name]);
    }
  };
  var valueableMimicSpell = {
    getValue: function(v) {
      if (v instanceof No) {
        return 0;
      }
      ;
      if (v instanceof YesButNoAccess) {
        return 1;
      }
      ;
      if (v instanceof Cast1) {
        return 2;
      }
      ;
      if (v instanceof Cast2) {
        return 3;
      }
      ;
      if (v instanceof Cast3) {
        return 4;
      }
      ;
      if (v instanceof Cast4) {
        return 5;
      }
      ;
      if (v instanceof Cast5) {
        return 6;
      }
      ;
      if (v instanceof Cast6) {
        return 7;
      }
      ;
      if (v instanceof Cast7) {
        return 8;
      }
      ;
      throw new Error("Failed pattern match at Types (line 406, column 1 - line 415, column 32): " + [v.constructor.name]);
    }
  };
  var valueableCraftingSanctifi = {
    getValue: function(v) {
      if (v instanceof CsNone) {
        return 0;
      }
      ;
      if (v instanceof CsBasic) {
        return 0.09;
      }
      ;
      if (v instanceof CsThemed) {
        return 0.27;
      }
      ;
      throw new Error("Failed pattern match at Types (line 267, column 1 - line 270, column 27): " + [v.constructor.name]);
    }
  };
  var valueableCraftingEnvironm = {
    getValue: function(v) {
      if (v instanceof CeVeryCrude) {
        return -0.27;
      }
      ;
      if (v instanceof CeCrude) {
        return -0.18;
      }
      ;
      if (v instanceof CeBasic) {
        return 0;
      }
      ;
      if (v instanceof CeAdvanced) {
        return 0.18;
      }
      ;
      if (v instanceof CeExpert) {
        return 0.27;
      }
      ;
      if (v instanceof CeApex) {
        return 0.35;
      }
      ;
      throw new Error("Failed pattern match at Types (line 236, column 1 - line 242, column 30): " + [v.constructor.name]);
    }
  };
  var valueableCrafterType = {
    getValue: function(v) {
      if (v instanceof NoCrafter) {
        return 0;
      }
      ;
      if (v instanceof Unskilled) {
        return 5;
      }
      ;
      if (v instanceof PartlySkilled) {
        return 7;
      }
      ;
      if (v instanceof Skilled) {
        return 15;
      }
      ;
      if (v instanceof PlayerCharacter) {
        return 25;
      }
      ;
      if (v instanceof Expertise) {
        return 30;
      }
      ;
      if (v instanceof Artificer) {
        return 50;
      }
      ;
      if (v instanceof Specialist) {
        return 100;
      }
      ;
      throw new Error("Failed pattern match at Types (line 83, column 1 - line 91, column 35): " + [v.constructor.name]);
    }
  };
  var showToolSanctification = {
    show: function(v) {
      if (v instanceof NoSanctification) {
        return "None";
      }
      ;
      if (v instanceof Basic) {
        return "Basic";
      }
      ;
      if (v instanceof Themed) {
        return "Themed";
      }
      ;
      throw new Error("Failed pattern match at Types (line 170, column 1 - line 173, column 35): " + [v.constructor.name]);
    }
  };
  var showToolQuality = {
    show: function(v) {
      if (v instanceof TqNone) {
        return "None";
      }
      ;
      if (v instanceof TqSubStandard) {
        return "SubStandard";
      }
      ;
      if (v instanceof TqStandard) {
        return "Standard";
      }
      ;
      if (v instanceof TqAdvanced) {
        return "Advanced";
      }
      ;
      if (v instanceof TqMasterwork) {
        return "Masterwork";
      }
      ;
      throw new Error("Failed pattern match at Types (line 105, column 1 - line 110, column 36): " + [v.constructor.name]);
    }
  };
  var showToolBonus = {
    show: function(v) {
      if (v instanceof NoToolBonus) {
        return "None";
      }
      ;
      if (v instanceof PlusZero) {
        return "Magical";
      }
      ;
      if (v instanceof PlusOne) {
        return "PlusOne";
      }
      ;
      if (v instanceof PlusTwo) {
        return "PlusTwo";
      }
      ;
      if (v instanceof PlusThree) {
        return "PlusThree";
      }
      ;
      throw new Error("Failed pattern match at Types (line 138, column 1 - line 143, column 33): " + [v.constructor.name]);
    }
  };
  var showTabs = {
    show: function(v) {
      if (v instanceof TabBasicItem) {
        return "Item Construction";
      }
      ;
      if (v instanceof TabMagicItem) {
        return "Magic Item Creation";
      }
      ;
      if (v instanceof TabItemImprovement) {
        return "Item Improvement";
      }
      ;
      if (v instanceof TabPotion) {
        return "Potions";
      }
      ;
      if (v instanceof TabScroll) {
        return "Scrolls";
      }
      ;
      throw new Error("Failed pattern match at Types (line 305, column 1 - line 310, column 29): " + [v.constructor.name]);
    }
  };
  var showReplicateItem = {
    show: function(v) {
      if (v instanceof RINo) {
        return "No";
      }
      ;
      if (v instanceof YesNoAccess) {
        return "Yes, but cast has no access to it";
      }
      ;
      if (v instanceof YesNotActive) {
        return "Yes, but it is not active";
      }
      ;
      if (v instanceof YesActive) {
        return "Yes, and it is active";
      }
      ;
      throw new Error("Failed pattern match at Types (line 430, column 1 - line 434, column 43): " + [v.constructor.name]);
    }
  };
  var showRarity = {
    show: function(v) {
      if (v instanceof Common) {
        return "Common";
      }
      ;
      if (v instanceof Uncommon) {
        return "Uncommon";
      }
      ;
      if (v instanceof Rare) {
        return "Rare";
      }
      ;
      if (v instanceof VeryRare) {
        return "Very Rare";
      }
      ;
      if (v instanceof Legendary) {
        return "Legendary";
      }
      ;
      throw new Error("Failed pattern match at Types (line 326, column 1 - line 331, column 33): " + [v.constructor.name]);
    }
  };
  var showMimicSpell = {
    show: function(v) {
      if (v instanceof No) {
        return "No";
      }
      ;
      if (v instanceof YesButNoAccess) {
        return "Yes, but crafter has no access to it";
      }
      ;
      if (v instanceof Cast1) {
        return "Cast 1 time per week";
      }
      ;
      if (v instanceof Cast2) {
        return "Cast 2 times per week";
      }
      ;
      if (v instanceof Cast3) {
        return "Cast 3 times per week";
      }
      ;
      if (v instanceof Cast4) {
        return "Cast 4 times per week";
      }
      ;
      if (v instanceof Cast5) {
        return "Cast 5 times per week";
      }
      ;
      if (v instanceof Cast6) {
        return "Cast 6 times per week";
      }
      ;
      if (v instanceof Cast7) {
        return "Cast 7 times per week";
      }
      ;
      throw new Error("Failed pattern match at Types (line 383, column 1 - line 392, column 48): " + [v.constructor.name]);
    }
  };
  var showCraftingSanctificatio = {
    show: function(v) {
      if (v instanceof CsNone) {
        return "None";
      }
      ;
      if (v instanceof CsBasic) {
        return "Basic";
      }
      ;
      if (v instanceof CsThemed) {
        return "Themed";
      }
      ;
      throw new Error("Failed pattern match at Types (line 256, column 1 - line 259, column 27): " + [v.constructor.name]);
    }
  };
  var showCraftingEnvironment = {
    show: function(v) {
      if (v instanceof CeVeryCrude) {
        return "Very Crude";
      }
      ;
      if (v instanceof CeCrude) {
        return "Crude";
      }
      ;
      if (v instanceof CeBasic) {
        return "Basic";
      }
      ;
      if (v instanceof CeAdvanced) {
        return "Advanced";
      }
      ;
      if (v instanceof CeExpert) {
        return "Expert";
      }
      ;
      if (v instanceof CeApex) {
        return "Apex";
      }
      ;
      throw new Error("Failed pattern match at Types (line 219, column 1 - line 225, column 28): " + [v.constructor.name]);
    }
  };
  var showCrafterType = {
    show: function(v) {
      if (v instanceof NoCrafter) {
        return "None";
      }
      ;
      if (v instanceof Unskilled) {
        return "Unskilled";
      }
      ;
      if (v instanceof PartlySkilled) {
        return "Partially Skilled";
      }
      ;
      if (v instanceof Skilled) {
        return "Skilled";
      }
      ;
      if (v instanceof PlayerCharacter) {
        return "Player Character";
      }
      ;
      if (v instanceof Expertise) {
        return "Expertise";
      }
      ;
      if (v instanceof Artificer) {
        return "Artificer (non-specialist)";
      }
      ;
      if (v instanceof Specialist) {
        return "Artificer (specialist)";
      }
      ;
      throw new Error("Failed pattern match at Types (line 62, column 1 - line 70, column 50): " + [v.constructor.name]);
    }
  };
  var fromStringToolSanctificat = {
    fromString: function(v) {
      if (v === "Basic") {
        return Basic.value;
      }
      ;
      if (v === "Themed") {
        return Themed.value;
      }
      ;
      return NoSanctification.value;
    }
  };
  var fromStringToolQuality = {
    fromString: function(v) {
      if (v === "SubStandard") {
        return TqSubStandard.value;
      }
      ;
      if (v === "Standard") {
        return TqStandard.value;
      }
      ;
      if (v === "Advanced") {
        return TqAdvanced.value;
      }
      ;
      if (v === "Masterwork") {
        return TqMasterwork.value;
      }
      ;
      return TqNone.value;
    }
  };
  var fromStringToolBonus = {
    fromString: function(v) {
      if (v === "None") {
        return NoToolBonus.value;
      }
      ;
      if (v === "Magical") {
        return PlusZero.value;
      }
      ;
      if (v === "PlusOne") {
        return PlusOne.value;
      }
      ;
      if (v === "PlusTwo") {
        return PlusTwo.value;
      }
      ;
      if (v === "PlusThree") {
        return PlusThree.value;
      }
      ;
      return NoToolBonus.value;
    }
  };
  var fromStringReplicateItem = {
    fromString: function(v) {
      if (v === "No") {
        return RINo.value;
      }
      ;
      if (v === "Yes, but cast has no access to it") {
        return YesNoAccess.value;
      }
      ;
      if (v === "Yes, but it is not active") {
        return YesNotActive.value;
      }
      ;
      if (v === "Yes, and it is active") {
        return YesActive.value;
      }
      ;
      return RINo.value;
    }
  };
  var fromStringRarity = {
    fromString: function(v) {
      if (v === "Common") {
        return Common.value;
      }
      ;
      if (v === "Uncommon") {
        return Uncommon.value;
      }
      ;
      if (v === "Rare") {
        return Rare.value;
      }
      ;
      if (v === "Very Rare") {
        return VeryRare.value;
      }
      ;
      if (v === "Legendary") {
        return Legendary.value;
      }
      ;
      return Common.value;
    }
  };
  var fromStringMimicSpell = {
    fromString: function(v) {
      if (v === "No") {
        return No.value;
      }
      ;
      if (v === "Yes, but crafter has no access to it") {
        return YesButNoAccess.value;
      }
      ;
      if (v === "Cast 1 time per week") {
        return Cast1.value;
      }
      ;
      if (v === "Cast 2 times per week") {
        return Cast2.value;
      }
      ;
      if (v === "Cast 3 times per week") {
        return Cast3.value;
      }
      ;
      if (v === "Cast 4 times per week") {
        return Cast4.value;
      }
      ;
      if (v === "Cast 5 times per week") {
        return Cast5.value;
      }
      ;
      if (v === "Cast 6 times per week") {
        return Cast6.value;
      }
      ;
      if (v === "Cast 7 times per week") {
        return Cast7.value;
      }
      ;
      return No.value;
    }
  };
  var fromStringCraftingSanctif = {
    fromString: function(v) {
      if (v === "None") {
        return CsNone.value;
      }
      ;
      if (v === "Basic") {
        return CsBasic.value;
      }
      ;
      if (v === "Themed") {
        return CsThemed.value;
      }
      ;
      return CsNone.value;
    }
  };
  var fromStringCraftingEnviron = {
    fromString: function(v) {
      if (v === "Very Crude") {
        return CeVeryCrude.value;
      }
      ;
      if (v === "Crude") {
        return CeCrude.value;
      }
      ;
      if (v === "Basic") {
        return CeBasic.value;
      }
      ;
      if (v === "Advanced") {
        return CeAdvanced.value;
      }
      ;
      if (v === "Expert") {
        return CeExpert.value;
      }
      ;
      if (v === "Apex") {
        return CeApex.value;
      }
      ;
      return CeBasic.value;
    }
  };
  var fromStringCrafterType = {
    fromString: function(v) {
      if (v === "None") {
        return NoCrafter.value;
      }
      ;
      if (v === "Unskilled") {
        return Unskilled.value;
      }
      ;
      if (v === "Partially Skilled") {
        return PartlySkilled.value;
      }
      ;
      if (v === "Skilled") {
        return Skilled.value;
      }
      ;
      if (v === "Player Character") {
        return PlayerCharacter.value;
      }
      ;
      if (v === "Expertise") {
        return Expertise.value;
      }
      ;
      if (v === "Artificer (non-specialist)") {
        return Artificer.value;
      }
      ;
      if (v === "Artificer (specialist)") {
        return Specialist.value;
      }
      ;
      return NoCrafter.value;
    }
  };
  var enumerableToolSanctificat = /* @__PURE__ */ function() {
    return {
      getAll: [NoSanctification.value, Basic.value, Themed.value]
    };
  }();
  var enumerableToolQuality = /* @__PURE__ */ function() {
    return {
      getAll: [TqNone.value, TqSubStandard.value, TqStandard.value, TqAdvanced.value, TqMasterwork.value]
    };
  }();
  var enumerableToolBonus = /* @__PURE__ */ function() {
    return {
      getAll: [NoToolBonus.value, PlusZero.value, PlusOne.value, PlusTwo.value, PlusThree.value]
    };
  }();
  var enumerableTabs = /* @__PURE__ */ function() {
    return {
      getAll: [TabBasicItem.value, TabItemImprovement.value, TabMagicItem.value, TabPotion.value, TabScroll.value]
    };
  }();
  var enumerableReplicateItem = /* @__PURE__ */ function() {
    return {
      getAll: [RINo.value, YesNoAccess.value, YesNotActive.value, YesActive.value]
    };
  }();
  var enumerableRarity = /* @__PURE__ */ function() {
    return {
      getAll: [Common.value, Uncommon.value, Rare.value, VeryRare.value, Legendary.value]
    };
  }();
  var enumerableMimicSpell = /* @__PURE__ */ function() {
    return {
      getAll: [No.value, YesButNoAccess.value, Cast1.value, Cast2.value, Cast3.value, Cast4.value, Cast5.value, Cast6.value, Cast7.value]
    };
  }();
  var enumerableCraftingSanctif = /* @__PURE__ */ function() {
    return {
      getAll: [CsNone.value, CsBasic.value, CsThemed.value]
    };
  }();
  var enumerableCraftingEnviron = /* @__PURE__ */ function() {
    return {
      getAll: [CeVeryCrude.value, CeCrude.value, CeBasic.value, CeAdvanced.value, CeExpert.value, CeApex.value]
    };
  }();
  var enumerableCrafterType = /* @__PURE__ */ function() {
    return {
      getAll: [NoCrafter.value, Unskilled.value, PartlySkilled.value, Skilled.value, PlayerCharacter.value, Expertise.value, Artificer.value, Specialist.value]
    };
  }();
  var isUncommon = function(v) {
    if (v instanceof Common) {
      return true;
    }
    ;
    if (v instanceof Uncommon) {
      return true;
    }
    ;
    return false;
  };
  var getValue = function(dict) {
    return dict.getValue;
  };
  var getValue1 = /* @__PURE__ */ getValue(valueableToolQuality);
  var getValue2 = /* @__PURE__ */ getValue(valueableToolBonus);
  var getValue3 = /* @__PURE__ */ getValue(valueableToolSanctificati);
  var toolValue = function(v) {
    if (v instanceof Nothing) {
      return 0;
    }
    ;
    if (v instanceof Just) {
      return getValue1(v.value0.quality) + getValue2(v.value0.bonus) + getValue3(v.value0.sanctification);
    }
    ;
    throw new Error("Failed pattern match at Types (line 203, column 1 - line 203, column 40): " + [v.constructor.name]);
  };
  var valueableArray = function(dictValueable) {
    var getValue52 = getValue(dictValueable);
    return {
      getValue: function(a) {
        return sum2(map5(getValue52)(a));
      }
    };
  };
  var valueableMaybe = function(dictValueable) {
    var getValue52 = getValue(dictValueable);
    return {
      getValue: function(v) {
        if (v instanceof Nothing) {
          return 0;
        }
        ;
        if (v instanceof Just) {
          return getValue52(v.value0);
        }
        ;
        throw new Error("Failed pattern match at Types (line 40, column 1 - line 42, column 33): " + [v.constructor.name]);
      }
    };
  };
  var getValue4 = /* @__PURE__ */ getValue(/* @__PURE__ */ valueableMaybe(valueableRarity));
  var getMaybeRarity = function(r) {
    return getValue4(r);
  };
  var getAll = function(dict) {
    return dict.getAll;
  };
  var fromString2 = function(dict) {
    return dict.fromString;
  };
  var eqToolSanctification = {
    eq: function(x) {
      return function(y) {
        if (x instanceof NoSanctification && y instanceof NoSanctification) {
          return true;
        }
        ;
        if (x instanceof Basic && y instanceof Basic) {
          return true;
        }
        ;
        if (x instanceof Themed && y instanceof Themed) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqToolQuality = {
    eq: function(x) {
      return function(y) {
        if (x instanceof TqNone && y instanceof TqNone) {
          return true;
        }
        ;
        if (x instanceof TqSubStandard && y instanceof TqSubStandard) {
          return true;
        }
        ;
        if (x instanceof TqStandard && y instanceof TqStandard) {
          return true;
        }
        ;
        if (x instanceof TqAdvanced && y instanceof TqAdvanced) {
          return true;
        }
        ;
        if (x instanceof TqMasterwork && y instanceof TqMasterwork) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqToolBonus = {
    eq: function(x) {
      return function(y) {
        if (x instanceof NoToolBonus && y instanceof NoToolBonus) {
          return true;
        }
        ;
        if (x instanceof PlusZero && y instanceof PlusZero) {
          return true;
        }
        ;
        if (x instanceof PlusOne && y instanceof PlusOne) {
          return true;
        }
        ;
        if (x instanceof PlusTwo && y instanceof PlusTwo) {
          return true;
        }
        ;
        if (x instanceof PlusThree && y instanceof PlusThree) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqTabs = {
    eq: function(x) {
      return function(y) {
        if (x instanceof TabBasicItem && y instanceof TabBasicItem) {
          return true;
        }
        ;
        if (x instanceof TabMagicItem && y instanceof TabMagicItem) {
          return true;
        }
        ;
        if (x instanceof TabItemImprovement && y instanceof TabItemImprovement) {
          return true;
        }
        ;
        if (x instanceof TabPotion && y instanceof TabPotion) {
          return true;
        }
        ;
        if (x instanceof TabScroll && y instanceof TabScroll) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqReplicateItem = {
    eq: function(x) {
      return function(y) {
        if (x instanceof RINo && y instanceof RINo) {
          return true;
        }
        ;
        if (x instanceof YesNoAccess && y instanceof YesNoAccess) {
          return true;
        }
        ;
        if (x instanceof YesNotActive && y instanceof YesNotActive) {
          return true;
        }
        ;
        if (x instanceof YesActive && y instanceof YesActive) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqRarity = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Common && y instanceof Common) {
          return true;
        }
        ;
        if (x instanceof Uncommon && y instanceof Uncommon) {
          return true;
        }
        ;
        if (x instanceof Rare && y instanceof Rare) {
          return true;
        }
        ;
        if (x instanceof VeryRare && y instanceof VeryRare) {
          return true;
        }
        ;
        if (x instanceof Legendary && y instanceof Legendary) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqMimicSpell = {
    eq: function(x) {
      return function(y) {
        if (x instanceof No && y instanceof No) {
          return true;
        }
        ;
        if (x instanceof YesButNoAccess && y instanceof YesButNoAccess) {
          return true;
        }
        ;
        if (x instanceof Cast1 && y instanceof Cast1) {
          return true;
        }
        ;
        if (x instanceof Cast2 && y instanceof Cast2) {
          return true;
        }
        ;
        if (x instanceof Cast3 && y instanceof Cast3) {
          return true;
        }
        ;
        if (x instanceof Cast4 && y instanceof Cast4) {
          return true;
        }
        ;
        if (x instanceof Cast5 && y instanceof Cast5) {
          return true;
        }
        ;
        if (x instanceof Cast6 && y instanceof Cast6) {
          return true;
        }
        ;
        if (x instanceof Cast7 && y instanceof Cast7) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqCraftingSanctification = {
    eq: function(x) {
      return function(y) {
        if (x instanceof CsNone && y instanceof CsNone) {
          return true;
        }
        ;
        if (x instanceof CsBasic && y instanceof CsBasic) {
          return true;
        }
        ;
        if (x instanceof CsThemed && y instanceof CsThemed) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqCraftingEnvironment = {
    eq: function(x) {
      return function(y) {
        if (x instanceof CeVeryCrude && y instanceof CeVeryCrude) {
          return true;
        }
        ;
        if (x instanceof CeCrude && y instanceof CeCrude) {
          return true;
        }
        ;
        if (x instanceof CeBasic && y instanceof CeBasic) {
          return true;
        }
        ;
        if (x instanceof CeAdvanced && y instanceof CeAdvanced) {
          return true;
        }
        ;
        if (x instanceof CeExpert && y instanceof CeExpert) {
          return true;
        }
        ;
        if (x instanceof CeApex && y instanceof CeApex) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqCrafterType = {
    eq: function(x) {
      return function(y) {
        if (x instanceof NoCrafter && y instanceof NoCrafter) {
          return true;
        }
        ;
        if (x instanceof Unskilled && y instanceof Unskilled) {
          return true;
        }
        ;
        if (x instanceof PartlySkilled && y instanceof PartlySkilled) {
          return true;
        }
        ;
        if (x instanceof Skilled && y instanceof Skilled) {
          return true;
        }
        ;
        if (x instanceof PlayerCharacter && y instanceof PlayerCharacter) {
          return true;
        }
        ;
        if (x instanceof Expertise && y instanceof Expertise) {
          return true;
        }
        ;
        if (x instanceof Artificer && y instanceof Artificer) {
          return true;
        }
        ;
        if (x instanceof Specialist && y instanceof Specialist) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var defTool = /* @__PURE__ */ function() {
    return {
      quality: TqNone.value,
      bonus: NoToolBonus.value,
      sanctification: NoSanctification.value
    };
  }();
  var defEnvironment = /* @__PURE__ */ function() {
    return {
      craftingEnvironment: CeBasic.value,
      environmentAttuned: false,
      environmentSanctified: CsNone.value
    };
  }();

  // output/Components/index.js
  var toNodeArray4 = /* @__PURE__ */ toNodeArray(toNodeNodeDataNodeData);
  var toNodeArray13 = /* @__PURE__ */ toNodeArray(toNodeHtmlHtml);
  var div5 = /* @__PURE__ */ div3(toNodeArray4)(toNodeArray13);
  var class$prime4 = /* @__PURE__ */ class$prime(toClassListString);
  var sum3 = /* @__PURE__ */ sum(foldableArray)(semiringNumber);
  var map6 = /* @__PURE__ */ map(functorArray);
  var article2 = /* @__PURE__ */ article(toNodeArray4)(toNodeArray13);
  var div_2 = /* @__PURE__ */ div_(toNodeArray13);
  var show5 = /* @__PURE__ */ show(showInt);
  var map1 = /* @__PURE__ */ map(functorMaybe);
  var article_2 = /* @__PURE__ */ article_(toNodeArray13);
  var h3_2 = /* @__PURE__ */ h3_(toNodeStringHtml);
  var append1 = /* @__PURE__ */ append(semigroupArray);
  var strong_2 = /* @__PURE__ */ strong_(toNodeArray13);
  var details_2 = /* @__PURE__ */ details_(toNodeArray13);
  var summary_2 = /* @__PURE__ */ summary_(toNodeHtmlHtml);
  var div_1 = /* @__PURE__ */ div_(toNodeHtmlHtml);
  var ComponentRarityChanged = /* @__PURE__ */ function() {
    function ComponentRarityChanged2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ComponentRarityChanged2.create = function(value0) {
      return function(value1) {
        return new ComponentRarityChanged2(value0, value1);
      };
    };
    return ComponentRarityChanged2;
  }();
  var ComponentAlignmentChanged = /* @__PURE__ */ function() {
    function ComponentAlignmentChanged2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ComponentAlignmentChanged2.create = function(value0) {
      return function(value1) {
        return new ComponentAlignmentChanged2(value0, value1);
      };
    };
    return ComponentAlignmentChanged2;
  }();
  var NoComponent = /* @__PURE__ */ function() {
    function NoComponent2() {
    }
    ;
    NoComponent2.value = new NoComponent2();
    return NoComponent2;
  }();
  var Common2 = /* @__PURE__ */ function() {
    function Common3() {
    }
    ;
    Common3.value = new Common3();
    return Common3;
  }();
  var Uncommon2 = /* @__PURE__ */ function() {
    function Uncommon3() {
    }
    ;
    Uncommon3.value = new Uncommon3();
    return Uncommon3;
  }();
  var Rare2 = /* @__PURE__ */ function() {
    function Rare3() {
    }
    ;
    Rare3.value = new Rare3();
    return Rare3;
  }();
  var VeryRare2 = /* @__PURE__ */ function() {
    function VeryRare3() {
    }
    ;
    VeryRare3.value = new VeryRare3();
    return VeryRare3;
  }();
  var Legendary2 = /* @__PURE__ */ function() {
    function Legendary3() {
    }
    ;
    Legendary3.value = new Legendary3();
    return Legendary3;
  }();
  var NoAlignment = /* @__PURE__ */ function() {
    function NoAlignment2() {
    }
    ;
    NoAlignment2.value = new NoAlignment2();
    return NoAlignment2;
  }();
  var Thematic = /* @__PURE__ */ function() {
    function Thematic2() {
    }
    ;
    Thematic2.value = new Thematic2();
    return Thematic2;
  }();
  var Magical = /* @__PURE__ */ function() {
    function Magical2() {
    }
    ;
    Magical2.value = new Magical2();
    return Magical2;
  }();
  var Elemental = /* @__PURE__ */ function() {
    function Elemental2() {
    }
    ;
    Elemental2.value = new Elemental2();
    return Elemental2;
  }();
  var Draconic = /* @__PURE__ */ function() {
    function Draconic2() {
    }
    ;
    Draconic2.value = new Draconic2();
    return Draconic2;
  }();
  var Divine = /* @__PURE__ */ function() {
    function Divine2() {
    }
    ;
    Divine2.value = new Divine2();
    return Divine2;
  }();
  var Unique = /* @__PURE__ */ function() {
    function Unique2() {
    }
    ;
    Unique2.value = new Unique2();
    return Unique2;
  }();
  var valueableComponentRarity = {
    getValue: function(v) {
      if (v instanceof NoComponent) {
        return 0;
      }
      ;
      if (v instanceof Common2) {
        return 0.5;
      }
      ;
      if (v instanceof Uncommon2) {
        return 1;
      }
      ;
      if (v instanceof Rare2) {
        return 3;
      }
      ;
      if (v instanceof VeryRare2) {
        return 8;
      }
      ;
      if (v instanceof Legendary2) {
        return 16;
      }
      ;
      throw new Error("Failed pattern match at Components (line 56, column 1 - line 62, column 30): " + [v.constructor.name]);
    }
  };
  var getValue5 = /* @__PURE__ */ getValue(valueableComponentRarity);
  var valueableComponentAlignme = {
    getValue: function(v) {
      if (v instanceof NoAlignment) {
        return 1;
      }
      ;
      if (v instanceof Thematic) {
        return 1.3;
      }
      ;
      if (v instanceof Magical) {
        return 1.4;
      }
      ;
      if (v instanceof Elemental) {
        return 1.5;
      }
      ;
      if (v instanceof Draconic) {
        return 1.7;
      }
      ;
      if (v instanceof Divine) {
        return 1.9;
      }
      ;
      if (v instanceof Unique) {
        return 4;
      }
      ;
      throw new Error("Failed pattern match at Components (line 97, column 1 - line 104, column 29): " + [v.constructor.name]);
    }
  };
  var getValue12 = /* @__PURE__ */ getValue(valueableComponentAlignme);
  var showComponentRarity = {
    show: function(v) {
      if (v instanceof NoComponent) {
        return "None";
      }
      ;
      if (v instanceof Common2) {
        return "Common";
      }
      ;
      if (v instanceof Uncommon2) {
        return "Uncommon";
      }
      ;
      if (v instanceof Rare2) {
        return "Rare";
      }
      ;
      if (v instanceof VeryRare2) {
        return "Very Rare";
      }
      ;
      if (v instanceof Legendary2) {
        return "Legendary";
      }
      ;
      throw new Error("Failed pattern match at Components (line 39, column 1 - line 45, column 33): " + [v.constructor.name]);
    }
  };
  var showComponentAlignment = {
    show: function(v) {
      if (v instanceof NoAlignment) {
        return "None";
      }
      ;
      if (v instanceof Thematic) {
        return "Thematic";
      }
      ;
      if (v instanceof Magical) {
        return "Magical";
      }
      ;
      if (v instanceof Elemental) {
        return "Elemental";
      }
      ;
      if (v instanceof Draconic) {
        return "Draconic";
      }
      ;
      if (v instanceof Divine) {
        return "Divine";
      }
      ;
      if (v instanceof Unique) {
        return "Unique";
      }
      ;
      throw new Error("Failed pattern match at Components (line 78, column 1 - line 85, column 30): " + [v.constructor.name]);
    }
  };
  var fromStringComponentRarity = {
    fromString: function(v) {
      if (v === "None") {
        return NoComponent.value;
      }
      ;
      if (v === "Common") {
        return Common2.value;
      }
      ;
      if (v === "Uncommon") {
        return Uncommon2.value;
      }
      ;
      if (v === "Rare") {
        return Rare2.value;
      }
      ;
      if (v === "Very Rare") {
        return VeryRare2.value;
      }
      ;
      if (v === "Legendary") {
        return Legendary2.value;
      }
      ;
      return NoComponent.value;
    }
  };
  var fromString3 = /* @__PURE__ */ fromString2(fromStringComponentRarity);
  var fromStringComponentAlignm = {
    fromString: function(v) {
      if (v === "None") {
        return NoAlignment.value;
      }
      ;
      if (v === "Thematic") {
        return Thematic.value;
      }
      ;
      if (v === "Magical") {
        return Magical.value;
      }
      ;
      if (v === "Elemental") {
        return Elemental.value;
      }
      ;
      if (v === "Draconic") {
        return Draconic.value;
      }
      ;
      if (v === "Divine") {
        return Divine.value;
      }
      ;
      if (v === "Unique") {
        return Unique.value;
      }
      ;
      return NoAlignment.value;
    }
  };
  var fromString1 = /* @__PURE__ */ fromString2(fromStringComponentAlignm);
  var enumerableComponentRarity = /* @__PURE__ */ function() {
    return {
      getAll: [NoComponent.value, Common2.value, Uncommon2.value, Rare2.value, VeryRare2.value, Legendary2.value]
    };
  }();
  var getAll2 = /* @__PURE__ */ getAll(enumerableComponentRarity);
  var enumerableComponentAlignm = /* @__PURE__ */ function() {
    return {
      getAll: [NoAlignment.value, Thematic.value, Magical.value, Elemental.value, Draconic.value, Divine.value, Unique.value]
    };
  }();
  var getAll1 = /* @__PURE__ */ getAll(enumerableComponentAlignm);
  var mkRow2 = function(caption) {
    return function(content) {
      return function(postscript) {
        return [div5([class$prime4("s4")])([caption]), div5([class$prime4("s4")])([content]), div5([class$prime4("s4")])([postscript])];
      };
    };
  };
  var eqComponentRarity = {
    eq: function(x) {
      return function(y) {
        if (x instanceof NoComponent && y instanceof NoComponent) {
          return true;
        }
        ;
        if (x instanceof Common2 && y instanceof Common2) {
          return true;
        }
        ;
        if (x instanceof Uncommon2 && y instanceof Uncommon2) {
          return true;
        }
        ;
        if (x instanceof Rare2 && y instanceof Rare2) {
          return true;
        }
        ;
        if (x instanceof VeryRare2 && y instanceof VeryRare2) {
          return true;
        }
        ;
        if (x instanceof Legendary2 && y instanceof Legendary2) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var mkSelect2 = /* @__PURE__ */ mkSelect(showComponentRarity)(eqComponentRarity);
  var eqComponentAlignment = {
    eq: function(x) {
      return function(y) {
        if (x instanceof NoAlignment && y instanceof NoAlignment) {
          return true;
        }
        ;
        if (x instanceof Thematic && y instanceof Thematic) {
          return true;
        }
        ;
        if (x instanceof Magical && y instanceof Magical) {
          return true;
        }
        ;
        if (x instanceof Elemental && y instanceof Elemental) {
          return true;
        }
        ;
        if (x instanceof Draconic && y instanceof Draconic) {
          return true;
        }
        ;
        if (x instanceof Divine && y instanceof Divine) {
          return true;
        }
        ;
        if (x instanceof Unique && y instanceof Unique) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var mkSelect1 = /* @__PURE__ */ mkSelect(showComponentAlignment)(eqComponentAlignment);
  var defComponent = /* @__PURE__ */ function() {
    return {
      rarity: NoComponent.value,
      alignment: NoAlignment.value
    };
  }();
  var init2 = {
    components: [defComponent, defComponent, defComponent, defComponent, defComponent]
  };
  var componentValue = function(c) {
    return getValue5(c.rarity) * getValue12(c.alignment);
  };
  var componentsValue = function(state2) {
    return sum3(map6(componentValue)(state2.components));
  };
  var viewSummary = function(state2) {
    return article2([class$prime4("round primary no-elevate")])([div_2([text("Component Time Reduction: " + (toStringWith(fixed(3))(componentsValue(state2)) + " weeks."))])]);
  };
  var mComponentValue = function(v) {
    if (v instanceof Nothing) {
      return 0;
    }
    ;
    if (v instanceof Just) {
      return componentValue(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Components (line 123, column 1 - line 123, column 45): " + [v.constructor.name]);
  };
  var mkComponentRow$prime = function(c) {
    return function(n) {
      return mkRow2(mkSelect2("component-rarity-" + show5(n))(ComponentRarityChanged.create(n))(getAll2)(map1(function(x) {
        return x.rarity;
      })(c)))(mkSelect1("component-alignment-" + show5(n))(ComponentAlignmentChanged.create(n))(getAll1)(map1(function(x) {
        return x.alignment;
      })(c)))(text(toStringWith(fixed(3))(mComponentValue(c))));
    };
  };
  var mkComponentRow = function(state2) {
    return function(n) {
      return mkComponentRow$prime(index(state2.components)(n))(n);
    };
  };
  var viewDetail = function(state2) {
    return article_2([h3_2("Components"), div5([class$prime4("grid")])(append1(mkRow2(strong_2([text("Rarity")]))(strong_2([text("Alignment")]))(strong_2([text("Time reduction")])))(concatMap(mkComponentRow(state2))([1, 2, 3, 4, 5])))]);
  };
  var view2 = function(state2) {
    return article_2([details_2([summary_2(viewSummary(state2)), div_1(viewDetail(state2))])]);
  };
  var changeRarity = function(state2) {
    return function(n) {
      return function(r) {
        var f = function(c) {
          return {
            alignment: c.alignment,
            rarity: r
          };
        };
        var v = modifyAt(n)(f)(state2.components);
        if (v instanceof Nothing) {
          return state2;
        }
        ;
        if (v instanceof Just) {
          return {
            components: v.value0
          };
        }
        ;
        throw new Error("Failed pattern match at Components (line 151, column 5 - line 153, column 42): " + [v.constructor.name]);
      };
    };
  };
  var changeAlignment = function(state2) {
    return function(n) {
      return function(a) {
        var f = function(c) {
          return {
            rarity: c.rarity,
            alignment: a
          };
        };
        var v = modifyAt(n)(f)(state2.components);
        if (v instanceof Nothing) {
          return state2;
        }
        ;
        if (v instanceof Just) {
          return {
            components: v.value0
          };
        }
        ;
        throw new Error("Failed pattern match at Components (line 160, column 5 - line 162, column 43): " + [v.constructor.name]);
      };
    };
  };
  var update2 = function(v) {
    return function(v1) {
      if (v1 instanceof ComponentRarityChanged) {
        return changeRarity(v)(v1.value0)(fromString3(v1.value1));
      }
      ;
      if (v1 instanceof ComponentAlignmentChanged) {
        return changeAlignment(v)(v1.value0)(fromString1(v1.value1));
      }
      ;
      throw new Error("Failed pattern match at Components (line 142, column 1 - line 142, column 36): " + [v.constructor.name, v1.constructor.name]);
    };
  };

  // output/CraftingInputs/index.js
  var getValue6 = /* @__PURE__ */ getValue(/* @__PURE__ */ valueableArray(valueableCrafterType));
  var sum4 = /* @__PURE__ */ sum(foldableArray)(semiringNumber);
  var map7 = /* @__PURE__ */ map(functorArray);
  var toNodeArray5 = /* @__PURE__ */ toNodeArray(toNodeNodeDataNodeData);
  var div6 = /* @__PURE__ */ div3(toNodeArray5);
  var toNodeArray14 = /* @__PURE__ */ toNodeArray(toNodeHtmlHtml);
  var div1 = /* @__PURE__ */ div6(toNodeArray14);
  var class$prime5 = /* @__PURE__ */ class$prime(toClassListString);
  var show6 = /* @__PURE__ */ show(showInt);
  var mkSelect3 = /* @__PURE__ */ mkSelect(showCrafterType)(eqCrafterType);
  var getAll3 = /* @__PURE__ */ getAll(enumerableCrafterType);
  var getValue13 = /* @__PURE__ */ getValue(/* @__PURE__ */ valueableMaybe(valueableCrafterType));
  var map12 = /* @__PURE__ */ map(functorMaybe);
  var mkSelect12 = /* @__PURE__ */ mkSelect(showToolQuality)(eqToolQuality);
  var getAll12 = /* @__PURE__ */ getAll(enumerableToolQuality);
  var mkSelect22 = /* @__PURE__ */ mkSelect(showToolBonus)(eqToolBonus);
  var getAll22 = /* @__PURE__ */ getAll(enumerableToolBonus);
  var mkSelect32 = /* @__PURE__ */ mkSelect(showToolSanctification)(eqToolSanctification);
  var getAll32 = /* @__PURE__ */ getAll(enumerableToolSanctificat);
  var article_3 = /* @__PURE__ */ article_(toNodeArray14);
  var h3_3 = /* @__PURE__ */ h3_(toNodeStringHtml);
  var append12 = /* @__PURE__ */ append(semigroupArray);
  var strong_3 = /* @__PURE__ */ strong_(toNodeArray14);
  var getValue22 = /* @__PURE__ */ getValue(valueableCraftingEnvironm);
  var getValue32 = /* @__PURE__ */ getValue(valueableCraftingSanctifi);
  var mkSelect4 = /* @__PURE__ */ mkSelect(showCraftingEnvironment)(eqCraftingEnvironment);
  var getAll4 = /* @__PURE__ */ getAll(enumerableCraftingEnviron);
  var mkSelect5 = /* @__PURE__ */ mkSelect(showCraftingSanctificatio)(eqCraftingSanctification);
  var getAll5 = /* @__PURE__ */ getAll(enumerableCraftingSanctif);
  var fromString4 = /* @__PURE__ */ fromString2(fromStringCrafterType);
  var fromString12 = /* @__PURE__ */ fromString2(fromStringToolQuality);
  var fromString22 = /* @__PURE__ */ fromString2(fromStringToolBonus);
  var fromString32 = /* @__PURE__ */ fromString2(fromStringToolSanctificat);
  var fromString42 = /* @__PURE__ */ fromString2(fromStringCraftingEnviron);
  var fromString5 = /* @__PURE__ */ fromString2(fromStringCraftingSanctif);
  var any2 = /* @__PURE__ */ any(foldableArray)(heytingAlgebraBoolean);
  var eq2 = /* @__PURE__ */ eq(eqToolSanctification);
  var getValue42 = /* @__PURE__ */ getValue(valueableCrafterType);
  var article3 = /* @__PURE__ */ article(toNodeArray5)(toNodeArray14);
  var show1 = /* @__PURE__ */ show(showNumber);
  var details2 = /* @__PURE__ */ details(toNodeArray5)(toNodeArray14);
  var summary2 = /* @__PURE__ */ summary(toNodeArray5)(toNodeHtmlHtml);
  var div22 = /* @__PURE__ */ div6(toNodeHtmlHtml);
  var CrafterTypeChanged = /* @__PURE__ */ function() {
    function CrafterTypeChanged2(value0) {
      this.value0 = value0;
    }
    ;
    CrafterTypeChanged2.create = function(value0) {
      return new CrafterTypeChanged2(value0);
    };
    return CrafterTypeChanged2;
  }();
  var AssistantChanged = /* @__PURE__ */ function() {
    function AssistantChanged2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AssistantChanged2.create = function(value0) {
      return function(value1) {
        return new AssistantChanged2(value0, value1);
      };
    };
    return AssistantChanged2;
  }();
  var ItemAdeptChecked = /* @__PURE__ */ function() {
    function ItemAdeptChecked2(value0) {
      this.value0 = value0;
    }
    ;
    ItemAdeptChecked2.create = function(value0) {
      return new ItemAdeptChecked2(value0);
    };
    return ItemAdeptChecked2;
  }();
  var MythicToolChecked = /* @__PURE__ */ function() {
    function MythicToolChecked2(value0) {
      this.value0 = value0;
    }
    ;
    MythicToolChecked2.create = function(value0) {
      return new MythicToolChecked2(value0);
    };
    return MythicToolChecked2;
  }();
  var ToolQualityChanged = /* @__PURE__ */ function() {
    function ToolQualityChanged2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ToolQualityChanged2.create = function(value0) {
      return function(value1) {
        return new ToolQualityChanged2(value0, value1);
      };
    };
    return ToolQualityChanged2;
  }();
  var ToolBonusChanged = /* @__PURE__ */ function() {
    function ToolBonusChanged2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ToolBonusChanged2.create = function(value0) {
      return function(value1) {
        return new ToolBonusChanged2(value0, value1);
      };
    };
    return ToolBonusChanged2;
  }();
  var ToolSanctificationChanged = /* @__PURE__ */ function() {
    function ToolSanctificationChanged2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ToolSanctificationChanged2.create = function(value0) {
      return function(value1) {
        return new ToolSanctificationChanged2(value0, value1);
      };
    };
    return ToolSanctificationChanged2;
  }();
  var CraftingEnvironmentChanged = /* @__PURE__ */ function() {
    function CraftingEnvironmentChanged2(value0) {
      this.value0 = value0;
    }
    ;
    CraftingEnvironmentChanged2.create = function(value0) {
      return new CraftingEnvironmentChanged2(value0);
    };
    return CraftingEnvironmentChanged2;
  }();
  var CraftingAttunmentChanged = /* @__PURE__ */ function() {
    function CraftingAttunmentChanged2(value0) {
      this.value0 = value0;
    }
    ;
    CraftingAttunmentChanged2.create = function(value0) {
      return new CraftingAttunmentChanged2(value0);
    };
    return CraftingAttunmentChanged2;
  }();
  var CraftingSanctificationChanged = /* @__PURE__ */ function() {
    function CraftingSanctificationChanged2(value0) {
      this.value0 = value0;
    }
    ;
    CraftingSanctificationChanged2.create = function(value0) {
      return new CraftingSanctificationChanged2(value0);
    };
    return CraftingSanctificationChanged2;
  }();
  var weeklyCost = function(state2) {
    return getValue6(state2.assistants);
  };
  var totalToolInput = function(state2) {
    return sum4(map7(function(t) {
      return toolValue(new Just(t));
    })(state2.tools));
  };
  var mkRowT = function(caption) {
    return function(content) {
      return function(postscript) {
        return [div1([class$prime5("s4")])([caption]), div1([class$prime5("s4")])([content]), div1([class$prime5("s4")])([postscript])];
      };
    };
  };
  var mkRow5 = function(col1) {
    return function(col2) {
      return function(col3) {
        return function(col4) {
          return function(col5) {
            return [div1([class$prime5("s2")])([col1]), div1([class$prime5("s3")])([col2]), div1([class$prime5("s2")])([col3]), div1([class$prime5("s2")])([col4]), div1([class$prime5("s3")])([col5])];
          };
        };
      };
    };
  };
  var mkRow3 = function(caption) {
    return function(content) {
      return function(postscript) {
        return [div1([class$prime5("s3")])([caption]), div1([class$prime5("s6")])([content]), div1([class$prime5("s3")])([postscript])];
      };
    };
  };
  var mkAssistant = function(state2) {
    return function(n) {
      return mkRow3(text("Assistant " + show6(n + 1 | 0)))(mkSelect3("assistant-type-" + show6(n))(AssistantChanged.create(n))(getAll3)(index(state2.assistants)(n)))(text(showGPs(getValue13(index(state2.assistants)(n)))));
    };
  };
  var mSanctification = function(state2) {
    return function(n) {
      return map12(function(t) {
        return t.sanctification;
      })(index(state2.tools)(n));
    };
  };
  var mQual = function(state2) {
    return function(n) {
      return map12(function(t) {
        return t.quality;
      })(index(state2.tools)(n));
    };
  };
  var mBonus = function(state2) {
    return function(n) {
      return map12(function(t) {
        return t.bonus;
      })(index(state2.tools)(n));
    };
  };
  var mkTool = function(state2) {
    return function(n) {
      return mkRow5(text("Tool " + show6(n + 1 | 0)))(mkSelect12("tool-quality-" + show6(n))(ToolQualityChanged.create(n))(getAll12)(mQual(state2)(n)))(mkSelect22("tool-bonus-" + show6(n))(ToolBonusChanged.create(n))(getAll22)(mBonus(state2)(n)))(mkSelect32("tool-sanctification-" + show6(n))(ToolSanctificationChanged.create(n))(getAll32)(mSanctification(state2)(n)))(text(showGPs(toolValue(index(state2.tools)(n)))));
    };
  };
  var toolDetail = function(state2) {
    return article_3([h3_3("Tools"), div1([class$prime5("grid")])(append12(mkRow5(strong_3([text("Tool")]))(strong_3([text("Quality")]))(strong_3([text("Bonus")]))(strong_3([text("Sanctification")]))(strong_3([text("Value per week")])))(append12(concatMap(mkTool(state2))([0, 1, 2, 3, 4]))(mkRow5(text(""))(text(""))(text(""))(text("Total"))(text(showGPs(totalToolInput(state2)))))))]);
  };
  var init3 = /* @__PURE__ */ function() {
    return {
      crafterType: Specialist.value,
      assistants: [Specialist.value, Specialist.value, Specialist.value, NoCrafter.value, NoCrafter.value],
      itemAdept: true,
      mythicTool: false,
      tools: [{
        sanctification: defTool.sanctification,
        quality: TqAdvanced.value,
        bonus: PlusTwo.value
      }, {
        bonus: defTool.bonus,
        sanctification: defTool.sanctification,
        quality: TqAdvanced.value
      }, defTool, defTool, defTool],
      environment: {
        environmentAttuned: defEnvironment.environmentAttuned,
        environmentSanctified: defEnvironment.environmentSanctified,
        craftingEnvironment: CeAdvanced.value
      }
    };
  }();
  var environmentMultiplier = function(env) {
    return 1 + getValue22(env.craftingEnvironment) + getValue32(env.environmentSanctified) + function() {
      if (env.environmentAttuned) {
        return 0.09;
      }
      ;
      return 0;
    }();
  };
  var environmentDetail = function(state2) {
    return article_3([h3_3("Environment"), div1([class$prime5("grid")])(append12(mkRowT(strong_3([text("Environment")]))(strong_3([text("Attunment")]))(strong_3([text("Sanctification")])))(mkRowT(mkSelect4("crafting-environment")(CraftingEnvironmentChanged.create)(getAll4)(new Just(state2.environment.craftingEnvironment)))(mkCheckbox("environment-attuned")(CraftingAttunmentChanged.create)(state2.environment.environmentAttuned))(mkSelect5("crafting-sanctification")(CraftingSanctificationChanged.create)(getAll5)(new Just(state2.environment.environmentSanctified)))))]);
  };
  var changeToolSanctification = function(state2) {
    return function(n) {
      return function(toolSanc) {
        var chSanc = function(t) {
          return {
            bonus: t.bonus,
            quality: t.quality,
            sanctification: toolSanc
          };
        };
        var v = modifyAt(n)(chSanc)(state2.tools);
        if (v instanceof Nothing) {
          return state2;
        }
        ;
        if (v instanceof Just) {
          return {
            crafterType: state2.crafterType,
            assistants: state2.assistants,
            itemAdept: state2.itemAdept,
            mythicTool: state2.mythicTool,
            environment: state2.environment,
            tools: v.value0
          };
        }
        ;
        throw new Error("Failed pattern match at CraftingInputs (line 96, column 5 - line 98, column 37): " + [v.constructor.name]);
      };
    };
  };
  var changeToolQuality = function(state2) {
    return function(n) {
      return function(toolQuality) {
        var chQual = function(t) {
          return {
            bonus: t.bonus,
            sanctification: t.sanctification,
            quality: toolQuality
          };
        };
        var v = modifyAt(n)(chQual)(state2.tools);
        if (v instanceof Nothing) {
          return state2;
        }
        ;
        if (v instanceof Just) {
          return {
            crafterType: state2.crafterType,
            assistants: state2.assistants,
            itemAdept: state2.itemAdept,
            mythicTool: state2.mythicTool,
            environment: state2.environment,
            tools: v.value0
          };
        }
        ;
        throw new Error("Failed pattern match at CraftingInputs (line 78, column 5 - line 80, column 37): " + [v.constructor.name]);
      };
    };
  };
  var changeToolBonus = function(state2) {
    return function(n) {
      return function(toolBonus) {
        var chBonus = function(t) {
          return {
            quality: t.quality,
            sanctification: t.sanctification,
            bonus: toolBonus
          };
        };
        var v = modifyAt(n)(chBonus)(state2.tools);
        if (v instanceof Nothing) {
          return state2;
        }
        ;
        if (v instanceof Just) {
          return {
            crafterType: state2.crafterType,
            assistants: state2.assistants,
            itemAdept: state2.itemAdept,
            mythicTool: state2.mythicTool,
            environment: state2.environment,
            tools: v.value0
          };
        }
        ;
        throw new Error("Failed pattern match at CraftingInputs (line 87, column 5 - line 89, column 37): " + [v.constructor.name]);
      };
    };
  };
  var changeAssistant = function(state2) {
    return function(n) {
      return function(asst) {
        var v = updateAt(n)(asst)(state2.assistants);
        if (v instanceof Nothing) {
          return state2;
        }
        ;
        if (v instanceof Just) {
          return {
            crafterType: state2.crafterType,
            itemAdept: state2.itemAdept,
            mythicTool: state2.mythicTool,
            tools: state2.tools,
            environment: state2.environment,
            assistants: v.value0
          };
        }
        ;
        throw new Error("Failed pattern match at CraftingInputs (line 69, column 3 - line 71, column 40): " + [v.constructor.name]);
      };
    };
  };
  var update3 = function(v) {
    return function(v1) {
      if (v1 instanceof CrafterTypeChanged) {
        return {
          assistants: v.assistants,
          itemAdept: v.itemAdept,
          mythicTool: v.mythicTool,
          tools: v.tools,
          environment: v.environment,
          crafterType: fromString4(v1.value0)
        };
      }
      ;
      if (v1 instanceof AssistantChanged) {
        return changeAssistant(v)(v1.value0)(fromString4(v1.value1));
      }
      ;
      if (v1 instanceof ItemAdeptChecked) {
        return {
          crafterType: v.crafterType,
          assistants: v.assistants,
          mythicTool: v.mythicTool,
          tools: v.tools,
          environment: v.environment,
          itemAdept: v1.value0
        };
      }
      ;
      if (v1 instanceof MythicToolChecked) {
        return {
          crafterType: v.crafterType,
          assistants: v.assistants,
          itemAdept: v.itemAdept,
          tools: v.tools,
          environment: v.environment,
          mythicTool: v1.value0
        };
      }
      ;
      if (v1 instanceof ToolQualityChanged) {
        return changeToolQuality(v)(v1.value0)(fromString12(v1.value1));
      }
      ;
      if (v1 instanceof ToolBonusChanged) {
        return changeToolBonus(v)(v1.value0)(fromString22(v1.value1));
      }
      ;
      if (v1 instanceof ToolSanctificationChanged) {
        return changeToolSanctification(v)(v1.value0)(fromString32(v1.value1));
      }
      ;
      if (v1 instanceof CraftingEnvironmentChanged) {
        return {
          crafterType: v.crafterType,
          assistants: v.assistants,
          itemAdept: v.itemAdept,
          mythicTool: v.mythicTool,
          tools: v.tools,
          environment: {
            environmentAttuned: v.environment.environmentAttuned,
            environmentSanctified: v.environment.environmentSanctified,
            craftingEnvironment: fromString42(v1.value0)
          }
        };
      }
      ;
      if (v1 instanceof CraftingAttunmentChanged) {
        return {
          crafterType: v.crafterType,
          assistants: v.assistants,
          itemAdept: v.itemAdept,
          mythicTool: v.mythicTool,
          tools: v.tools,
          environment: {
            craftingEnvironment: v.environment.craftingEnvironment,
            environmentSanctified: v.environment.environmentSanctified,
            environmentAttuned: v1.value0
          }
        };
      }
      ;
      if (v1 instanceof CraftingSanctificationChanged) {
        return {
          crafterType: v.crafterType,
          assistants: v.assistants,
          itemAdept: v.itemAdept,
          mythicTool: v.mythicTool,
          tools: v.tools,
          environment: {
            craftingEnvironment: v.environment.craftingEnvironment,
            environmentAttuned: v.environment.environmentAttuned,
            environmentSanctified: fromString5(v1.value0)
          }
        };
      }
      ;
      throw new Error("Failed pattern match at CraftingInputs (line 55, column 1 - line 55, column 36): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var anyThemed = function(tools) {
    return any2(function(t) {
      return eq2(t.sanctification)(Themed.value);
    })(tools);
  };
  var getCrafterValue = function(state2) {
    var multiplier = function() {
      if (state2.mythicTool) {
        var $108 = anyThemed(state2.tools);
        if ($108) {
          return 7;
        }
        ;
        return 3;
      }
      ;
      return 1;
    }();
    return getValue42(state2.crafterType) * multiplier;
  };
  var totalCraftingInput = function(state2) {
    return getCrafterValue(state2) + getValue6(state2.assistants);
  };
  var crafterDetail = function(state2) {
    return article_3([h3_3("Workers"), div1([class$prime5("grid")])(append12(mkRow3(strong_3([text("Worker")]))(strong_3([text("Worker Type")]))(strong_3([text("Value per week")])))(append12(mkRow3(text("Crafter"))(mkSelect3("crafter-type")(CrafterTypeChanged.create)(getAll3)(new Just(state2.crafterType)))(text(showGPs(getCrafterValue(state2)))))(append12(concatMap(mkAssistant(state2))([0, 1, 2, 3, 4]))(append12(mkRow3(text("Magic Item Adept"))(mkCheckbox("item-adept")(ItemAdeptChecked.create)(state2.itemAdept))(text("------------")))(mkRow3(text("Mythic Tool"))(mkCheckbox("mythic-tool")(MythicToolChecked.create)(state2.mythicTool))(text(showGPs(totalCraftingInput(state2)))))))))]);
  };
  var viewDetail2 = function(state2) {
    return div1([class$prime5("grid")])([div1([class$prime5("s6")])([crafterDetail(state2)]), div1([class$prime5("s6")])([toolDetail(state2)]), div1([class$prime5("s12")])([environmentDetail(state2)])]);
  };
  var totalInput = function(state2) {
    return totalCraftingInput(state2) + totalToolInput(state2);
  };
  var effectiveOutput = function(state2) {
    return totalInput(state2) * environmentMultiplier(state2.environment);
  };
  var viewSummary2 = function(model) {
    return article3([class$prime5("round primary no-elevate")])([div1([class$prime5("grid")])([div1([class$prime5("s3")])([text("Crafting Output: " + showGPs(totalInput(model)))]), div1([class$prime5("s3")])([text("Environment Multiplier: x" + show1(environmentMultiplier(model.environment)))]), div1([class$prime5("s3")])([text("Effective Output per week: " + showGPs(effectiveOutput(model)))]), div1([class$prime5("s3")])([text("Weekly cost: " + showGPs(weeklyCost(model)))])])]);
  };
  var view3 = function(state2) {
    return article_3([details2([name("crafting-inputs")])([summary2([name("crafting-inputs-summary")])(viewSummary2(state2)), div22([class$prime5("detail")])(viewDetail2(state2))])]);
  };

  // output/Flame.Types/foreign.js
  function messageMapper(mapper) {
    return function(html) {
      return addMessageMapper(html, mapper);
    };
  }
  function addMessageMapper(html, mapper) {
    if (html.nodeType !== 1 && html.nodeType !== 4)
      mapHtml(html, mapper);
    if (html.children !== void 0 && html.children.length > 0)
      for (let i = 0; i < html.children.length; ++i)
        addMessageMapper(html.children[i], mapper);
    return html;
  }
  function mapHtml(html, mapper) {
    if (html.messageMapper) {
      let previousMessageMapper = html.messageMapper;
      html.messageMapper = function(message2) {
        return mapper(previousMessageMapper(message2));
      };
    } else
      html.messageMapper = mapper;
  }

  // output/Flame.Types/index.js
  var map8 = /* @__PURE__ */ map(functorMaybe);
  var Window = /* @__PURE__ */ function() {
    function Window2() {
    }
    ;
    Window2.value = new Window2();
    return Window2;
  }();
  var Document = /* @__PURE__ */ function() {
    function Document2() {
    }
    ;
    Document2.value = new Document2();
    return Document2;
  }();
  var Custom = /* @__PURE__ */ function() {
    function Custom2() {
    }
    ;
    Custom2.value = new Custom2();
    return Custom2;
  }();
  var functorHtml = {
    map: function(f) {
      return function(html) {
        return messageMapper(map8(f))(html);
      };
    }
  };

  // output/ItemImprovement/index.js
  var fromString6 = /* @__PURE__ */ fromString2(fromStringRarity);
  var div7 = /* @__PURE__ */ div3(/* @__PURE__ */ toNodeArray(toNodeNodeDataNodeData))(/* @__PURE__ */ toNodeArray(toNodeHtmlHtml));
  var class$prime6 = /* @__PURE__ */ class$prime(toClassListString);
  var div12 = /* @__PURE__ */ div(euclideanRingInt);
  var append3 = /* @__PURE__ */ append(semigroupArray);
  var mkSelect6 = /* @__PURE__ */ mkSelect(showRarity)(eqRarity);
  var getAll6 = /* @__PURE__ */ getAll(enumerableRarity);
  var UnitsGoldPieces = /* @__PURE__ */ function() {
    function UnitsGoldPieces2() {
    }
    ;
    UnitsGoldPieces2.value = new UnitsGoldPieces2();
    return UnitsGoldPieces2;
  }();
  var UnitsRarity = /* @__PURE__ */ function() {
    function UnitsRarity2() {
    }
    ;
    UnitsRarity2.value = new UnitsRarity2();
    return UnitsRarity2;
  }();
  var GoldPieces = /* @__PURE__ */ function() {
    function GoldPieces2(value0) {
      this.value0 = value0;
    }
    ;
    GoldPieces2.create = function(value0) {
      return new GoldPieces2(value0);
    };
    return GoldPieces2;
  }();
  var Rarity = /* @__PURE__ */ function() {
    function Rarity2(value0) {
      this.value0 = value0;
    }
    ;
    Rarity2.create = function(value0) {
      return new Rarity2(value0);
    };
    return Rarity2;
  }();
  var ValueUnitsChanged = /* @__PURE__ */ function() {
    function ValueUnitsChanged2(value0) {
      this.value0 = value0;
    }
    ;
    ValueUnitsChanged2.create = function(value0) {
      return new ValueUnitsChanged2(value0);
    };
    return ValueUnitsChanged2;
  }();
  var InitialRarityChanged = /* @__PURE__ */ function() {
    function InitialRarityChanged2(value0) {
      this.value0 = value0;
    }
    ;
    InitialRarityChanged2.create = function(value0) {
      return new InitialRarityChanged2(value0);
    };
    return InitialRarityChanged2;
  }();
  var FinalRarityChanged = /* @__PURE__ */ function() {
    function FinalRarityChanged2(value0) {
      this.value0 = value0;
    }
    ;
    FinalRarityChanged2.create = function(value0) {
      return new FinalRarityChanged2(value0);
    };
    return FinalRarityChanged2;
  }();
  var InitialValueChanged = /* @__PURE__ */ function() {
    function InitialValueChanged2(value0) {
      this.value0 = value0;
    }
    ;
    InitialValueChanged2.create = function(value0) {
      return new InitialValueChanged2(value0);
    };
    return InitialValueChanged2;
  }();
  var FinalValueChanged = /* @__PURE__ */ function() {
    function FinalValueChanged2(value0) {
      this.value0 = value0;
    }
    ;
    FinalValueChanged2.create = function(value0) {
      return new FinalValueChanged2(value0);
    };
    return FinalValueChanged2;
  }();
  var showValueUnits = {
    show: function(v) {
      if (v instanceof UnitsGoldPieces) {
        return "Gold Pieces";
      }
      ;
      if (v instanceof UnitsRarity) {
        return "Rarity";
      }
      ;
      throw new Error("Failed pattern match at ItemImprovement (line 29, column 1 - line 31, column 34): " + [v.constructor.name]);
    }
  };
  var fromStringValueUnits = {
    fromString: function(v) {
      if (v === "Gold Pieces") {
        return UnitsGoldPieces.value;
      }
      ;
      if (v === "Rarity") {
        return UnitsRarity.value;
      }
      ;
      return UnitsRarity.value;
    }
  };
  var fromString13 = /* @__PURE__ */ fromString2(fromStringValueUnits);
  var enumerableValueUnits = /* @__PURE__ */ function() {
    return {
      getAll: [UnitsGoldPieces.value, UnitsRarity.value]
    };
  }();
  var getAll13 = /* @__PURE__ */ getAll(enumerableValueUnits);
  var update4 = function(v) {
    return function(v1) {
      if (v1 instanceof ValueUnitsChanged) {
        return {
          initialValue: v.initialValue,
          finalValue: v.finalValue,
          valueUnits: fromString13(v1.value0)
        };
      }
      ;
      if (v1 instanceof InitialRarityChanged) {
        return {
          valueUnits: v.valueUnits,
          finalValue: v.finalValue,
          initialValue: new Rarity(fromString6(v1.value0))
        };
      }
      ;
      if (v1 instanceof FinalRarityChanged) {
        return {
          valueUnits: v.valueUnits,
          initialValue: v.initialValue,
          finalValue: new Rarity(fromString6(v1.value0))
        };
      }
      ;
      if (v1 instanceof InitialValueChanged) {
        return {
          valueUnits: v.valueUnits,
          finalValue: v.finalValue,
          initialValue: new GoldPieces(v1.value0)
        };
      }
      ;
      if (v1 instanceof FinalValueChanged) {
        return {
          valueUnits: v.valueUnits,
          initialValue: v.initialValue,
          finalValue: new GoldPieces(v1.value0)
        };
      }
      ;
      throw new Error("Failed pattern match at ItemImprovement (line 62, column 1 - line 62, column 36): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var mkRow4 = function(caption) {
    return function(content) {
      return [div7([class$prime6("s3")])([text(caption)]), div7([class$prime6("s9")])([content])];
    };
  };
  var isMaybeUncommon = function(v) {
    if (v instanceof Nothing) {
      return false;
    }
    ;
    if (v instanceof Just) {
      return isUncommon(v.value0);
    }
    ;
    throw new Error("Failed pattern match at ItemImprovement (line 98, column 1 - line 98, column 43): " + [v.constructor.name]);
  };
  var init4 = /* @__PURE__ */ function() {
    return {
      valueUnits: UnitsRarity.value,
      initialValue: new Rarity(Common.value),
      finalValue: new Rarity(Uncommon.value)
    };
  }();
  var getRarity = function(v) {
    if (v instanceof Rarity) {
      return new Just(v.value0);
    }
    ;
    return Nothing.value;
  };
  var viewRarity = function(output) {
    return function(reduction) {
      return function(asstCost) {
        return function(adept) {
          return function(state2) {
            var initRar = getRarity(state2.initialValue);
            var initVal = getMaybeRarity(initRar);
            var finalRar = getRarity(state2.finalValue);
            var finalVal = getMaybeRarity(finalRar);
            var basePrice = function() {
              var $50 = finalVal - initVal < 0;
              if ($50) {
                return 0;
              }
              ;
              return round2(finalVal - initVal);
            }();
            var adjPrice = function() {
              var $51 = isMaybeUncommon(finalRar);
              if ($51) {
                return div12(basePrice)(2);
              }
              ;
              return basePrice;
            }();
            var costPrice = calcCostPrice(adjPrice);
            var craftTime = calcCraftingTime(adjPrice)(output)(reduction);
            var craftCost = calcCraftingCost(costPrice)(craftTime)(asstCost);
            return append3(mkRow4("Initial Rarity:")(mkSelect6("initial-rarity")(InitialRarityChanged.create)(getAll6)(initRar)))(append3(mkRow4("Final Rarity:")(mkSelect6("final-rarity")(FinalRarityChanged.create)(getAll6)(finalRar)))(append3(mkRow4("Value Difference:")(text(showGPs(toNumber(adjPrice)))))(append3(mkRow4("Crafting Time (weeks):")(text(showWeeks(craftTime))))(append3(mkRow4("Crafting Time (hours):")(text(showHours(craftTime))))(mkRow4("Crafting Cost:")(text(showGPs(craftCost))))))));
          };
        };
      };
    };
  };
  var getGPs = function(v) {
    if (v instanceof GoldPieces) {
      return v.value0;
    }
    ;
    return 0;
  };
  var viewGold = function(output) {
    return function(reduction) {
      return function(asstCost) {
        return function(v) {
          return function(state2) {
            var initVal = getGPs(state2.initialValue);
            var finalVal = getGPs(state2.finalValue);
            var basePrice = function() {
              var $54 = (finalVal - initVal | 0) < 0;
              if ($54) {
                return 0;
              }
              ;
              return finalVal - initVal | 0;
            }();
            var costPrice = calcCostPrice(basePrice);
            var craftTime = calcCraftingTime(basePrice)(output)(reduction);
            var craftCost = calcCraftingCost(costPrice)(craftTime)(asstCost);
            return append3(mkRow4("Initial Value:")(mkNumber("initial-value")(InitialValueChanged.create)(initVal)))(append3(mkRow4("Final Value:")(mkNumber("final-value")(FinalValueChanged.create)(finalVal)))(append3(mkRow4("Crafting Time (weeks):")(text(showWeeks(craftTime))))(append3(mkRow4("Crafting Time (hours):")(text(showHours(craftTime))))(mkRow4("Crafting Cost:")(text(showGPs(craftCost)))))));
          };
        };
      };
    };
  };
  var eqValueUnits = {
    eq: function(x) {
      return function(y) {
        if (x instanceof UnitsGoldPieces && y instanceof UnitsGoldPieces) {
          return true;
        }
        ;
        if (x instanceof UnitsRarity && y instanceof UnitsRarity) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var mkSelect13 = /* @__PURE__ */ mkSelect(showValueUnits)(eqValueUnits);
  var view4 = function(output) {
    return function(reduction) {
      return function(asstCost) {
        return function(adept) {
          return function(state2) {
            var subview = function() {
              if (state2.valueUnits instanceof UnitsGoldPieces) {
                return viewGold;
              }
              ;
              if (state2.valueUnits instanceof UnitsRarity) {
                return viewRarity;
              }
              ;
              throw new Error("Failed pattern match at ItemImprovement (line 71, column 17 - line 73, column 48): " + [state2.valueUnits.constructor.name]);
            }();
            return div7([class$prime6("grid")])(append3([div7([class$prime6("s3")])([text("Value Units:")]), div7([class$prime6("s9")])([mkSelect13("improvement-units")(ValueUnitsChanged.create)(getAll13)(new Just(state2.valueUnits))])])(subview(output)(reduction)(asstCost)(adept)(state2)));
          };
        };
      };
    };
  };

  // output/MagicItem/index.js
  var getValue7 = /* @__PURE__ */ getValue(valueableMimicSpell);
  var getValue14 = /* @__PURE__ */ getValue(valueableReplicateItem);
  var toNodeArray6 = /* @__PURE__ */ toNodeArray(toNodeHtmlHtml);
  var div13 = /* @__PURE__ */ div3(/* @__PURE__ */ toNodeArray(toNodeNodeDataNodeData))(toNodeArray6);
  var class$prime7 = /* @__PURE__ */ class$prime(toClassListString);
  var append4 = /* @__PURE__ */ append(semigroupArray);
  var mkSelect7 = /* @__PURE__ */ mkSelect(showMimicSpell)(eqMimicSpell);
  var fromString7 = /* @__PURE__ */ fromString2(fromStringMimicSpell);
  var getAll7 = /* @__PURE__ */ getAll(enumerableMimicSpell);
  var mkSelect14 = /* @__PURE__ */ mkSelect(showReplicateItem)(eqReplicateItem);
  var fromString14 = /* @__PURE__ */ fromString2(fromStringReplicateItem);
  var getAll14 = /* @__PURE__ */ getAll(enumerableReplicateItem);
  var mkSelect23 = /* @__PURE__ */ mkSelect(showRarity)(eqRarity);
  var fromString23 = /* @__PURE__ */ fromString2(fromStringRarity);
  var getAll23 = /* @__PURE__ */ getAll(enumerableRarity);
  var getValue23 = /* @__PURE__ */ getValue(valueableRarity);
  var h3_4 = /* @__PURE__ */ h3_(toNodeStringHtml);
  var small_2 = /* @__PURE__ */ small_(toNodeArray6);
  var ChangeRarity = /* @__PURE__ */ function() {
    function ChangeRarity3(value0) {
      this.value0 = value0;
    }
    ;
    ChangeRarity3.create = function(value0) {
      return new ChangeRarity3(value0);
    };
    return ChangeRarity3;
  }();
  var ChangeMimicSpell = /* @__PURE__ */ function() {
    function ChangeMimicSpell3(value0) {
      this.value0 = value0;
    }
    ;
    ChangeMimicSpell3.create = function(value0) {
      return new ChangeMimicSpell3(value0);
    };
    return ChangeMimicSpell3;
  }();
  var ChangeSpellCount = /* @__PURE__ */ function() {
    function ChangeSpellCount3(value0) {
      this.value0 = value0;
    }
    ;
    ChangeSpellCount3.create = function(value0) {
      return new ChangeSpellCount3(value0);
    };
    return ChangeSpellCount3;
  }();
  var ChangeAccessToInstance = /* @__PURE__ */ function() {
    function ChangeAccessToInstance4(value0) {
      this.value0 = value0;
    }
    ;
    ChangeAccessToInstance4.create = function(value0) {
      return new ChangeAccessToInstance4(value0);
    };
    return ChangeAccessToInstance4;
  }();
  var ChangeReplication = /* @__PURE__ */ function() {
    function ChangeReplication2(value0) {
      this.value0 = value0;
    }
    ;
    ChangeReplication2.create = function(value0) {
      return new ChangeReplication2(value0);
    };
    return ChangeReplication2;
  }();
  var update5 = function(v) {
    return function(v1) {
      if (v1 instanceof ChangeRarity) {
        return {
          mimicSpell: v.mimicSpell,
          spellCount: v.spellCount,
          accessToInstance: v.accessToInstance,
          replication: v.replication,
          itemRarity: v1.value0
        };
      }
      ;
      if (v1 instanceof ChangeMimicSpell) {
        return {
          itemRarity: v.itemRarity,
          spellCount: v.spellCount,
          accessToInstance: v.accessToInstance,
          replication: v.replication,
          mimicSpell: v1.value0
        };
      }
      ;
      if (v1 instanceof ChangeSpellCount) {
        return {
          itemRarity: v.itemRarity,
          mimicSpell: v.mimicSpell,
          accessToInstance: v.accessToInstance,
          replication: v.replication,
          spellCount: v1.value0
        };
      }
      ;
      if (v1 instanceof ChangeAccessToInstance) {
        return {
          itemRarity: v.itemRarity,
          mimicSpell: v.mimicSpell,
          spellCount: v.spellCount,
          replication: v.replication,
          accessToInstance: v1.value0
        };
      }
      ;
      if (v1 instanceof ChangeReplication) {
        return {
          itemRarity: v.itemRarity,
          mimicSpell: v.mimicSpell,
          spellCount: v.spellCount,
          accessToInstance: v.accessToInstance,
          replication: v1.value0
        };
      }
      ;
      throw new Error("Failed pattern match at MagicItem (line 43, column 1 - line 43, column 36): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var timeMultiplier = function(isMagicAdept) {
    return function(state2) {
      var uncommon = function() {
        var $44 = isUncommon(state2.itemRarity) && isMagicAdept;
        if ($44) {
          return 0.25;
        }
        ;
        return 1;
      }();
      var mimic = (56 - toNumber(state2.spellCount) * getValue7(state2.mimicSpell)) / 56;
      var access = function() {
        if (state2.accessToInstance) {
          return 0.1;
        }
        ;
        return 0;
      }();
      return mimic * uncommon - access - getValue14(state2.replication);
    };
  };
  var mkRow6 = function(caption) {
    return function(content) {
      return [div13([class$prime7("s6")])([caption]), div13([class$prime7("s6")])([content])];
    };
  };
  var mimicMessage = "Reduce the time required by a multiplying by ((56 - (number of spells mimic'd * number of times cast per week))/56)";
  var init5 = /* @__PURE__ */ function() {
    return {
      itemRarity: Common.value,
      mimicSpell: No.value,
      spellCount: 0,
      accessToInstance: false,
      replication: RINo.value
    };
  }();
  var identicalMessage = "If crafter has access to an identical item, reduce the crafting time required by 10%";
  var viewSpellCasting = function(state2) {
    return append4(mkRow6(tooltipCaption(mimicMessage)("Does item mimic a spell:"))(mkSelect7("casting")(function(s) {
      return new ChangeMimicSpell(fromString7(s));
    })(getAll7)(new Just(state2.mimicSpell))))(append4(mkRow6(tooltipCaption(mimicMessage)("Number of mimic'd spells:"))(mkNumber("spell-count")(ChangeSpellCount.create)(state2.spellCount)))(append4(mkRow6(tooltipCaption(identicalMessage)("Access to identical item:"))(mkCheckbox("identical-item")(ChangeAccessToInstance.create)(state2.accessToInstance)))(mkRow6(text("Can Replicate this item:"))(mkSelect14("replication")(function(s) {
      return new ChangeReplication(fromString14(s));
    })(getAll14)(new Just(state2.replication))))));
  };
  var boolToStr = function(v) {
    if (!v) {
      return "No";
    }
    ;
    if (v) {
      return "Yes";
    }
    ;
    throw new Error("Failed pattern match at MagicItem (line 124, column 1 - line 124, column 31): " + [v.constructor.name]);
  };
  var adeptTooltip = "If the crafter is a magic item adept, and the item is Uncommon or Common, divide the Base Enchantment Cost by 2 and the Base Enchantment Time by 4. Use these totals for the rest of the worksheet before applying any other modifiers";
  var viewRarity2 = function(isMagicItemAdept) {
    return function(state2) {
      return append4(mkRow6(text("Item Rarity:"))(mkSelect23("rarity")(function(s) {
        return new ChangeRarity(fromString23(s));
      })(getAll23)(new Just(state2.itemRarity))))(append4(mkRow6(text("Base Cost:"))(text(showGPs(getValue23(state2.itemRarity)))))(append4(mkRow6(tooltipCaption(adeptTooltip)("Magic Item Adept:"))(text(boolToStr(isMagicItemAdept))))(mkRow6(tooltipCaption(adeptTooltip)("Common/Uncommon:"))(text(boolToStr(isUncommon(state2.itemRarity)))))));
    };
  };
  var view5 = function(craftingOutputPerWeek) {
    return function(componentReduction) {
      return function(assistantCostPerWeek) {
        return function(isMagicItemAdept) {
          return function(state2) {
            var timeMult = timeMultiplier(isMagicItemAdept)(state2);
            var baseCost = getValue23(state2.itemRarity);
            var baseTime = baseCost / craftingOutputPerWeek;
            var baseWeeks = baseTime * timeMult - componentReduction;
            var weeksNeeded = function() {
              var $47 = baseWeeks < 0;
              if ($47) {
                return 0;
              }
              ;
              return baseWeeks;
            }();
            var asstCost = baseCost / 10 + assistantCostPerWeek * weeksNeeded;
            return div13([class$prime7("grid")])([div13([class$prime7("s6")])([div13([class$prime7("grid")])(viewRarity2(isMagicItemAdept)(state2))]), div13([class$prime7("s6")])([div13([class$prime7("grid")])(viewSpellCasting(state2))]), div13([class$prime7("s12")])([h3_4("Time and Cost")]), div13([class$prime7("s3")])([text("Base Time (weeks)")]), div13([class$prime7("s3")])([text(showWeeks(baseTime))]), div13([class$prime7("s6")])([small_2([text("Base Cost / Effective Crafting Output")])]), div13([class$prime7("s3")])([text("Time multiplier")]), div13([class$prime7("s3")])([text(toStringWith(fixed(3))(timeMult))]), div13([class$prime7("s6")])([small_2([text("Spell mimic adjustment * Artificer Common/Uncommon multiplier - Access to identical item bonus - Replicate Item bonus")])]), div13([class$prime7("s3")])([text("Time required (weeks)")]), div13([class$prime7("s3")])([text(showWeeks(weeksNeeded))]), div13([class$prime7("s6")])([small_2([text("Base Time * Time Multiplier - Component Time Reduction (Minimum 0)")])]), div13([class$prime7("s3")])([text("Time required (hours)")]), div13([class$prime7("s3")])([text(showHours(weeksNeeded))]), div13([class$prime7("s6")])([small_2([text("Time required (weeks) * 56")])]), div13([class$prime7("s3")])([text("Cost")]), div13([class$prime7("s3")])([text(showGPs(asstCost))]), div13([class$prime7("s6")])([small_2([text("Base Cost / 10 + Assistant Cost * Time (weeks)")])])]);
          };
        };
      };
    };
  };

  // output/Potion/index.js
  var getValue8 = /* @__PURE__ */ getValue(valueableMimicSpell);
  var toNodeArray7 = /* @__PURE__ */ toNodeArray(toNodeHtmlHtml);
  var div14 = /* @__PURE__ */ div3(/* @__PURE__ */ toNodeArray(toNodeNodeDataNodeData))(toNodeArray7);
  var class$prime8 = /* @__PURE__ */ class$prime(toClassListString);
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var mkSelect8 = /* @__PURE__ */ mkSelect(showMimicSpell)(eqMimicSpell);
  var fromString8 = /* @__PURE__ */ fromString2(fromStringMimicSpell);
  var getAll8 = /* @__PURE__ */ getAll(enumerableMimicSpell);
  var mkSelect15 = /* @__PURE__ */ mkSelect(showRarity)(eqRarity);
  var fromString15 = /* @__PURE__ */ fromString2(fromStringRarity);
  var getAll15 = /* @__PURE__ */ getAll(enumerableRarity);
  var getValue15 = /* @__PURE__ */ getValue(valueableRarity);
  var h3_5 = /* @__PURE__ */ h3_(toNodeStringHtml);
  var small_3 = /* @__PURE__ */ small_(toNodeArray7);
  var ChangeRarity2 = /* @__PURE__ */ function() {
    function ChangeRarity3(value0) {
      this.value0 = value0;
    }
    ;
    ChangeRarity3.create = function(value0) {
      return new ChangeRarity3(value0);
    };
    return ChangeRarity3;
  }();
  var ChangeMimicSpell2 = /* @__PURE__ */ function() {
    function ChangeMimicSpell3(value0) {
      this.value0 = value0;
    }
    ;
    ChangeMimicSpell3.create = function(value0) {
      return new ChangeMimicSpell3(value0);
    };
    return ChangeMimicSpell3;
  }();
  var ChangeSpellCount2 = /* @__PURE__ */ function() {
    function ChangeSpellCount3(value0) {
      this.value0 = value0;
    }
    ;
    ChangeSpellCount3.create = function(value0) {
      return new ChangeSpellCount3(value0);
    };
    return ChangeSpellCount3;
  }();
  var ChangeAccessToInstance2 = /* @__PURE__ */ function() {
    function ChangeAccessToInstance4(value0) {
      this.value0 = value0;
    }
    ;
    ChangeAccessToInstance4.create = function(value0) {
      return new ChangeAccessToInstance4(value0);
    };
    return ChangeAccessToInstance4;
  }();
  var update6 = function(v) {
    return function(v1) {
      if (v1 instanceof ChangeRarity2) {
        return {
          mimicSpell: v.mimicSpell,
          spellCount: v.spellCount,
          accessToInstance: v.accessToInstance,
          rarity: v1.value0
        };
      }
      ;
      if (v1 instanceof ChangeMimicSpell2) {
        return {
          rarity: v.rarity,
          spellCount: v.spellCount,
          accessToInstance: v.accessToInstance,
          mimicSpell: v1.value0
        };
      }
      ;
      if (v1 instanceof ChangeSpellCount2) {
        return {
          rarity: v.rarity,
          mimicSpell: v.mimicSpell,
          accessToInstance: v.accessToInstance,
          spellCount: v1.value0
        };
      }
      ;
      if (v1 instanceof ChangeAccessToInstance2) {
        return {
          rarity: v.rarity,
          mimicSpell: v.mimicSpell,
          spellCount: v.spellCount,
          accessToInstance: v1.value0
        };
      }
      ;
      throw new Error("Failed pattern match at Potion (line 42, column 1 - line 42, column 36): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var timeMultiplier2 = function(isMagicAdept) {
    return function(state2) {
      var uncommon = function() {
        var $37 = isUncommon(state2.rarity) && isMagicAdept;
        if ($37) {
          return 0.25;
        }
        ;
        return 1;
      }();
      var mimic = (56 - toNumber(state2.spellCount) * getValue8(state2.mimicSpell)) / 56;
      var access = function() {
        if (state2.accessToInstance) {
          return 0.1;
        }
        ;
        return 0;
      }();
      return mimic * uncommon - access;
    };
  };
  var mkRow7 = function(caption) {
    return function(content) {
      return [div14([class$prime8("s6")])([caption]), div14([class$prime8("s6")])([content])];
    };
  };
  var mimicMessage2 = "Reduce the time required by a multiplying by ((56 - (number of spells mimic'd * number of times cast per week))/56)";
  var init6 = /* @__PURE__ */ function() {
    return {
      rarity: Common.value,
      mimicSpell: No.value,
      spellCount: 0,
      accessToInstance: false
    };
  }();
  var identicalMessage2 = "If crafter has access to an identical item, reduce the crafting time required by 10%";
  var viewSpellCasting2 = function(state2) {
    return append5(mkRow7(tooltipCaption(mimicMessage2)("Does item mimic a spell:"))(mkSelect8("casting")(function(s) {
      return new ChangeMimicSpell2(fromString8(s));
    })(getAll8)(new Just(state2.mimicSpell))))(append5(mkRow7(tooltipCaption(mimicMessage2)("Number of mimic'd spells:"))(mkNumber("spell-count")(ChangeSpellCount2.create)(state2.spellCount)))(mkRow7(tooltipCaption(identicalMessage2)("Access to identical item:"))(mkCheckbox("identical-item")(ChangeAccessToInstance2.create)(state2.accessToInstance))));
  };
  var boolToStr2 = function(v) {
    if (!v) {
      return "No";
    }
    ;
    if (v) {
      return "Yes";
    }
    ;
    throw new Error("Failed pattern match at Potion (line 122, column 1 - line 122, column 31): " + [v.constructor.name]);
  };
  var adeptTooltip2 = "If the crafter is a magic item adept, and the item is Uncommon or Common, divide the Base Enchantment Cost by 2 and the Base Enchantment Time by 4. Use these totals for the rest of the worksheet before applying any other modifiers";
  var viewRarity3 = function(isMagicItemAdept) {
    return function(state2) {
      return append5(mkRow7(text("Item Rarity:"))(mkSelect15("rarity")(function(s) {
        return new ChangeRarity2(fromString15(s));
      })(getAll15)(new Just(state2.rarity))))(append5(mkRow7(text("Base Cost:"))(text(showGPs(getValue15(state2.rarity)))))(append5(mkRow7(tooltipCaption(adeptTooltip2)("Magic Item Adept:"))(text(boolToStr2(isMagicItemAdept))))(mkRow7(tooltipCaption(adeptTooltip2)("Common/Uncommon:"))(text(boolToStr2(isUncommon(state2.rarity)))))));
    };
  };
  var view6 = function(craftingOutputPerWeek) {
    return function(assistantCostPerWeek) {
      return function(isMagicItemAdept) {
        return function(state2) {
          var timeMult = timeMultiplier2(isMagicItemAdept)(state2);
          var baseCost = getValue15(state2.rarity);
          var baseTime = baseCost / (craftingOutputPerWeek * 2);
          var baseWeeks = baseTime * timeMult;
          var weeksNeeded = function() {
            var $40 = baseWeeks < 0;
            if ($40) {
              return 0;
            }
            ;
            return baseWeeks;
          }();
          var asstCost = baseCost / 10 + assistantCostPerWeek * weeksNeeded;
          return div14([class$prime8("grid")])([div14([class$prime8("s6")])([div14([class$prime8("grid")])(viewRarity3(isMagicItemAdept)(state2))]), div14([class$prime8("s6")])([div14([class$prime8("grid")])(viewSpellCasting2(state2))]), div14([class$prime8("s12")])([h3_5("Time and Cost")]), div14([class$prime8("s3")])([text("Base Time (weeks)")]), div14([class$prime8("s3")])([text(showWeeks(baseTime))]), div14([class$prime8("s6")])([small_3([text("Base Cost / (2 * Effective Crafting Output)")])]), div14([class$prime8("s3")])([text("Time multiplier")]), div14([class$prime8("s3")])([text(toStringWith(fixed(3))(timeMult))]), div14([class$prime8("s6")])([small_3([text("Spell mimic adjustment * Artificer Common/Uncommon multiplier - Access to identical item bonus")])]), div14([class$prime8("s3")])([text("Time required (weeks)")]), div14([class$prime8("s3")])([text(showWeeks(weeksNeeded))]), div14([class$prime8("s6")])([small_3([text("Base Time * Time Multiplier (Minimum 0)")])]), div14([class$prime8("s3")])([text("Time required (hours)")]), div14([class$prime8("s3")])([text(showHours(weeksNeeded))]), div14([class$prime8("s6")])([small_3([text("Time required (weeks) * 56")])]), div14([class$prime8("s3")])([text("Cost")]), div14([class$prime8("s3")])([text(showGPs(asstCost))]), div14([class$prime8("s6")])([small_3([text("Base Cost / 10 + Assistant Cost * Time (weeks)")])])]);
        };
      };
    };
  };

  // output/Scroll/index.js
  var toNodeArray8 = /* @__PURE__ */ toNodeArray(toNodeHtmlHtml);
  var div8 = /* @__PURE__ */ div3(/* @__PURE__ */ toNodeArray(toNodeNodeDataNodeData))(toNodeArray8);
  var class$prime9 = /* @__PURE__ */ class$prime(toClassListString);
  var append6 = /* @__PURE__ */ append(semigroupArray);
  var getValue9 = /* @__PURE__ */ getValue(valueableRarity);
  var h3_6 = /* @__PURE__ */ h3_(toNodeStringHtml);
  var small_4 = /* @__PURE__ */ small_(toNodeArray8);
  var Cantrip = /* @__PURE__ */ function() {
    function Cantrip2() {
    }
    ;
    Cantrip2.value = new Cantrip2();
    return Cantrip2;
  }();
  var First2 = /* @__PURE__ */ function() {
    function First3() {
    }
    ;
    First3.value = new First3();
    return First3;
  }();
  var Second = /* @__PURE__ */ function() {
    function Second2() {
    }
    ;
    Second2.value = new Second2();
    return Second2;
  }();
  var Third = /* @__PURE__ */ function() {
    function Third2() {
    }
    ;
    Third2.value = new Third2();
    return Third2;
  }();
  var Fourth = /* @__PURE__ */ function() {
    function Fourth2() {
    }
    ;
    Fourth2.value = new Fourth2();
    return Fourth2;
  }();
  var Fifth = /* @__PURE__ */ function() {
    function Fifth2() {
    }
    ;
    Fifth2.value = new Fifth2();
    return Fifth2;
  }();
  var Sixth = /* @__PURE__ */ function() {
    function Sixth2() {
    }
    ;
    Sixth2.value = new Sixth2();
    return Sixth2;
  }();
  var Seventh = /* @__PURE__ */ function() {
    function Seventh2() {
    }
    ;
    Seventh2.value = new Seventh2();
    return Seventh2;
  }();
  var Eighth = /* @__PURE__ */ function() {
    function Eighth2() {
    }
    ;
    Eighth2.value = new Eighth2();
    return Eighth2;
  }();
  var Ninth = /* @__PURE__ */ function() {
    function Ninth2() {
    }
    ;
    Ninth2.value = new Ninth2();
    return Ninth2;
  }();
  var ChangeSpellLevel = /* @__PURE__ */ function() {
    function ChangeSpellLevel2(value0) {
      this.value0 = value0;
    }
    ;
    ChangeSpellLevel2.create = function(value0) {
      return new ChangeSpellLevel2(value0);
    };
    return ChangeSpellLevel2;
  }();
  var ChangeAccessToInstance3 = /* @__PURE__ */ function() {
    function ChangeAccessToInstance4(value0) {
      this.value0 = value0;
    }
    ;
    ChangeAccessToInstance4.create = function(value0) {
      return new ChangeAccessToInstance4(value0);
    };
    return ChangeAccessToInstance4;
  }();
  var showSpellLevel = {
    show: function(v) {
      if (v instanceof Cantrip) {
        return "Cantrip";
      }
      ;
      if (v instanceof First2) {
        return "First";
      }
      ;
      if (v instanceof Second) {
        return "Second";
      }
      ;
      if (v instanceof Third) {
        return "Third";
      }
      ;
      if (v instanceof Fourth) {
        return "Fourth";
      }
      ;
      if (v instanceof Fifth) {
        return "Fifth";
      }
      ;
      if (v instanceof Sixth) {
        return "Sixth";
      }
      ;
      if (v instanceof Seventh) {
        return "Seventh";
      }
      ;
      if (v instanceof Eighth) {
        return "Eighth";
      }
      ;
      if (v instanceof Ninth) {
        return "Ninth";
      }
      ;
      throw new Error("Failed pattern match at Scroll (line 34, column 1 - line 44, column 25): " + [v.constructor.name]);
    }
  };
  var fromStringSpellLevel = {
    fromString: function(v) {
      if (v === "Cantrip") {
        return Cantrip.value;
      }
      ;
      if (v === "First") {
        return First2.value;
      }
      ;
      if (v === "Second") {
        return Second.value;
      }
      ;
      if (v === "Third") {
        return Third.value;
      }
      ;
      if (v === "Fourth") {
        return Fourth.value;
      }
      ;
      if (v === "Fifth") {
        return Fifth.value;
      }
      ;
      if (v === "Sixth") {
        return Sixth.value;
      }
      ;
      if (v === "Seventh") {
        return Seventh.value;
      }
      ;
      if (v === "Eighth") {
        return Eighth.value;
      }
      ;
      if (v === "Ninth") {
        return Ninth.value;
      }
      ;
      return Cantrip.value;
    }
  };
  var fromString9 = /* @__PURE__ */ fromString2(fromStringSpellLevel);
  var enumerableSpellLevel = /* @__PURE__ */ function() {
    return {
      getAll: [Cantrip.value, First2.value, Second.value, Third.value, Fourth.value, Fifth.value, Sixth.value, Seventh.value, Eighth.value, Ninth.value]
    };
  }();
  var getAll9 = /* @__PURE__ */ getAll(enumerableSpellLevel);
  var update7 = function(v) {
    return function(v1) {
      if (v1 instanceof ChangeSpellLevel) {
        return {
          accessToInstance: v.accessToInstance,
          spellLevel: v1.value0
        };
      }
      ;
      if (v1 instanceof ChangeAccessToInstance3) {
        return {
          spellLevel: v.spellLevel,
          accessToInstance: v1.value0
        };
      }
      ;
      throw new Error("Failed pattern match at Scroll (line 75, column 1 - line 75, column 36): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var spellLevelToRarity = function(v) {
    if (v instanceof Cantrip) {
      return Common.value;
    }
    ;
    if (v instanceof First2) {
      return Common.value;
    }
    ;
    if (v instanceof Second) {
      return Uncommon.value;
    }
    ;
    if (v instanceof Third) {
      return Uncommon.value;
    }
    ;
    if (v instanceof Fourth) {
      return Rare.value;
    }
    ;
    if (v instanceof Fifth) {
      return Rare.value;
    }
    ;
    if (v instanceof Sixth) {
      return VeryRare.value;
    }
    ;
    if (v instanceof Seventh) {
      return VeryRare.value;
    }
    ;
    if (v instanceof Eighth) {
      return VeryRare.value;
    }
    ;
    if (v instanceof Ninth) {
      return Legendary.value;
    }
    ;
    throw new Error("Failed pattern match at Scroll (line 135, column 1 - line 135, column 43): " + [v.constructor.name]);
  };
  var timeMultiplier3 = function(isMagicAdept) {
    return function(state2) {
      var rarity = spellLevelToRarity(state2.spellLevel);
      var uncommon = function() {
        var $39 = isUncommon(rarity) && isMagicAdept;
        if ($39) {
          return 0.25;
        }
        ;
        return 1;
      }();
      var access = function() {
        if (state2.accessToInstance) {
          return 0.1;
        }
        ;
        return 0;
      }();
      return uncommon - access;
    };
  };
  var mkRow8 = function(caption) {
    return function(content) {
      return [div8([class$prime9("s6")])([caption]), div8([class$prime9("s6")])([content])];
    };
  };
  var init7 = /* @__PURE__ */ function() {
    return {
      spellLevel: Cantrip.value,
      accessToInstance: false
    };
  }();
  var identicalMessage3 = "If crafter has access to an identical item, reduce the crafting time required by 10%";
  var viewSpellCasting3 = function(state2) {
    return mkRow8(tooltipCaption(identicalMessage3)("Access to identical item:"))(mkCheckbox("identical-item")(ChangeAccessToInstance3.create)(state2.accessToInstance));
  };
  var eqSpellLevel = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Cantrip && y instanceof Cantrip) {
          return true;
        }
        ;
        if (x instanceof First2 && y instanceof First2) {
          return true;
        }
        ;
        if (x instanceof Second && y instanceof Second) {
          return true;
        }
        ;
        if (x instanceof Third && y instanceof Third) {
          return true;
        }
        ;
        if (x instanceof Fourth && y instanceof Fourth) {
          return true;
        }
        ;
        if (x instanceof Fifth && y instanceof Fifth) {
          return true;
        }
        ;
        if (x instanceof Sixth && y instanceof Sixth) {
          return true;
        }
        ;
        if (x instanceof Seventh && y instanceof Seventh) {
          return true;
        }
        ;
        if (x instanceof Eighth && y instanceof Eighth) {
          return true;
        }
        ;
        if (x instanceof Ninth && y instanceof Ninth) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var mkSelect9 = /* @__PURE__ */ mkSelect(showSpellLevel)(eqSpellLevel);
  var boolToStr3 = function(v) {
    if (!v) {
      return "No";
    }
    ;
    if (v) {
      return "Yes";
    }
    ;
    throw new Error("Failed pattern match at Scroll (line 163, column 1 - line 163, column 31): " + [v.constructor.name]);
  };
  var adeptTooltip3 = "If the crafter is a magic item adept, and the item is Uncommon or Common, divide the Base Enchantment Cost by 2 and the Base Enchantment Time by 4. Use these totals for the rest of the worksheet before applying any other modifiers";
  var viewRarity4 = function(isMagicItemAdept) {
    return function(state2) {
      var rarity = spellLevelToRarity(state2.spellLevel);
      return append6(mkRow8(text("Item Rarity:"))(mkSelect9("rarity")(function(s) {
        return new ChangeSpellLevel(fromString9(s));
      })(getAll9)(new Just(state2.spellLevel))))(append6(mkRow8(text("Base Cost:"))(text(showGPs(getValue9(rarity)))))(append6(mkRow8(tooltipCaption(adeptTooltip3)("Magic Item Adept:"))(text(boolToStr3(isMagicItemAdept))))(mkRow8(tooltipCaption(adeptTooltip3)("Common/Uncommon:"))(text(boolToStr3(isUncommon(rarity)))))));
    };
  };
  var view7 = function(craftingOutputPerWeek) {
    return function(componentReduction) {
      return function(assistantCostPerWeek) {
        return function(isMagicItemAdept) {
          return function(state2) {
            var timeMult = timeMultiplier3(isMagicItemAdept)(state2);
            var rarity = spellLevelToRarity(state2.spellLevel);
            var baseCost = getValue9(rarity);
            var baseTime = baseCost / (craftingOutputPerWeek * 2);
            var baseWeeks = baseTime * timeMult - componentReduction;
            var weeksNeeded = function() {
              var $44 = baseWeeks < 0;
              if ($44) {
                return 0;
              }
              ;
              return baseWeeks;
            }();
            var asstCost = baseCost / 10 + assistantCostPerWeek * weeksNeeded;
            return div8([class$prime9("grid")])([div8([class$prime9("s6")])([div8([class$prime9("grid")])(viewRarity4(isMagicItemAdept)(state2))]), div8([class$prime9("s6")])([div8([class$prime9("grid")])(viewSpellCasting3(state2))]), div8([class$prime9("s12")])([h3_6("Time and Cost")]), div8([class$prime9("s3")])([text("Base Time (weeks)")]), div8([class$prime9("s3")])([text(showWeeks(baseTime))]), div8([class$prime9("s6")])([small_4([text("Base Cost / (2 * Effective Crafting Output)")])]), div8([class$prime9("s3")])([text("Time multiplier")]), div8([class$prime9("s3")])([text(toStringWith(fixed(3))(timeMult))]), div8([class$prime9("s6")])([small_4([text("Artificer Common/Uncommon multiplier - Access to identical item bonus")])]), div8([class$prime9("s3")])([text("Time required (weeks)")]), div8([class$prime9("s3")])([text(showWeeks(weeksNeeded))]), div8([class$prime9("s6")])([small_4([text("Base Time * Time Multiplier - Component Time Reduction (Minimum 0)")])]), div8([class$prime9("s3")])([text("Time required (hours)")]), div8([class$prime9("s3")])([text(showHours(weeksNeeded))]), div8([class$prime9("s6")])([small_4([text("Time required (weeks) * 56")])]), div8([class$prime9("s3")])([text("Cost")]), div8([class$prime9("s3")])([text(showGPs(asstCost))]), div8([class$prime9("s6")])([small_4([text("Base Cost / 10 + Assistant Cost * Time (weeks)")])])]);
          };
        };
      };
    };
  };

  // output/Crafting/index.js
  var eq3 = /* @__PURE__ */ eq(eqTabs);
  var map9 = /* @__PURE__ */ map(functorHtml);
  var toNodeArray9 = /* @__PURE__ */ toNodeArray(toNodeNodeDataNodeData);
  var toNodeArray15 = /* @__PURE__ */ toNodeArray(toNodeHtmlHtml);
  var div9 = /* @__PURE__ */ div3(toNodeArray9)(toNodeArray15);
  var class$prime10 = /* @__PURE__ */ class$prime(toClassListString);
  var button2 = /* @__PURE__ */ button(toNodeArray9)(toNodeArray15);
  var show7 = /* @__PURE__ */ show(showTabs);
  var main2 = /* @__PURE__ */ main(toNodeStringNodeData)(toNodeArray15);
  var h1_2 = /* @__PURE__ */ h1_(toNodeArray15);
  var article_4 = /* @__PURE__ */ article_(toNodeArray15);
  var append7 = /* @__PURE__ */ append(semigroupArray);
  var map13 = /* @__PURE__ */ map(functorArray);
  var getAll10 = /* @__PURE__ */ getAll(enumerableTabs);
  var CraftingInputMessage = /* @__PURE__ */ function() {
    function CraftingInputMessage2(value0) {
      this.value0 = value0;
    }
    ;
    CraftingInputMessage2.create = function(value0) {
      return new CraftingInputMessage2(value0);
    };
    return CraftingInputMessage2;
  }();
  var TabChange = /* @__PURE__ */ function() {
    function TabChange2(value0) {
      this.value0 = value0;
    }
    ;
    TabChange2.create = function(value0) {
      return new TabChange2(value0);
    };
    return TabChange2;
  }();
  var BasicItemMessage = /* @__PURE__ */ function() {
    function BasicItemMessage2(value0) {
      this.value0 = value0;
    }
    ;
    BasicItemMessage2.create = function(value0) {
      return new BasicItemMessage2(value0);
    };
    return BasicItemMessage2;
  }();
  var MagicItemMessage = /* @__PURE__ */ function() {
    function MagicItemMessage2(value0) {
      this.value0 = value0;
    }
    ;
    MagicItemMessage2.create = function(value0) {
      return new MagicItemMessage2(value0);
    };
    return MagicItemMessage2;
  }();
  var ItemImprovementMessage = /* @__PURE__ */ function() {
    function ItemImprovementMessage2(value0) {
      this.value0 = value0;
    }
    ;
    ItemImprovementMessage2.create = function(value0) {
      return new ItemImprovementMessage2(value0);
    };
    return ItemImprovementMessage2;
  }();
  var ComponentsMessage = /* @__PURE__ */ function() {
    function ComponentsMessage2(value0) {
      this.value0 = value0;
    }
    ;
    ComponentsMessage2.create = function(value0) {
      return new ComponentsMessage2(value0);
    };
    return ComponentsMessage2;
  }();
  var PotionsMessage = /* @__PURE__ */ function() {
    function PotionsMessage2(value0) {
      this.value0 = value0;
    }
    ;
    PotionsMessage2.create = function(value0) {
      return new PotionsMessage2(value0);
    };
    return PotionsMessage2;
  }();
  var ScrollsMessage = /* @__PURE__ */ function() {
    function ScrollsMessage2(value0) {
      this.value0 = value0;
    }
    ;
    ScrollsMessage2.create = function(value0) {
      return new ScrollsMessage2(value0);
    };
    return ScrollsMessage2;
  }();
  var update8 = function(model) {
    return function(v) {
      if (v instanceof CraftingInputMessage) {
        return {
          activeTab: model.activeTab,
          basicItem: model.basicItem,
          magicItem: model.magicItem,
          itemImprovement: model.itemImprovement,
          components: model.components,
          potion: model.potion,
          scroll: model.scroll,
          craftingInputs: update3(model.craftingInputs)(v.value0)
        };
      }
      ;
      if (v instanceof TabChange) {
        return {
          craftingInputs: model.craftingInputs,
          basicItem: model.basicItem,
          magicItem: model.magicItem,
          itemImprovement: model.itemImprovement,
          components: model.components,
          potion: model.potion,
          scroll: model.scroll,
          activeTab: v.value0
        };
      }
      ;
      if (v instanceof BasicItemMessage) {
        return {
          craftingInputs: model.craftingInputs,
          activeTab: model.activeTab,
          magicItem: model.magicItem,
          itemImprovement: model.itemImprovement,
          components: model.components,
          potion: model.potion,
          scroll: model.scroll,
          basicItem: update(model.basicItem)(v.value0)
        };
      }
      ;
      if (v instanceof MagicItemMessage) {
        return {
          craftingInputs: model.craftingInputs,
          activeTab: model.activeTab,
          basicItem: model.basicItem,
          itemImprovement: model.itemImprovement,
          components: model.components,
          potion: model.potion,
          scroll: model.scroll,
          magicItem: update5(model.magicItem)(v.value0)
        };
      }
      ;
      if (v instanceof ItemImprovementMessage) {
        return {
          craftingInputs: model.craftingInputs,
          activeTab: model.activeTab,
          basicItem: model.basicItem,
          magicItem: model.magicItem,
          components: model.components,
          potion: model.potion,
          scroll: model.scroll,
          itemImprovement: update4(model.itemImprovement)(v.value0)
        };
      }
      ;
      if (v instanceof ComponentsMessage) {
        return {
          craftingInputs: model.craftingInputs,
          activeTab: model.activeTab,
          basicItem: model.basicItem,
          magicItem: model.magicItem,
          itemImprovement: model.itemImprovement,
          potion: model.potion,
          scroll: model.scroll,
          components: update2(model.components)(v.value0)
        };
      }
      ;
      if (v instanceof PotionsMessage) {
        return {
          craftingInputs: model.craftingInputs,
          activeTab: model.activeTab,
          basicItem: model.basicItem,
          magicItem: model.magicItem,
          itemImprovement: model.itemImprovement,
          components: model.components,
          scroll: model.scroll,
          potion: update6(model.potion)(v.value0)
        };
      }
      ;
      if (v instanceof ScrollsMessage) {
        return {
          craftingInputs: model.craftingInputs,
          activeTab: model.activeTab,
          basicItem: model.basicItem,
          magicItem: model.magicItem,
          itemImprovement: model.itemImprovement,
          components: model.components,
          potion: model.potion,
          scroll: update7(model.scroll)(v.value0)
        };
      }
      ;
      throw new Error("Failed pattern match at Crafting (line 56, column 16 - line 64, column 69): " + [v.constructor.name]);
    };
  };
  var subscribe = [];
  var mkTabContent = function(model) {
    return function(tab) {
      var reduction = componentsValue(model.components);
      var output = effectiveOutput(model.craftingInputs);
      var classes = function() {
        var $35 = eq3(model.activeTab)(tab);
        if ($35) {
          return "page padding active";
        }
        ;
        return "page padding";
      }();
      var asstCost = weeklyCost(model.craftingInputs);
      var localview = function() {
        if (tab instanceof TabBasicItem) {
          return map9(BasicItemMessage.create)(view(output)(reduction)(asstCost)(model.basicItem));
        }
        ;
        if (tab instanceof TabMagicItem) {
          return map9(MagicItemMessage.create)(view5(output)(reduction)(asstCost)(model.craftingInputs.itemAdept)(model.magicItem));
        }
        ;
        if (tab instanceof TabItemImprovement) {
          return map9(ItemImprovementMessage.create)(view4(output)(reduction)(asstCost)(model.craftingInputs.itemAdept)(model.itemImprovement));
        }
        ;
        if (tab instanceof TabPotion) {
          return map9(PotionsMessage.create)(view6(output)(asstCost)(model.craftingInputs.itemAdept)(model.potion));
        }
        ;
        if (tab instanceof TabScroll) {
          return map9(ScrollsMessage.create)(view7(output)(reduction)(asstCost)(model.craftingInputs.itemAdept)(model.scroll));
        }
        ;
        throw new Error("Failed pattern match at Crafting (line 97, column 7 - line 102, column 92): " + [tab.constructor.name]);
      }();
      return div9([class$prime10(classes)])([localview]);
    };
  };
  var mkTab = function(model) {
    return function(tab) {
      var classes = function() {
        var $37 = eq3(model.activeTab)(tab);
        if ($37) {
          return "active";
        }
        ;
        return "inactive";
      }();
      return button2([class$prime10(classes), onClick(new TabChange(tab)), selected(eq3(model.activeTab)(tab))])([text(show7(tab))]);
    };
  };
  var view8 = function(model) {
    return main2("main")([h1_2([text("Crafting Calculator")]), article_4([map9(CraftingInputMessage.create)(view3(model.craftingInputs)), map9(ComponentsMessage.create)(view2(model.components)), article_4(append7([div9([class$prime10("tabs")])(map13(mkTab(model))(getAll10))])(map13(mkTabContent(model))(getAll10)))])]);
  };
  var init8 = /* @__PURE__ */ function() {
    return {
      craftingInputs: init3,
      activeTab: TabBasicItem.value,
      basicItem: init,
      magicItem: init5,
      itemImprovement: init4,
      components: init2,
      potion: init6,
      scroll: init7
    };
  }();

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler(error3) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error3) {
        setTimeout(function() {
          throw error3;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error3) {
        return left(error3);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error3) {
        k(left(error3))();
        return nonCanceler;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size3 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size3 !== 0) {
          size3--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i, tmp;
          if (size3 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size3) % limit] = cb;
          size3++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error3) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step = aff;
      var fail = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run4(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step = bhead(step);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail = util.left(e);
                step = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step)) {
                status = RETURN;
                fail = step;
                step = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step = util.fromRight(step);
              }
              break;
            case CONTINUE:
              switch (step.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step._2;
                  status = CONTINUE;
                  step = step._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step = util.right(step._1);
                  } else {
                    status = STEP_BIND;
                    step = step._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step = runSync(util.left, util.right, step._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step = runAsync(util.left, step._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step = result2;
                        run4(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail = util.left(step._1);
                  step = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step = step._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step = step._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step._1) {
                    tmp.run();
                  }
                  step = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step = sequential2(util, supervisor, step._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step = interrupt || fail || step;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail) {
                      status = CONTINUE;
                      step = attempt._2(util.fromLeft(fail));
                      fail = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step = util.fromRight(step);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail === null) {
                      result = util.fromRight(step);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail) {
                      step = attempt._1.failed(util.fromLeft(fail))(attempt._2);
                    } else {
                      step = attempt._1.completed(util.fromRight(step))(attempt._2);
                    }
                    fail = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail), attempts, interrupt);
                    status = CONTINUE;
                    step = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step = attempt._1;
                    fail = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step));
                }
              }
              joins = null;
              if (interrupt && fail) {
                setTimeout(function() {
                  throw util.fromLeft(fail);
                }, 0);
              } else if (util.isLeft(step) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join3) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join3.rethrow;
            join3.handler(step)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join3;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill(error3, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error3);
              status = COMPLETED;
              step = interrupt;
              run4(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step(error3)), attempts, interrupt);
                }
                status = RETURN;
                step = null;
                fail = null;
                run4(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step = null;
                fail = null;
              }
          }
          return canceler;
        };
      }
      function join2(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run4(runTick);
          }
          return canceler;
        };
      }
      return {
        kill,
        join: join2,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run4(runTick);
              });
            } else {
              run4(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill(error3, par2, cb2) {
        var step = par2;
        var head2 = null;
        var tail2 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step.tag) {
              case FORKED:
                if (step._3 === EMPTY) {
                  tmp = fibers[step._1];
                  kills2[count++] = tmp.kill(error3, function(result) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result)();
                      }
                    };
                  });
                }
                if (head2 === null) {
                  break loop;
                }
                step = head2._2;
                if (tail2 === null) {
                  head2 = null;
                } else {
                  head2 = tail2._1;
                  tail2 = tail2._2;
                }
                break;
              case MAP:
                step = step._2;
                break;
              case APPLY:
              case ALT:
                if (head2) {
                  tail2 = new Aff2(CONS, head2, tail2);
                }
                head2 = step;
                step = step._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join2(result, head2, tail2) {
        var fail, step, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail = result;
          step = null;
        } else {
          step = result;
          fail = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head2 === null) {
              cb(fail || step)();
              return;
            }
            if (head2._3 !== EMPTY) {
              return;
            }
            switch (head2.tag) {
              case MAP:
                if (fail === null) {
                  head2._3 = util.right(head2._1(util.fromRight(step)));
                  step = head2._3;
                } else {
                  head2._3 = fail;
                }
                break;
              case APPLY:
                lhs = head2._1._3;
                rhs = head2._2._3;
                if (fail) {
                  head2._3 = fail;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, fail === lhs ? head2._2 : head2._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join2(fail, null, null);
                      } else {
                        join2(fail, tail2._1, tail2._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head2._3 = step;
                }
                break;
              case ALT:
                lhs = head2._1._3;
                rhs = head2._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail = step === lhs ? rhs : lhs;
                  step = null;
                  head2._3 = fail;
                } else {
                  head2._3 = step;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, step === lhs ? head2._2 : head2._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join2(step, null, null);
                      } else {
                        join2(step, tail2._1, tail2._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail2 === null) {
              head2 = null;
            } else {
              head2 = tail2._1;
              tail2 = tail2._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join2(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run4() {
        var status = CONTINUE;
        var step = par;
        var head2 = null;
        var tail2 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step.tag) {
                  case MAP:
                    if (head2) {
                      tail2 = new Aff2(CONS, head2, tail2);
                    }
                    head2 = new Aff2(MAP, step._1, EMPTY, EMPTY);
                    step = step._2;
                    break;
                  case APPLY:
                    if (head2) {
                      tail2 = new Aff2(CONS, head2, tail2);
                    }
                    head2 = new Aff2(APPLY, EMPTY, step._2, EMPTY);
                    step = step._1;
                    break;
                  case ALT:
                    if (head2) {
                      tail2 = new Aff2(CONS, head2, tail2);
                    }
                    head2 = new Aff2(ALT, EMPTY, step._2, EMPTY);
                    step = step._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step;
                    step = new Aff2(FORKED, fid, new Aff2(CONS, head2, tail2), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head2 === null) {
                  break loop;
                }
                if (head2._1 === EMPTY) {
                  head2._1 = step;
                  status = CONTINUE;
                  step = head2._2;
                  head2._2 = EMPTY;
                } else {
                  head2._2 = step;
                  step = head2;
                  if (tail2 === null) {
                    head2 = null;
                  } else {
                    head2 = tail2._1;
                    tail2 = tail2._2;
                  }
                }
            }
          }
        root = step;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error3, cb2) {
        interrupt = util.left(error3);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill(error3, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler;
            };
          });
        };
      }
      run4();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential2(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value2) {
          return Aff.Pure(f(value2));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  var _liftEffect = Aff.Sync;
  var makeAff = Aff.Async;
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right()));
          return function() {
            return Aff.Sync(function() {
              return right(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function message(e) {
    return e.message;
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
  };

  // output/Control.Monad.Error.Class/index.js
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map11 = map(Monad0.Bind1().Apply0().Functor0());
    var pure4 = pure(Monad0.Applicative0());
    return function(a) {
      return catchError1(map11(Right.create)(a))(function($52) {
        return pure4(Left.create($52));
      });
    };
  };

  // output/Effect.Class/index.js
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial.Unsafe/index.js
  var crashWith3 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith3(msg);
    });
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy2 = function(name3, moduleName, init11) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init11();
      state2 = 2;
      return val;
    };
  };
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var functorAff = {
    map: _map
  };
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindAff);
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped2(function($83) {
        return liftEffect2(k($83));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void2(runAff(k)(aff));
    };
  };

  // output/Effect.Console/foreign.js
  var log2 = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/Flame.Application.Internal.Dom/foreign.js
  function querySelector_(selector) {
    return document.querySelector(selector);
  }
  function createWindowListener_(eventName, updater) {
    window.addEventListener(eventName, function(event) {
      updater(event)();
    });
  }
  function createDocumentListener_(eventName, updater) {
    document.addEventListener(eventName, function(event) {
      updater(event)();
    });
  }
  function createCustomListener_(eventName, updater) {
    document.addEventListener(eventName, function(event) {
      updater(event.detail)();
    });
  }

  // output/Data.Nullable/foreign.js
  function nullable(a, r, f) {
    return a == null ? r : f(a);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Flame.Application.Internal.Dom/index.js
  var querySelector = function(selector) {
    return function __do() {
      var selected2 = querySelector_(selector);
      return toMaybe(selected2);
    };
  };
  var createWindowListener = /* @__PURE__ */ runEffectFn2(createWindowListener_);
  var createDocumentListener = /* @__PURE__ */ runEffectFn2(createDocumentListener_);
  var createCustomListener = /* @__PURE__ */ runEffectFn2(createCustomListener_);

  // output/Flame.Renderer.String/foreign.js
  var reUnescapedHtml = /[&<>"']/g;
  var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head2, tail2) {
      this.head = head2;
      this.tail = tail2;
    };
    function finalCell(head2) {
      return new ConsCell(head2, emptyList);
    }
    function consList(x) {
      return function(xs) {
        return new ConsCell(x, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply2, map11, f) {
      var buildFrom = function(x, ys) {
        return apply2(map11(consList)(f(x)))(ys);
      };
      var go = function(acc, currentLen, xs) {
        if (currentLen === 0) {
          return acc;
        } else {
          var last3 = xs[currentLen - 1];
          return new Cont(function() {
            var built = go(buildFrom(last3, acc), currentLen - 1, xs);
            return built;
          });
        }
      };
      return function(array) {
        var acc = map11(finalCell)(f(array[array.length - 1]));
        var result = go(acc, array.length - 1, array);
        while (result instanceof Cont) {
          result = result.fn();
        }
        return map11(listToArray)(result);
      };
    };
  }();

  // output/Flame.Internal.Equality/foreign.js
  function compareReference(a) {
    return function(b) {
      return a === b;
    };
  }

  // output/Flame.Internal.Equality/index.js
  var modelHasChanged = function(old) {
    return function($$new2) {
      return !compareReference(old)($$new2);
    };
  };

  // output/Flame.Renderer.Internal.Dom/foreign.js
  var namespace = "http://www.w3.org/2000/svg";
  var eventPrefix = "__flame_";
  var eventPostfix = "updater";
  var textNode2 = 1;
  var elementNode2 = 2;
  var svgNode = 3;
  var fragmentNode = 4;
  var lazyNode = 5;
  var managedNode = 6;
  var nonBubblingEvents = ["focus", "blur", "scroll", "load", "unload"];
  function start_(eventWrapper, root, updater, html) {
    return new F(eventWrapper, root, updater, html, false);
  }
  function startFrom_(eventWrapper, root, updater, html) {
    return new F(eventWrapper, root, updater, html, true);
  }
  function resume_(f, html) {
    f.resume(html);
  }
  function F(eventWrapper, root, updater, html, isDry) {
    this.eventWrapper = eventWrapper;
    this.applicationEvents = /* @__PURE__ */ new Map();
    this.root = root;
    this.updater = updater;
    this.cachedHtml = html.node === void 0 ? html : shallowCopy(html);
    if (isDry)
      this.hydrate(this.root, this.cachedHtml);
    else
      this.createAllNodes(this.root, this.cachedHtml);
  }
  F.prototype.hydrate = function(parent, html, referenceNode) {
    switch (html.nodeType) {
      case lazyNode:
        html.node = parent;
        html.rendered = html.render(html.arg);
        html.render = void 0;
        this.hydrate(parent, html.rendered);
        break;
      case textNode2:
        html.node = parent;
        break;
      case managedNode:
        this.createAllNodes(parent, html, referenceNode);
        break;
      default:
        if (html.nodeType === fragmentNode)
          html.node = document.createDocumentFragment();
        else {
          html.node = parent;
          if (html.nodeData.events !== void 0)
            this.createAllEvents(parent, html);
        }
        let htmlChildrenLength;
        if (html.text === void 0 && html.children !== void 0 && (htmlChildrenLength = html.children.length) > 0) {
          let childNodes = parent.childNodes;
          for (let i = 0, cni = 0; i < htmlChildrenLength; ++i, ++cni) {
            let c = html.children[i] = html.children[i].node === void 0 ? html.children[i] : shallowCopy(html.children[i]);
            if (childNodes[cni] === void 0)
              this.createAllNodes(parent, c);
            else {
              if (c.nodeType === fragmentNode) {
                let fragmentChildrenLength = c.children.length;
                c.node = document.createDocumentFragment();
                for (let j = 0; j < fragmentChildrenLength; ++j) {
                  let cf = c.children[j] = c.children[j].node === void 0 ? c.children[j] : shallowCopy(c.children[j]);
                  this.hydrate(childNodes[cni++], cf);
                }
                cni--;
              } else if (c.nodeType === managedNode)
                this.hydrate(parent, c, childNodes[cni]);
              else
                this.hydrate(childNodes[cni], c);
            }
          }
        }
    }
  };
  function shallowCopy(origin) {
    switch (origin.nodeType) {
      case textNode2:
        return {
          nodeType: textNode2,
          node: void 0,
          text: origin.text
        };
      case fragmentNode:
        return {
          nodeType: fragmentNode,
          node: void 0,
          children: origin.children
        };
      case lazyNode:
        return {
          nodeType: lazyNode,
          node: void 0,
          nodeData: origin.nodeData,
          render: origin.render,
          arg: origin.arg,
          rendered: void 0,
          messageMapper: origin.messageMapper
        };
      case managedNode:
        return {
          nodeType: managedNode,
          node: void 0,
          nodeData: origin.nodeData,
          createNode: origin.createNode,
          updateNode: origin.updateNode,
          arg: origin.arg,
          messageMapper: origin.messageMapper
        };
      default:
        return {
          nodeType: origin.nodeType,
          node: void 0,
          tag: origin.tag,
          nodeData: origin.nodeData,
          children: origin.children,
          text: origin.text,
          messageMapper: origin.messageMapper
        };
    }
  }
  F.prototype.createAllNodes = function(parent, html, referenceNode) {
    let node = this.createNode(html);
    if (html.text !== void 0)
      node.textContent = html.text;
    else {
      if (html.children !== void 0)
        this.createChildrenNodes(node, html.children);
      else if (html.rendered !== void 0) {
        if (html.messageMapper !== void 0)
          lazyMessageMap(html.messageMapper, html.rendered);
        if (html.rendered.text !== void 0) {
          node.textContent = html.rendered.text;
        } else if (html.rendered.children !== void 0)
          this.createChildrenNodes(node, html.rendered.children);
      }
    }
    parent.insertBefore(node, referenceNode);
  };
  F.prototype.checkCreateAllNodes = function(parent, html, referenceNode) {
    if (html.node !== void 0)
      html = shallowCopy(html);
    this.createAllNodes(parent, html, referenceNode);
    return html;
  };
  F.prototype.createChildrenNodes = function(parent, children) {
    let childrenLength = children.length;
    for (let i = 0; i < childrenLength; ++i) {
      let html = children[i] = children[i].node === void 0 ? children[i] : shallowCopy(children[i]);
      this.checkCreateAllNodes(parent, html, null);
    }
  };
  F.prototype.createNode = function(html) {
    switch (html.nodeType) {
      case lazyNode:
        html.rendered = html.render(html.arg);
        html.render = void 0;
        return html.node = this.createNode(html.rendered);
      case textNode2:
        return html.node = document.createTextNode(html.text);
      case elementNode2:
        return html.node = this.createElement(html);
      case svgNode:
        return html.node = this.createSvg(html);
      case fragmentNode:
        return html.node = document.createDocumentFragment();
      case managedNode:
        return html.node = this.createManagedNode(html);
    }
  };
  F.prototype.createElement = function(html) {
    let element = document.createElement(html.tag);
    this.createNodeData(element, html, false);
    return element;
  };
  F.prototype.createSvg = function(html) {
    let svg = document.createElementNS(namespace, html.tag);
    this.createNodeData(svg, html, true);
    return svg;
  };
  F.prototype.createManagedNode = function(html) {
    let node = html.createNode(html.arg)();
    html.createNode = void 0;
    this.createNodeData(node, html, node instanceof SVGElement || node.nodeName.toLowerCase() === "svg");
    return node;
  };
  F.prototype.createNodeData = function(node, html, isSvg) {
    if (html.nodeData.styles !== void 0)
      createStyles(node, html.nodeData.styles);
    if (html.nodeData.classes !== void 0 && html.nodeData.classes.length > 0)
      createClasses(node, html.nodeData.classes, isSvg);
    if (html.nodeData.attributes !== void 0)
      createAttributes(node, html.nodeData.attributes);
    if (html.nodeData.properties !== void 0)
      for (let key in html.nodeData.properties)
        node[key] = html.nodeData.properties[key];
    if (html.nodeData.events !== void 0)
      this.createAllEvents(node, html);
  };
  function createStyles(node, styles) {
    for (let key in styles)
      node.style.setProperty(key, styles[key]);
  }
  function createClasses(node, classes, isSvg) {
    let joined = classes.join(" ");
    if (isSvg)
      node.setAttribute("class", joined);
    else
      node.className = joined;
  }
  function createAttributes(node, attributes) {
    for (let key in attributes)
      node.setAttribute(key, attributes[key]);
  }
  F.prototype.createAllEvents = function(node, html) {
    for (let key in html.nodeData.events)
      this.createEvent(node, key, html);
  };
  F.prototype.createEvent = function(node, name3, html) {
    let handlers = html.nodeData.events[name3], eventKey = eventPrefix + name3;
    if (nonBubblingEvents.includes(name3)) {
      let runNonBubblingEvent = this.runNonBubblingEvent(handlers, html.messageMapper);
      node[eventKey] = runNonBubblingEvent;
      node.addEventListener(name3, runNonBubblingEvent, false);
    } else {
      node[eventKey] = handlers;
      if (html.messageMapper !== void 0)
        node[eventKey + eventPostfix] = html.messageMapper;
      let synthetic = this.applicationEvents.get(name3);
      if (synthetic === void 0) {
        let runEvent = this.runEvent.bind(this);
        this.root.addEventListener(name3, runEvent, false);
        this.applicationEvents.set(name3, {
          count: 1,
          handler: runEvent
        });
      } else
        synthetic.count++;
    }
  };
  F.prototype.runNonBubblingEvent = function(handlers, messageMapper2) {
    return function(event) {
      this.runHandlers(handlers, messageMapper2, event);
    }.bind(this);
  };
  F.prototype.runEvent = function(event) {
    let node = event.target, eventKey = eventPrefix + event.type;
    while (node !== this.root) {
      let handlers = node[eventKey];
      if (handlers !== void 0) {
        this.runHandlers(handlers, node[eventKey + eventPostfix], event);
        return;
      }
      node = node.parentNode;
    }
  };
  F.prototype.runHandlers = function(handlers, messageMapper2, event) {
    let handlersLength = handlers.length;
    for (let i = 0; i < handlersLength; ++i) {
      let h = handlers[i], maybeMessage = typeof h === "function" ? h(event)() : this.eventWrapper(h);
      this.updater(messageMapper2 === void 0 ? maybeMessage : messageMapper2(maybeMessage))();
    }
    event.stopPropagation();
  };
  F.prototype.resume = function(updatedHtml) {
    this.cachedHtml = this.updateAllNodes(this.root, this.cachedHtml, updatedHtml);
  };
  F.prototype.updateAllNodes = function(parent, currentHtml2, updatedHtml) {
    if (updatedHtml.node !== void 0)
      updatedHtml = shallowCopy(updatedHtml);
    if (currentHtml2.tag !== updatedHtml.tag || currentHtml2.nodeType !== updatedHtml.nodeType) {
      if (currentHtml2.nodeType === fragmentNode) {
        this.createAllNodes(parent, updatedHtml, firstFragmentChildNode(currentHtml2.children));
        removeFragmentChildren(parent, currentHtml2.children);
      } else {
        this.createAllNodes(parent, updatedHtml, currentHtml2.node);
        parent.removeChild(currentHtml2.node);
      }
    } else {
      updatedHtml.node = currentHtml2.node;
      switch (updatedHtml.nodeType) {
        case lazyNode:
          if (updatedHtml.arg !== currentHtml2.arg) {
            updatedHtml.rendered = updatedHtml.render(updatedHtml.arg);
            if (updatedHtml.messageMapper !== void 0)
              lazyMessageMap(updatedHtml.messageMapper, updatedHtml.rendered);
            this.updateAllNodes(parent, currentHtml2.rendered, updatedHtml.rendered);
          } else
            updatedHtml.rendered = currentHtml2.rendered;
          updatedHtml.render = void 0;
          break;
        case managedNode:
          let node = updatedHtml.updateNode(currentHtml2.node)(currentHtml2.arg)(updatedHtml.arg)(), isSvg = node instanceof SVGElement || node.nodeName.toLowerCase() === "svg";
          if (node !== currentHtml2.node || node.nodeType !== currentHtml2.node.nodeType || node.nodeName !== currentHtml2.node.nodeName) {
            this.createNodeData(node, updatedHtml, isSvg);
            parent.insertBefore(node, currentHtml2.node);
            parent.removeChild(currentHtml2.node);
          } else
            this.updateNodeData(node, currentHtml2.nodeData, updatedHtml, isSvg);
          updatedHtml.node = node;
          break;
        case textNode2:
          if (updatedHtml.text !== currentHtml2.text)
            updatedHtml.node.textContent = updatedHtml.text;
          break;
        case fragmentNode:
          this.updateChildrenNodes(parent, currentHtml2, updatedHtml);
          break;
        default:
          this.updateNodeData(currentHtml2.node, currentHtml2.nodeData, updatedHtml, updatedHtml.nodeType == svgNode);
          if ((updatedHtml.text !== void 0 || updatedHtml.children === void 0 && currentHtml2.text != void 0) && !hasInnerHtml(updatedHtml.nodeData) && updatedHtml.text != currentHtml2.node.textContent)
            currentHtml2.node.textContent = updatedHtml.text;
          else
            this.updateChildrenNodes(currentHtml2.node, currentHtml2, updatedHtml);
      }
    }
    return updatedHtml;
  };
  function firstFragmentChildNode(children) {
    let childrenLength = children.length;
    for (let i = 0; i < childrenLength; ++i) {
      if (children[i].nodeType === fragmentNode)
        return firstFragmentChildNode(children[i].children);
      return children[i].node;
    }
    return void 0;
  }
  function removeFragmentChildren(parent, children) {
    let childrenLength = children.length;
    for (let i = 0; i < childrenLength; ++i)
      if (children[i].nodeType === fragmentNode)
        removeFragmentChildren(children[i].children);
      else
        parent.removeChild(children[i].node);
  }
  function clearNode(node) {
    node.textContent = "";
  }
  F.prototype.updateChildrenNodes = function(parent, currentHtml2, updatedHtml) {
    let currentChildren = currentHtml2.children, updatedChildren = updatedHtml.children;
    if (currentChildren === void 0 || currentChildren.length === 0) {
      let updatedChildrenLength;
      if (updatedChildren !== void 0 && (updatedChildrenLength = updatedChildren.length) > 0) {
        if (currentHtml2.text !== void 0 || hasInnerHtml(currentHtml2.nodeData))
          clearNode(parent);
        for (let i = 0; i < updatedChildrenLength; ++i)
          updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i]);
      }
    } else if (updatedChildren === void 0 || updatedChildren.length === 0) {
      if (currentChildren !== void 0 && (currentChildren.length > 0 || currentHtml2.text !== void 0) && !hasInnerHtml(updatedHtml.nodeData))
        clearNode(parent);
    } else if (currentChildren[0].nodeData !== void 0 && currentChildren[0].nodeData.key !== void 0 && updatedChildren[0].nodeData !== void 0 && updatedChildren[0].nodeData.key !== void 0)
      this.updateKeyedChildrenNodes(parent, currentChildren, updatedChildren);
    else
      this.updateNonKeyedChildrenNodes(parent, currentChildren, updatedChildren);
  };
  function hasInnerHtml(parentNodeData) {
    return parentNodeData !== void 0 && parentNodeData.properties !== void 0 && parentNodeData.properties.innerHTML !== void 0;
  }
  F.prototype.updateKeyedChildrenNodes = function(parent, currentChildren, updatedChildren) {
    let currentStart = 0, updatedStart = 0, currentEnd = currentChildren.length - 1, updatedEnd = updatedChildren.length - 1;
    let afterNode, currentStartNode = currentChildren[currentStart].node, updatedStartNode = currentStartNode, currentEndNode = currentChildren[currentEnd].node;
    let loop = true;
    fixes:
      while (loop) {
        loop = false;
        let currentHtml2 = currentChildren[currentStart], updatedHtml = updatedChildren[updatedStart];
        while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
          updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
          updatedStartNode = currentStartNode = currentHtml2.node.nextSibling;
          currentStart++;
          updatedStart++;
          if (currentEnd < currentStart || updatedEnd < updatedStart)
            break fixes;
          currentHtml2 = currentChildren[currentStart];
          updatedHtml = updatedChildren[updatedStart];
        }
        currentHtml2 = currentChildren[currentEnd];
        updatedHtml = updatedChildren[updatedEnd];
        while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
          updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
          afterNode = currentEndNode;
          currentEndNode = currentEndNode.previousSibling;
          currentEnd--;
          updatedEnd--;
          if (currentEnd < currentStart || updatedEnd < updatedStart)
            break fixes;
          currentHtml2 = currentChildren[currentEnd];
          updatedHtml = updatedChildren[updatedEnd];
        }
        currentHtml2 = currentChildren[currentEnd];
        updatedHtml = updatedChildren[updatedStart];
        while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
          loop = true;
          updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
          currentEndNode = currentHtml2.node.previousSibling;
          parent.insertBefore(currentHtml2.node, updatedStartNode);
          updatedStart++;
          currentEnd--;
          if (currentEnd < currentStart || updatedEnd < updatedStart)
            break fixes;
          currentHtml2 = currentChildren[currentEnd];
          updatedHtml = updatedChildren[updatedStart];
        }
        currentHtml2 = currentChildren[currentStart];
        updatedHtml = updatedChildren[updatedEnd];
        while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
          loop = true;
          updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
          parent.insertBefore(currentHtml2.node, afterNode);
          afterNode = currentHtml2.node;
          currentStart++;
          updatedEnd--;
          if (currentEnd < currentStart || updatedEnd < updatedStart)
            break fixes;
          currentHtml2 = currentChildren[currentStart];
          updatedHtml = updatedChildren[updatedEnd];
        }
      }
    if (updatedEnd < updatedStart)
      while (currentStart <= currentEnd) {
        parent.removeChild(currentChildren[currentEnd].node);
        currentEnd--;
      }
    else if (currentEnd < currentStart)
      while (updatedStart <= updatedEnd) {
        updatedChildren[updatedStart] = this.checkCreateAllNodes(parent, updatedChildren[updatedStart], afterNode);
        updatedStart++;
      }
    else {
      let P = new Int32Array(updatedEnd + 1 - updatedStart);
      let I = /* @__PURE__ */ new Map();
      for (let i = updatedStart; i <= updatedEnd; i++) {
        P[i] = -1;
        I.set(updatedChildren[i].nodeData.key, i);
      }
      let reusingNodes = updatedStart + updatedChildren.length - 1 - updatedEnd, toRemove = [];
      for (let i = currentStart; i <= currentEnd; i++)
        if (I.has(currentChildren[i].nodeData.key)) {
          P[I.get(currentChildren[i].nodeData.key)] = i;
          reusingNodes++;
        } else
          toRemove.push(i);
      if (reusingNodes === 0) {
        parent.textContent = "";
        for (let i = updatedStart; i <= updatedEnd; i++)
          updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i]);
      } else {
        let toRemoveLength = toRemove.length;
        for (let i = 0; i < toRemoveLength; i++)
          parent.removeChild(currentChildren[toRemove[i]].node);
        let longestSeq = longestSubsequence(P, updatedStart), seqIndex = longestSeq.length - 1;
        for (let i = updatedEnd; i >= updatedStart; i--) {
          if (longestSeq[seqIndex] === i) {
            currentHtml = currentChildren[P[longestSeq[seqIndex]]];
            updatedChildren[i] = this.updateAllNodes(parent, currentHtml, updatedChildren[i]);
            afterNode = currentHtml.node;
            seqIndex--;
          } else {
            if (P[i] === -1) {
              updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i], afterNode);
              afterNode = updatedChildren[i].node;
            } else {
              currentHtml = currentChildren[P[i]];
              updatedChildren[i] = this.updateAllNodes(parent, currentHtml, updatedChildren[i]);
              parent.insertBefore(currentHtml.node, afterNode);
              afterNode = currentHtml.node;
            }
          }
        }
      }
    }
  };
  function longestSubsequence(ns, updatedStart) {
    let seq = [], is = [], l = -1, i, len, pre = new Int32Array(ns.length);
    for (i = updatedStart, len = ns.length; i < len; i++) {
      let n = ns[i];
      if (n < 0)
        continue;
      let j = findGreatestIndex(seq, n);
      if (j !== -1)
        pre[i] = is[j];
      if (j === l) {
        l++;
        seq[l] = n;
        is[l] = i;
      } else if (n < seq[j + 1]) {
        seq[j + 1] = n;
        is[j + 1] = i;
      }
    }
    for (i = is[l]; l >= 0; i = pre[i], l--)
      seq[l] = i;
    return seq;
  }
  function findGreatestIndex(seq, n) {
    let lo = -1, hi = seq.length;
    if (hi > 0 && seq[hi - 1] <= n)
      return hi - 1;
    while (hi - lo > 1) {
      let mid = Math.floor((lo + hi) / 2);
      if (seq[mid] > n)
        hi = mid;
      else
        lo = mid;
    }
    return lo;
  }
  F.prototype.updateNonKeyedChildrenNodes = function(parent, currentChildren, updatedChildren) {
    let currentChildrenLength = currentChildren.length, updatedChildrenLength = updatedChildren.length, commonLength = Math.min(currentChildrenLength, updatedChildrenLength);
    for (let i = 0; i < commonLength; ++i)
      updatedChildren[i] = this.updateAllNodes(parent, currentChildren[i], updatedChildren[i]);
    if (currentChildrenLength < updatedChildrenLength)
      for (let i = commonLength; i < updatedChildrenLength; ++i)
        updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i]);
    else if (currentChildrenLength > updatedChildrenLength)
      for (let i = commonLength; i < currentChildrenLength; ++i)
        parent.removeChild(currentChildren[i].node);
  };
  F.prototype.updateNodeData = function(node, currentNodeData, updatedHtml, isSvg) {
    updateStyles(node, currentNodeData.styles, updatedHtml.nodeData.styles);
    updateAttributes(node, currentNodeData.attributes, updatedHtml.nodeData.attributes);
    updateClasses(node, currentNodeData.classes, updatedHtml.nodeData.classes, isSvg);
    updateProperties(node, currentNodeData.properties, updatedHtml.nodeData.properties);
    this.updateEvents(node, currentNodeData.events, updatedHtml);
  };
  function updateStyles(node, currentStyles, updatedStyles) {
    if (currentStyles === void 0) {
      if (updatedStyles !== void 0)
        createStyles(node, updatedStyles);
    } else if (updatedStyles === void 0) {
      if (currentStyles !== void 0)
        node.removeAttribute("style");
    } else {
      let matchCount = 0;
      for (let key in currentStyles) {
        let current = currentStyles[key], updated = updatedStyles[key], hasUpdated = updatedStyles[key] !== void 0;
        if (hasUpdated)
          matchCount++;
        if (current !== updated)
          if (hasUpdated)
            node.style.setProperty(key, updated);
          else
            node.style.removeProperty(key);
      }
      let newKeys = Object.keys(updatedStyles), newKeysLength = newKeys.length;
      for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
        let key = newKeys[i];
        if (currentStyles[key] === void 0) {
          let updated = updatedStyles[key];
          ++matchCount;
          node.style.setProperty(key, updated);
        }
      }
    }
  }
  function updateClasses(node, currentClasses, updatedClasses, isSvg) {
    let classUpdated = updatedClasses !== void 0 && updatedClasses.length > 0;
    if (currentClasses !== void 0 && currentClasses.length > 0 && !classUpdated)
      createClasses(node, [], isSvg);
    else if (classUpdated)
      createClasses(node, updatedClasses, isSvg);
  }
  function updateAttributes(node, currentAttributes, updatedAttributes) {
    if (currentAttributes === void 0) {
      if (updatedAttributes !== void 0)
        createAttributes(node, updatedAttributes);
    } else if (updatedAttributes === void 0) {
      if (currentAttributes !== void 0)
        for (let key in currentAttributes)
          node.removeAttribute(key);
    } else {
      let matchCount = 0;
      for (let key in currentAttributes) {
        let current = currentAttributes[key], updated = updatedAttributes[key], hasUpdated = updated !== void 0;
        if (hasUpdated)
          matchCount++;
        if (current !== updated)
          if (hasUpdated)
            node.setAttribute(key, updated);
          else
            node.removeAttribute(key);
      }
      let newKeys = Object.keys(updatedAttributes), newKeysLength = newKeys.length;
      for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
        let key = newKeys[i];
        if (currentAttributes[key] === void 0) {
          let updated = updatedAttributes[key];
          ++matchCount;
          node.setAttribute(key, updated);
        }
      }
    }
  }
  function updateProperties(node, currentProperties, updatedProperties) {
    let addAll = currentProperties === void 0, removeAll = updatedProperties === void 0;
    if (addAll) {
      if (!removeAll)
        for (let key in updatedProperties)
          node[key] = updatedProperties[key];
    } else if (removeAll) {
      if (!addAll)
        for (let key in currentProperties)
          node.removeAttribute(key);
    } else {
      let matchCount = 0;
      for (let key in currentProperties) {
        let current = currentProperties[key], updated = updatedProperties[key], hasUpdated = updated !== void 0;
        if (hasUpdated)
          matchCount++;
        if (current !== updated)
          if (hasUpdated)
            node[key] = updated;
          else
            node.removeAttribute(key);
      }
      let newKeys = Object.keys(updatedProperties), newKeysLength = newKeys.length;
      for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
        let key = newKeys[i];
        if (currentProperties[key] === void 0) {
          let updated = updatedProperties[key];
          ++matchCount;
          node[key] = updated;
        }
      }
    }
  }
  F.prototype.updateEvents = function(node, currentEvents, updatedHtml) {
    let updatedEvents = updatedHtml.nodeData.events;
    if (currentEvents === void 0) {
      if (updatedEvents !== void 0)
        this.createAllEvents(node, updatedHtml);
    } else if (updatedEvents === void 0) {
      if (currentEvents !== void 0)
        for (let key in currentEvents)
          this.removeEvent(node, key);
    } else {
      let matchCount = 0;
      for (let key in currentEvents) {
        let current = currentEvents[key], updated = updatedEvents[key], hasUpdated = false;
        if (updated === void 0)
          this.removeEvent(node, key);
        else {
          let currentLength = current.length, updatedLength = updated.length;
          if (currentLength != updatedLength)
            hasUpdated = true;
          else {
            for (let i = 0; i < currentLength; ++i)
              if (current[i] != updated[i]) {
                hasUpdated = true;
                break;
              }
          }
        }
        if (hasUpdated) {
          matchCount++;
          this.removeEvent(node, key);
          this.createEvent(node, key, updatedHtml);
        }
      }
      let newKeys = Object.keys(updatedEvents), newKeysLength = newKeys.length;
      for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
        let key = newKeys[i];
        if (currentEvents[key] === void 0) {
          ++matchCount;
          this.createEvent(node, key, updatedHtml);
        }
      }
    }
  };
  F.prototype.removeEvent = function(node, name3) {
    let eventKey = eventPrefix + name3;
    if (nonBubblingEvents.includes(name3)) {
      let runNonBubblingEvent = node[eventKey];
      node.removeEventListener(name3, runNonBubblingEvent, false);
    } else {
      let count = --this.applicationEvents.get(name3).count;
      if (count === 0) {
        this.root.removeEventListener(name3, this.applicationEvents.get(name3).handler, false);
        this.applicationEvents.delete(name3);
      }
    }
    node[eventKey + eventPostfix] = void 0;
    node[eventKey] = void 0;
  };
  function lazyMessageMap(mapper, html) {
    html.messageMapper = mapper;
    if (html.children !== void 0 && html.children.length > 0)
      for (let i = 0; i < html.children.length; ++i)
        lazyMessageMap(mapper, html.children[i]);
  }

  // output/Flame.Renderer.Internal.Dom/index.js
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var resume = /* @__PURE__ */ runEffectFn2(resume_);
  var maybeUpdater = function(updater) {
    return function(v) {
      if (v instanceof Just) {
        return updater(v.value0);
      }
      ;
      return pure2(unit);
    };
  };
  var start = function(parent) {
    return function(updater) {
      return runEffectFn4(start_)(Just.create)(parent)(maybeUpdater(updater));
    };
  };
  var startFrom = function(parent) {
    return function(updater) {
      return runEffectFn4(startFrom_)(Just.create)(parent)(maybeUpdater(updater));
    };
  };

  // output/Flame.Subscription.Internal.Listener/foreign.js
  var applicationIds = /* @__PURE__ */ new Set();
  function checkApplicationId_(id3) {
    if (applicationIds.has(id3))
      throw `Error mounting application: id ${id3} already registered!`;
    applicationIds.add(id3);
  }

  // output/Foreign/foreign.js
  var isArray = Array.isArray || function(value2) {
    return Object.prototype.toString.call(value2) === "[object Array]";
  };

  // output/Foreign/index.js
  var unsafeFromForeign = unsafeCoerce2;

  // output/Flame.Subscription.Internal.Listener/index.js
  var createSubscription = function(updater) {
    return function(v) {
      if (v.value0 instanceof Window) {
        return createWindowListener(v.value1.value0)(function($13) {
          return updater(v.value1.value1.value0($13));
        });
      }
      ;
      if (v.value0 instanceof Document) {
        return createDocumentListener(v.value1.value0)(function($14) {
          return updater(v.value1.value1.value0($14));
        });
      }
      ;
      if (v.value0 instanceof Custom) {
        return createCustomListener(v.value1.value0)(function($15) {
          return updater(v.value1.value1.value0($15));
        });
      }
      ;
      throw new Error("Failed pattern match at Flame.Subscription.Internal.Listener (line 31, column 83 - line 34, column 75): " + [v.value0.constructor.name]);
    };
  };
  var checkApplicationId = /* @__PURE__ */ runEffectFn1(checkApplicationId_);
  var createMessageListener = function(appId) {
    return function(updater) {
      return function __do() {
        checkApplicationId(appId)();
        return createCustomListener(appId)(function($16) {
          return updater(unsafeFromForeign($16));
        })();
      };
    };
  };

  // output/Flame.Application.EffectList/index.js
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableArray);
  var pure3 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableArray);
  var map10 = /* @__PURE__ */ map(functorMaybe);
  var showId = function(dictShow) {
    var show8 = show(dictShow);
    return function(v) {
      return show8(v);
    };
  };
  var run3 = function(parent) {
    return function(isResumed) {
      return function(appId) {
        return function(v) {
          return function __do() {
            var modelState = $$new(v.init.value0)();
            var renderingState = $$new(21)();
            var render2 = function(model) {
              return function __do2() {
                var rendering2 = read(renderingState)();
                resume(rendering2)(v.view(model))();
                return write(model)(modelState)();
              };
            };
            var runUpdate = function(message2) {
              return function __do2() {
                var currentModel = read(modelState)();
                var v1 = v.update(currentModel)(message2);
                when2(modelHasChanged(currentModel)(v1.value0))(render2(v1.value0))();
                return runMessages(v1.value1)();
              };
            };
            var runMessages = function(affs) {
              return for_2(affs)(runAff_(function(v1) {
                if (v1 instanceof Left) {
                  return log2(message(v1.value0));
                }
                ;
                if (v1 instanceof Right && v1.value0 instanceof Just) {
                  return runUpdate(v1.value0.value0);
                }
                ;
                return pure3(unit);
              }));
            };
            var rendering = function() {
              if (isResumed) {
                return startFrom(parent)(runUpdate)(v.view(v.init.value0))();
              }
              ;
              return start(parent)(runUpdate)(v.view(v.init.value0))();
            }();
            write(rendering)(renderingState)();
            runMessages(v.init.value1)();
            (function() {
              if (appId instanceof Nothing) {
                return unit;
              }
              ;
              if (appId instanceof Just) {
                return createMessageListener(appId.value0)(runUpdate)();
              }
              ;
              throw new Error("Failed pattern match at Flame.Application.EffectList (line 142, column 7 - line 144, column 62): " + [appId.constructor.name]);
            })();
            return traverse_2(createSubscription(runUpdate))(v.subscribe)();
          };
        };
      };
    };
  };
  var noAppId = /* @__PURE__ */ function() {
    return Nothing.value;
  }();
  var mountWith = function(dictShow) {
    var showId1 = showId(dictShow);
    return function(v) {
      return function(appId) {
        return function(application) {
          return function __do() {
            var maybeElement = querySelector(v)();
            if (maybeElement instanceof Just) {
              return run3(maybeElement.value0)(false)(map10(showId1)(appId))(application)();
            }
            ;
            if (maybeElement instanceof Nothing) {
              return $$throw("Error mounting application")();
            }
            ;
            throw new Error("Failed pattern match at Flame.Application.EffectList (line 101, column 7 - line 103, column 62): " + [maybeElement.constructor.name]);
          };
        };
      };
    };
  };
  var mountWith1 = /* @__PURE__ */ mountWith(showUnit);
  var mount_ = function(selector) {
    return mountWith1(selector)(noAppId);
  };

  // output/Flame.Application.NoEffects/index.js
  var mount_2 = function(selector) {
    return function(application) {
      return mount_(selector)({
        view: application.view,
        subscribe: application.subscribe,
        init: new Tuple(application.init, []),
        update: function(model) {
          return function(message2) {
            return new Tuple(application.update(model)(message2), []);
          };
        }
      });
    };
  };

  // output/Main/index.js
  var main3 = /* @__PURE__ */ mount_2("body")({
    init: init8,
    view: view8,
    update: update8,
    subscribe
  });

  // <stdin>
  main3();
})();
