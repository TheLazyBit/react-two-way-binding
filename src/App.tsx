import * as React from 'react';
import {useEffect, useState} from 'react';

type Binding<T> = { bind: (child: T) => () => void }
type Child = {
  click: () => void,
  setClicks: (x: number) => void,
  clicks: number,
}

const Child = ({ bind }: Binding<Child>) => {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    return bind({
      click() { setClicks(prev => prev + 1); },
      setClicks(x: number) { setClicks(x); },
      clicks: clicks,
    });
  }, [clicks]);

  return <div style={{background: 'lightcoral', marginTop: '1rem'}}>
    <p>I was clicked {clicks} many times!</p>
    <button onClick={() => setClicks(prev => prev + 1)}>Click Me!</button>
  </div>;
};

const App = () => {
  const [child, bindChild] = useState<Child>();
  return <div style={{background: 'lightblue', width: 'fit-content', padding: '1rem'}}>
    <p>Child was clicked {child?.clicks ?? 'N/A'} times!</p>
    <button onClick={child?.click}>Click Me To Update Child!</button>
    <button onClick={() => {if (child) child.setClicks(0);}}>Reset Child!</button>
    <Child bind={child => { bindChild(child); return () => bindChild(undefined); }}></Child>
  </div>;
};

export default App;