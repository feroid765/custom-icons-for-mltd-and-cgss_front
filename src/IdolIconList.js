import React, {useState} from 'react';
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

function idolIconList(iconkeylist){
    const [activePage, setActivePage] = useState(1);
    const handleChange = (e, {activePage}) => setActivePage(activePage);

    if(iconkeylist){
        return (
            <div>
                <Card.Group itemsPerRow = {6} doubling>
                    {iconkeylist.slice((activePage-1)*12, activePage*12).map(k => idolIcon(k)) }
                </Card.Group>
                <br/>
                <Pagination defaultActivePage = {1} boundaryRange = {0} totalPages = {Math.ceil(iconkeylist.length/12)} 
                onPageChange = {handleChange}/>
            </div>
        );
    }
    else return null;
}

export default idolIconList;