/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, CameraRoll, Platform, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity,ScrollView,SafeAreaView} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Thumb extends Component {
  state = {
    checked: false,
  };

  render() {
    const {width} = Dimensions.get('window');
    return <View style={{ position: 'relative' }}>
      <TouchableOpacity onPress={() => this.setState({checked: !this.state.checked})}>
        <Image source={{uri: this.props.item.node.image.uri}} style={{width: width / 4, height: width / 4}}
               resizeMode={'cover'}/>
        {this.state.checked && (
          <Text>선택됨</Text>
        )}

      </TouchableOpacity>

    </View>
  }
}

type Props = {};
export default class App extends Component<Props> {
  state = {
    list: [],
  };
  load = async () => {
    const photos = await CameraRoll.getPhotos({first: 100, groupTypes: 'All', assetType: 'Photos'});
    console.log(photos);
    this.setState({list: photos.edges});
  };

  render() {

    return (
      <SafeAreaView>
        <ScrollView>
          {this.state.list.length === 0 && (
            <Button title={'사진 불러오기'} onPress={this.load}/>
          )}

          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {this.state.list.map((item, i) => {
              return <Thumb key={i} item={item}/>
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
