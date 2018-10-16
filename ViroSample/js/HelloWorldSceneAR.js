'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroBox,
  Viro3DObject,
  ViroMaterials,
  ViroAmbientLight
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color="white" />
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroARImageMarker target={"card"}>
          <Viro3DObject source={require('./res/ArcticFox_Posed.obj')}
            materials={['Fox']}
            position={[0, 0, 0]} 
            scale={[.04, .04, .04]}
            rotation={[0,0,0]}
            type="OBJ"
          />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Welcome to TechItOut"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

ViroARTrackingTargets.createTargets({
  "card": {
    source: require('./res/tio.png'),
    orientation: 'Up',
    physicalWidth: 0.1//meters
  }
})

ViroMaterials.createMaterials({
  Fox: {
    lightingModel: "Blinn",
    diffuseTexture: require('./res/ArcticFox_Diffuse.png'),
  }
})

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
