import React, {useState} from 'react';
import './App.css';
import {Header, Menu} from 'semantic-ui-react';

function App() {
  const [type, setType] = useState('cgss');
  const handleChange = (e, {name}) => setType(name);

  return (
    <div className="App">
      <Header as='h1'>
        데레스테/밀리시타 아이콘 생성기
      </Header>
      <Menu compact>
        <Menu.Item
          name = 'cgss'
          content = '데레스테'
          active = {type === 'cgss'}
          onClick = {handleChange}
        />
        <Menu.Item
          name = 'mltd'
          content = '밀리시타'
          active = {type === 'mltd'}
          onClick = {handleChange}
        />
      </Menu>
      
    </div>
  );
}

export default App;
