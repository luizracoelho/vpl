import { useState } from 'react';
import './App.css';
import AppForm from './components/app-form';
import AppLink from './components/app-link';
import AppLogo from './components/app-logo';
import AppText from './components/app-text';

const App = () => {
  const [nameText, setNameText] = useState('World');
  
  return (
    <div className="App">
      <header className="App-header">
       <AppLogo />
       <AppText nameText={nameText} />
       <AppForm nameText={nameText} setNameText={setNameText} />
       <AppLink />
      </header>
    </div>
  );
}

export default App;