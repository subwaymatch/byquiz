import { useDispatch, useSelector } from 'react-redux';

import {
  increment,
  decrement,
  reset,
  selectCount,
} from 'lib/slices/counterSlice';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  return (
    <>
      <div>
        <h2>Count: {count}</h2>
      </div>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </>
  );
};

export default Counter;
