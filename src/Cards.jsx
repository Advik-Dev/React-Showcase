import React from "react";
import Card from "./Components/Card";

import Counter from "./Components/SubComponents/01_Counter/Counter";
import ColorSelector from "./Components/SubComponents/02_ColorSelect/ColorSelector";
import PasswdGenerator from "./Components/SubComponents/03_PasswordGen/PasswdGenerator";
import TicTacToe from "./Components/SubComponents/04_TicTacToe/TicTacToe";
import Snake from "./Components/SubComponents/05_Snake/Snake";
import CurrencyExchange from "./Components/SubComponents/06_CurrencyConverter/CurrencyExchange";

function Cards() {
  return (
    <div>
      <Card
        title="Counter"
        description="This is where it all began"
        component={Counter}
        bubbles={["useState", "props", "event handling"]}
      />

      <Card
        title="Color Selector"
        description="Ah yes, The trusty color picker - it will always have your back"
        component={ColorSelector}
        bubbles={["dynamic styling", "contextAPI"]}
      />

      <Card
        title="Password Generator"
        description="Create a password that even quantum computers will struggle trying to crack. Only for the most paranoid of people."
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
        description="The old classic. Eat apples, grow longer and move faster. Don't get too impatient though, or you might end up like ouroboros"
        component={Snake}
        bubbles={["useEffect", "setInterval"]}
      />

      <Card
        title="Currency Converter"
        description="Find out how rich you could have been if you invested in crypto back in 2010... Don't dwell on it though you still are a Millionare :D "
        component={CurrencyExchange}
        componentFlex={"flex-1/10"}
        bubbles={["custom hooks", "API handling"]}
      />

      {/*
      Template for new ones
      <Card
        title="Filler Title"
        description="Filler Text"
        component={}
        bubbles={["Filler", "Filler"]}
      /> */}
    </div>
  );
}

export default Cards;
