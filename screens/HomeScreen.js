import React from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Button,
  Text,
  Content,
  View,
  H3,
} from 'native-base';
import Swiper from 'react-native-swiper';
// import { Constants } from 'expo';
import { ajax, pathName } from '../utils/utils';

import HeaderNav from '../components/Header/Header';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      goodsClass: [],
      imgWidth: 1,
      imgHeight: 1,
      goods: null,
      banner: null
    };
    this.screenWidth = Dimensions.get('window').width;
    this.screenHeight = Dimensions.get('window').height;
  }

  componentDidMount() {
    this.getBanner();
    this.getGoodsClass();
    this.getGoods();
  }

  getBanner = () => {
    ajax('index/slider', '', false, (data) => {
      Image.getSize(`${pathName}/${data.data[0].pic_url}`, (width, height) => {
        // console.log(width, height);
        this.setState({
          imgWidth: width || 1,
          imgHeight: height,
          banner: data.data
        });
      });
    });
  };

  getGoodsClass = () => {
    ajax('Goods/getGoodsClass', '', false,
      (data) => {
        this.setState({
          goodsClass: data.goodsClass
        });
      },
      () => {
      });
  };

  getGoods = () => {
    ajax('Goods/indexG', '', false,
      (data) => {
        this.setState({
          goods: data.data
        });
      },
      () => {});
  };

  // 商品小分类
  classItem = item => (
    <View
      key={`${item.m_logo}`}
      style={{
        width: '20%',
        textAlign: 'center',
        marginTop: 10
      }}
    >
      <Image
        style={{
          width: this.screenWidth / 5 - 20,
          height: this.screenWidth / 5 - 20,
          marginLeft: 10
        }}
        resizeMode="contain"
        source={{ uri: `${pathName}/${item.m_logo}` }}
      />
      <View><Text style={{ textAlign: 'center' }}>{item.label}</Text></View>
    </View>
  );

  classSwiper = () => {
    const { goodsClass } = this.state;
    if (!Array.isArray(goodsClass)) return;
    const step = 10;
    const len = Math.ceil((goodsClass.length + 1) / step);
    const fullClass = this.classItem({
      b_logo: null,
      children: '',
      f_logo: null,
      label: '全部分类',
      m_logo: 'static/images/goods_class/fl.png',
      pc_logo: null,
      value: 0
    });
    if (len > 1) {
      const html = [];
      for (let i = 0; i < len; i += 1) {
        html.push(
          <View
            key={i}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              flexDirection: 'row'
            }}
          >
            {goodsClass.slice(i * step, (i + 1) * step)
              .map(item => this.classItem(item))}
            {i === len - 1 ? fullClass : null}
          </View>
        );
      }
      return (
        <Swiper
          height={this.screenWidth * 2 / 5 + 40}
          paginationStyle={{
            bottom: 6
          }}
        >
          {html}
        </Swiper>
      );
    }
    return (
      <View style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        flexDirection: 'row'
      }}
      >
        {goodsClass.map(item => this.classItem(item))}
        {fullClass}
      </View>
    );
  };


  openfooterNav = () => {
    const { navigation } = this.props;
    navigation.navigate('UserInfo');
  };

  goGoodsDesc =goodsId => () => {
    const { navigation } = this.props;
    navigation.push('GoodsDesc', {
      goodsId
    });
  };

  // goGoodsDesc = (id) => {
  //   this.props.navigation.navigate('GoodsDesc', { xxxxxx: 123123, });
  // };
  // {/*<Container style={{ paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>*/}
  render() {
    const {
      imgHeight, imgWidth, banner, goods
    } = this.state;
    return (
      <Container>
        <HeaderNav />
        <Content>
          <Swiper
            showsButtons
            height={imgHeight === 1 ? 200 : imgHeight / (imgWidth / this.screenWidth)}
            paginationStyle={{
              bottom: 6
            }}
            autoplay
            key={banner && banner.length} // 加这个属性能自动轮播
            loop
          >
            {banner !== null && banner.map(item => (
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
          <View>
            {this.classSwiper()}
          </View>
          {goods !== null && goods.map(item => (
            <View key={item.id} style={{ marginBottom: 10 }}>
              <View><H3 style={{ textAlign: 'center', paddingTop: 8 }}>{item.label}</H3></View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingLeft: 10,
                  paddingRight: 10,
                  justifyContent: 'space-between'
                }}
              >
                {Array.isArray(item.goods) && item.goods.map(goodsItem => (
                  <View
                    key={goodsItem.goods_id}
                    style={{
                      width: (this.screenWidth - 20) / 2 - 5,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#eee',
                      marginTop: 8,
                      paddingTop: 6
                    }}
                  >
                    <TouchableOpacity onPress={this.goGoodsDesc(goodsItem.goods_id)}>
                      <Image
                        resizeMode="contain"
                        style={{
                          width: this.screenWidth / 2 - 30,
                          height: this.screenWidth / 2 - 30,
                          marginLeft: 6,
                          marginBottom: 6
                        }}
                        source={{ uri: `${pathName}/${goodsItem.goods_pics[0].thumbs[400].file_path}` }}
                      />
                      <View>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={2}
                          style={{
                            paddingLeft: 5, paddingRight: 5, textAlign: Platform.OS === 'ios' ? 'justify' : 'left'
                          }}
                        >
                          {goodsItem.goods_name}
                        </Text>
                      </View>
                      <View>
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: '#ff0036' }}>
                          {`￥${goodsItem.goods_price}`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))}
          {/* <Button onPress={this.openDrawer}> */}
          {/* <Text>Button11</Text> */}
          {/* </Button> */}
          {/* <Button onPress={this.openfooterNav}> */}
          {/* <Text>go UserInfo</Text> */}
          {/* </Button> */}
        </Content>
      </Container>
    );
  }
}
