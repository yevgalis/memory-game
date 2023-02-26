import { useState, useEffect } from 'react';
import Counter from '../counter/counter';
import Card from '../card/card';
import Modal from '../modal/modal';
import { ICard } from '../../types';
import './app.css';
import firebase from '../../img/firebase-logo.svg';
import nginx from '../../img/nginx-logo.svg';
import nodejs from '../../img/nodejs-logo.svg';
import react from '../../img/react-logo.svg';
import redux from '../../img/redux-logo.svg';
import typescript from '../../img/ts-logo.svg';
import webpack from '../../img/webpack-logo.svg';
import webstorm from '../../img/webstorm-logo.svg';

const MAX_TURNS = 20;
const IMAGE_URLS = [firebase, nginx, nodejs, react, redux, typescript, webpack, webstorm];
const CARD_FLIP_DELAY = 1000;

const App = () => {
  const [turns, setTurns] = useState(0);
  const [cards, setCards] = useState<ICard[]>([]);
  const [choiceOne, setChoiceOne] = useState<ICard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<ICard | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const shuffleCards = () => {
    const shuffledCards = [...IMAGE_URLS, ...IMAGE_URLS]
      .sort(() => 0.5 - Math.random())
      .map((url, index) => ({ id: index + 1, src: url, matched: false }));

    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setMessages([]);
    setCards(shuffledCards);
  };

  const onCardClick = (card: ICard) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevState) => prevState + 1);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        const updatedCards = cards.map((card) => {
          return card.src === choiceOne.src
            ? { ...card, matched: true }
            : { ... card };
        });

        setTimeout(() => {
          setCards(updatedCards);
          resetTurn();
        }, CARD_FLIP_DELAY);
      } else {
        setTimeout(resetTurn, CARD_FLIP_DELAY);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (turns >= MAX_TURNS) {
      setMessages(['Увы, вы проиграли', 'У вас кончились ходы']);
    }
  }, [turns]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setMessages(['Ура, вы выиграли!', `это заняло ${turns} ходов`]);
    }
  }, [cards]);

  return (
    <main className="app">
      {messages.length > 0 && (
        <Modal
          messages={messages}
          onClick={shuffleCards}
        />
      )}
      <h1 className="app__header">Memory</h1>
      <Counter label="Cделано ходов" value={turns} placement="left" />
      <div className="cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={card.id === choiceOne?.id || card.id === choiceTwo?.id}
            disabled={choiceOne !== null && choiceTwo !== null}
            onClick={onCardClick}
          />
        ))}
      </div>
      <Counter label="Осталось попыток" value={MAX_TURNS - turns} placement="right" />
    </main>
  );
};

export default App;
