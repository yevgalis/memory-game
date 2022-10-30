import { FC } from 'react';
import './modal.css';

interface Props {
  messages: string[];
  onClick: () => void;
}

const Modal: FC<Props> = ({ messages, onClick }) => {
  return (
    <div className="overlay">
      <div className="modal">
        {messages.map((msg) => (
          <p key={msg} className="modal__message">{msg}</p>
        ))}
        <button className="modal__btn" type="button" onClick={onClick}>
          Сыграть еще
        </button>
      </div>
    </div>
  );
};

export default Modal;
