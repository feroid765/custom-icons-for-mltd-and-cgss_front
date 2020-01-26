import React from "react";
import "./App.css";
import { Header, Menu } from "semantic-ui-react";
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
            </div>
        );
    }
}

export default App;
