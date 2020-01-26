import React from "react";
import { Input, Loader, Segment } from "semantic-ui-react";
import cgssKeyKor from "./cgssKeyKor.json";
import IdolIconList from "./IdolIconList";

class CgssContainer extends React.Component {
    state = {
        loaded: false,
        wholeList: [],
        iconList: []
    };

    async getWholeList() {
        if (!this.state.loaded) {
            var wholeList = {};
            var res = await fetch(
                "https://starlight.kirara.ca/api/v1/list/char_t?keys=cards,chara_id"
            );
            var tmp = await res.json();
            var result = await tmp["result"];
            for (var i = 0; i < result.length; i++) {
                const { chara_id, cards } = await result[i];
                if (!wholeList[chara_id]) wholeList[chara_id] = [];
                wholeList[chara_id] = cards.concat(cards.map(x => x + 1));
                wholeList[chara_id] = wholeList[chara_id].map(
                    x => x.toString() + ".png"
                );
                wholeList[chara_id].sort();
            }
            this.setState({
                wholeList: wholeList,
                iconList: [],
                loaded: true
            });
        }
    }

    handleInputChange = (e, { value }) => {
        if (value !== "") {
            var kors = Object.values(cgssKeyKor);
            var keys = Object.keys(cgssKeyKor);
            var result = [];
            for (var i = 0; i < kors.length; i++) {
                if (kors[i].includes(value)) {
                    result = result.concat(this.state.wholeList[keys[i]]);
                }
            }
            this.setState({ iconList: result });
        }
    };

    componentDidMount() {
        this.getWholeList();
    }

    componentDidUpdate() {
        this.getWholeList();
    }

    render() {
        if (this.state.loaded) {
            return (
                <Segment>
                    <Input
                        fluid
                        placeholder="아이돌의 이름을 한글로 검색해주세요!"
                        onChange={this.handleInputChange}
                        icon="search"
                    />
                    <br />
                    <IdolIconList
                        iconkeylist={this.state.iconList}
                        type={"cgss"}
                    />
                </Segment>
            );
        } else {
            return (
                <Segment>
                    <Loader active inline="centered">
                        {" "}
                        로딩중...{" "}
                    </Loader>
                </Segment>
            );
        }
    }
}

export default CgssContainer;
