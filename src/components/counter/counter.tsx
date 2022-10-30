import { FC } from 'react';
import './counter.css';

export interface Props {
  label: string;
  value: number;
  placement: 'left' | 'right';
}

const Counter: FC<Props> = ({ label, value, placement }) => {
  return (
    <p className={`counter ${placement}`}>
      {label}: <span className="counter__value">{value}</span>
    </p>
  );
};

export default Counter;
