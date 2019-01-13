import React, { Component } from 'react';
import {
  Header,
  Item,
  Input,
  Icon,
  Left,
  Body,
  Right,
  Button,
  Title
} from 'native-base';

export default class HeaderNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Header searchBar>
        {/* <Left>
          <Button transparent>
            <Icon name="add" />
          </Button>
        </Left>
        <Body
          style={{ textAlign: "center", flex: 1, justifyContent: "center" }}
        >
          <Title style={{ textAlign: "center" }}>Header</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Right> */}
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          <Icon type="AntDesign" name="message1" />
        </Item>
      </Header>
    );
  }
}
