import React from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import {
  Container,
  Button,
  Text,
  Content,
  View,
  H3, Icon
} from 'native-base';
import Swiper from 'react-native-swiper';
import { Constants } from 'expo';
import { ajax, pathName } from '../utils/utils';

import HeaderNav from '../components/Header/Header';


export default class GoodsDesc extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      goods: null,
      // goods_id: props.navigation.state.params.goodsID
    };
    const { navigation } = this.props;
    console.warn(navigation.getParam('goodsId'));
    this.screenWidth = Dimensions.get('window').width;
    this.screenHeight = Dimensions.get('window').height;
  }

  componentDidMount() {
    // const { navigation } = this.props;
    // this.getGoodsDesc(navigation.getParam('goodsId'));
  }

  getGoodsDesc = (goods_id) => {
    console.log(goods_id);
    ajax('goods/desc', { goods_id }, false,
      (data) => {

      },
      () => {});
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {
      goods
    } = this.state;
    return (
      <Container style={{ paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
        <HeaderNav />
        <Content>
          <Button onPress={this.goBack}><Icon type="AntDesign" name="left" /></Button>
          <Swiper
            showsButtons
            height={this.screenWidth}
            paginationStyle={{
              bottom: 6
            }}
            autoplay
            key={goods && goods.length} // 加这个属性能自动轮播
            loop
          >
            {goods !== null && goods.map(item => (
              <View
                key={item.slider_id}
                style={{
                  flex: 1
                }}
              >
                <Image
                  style={{
                    width: '100%',
                    height: imgHeight / (imgWidth / this.screenWidth)
                  }}
                  resizeMode="contain"
                  source={{ uri: `${pathName}/${item.pic_url}` }}
                />
              </View>
            ))}
          </Swiper>


        </Content>
      </Container>
    );
  }
}
