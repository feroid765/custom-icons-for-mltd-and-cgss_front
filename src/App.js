import React, {useState} from 'react';
import './App.css';
import {Header, Menu} from 'semantic-ui-react';

function App() {
  const [type, setType] = useState('cgss');

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
          onClick = {setType('cgss')}
        />
        <Menu.Item
          name = 'mltd'
          content = '밀리시타'
          active = {type === 'mltd'}
          onClick = {setType('mltd')}
        />
      </Menu>
      
    </div>
  );
}

export default App;
