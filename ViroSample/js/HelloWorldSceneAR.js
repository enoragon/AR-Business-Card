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
  ViroAmbientLight,
  ViroParticleEmitter,
  ViroAnimations
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
          <Viro3DObject source={require('./res/volcano.obj')}
            materials={['Volcano']}
            position={[0, 0, 0]} 
            scale={[1, 1, 1]}
            rotation={[0,0,0]}
            animation={{name: 'rotate', run: true, loop: true}}
            type="OBJ"
          />
          <ViroParticleEmitter
            position={[0, .7, 0]}
            duration={2000}
            visible={true}
            delay={0}
            run={true}
            loop={true}
            fixedToEmitter={true}

            image={{
              source:require("./res/darkSmoke.png"),                 
              height:0.5,
              width:0.5,
              bloomThreshold:0.5
            }}
          />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Dev the halls!"
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
  },
  Volcano: {
    lightingModel: "Blinn",
    diffuseTexture: require('./res/volcano.png'),
  }
});

ViroAnimations.registerAnimations({
  rotate: {properties:{rotateY: "+=45"}, duration: 1000},
});

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
