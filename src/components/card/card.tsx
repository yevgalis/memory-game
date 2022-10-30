import { FC } from 'react';
import { ICard } from '../../types';
import './card.css';

interface Props {
  card: ICard,
  flipped: boolean;
  disabled: boolean;
  onClick: (card: ICard) => void;
}

const Card: FC<Props> = ({ card, flipped, disabled, onClick }) => {
  const onCardClick = () => {
    if (disabled) return;
    onClick(card);
  };

  return (
    <div className="card">
      {!card.matched ? (
        <>
          <div className={`card__back ${flipped ? 'card__back--flipped' : ''}`} onClick={onCardClick}>
            k/c
          </div>
          <div className={`card__front ${flipped ? 'card__front--flipped' : ''}`}>
            <img className="card__image" src={card.src} alt="" />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Card;
