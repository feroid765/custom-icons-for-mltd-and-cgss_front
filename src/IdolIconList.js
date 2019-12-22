import React from 'react';
import {Card, Image, Button, Pagination} from 'semantic-ui-react';
import './IdolIconList.css';

const baseURL = "https://hidamarirhodonite.kirara.ca/icon_card/";

function idolIcon(k){
    return(
        <Card key={k}>
            <Card.Content textAlign = "center">
                <Image
                    centered
                    src={baseURL+k+".png"}
                />
            </Card.Content>
            <Card.Content extra textAlign = "center">
                <form method = "post" action = "../core" id = {k}>
                    <input type = "text" name = "key" value = {k}></input>
                    <Button type = "submit" positive content = "이 아이콘으로 생성하기"/>
                </form>
            </Card.Content>
        </Card>
    )
}

class idolIconList extends React.Component{
    state = {
        activePage : 1
    };
    
    handlePaginationChange = (e, {activePage}) => this.setState({activePage});

    render() {
        if(this.props.iconkeylist) return (
            <div>
                <Card.Group itemsPerRow = {6} doubling>
                    { this.props.iconkeylist.slice((this.state.activePage-1)*12, (this.state.activePage)*12).map(k => idolIcon(k)) }
                </Card.Group>
                <br/>
                <Pagination defaultActivePage = {1} boundaryRange = {0} totalPages = {Math.ceil(this.props.iconkeylist.length/12)} 
                onPageChange = {this.handlePaginationChange}/>
            </div>
        );
        else return null;
    }
}

export default idolIconList;