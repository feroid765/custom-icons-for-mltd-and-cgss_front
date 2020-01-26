import React, { useState } from "react";
import { Card, Image, Button, Pagination } from "semantic-ui-react";
import "./IdolIconList.css";

const baseURL_cgss = "https://hidamarirhodonite.kirara.ca/icon_card/";
const baseURL_mltd = "https://custom-icon.feroid.com/img/mltd/";

function idolIcon(key, type) {
    return (
        <Card key={key}>
            <Card.Content textAlign="center">
                <Image
                    centered
                    src={
                        type === "cgss"
                            ? baseURL_cgss + key
                            : baseURL_mltd + key
                    }
                />
            </Card.Content>
            <Card.Content extra textAlign="center">
                <form method="post" action={"../core/" + type} id={key}>
                    <input type="text" name="key" value={key} readOnly></input>
                    <Button
                        type="submit"
                        positive
                        content="이 아이콘으로 생성하기"
                    />
                </form>
            </Card.Content>
        </Card>
    );
}

function IdolIconList({ iconkeylist, type }) {
    const [activePage, setActivePage] = useState(1);
    const handleChange = (e, { activePage }) => setActivePage(activePage);

    if (iconkeylist) {
        return (
            <div>
                <Card.Group itemsPerRow={6} doubling>
                    {iconkeylist
                        .slice((activePage - 1) * 12, activePage * 12)
                        .map(x => idolIcon(x, type))}
                </Card.Group>
                <br />
                <Pagination
                    defaultActivePage={1}
                    boundaryRange={0}
                    totalPages={Math.ceil(iconkeylist.length / 12)}
                    onPageChange={handleChange}
                />
            </div>
        );
    } else return null;
}

export default IdolIconList;
