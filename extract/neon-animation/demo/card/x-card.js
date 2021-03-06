/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

import {NeonSharedElementAnimatableBehavior} from '../../neon-shared-element-animatable-behavior.js';

Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        overflow: hidden;
      }
      #placeholder {
        opacity: 0;
        background-color: grey;
        @apply --layout-fit;
      }
    </style>

    <div id="placeholder"></div>
    <div id="container">
      <slot name="div"></slot>
    </div>
  `,

  is: 'x-card',
  behaviors: [NeonSharedElementAnimatableBehavior],

  properties: {
    animationConfig: {type: Object},

    sharedElements: {type: Object}
  },

  attached: function() {
    if (this.animationConfig) {
      return;
    }

    this.animationConfig = {
      'entry': [
        {name: 'ripple-animation', id: 'ripple', toPage: this},
        {
          name: 'fade-out-animation',
          node: this.$.placeholder,
          timing: {delay: 250},
        },
        {
          name: 'fade-in-animation',
          node: this.$.container,
          timing: {delay: 50},
        }
      ],

      'exit': [
        {
          name: 'fade-out-animation',
          node: this.$.container,
          timing: {duration: 0},
        },
        {
          name: 'reverse-ripple-animation',
          id: 'reverse-ripple',
          fromPage: this,
        }
      ]
    };

    this.sharedElements = {
      'ripple': this.$.placeholder,
      'reverse-ripple': this.$.placeholder
    };
  }
});
