import React from "react";
import Card from "./Components/Card";

import Counter from "./Components/SubComponents/01_Counter/Counter";
import ColorSelector from "./Components/SubComponents/02_ColorSelect/ColorSelector";
import PasswdGenerator from "./Components/SubComponents/03_PasswordGen/PasswdGenerator";
import TicTacToe from "./Components/SubComponents/04_TicTacToe/TicTacToe";
import Snake from "./Components/SubComponents/05_Snake/Snake";

function Cards() {
  return (
    <div>
      <Card
        title="Counter"
        description="Hey, Gotta start from somewhere right?"
        component={Counter}
        bubbles={["useState", "props", "event handling"]}
      />

      <Card
        title="Color Selector"
        description="Ah yes, The trusty color picker - it will always have your back"
        component={ColorSelector}
        bubbles={["dynamic styling", "array mapping", "randomization"]}
      />

      <Card
        title="Password Generator"
        description="Well, now you can have a password even quantum computers will struggle with. Remembering it, however, is something you'll have to figure out on your own."
        component={PasswdGenerator}
        bubbles={["useCallback", "controlled components", "state lifting"]}
      />

      <Card
        title="TicTacToe"
        description="Now you have someone to play tic-tac-toe with... though not a particularly smart one, mind you."
        component={TicTacToe}
        bubbles={["useRef", "forwardRef", "useImperativeHandle"]}
      />

      <Card
        title="Snake Game"
        description="How come these digital snakes eat everything except what they're actually supposed to eat"
        component={Snake}
        bubbles={["useEffect", "setInterval", "matrices"]}
      />

      {/* <Card
        title="Filler Title"
        description="Filler Text"
        component={}
        bubbles={["Filler", "Filler"]}
      /> */}
    </div>
  );
}

export default Cards;
