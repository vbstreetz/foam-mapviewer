import {
  ACTION_TYPE_SET_MAP_VIEWPORT,
  ACTION_TYPE_TOGGLE_LAYER_VISIBILITY,
  ACTION_TYPE_UPDATE_LAYERS_DATA,
  LAYER_TYPE_POI,
  DEFAULT_LOCATION,
  ACTION_TYPE_POI_TAG_VISIBILITY,
} from 'config';
import cache from 'utils/cache';

const DEFAULT_STATE = {
  viewport: cache('location') || DEFAULT_LOCATION,
  layers: {
    [LAYER_TYPE_POI]: {
      visible: true,
      pois: [],
      tags: {},
    },
  },
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_MAP_VIEWPORT: {
      return Object.assign({}, state, { viewport: action.payload });
    }

    case ACTION_TYPE_TOGGLE_LAYER_VISIBILITY: {
      const type = action.payload;
      const s = Object.assign({}, state);
      s.layers[type].visible = !s.layers[type].visible;
      return s;
    }

    case ACTION_TYPE_UPDATE_LAYERS_DATA: {
      const layers = action.payload;
      const s = Object.assign({}, state);
      layers.forEach(({ type, data }) => {
        Object.entries(data).forEach(([k, v]) => {
          s.layers[type][k] = v;
        });
      });
      return s;
    }

    case ACTION_TYPE_POI_TAG_VISIBILITY: {
      const s = Object.assign({}, state);
      s.layers[LAYER_TYPE_POI].tags[action.payload] = !s.layers[LAYER_TYPE_POI]
        .tags[action.payload];
      return s;
    }

    default:
      return state;
  }
};
