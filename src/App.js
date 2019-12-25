import React from 'react';
import './App.css';
import {Header, Menu, Input, Loader, Segment, Image} from 'semantic-ui-react';
import IdolIconList from './IdolIconList';
import cgssKeyKor from './cgssKeyKor.json';
import mltdKeyKor from './mltdKeyKor.json';
import cgssSymbol from './symbol_cgss.png';
import mltdSymbol from './symbol_mltd.png';

class App extends React.Component {
  state = {
    type : 'cgss',
    loaded : false,
    keyCardList : [],
    iconList : []
  };

  getWholeList = async ()=>{
    if(!this.state.loaded){
      var wholeList = {};
      if(this.state.type === 'cgss'){
        var res = await fetch('https://starlight.kirara.ca/api/v1/list/char_t?keys=cards,chara_id');
        var tmp = await res.json();
        var result = await tmp['result'];
        for(var i=0; i<result.length; i++){
          const {chara_id, cards} = await result[i];
          if(!wholeList[chara_id]) wholeList[chara_id] = [];
          wholeList[chara_id] = cards.concat(cards.map(x=>x+1));
          wholeList[chara_id] = wholeList[chara_id].map(x=>x.toString()+".png");
          wholeList[chara_id].sort();
        }
      }
      else if(this.state.type === 'mltd'){
        var res = await fetch('https://api.matsurihi.me/mltd/v1/cards');
        var result = await res.json();
        for(var i=0; i<result.length; i++){
          const {idolId, resourceId} = result[i];
          if(!wholeList[idolId]) wholeList[idolId] = [];
          wholeList[idolId].push(resourceId + "_0.png");
          wholeList[idolId].push(resourceId + "_1.png");
        }
      }
      console.log(wholeList);
      this.setState(
        {keyCardList : wholeList,
        loaded : true});
    }
  }
  
  handleTypeChange = (e, {name}) => {
    this.setState({
      type : name,
      keyCardList : [],
      iconList : [],
      loaded : false
    });
  }

  handleInputChange = (e, {value}) => {
    if(value!==""){
      var target = null;
      if(this.state.type === 'cgss') target = cgssKeyKor;
      else if(this.state.type === 'mltd') target = mltdKeyKor;
      var kors = Object.values(target);
      var keys = Object.keys(target);
      var result = [];
      for(var i=0; i<kors.length; i++){
        if(kors[i].includes(value)){
          result = result.concat(this.state.keyCardList[keys[i]]);
        }
      }
      this.setState({iconList : result});
    }
  }

  initMainScreen = () => {
    if(this.state.loaded){
      return(
      <Segment>
        <Input fluid
        placeholder = '아이돌의 이름을 한글로 검색해주세요!'
        onChange = {this.handleInputChange}
        icon='search'/>
        <br/>
        <IdolIconList iconkeylist = {this.state.iconList} type = {this.state.type}/>
      </Segment>
      );
    }
    else{
      return(
        <Segment>
            <Loader active inline='centered'> 로딩중... </Loader>
        </Segment>
      )
    }
  }

  componentDidMount(){
    this.getWholeList();
  }

  componentDidUpdate(){
    this.getWholeList();
  }

  render() {return (
    <div className="App">
      <Header as='h1'>
        데레스테/밀리시타 아이콘 생성기
      </Header>
      <Menu compact pointing secondary>
        <Menu.Item
          name = 'cgss'
          active = {this.state.type === 'cgss'}
          onClick = {this.handleTypeChange}>
            <img src = {cgssSymbol} />
          데레스테
        </Menu.Item>
        
        <Menu.Item
          name = 'mltd'
          active = {this.state.type === 'mltd'}
          onClick = {this.handleTypeChange}
        >
          <img src = {mltdSymbol}/>
          밀리시타
        </Menu.Item>
      </Menu>
      {this.initMainScreen()}
    </div>
  );}
}

export default App;
