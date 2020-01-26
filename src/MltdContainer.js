import React from "react";
import { Input, Loader, Segment } from "semantic-ui-react";
import mltdKeyKor from "./mltdKeyKor.json";
import IdolIconList from "./IdolIconList";

class MltdContainer extends React.Component {
    state = {
        loaded: true,
        iconList: [],
        inputValue: ""
    };

    handleInputChange = (e, { value }) => {
        this.setState({
            loaded: false,
            inputValue: value
        });
    };

    initContainer() {
        if (this.state.loaded) {
            return (
                <IdolIconList iconkeylist={this.state.iconList} type={"mltd"} />
            );
        } else
            return (
                <div>
                    <Loader active inline="centered">
                        {" "}
                        로딩중...{" "}
                    </Loader>
                </div>
            );
    }

    async componentDidUpdate() {
        var tmpValue = this.state.inputValue;
        if (!this.state.loaded) {
            if (tmpValue === "")
                this.setState({
                    iconList: [],
                    loaded: true
                });
            else {
                if (tmpValue === this.state.inputValue) {
                    var kors = Object.values(mltdKeyKor);
                    var keys = Object.keys(mltdKeyKor);
                    var baseURL =
                        "https://api.matsurihi.me/mltd/v1/cards?prettyPrint=false&idolId=";
                    var doFetch = false;
                    for (var i = 0; i < kors.length; i++) {
                        if (kors[i].includes(tmpValue)) {
                            baseURL += keys[i] + ",";
                            doFetch = true;
                        }
                    }
                    if (doFetch && tmpValue === this.state.inputValue) {
                        var result = [];
                        var res = await fetch(
                            baseURL.substring(0, baseURL.length - 1)
                        );
                        res = await res.json();
                        for (var i = 0; i < res.length; i++) {
                            result = result.concat([
                                res[i]["resourceId"] + "_0.png",
                                res[i]["resourceId"] + "_1.png"
                            ]);
                        }
                        if (tmpValue === this.state.inputValue) {
                            this.setState({
                                loaded: true,
                                iconList: result
                            });
                        }
                    } else if (tmpValue === this.state.inputValue) {
                        this.setState({
                            loaded: true,
                            iconList: []
                        });
                    }
                }
            }
        }
    }

    render() {
        return (
            <Segment>
                <Input
                    fluid
                    placeholder="아이돌의 이름을 한글로 검색해주세요!"
                    onChange={this.handleInputChange}
                    icon="search"
                />
                <br />
                {this.initContainer()}
            </Segment>
        );
    }
}

export default MltdContainer;
