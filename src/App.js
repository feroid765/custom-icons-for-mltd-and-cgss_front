import React from "react";
import "./App.css";
import { Header, Menu, Container } from "semantic-ui-react";
import CgssContainer from "./CgssContainer";
import MltdContainer from "./MltdContainer";
import cgssSymbol from "./symbol_cgss.png";
import mltdSymbol from "./symbol_mltd.png";

class App extends React.Component {
    state = {
        type: "cgss"
    };

    handleTypeChange = (e, { name }) => {
        this.setState({
            type: name
        });
    };

    initMainScreen() {
        if (this.state.type === "cgss") return <CgssContainer />;
        else if (this.state.type === "mltd") return <MltdContainer />;
    }

    render() {
        return (
            <div className="App">
                <Header as="h1">데레스테/밀리시타 아이콘 생성기</Header>
                <Menu compact pointing secondary>
                    <Menu.Item
                        name="cgss"
                        active={this.state.type === "cgss"}
                        onClick={this.handleTypeChange}
                    >
                        <img src={cgssSymbol} />
                        데레스테
                    </Menu.Item>

                    <Menu.Item
                        name="mltd"
                        active={this.state.type === "mltd"}
                        onClick={this.handleTypeChange}
                    >
                        <img src={mltdSymbol} />
                        밀리시타
                    </Menu.Item>
                </Menu>
                {this.initMainScreen()}
                <footer>
                    <Container textAlign="center">
                        데레스테 정보와 아이콘은{" "}
                        <a
                            href="https://starlight.kirara.ca"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            starlight.kirara.ca
                        </a>
                        에서 받아오고 있습니다.
                        <br />
                        밀리시타 정보는{" "}
                        <a
                            href="https://matsurihi.me"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            matsurihi.me
                        </a>
                        에서 받아오고 있고, 이미지도 동 사이트에서 미러링 하고
                        있습니다.
                        <br />
                        만든 사람 : 고철안드로이드 (
                        <a
                            href="https://twitter.com/feroid765"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @feroid765
                        </a>
                        )<br />
                    </Container>
                </footer>
            </div>
        );
    }
}

export default App;
