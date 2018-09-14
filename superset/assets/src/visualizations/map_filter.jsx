import dompurify from 'dompurify';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import d3 from 'd3';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import MapGL, { Popup } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';

import Legend from './Legend';
import LayerSelector from './LayerSelector';
import {
  getColorFromScheme,
  hexToRGB,
  rgbaToHex,
} from '../modules/colors';
import {
  DEFAULT_LONGITUDE,
  DEFAULT_LATITUDE,
  DEFAULT_ZOOM,
} from '../utils/common';
import './mapbox.css';
import sandboxedEval from '../modules/sandbox';

const NOOP = () => {};

/* getCategories()
 *
 * Steps through every feature in a geoJSON data set, looks at the
 * cat_color value and assigns the feature a "color" property.  It
 * also returns a dictionary mapping cat_color values to a colour.  This
 * can then be used, for instance, when rendering the legend.
 *
 * Args:
 * fd - Form data storing the user settings when creating the slice.
 * data - The data to be visualised, returned by the query.
 *
 * Returns:
 * A dictionary mapping values of the colour category to the colour
 * from the colour scheme.
 */

function getCategories(formData, queryData) {

  const c = formData.color_picker || { r: 0, g: 0, b: 0, a: 1 };
  const fixedColorRGBA = [c.r, c.g, c.b, 255 * c.a];
  const fixedColorHex = rgbaToHex(fixedColorRGBA);
  const categories = {};
  queryData.forEach((d) => {
    const featureProps = d.properties;
    if (featureProps.cat_color != null) {
      let color;
      if (!categories.hasOwnProperty(featureProps.cat_color)) {
        if (formData.dimension) {
          color = getColorFromScheme(
            featureProps.cat_color,
            formData.color_scheme,
          );
        } else {
          color = fixedColorHex;
        }
        categories[featureProps.cat_color] = {
          color: hexToRGB(color),
          hex: color,
          enabled: true,
        };
      }
    featureProps.color = categories[featureProps.cat_color].hex;
    }
  });
  return categories;
}

/* addBgLayers
* Adds background layers to the map from the given configuration
*/
function addBgLayers(map, conf) {
  for (const key in conf) {
    const paint = {
      line: {
        'line-color': conf[key].color,
        'line-opacity': conf[key].opacity,
      },
      fill: {
        'fill-color': conf[key].color,
        'fill-opacity': conf[key].opacity,
      },
    };
    map.addLayer({
      id: key,
      type: conf[key].type,
      source: {
        type: 'geojson',
        data: '/geo_assets/' + conf[key].path,
      },
      paint: paint[conf[key].type],
      visbility: conf[key].visibility ? 'visible' : 'none',
    });
  }
}



/* MapGLDraw
 *
 * An extension of the MapGL component that harnesses the power of
 * Mapbox visualisation tools to render the map filter.
 */
class MapGLDraw extends MapGL {
  constructor(props) {
    super(props);
    this.addTooltips = this.addTooltips.bind(this);
    }

  // Toggles the visibiliity of a layer
  toggleLayer(layer, visibility) {
    const map = this.getMap();
    map.setLayoutProperty(layer, 'visibility',
                            visibility ? 'visible' : 'none');
  }

  addTooltips(layerName) {
    if (this.props.slice.formData.js_tooltip) {
      const jsTooltip = sandboxedEval(this.props.slice.formData.js_tooltip);
      const updatePopup = this.props.updatePopup;
      this.getMap().on('click', layerName, function (e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        updatePopup({
          coordinates: coordinates,
          html: dompurify.sanitize(jsTooltip(properties)),
        });
      });

    }
  }

  getChildContext() {
    return {
      viewport: new WebMercatorViewport(this.props),
      isDragging: this.state.isDragging,
      eventManager: this._eventManager,
    };
  }
  componentDidMount() {
    this.props.onRef(this);
    super.componentDidMount();

    const map = this.getMap();
    const data = this.props.geoJSON;
    const geoJSONBgLayers = this.props.geoJSONBgLayers;
    const slice = this.props.slice;
    const filters = this.props.slice.getFilters() || {};
    const addTooltips = this.addTooltips;
    
    map.on('load', function () {
      // Displays the data distributions
      map.addLayer({
        id: 'points',
        type: 'circle',
        source: {
          type: 'geojson',
          data,
        },
        paint: {
          'circle-color': ['get', 'color'],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#FFF',
        },
      });
      // Displays the polygon drawing/selection controls
      this.draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
              polygon: true,
              trash: true,
            },
      });
      
      addBgLayers(map,  geoJSONBgLayers);
      addTooltips('points');

      
      map.addControl(this.draw, 'top-right');

      // Draw existing polygons on a refresh
      for (const filter in filters) {
        if (filter === 'geo' && filters.geo.values !== []) {
          this.draw.add(filters.geo.values);
        }
      }

      
      function updateFilter(e) {
        var featureCollection = {};
        if (e.features.length > 0) {
          featureCollection = {
            type: 'FeatureCollection',
            features: e.features,
          };
        }
        slice.addFilter('geo', featureCollection,
                        false, true, 'geo_within');
      }


      // Logs the polygon selection changes to console.
      map.on('draw.selectionchange', updateFilter);
      // Bug in mapbox-gl-draw doesn't fire selectionchange when deleteing
      map.on('draw.delete', function () {
        updateFilter(this.draw.getSelected());
      });
    });
  }  

  componentWillUnmount() {
    this.props.onRef(null);
    const map = this.getMap();
    if (!map || !map.getStyle()) {
      return;
    }
    map.removeControl(this.draw);
  }

}
const childContextTypes = {
  viewport: PropTypes.instanceOf(WebMercatorViewport),
  isDragging: PropTypes.bool,
  eventManager: PropTypes.object
};
MapGLDraw.propTypes = Object.assign({}, MapGL.propTypes, {
  geoJSON: PropTypes.object,
});
MapGLDraw.childContextTypes = childContextTypes;

/* getBgLayersLegend
* Prepares legend data for background layers
*/

function getBgLayersLegend(layers) {
    const legends = {};
    for (const key in layers) {
        legends[key] = {
            color: layers[key].rgba,
            enabled: layers[key].visible,
            hex: layers[key].color,
            type: layers[key].type,
            legend: layers[key].legend,
        };
    }

    return legends;
    }


/* MapFilter
 * A MapFilter component renders the map filter visualisation with all the
 * necessary configurations and, crucially, keeps a state for the component.
 */
class MapFilter extends React.Component {
  
  constructor(props) {
    super(props);
    const data = this.props.json.data;
    const longitude = data.viewportLongitude || DEFAULT_LONGITUDE;
    const latitude = data.viewportLatitude || DEFAULT_LATITUDE;
    this.state = {
      viewport: {
        longitude,
        latitude,
        zoom: data.viewportZoom || DEFAULT_ZOOM,
        startDragLngLat: [longitude, latitude],
      },
      popup: null
    };
    this.colors = getCategories(
      this.props.slice.formData,
      this.props.json.data.geoJSON.features,
    );
    
    this.bgLayers = getBgLayersLegend(this.props.json.data.geoJSONBgLayers);
    this.onViewportChange = this.onViewportChange.bind(this);
    this.toggleLayer = this.toggleLayer.bind(this);
    this.tick = this.tick.bind(this);
    this.updatePopup = this.updatePopup.bind(this);
  }
  componentWillMount() {
    const timer = setInterval(this.tick, 1000);
    this.setState(() => ({ timer }));
  }
  componentWillUnmount() {
    this.clearInterval(this.state.timer);
   }
  onViewportChange(viewport) {
    this.setState({ viewport });
    // this.props.setControlValue('viewport', viewport);
    // this.props.setControlValue('viewport_longitude', viewport.longitude);
    // this.props.setControlValue('viewport_latitude', viewport.latitude);
    // this.props.setControlValue('viewport_zoom', viewport.zoom);
  }

  tick() {
    // Limiting updating viewport controls through Redux at most 1*sec
    if (this.state.previousViewport !== this.state.viewport) {
      const setCV = this.props.setControlValue;
      const vp = this.state.viewport;
      if (setCV) {
        setCV('viewport', vp);
      }
      this.setState(() => ({ previousViewport: this.state.viewport }));
    }
  }
  toggleLayer(layer, visibility) {
    this.child.toggleLayer(layer, visibility);
  }

  updatePopup(popup) {
    this.state.popup = popup;
    this.forceUpdate();
  }
  _renderPopup() {
    const popup = this.state.popup;
    return popup && (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={popup.coordinates[0]}
        latitude={popup.coordinates[1]}
        onClose={() => this.setState({ popup: null })}
      >
        <div dangerouslySetInnerHTML={{__html: popup.html }}>
        </div>
      </Popup>
    );
  }

  render() {
    return (
      <div>
        <MapGLDraw
          {...this.state.viewport}
          mapStyle={this.props.slice.formData.mapbox_style}
          width={this.props.slice.width() * 1.05}
          height={this.props.slice.height()}
          slice={this.props.slice}
          onViewportChange={this.onViewportChange}
          mapboxApiAccessToken={this.props.json.data.mapboxApiKey}
          geoJSON={this.props.json.data.geoJSON}
          geoJSONBgLayers={this.props.json.data.geoJSONBgLayers}
          onRef={ref => (this.child = ref)}
          updatePopup={this.updatePopup}

        >
          {this._renderPopup()}
          <Legend
            position="br"
            categories={this.colors}
          />
          
        </MapGLDraw>
        <LayerSelector
          position="tr"
          toggleLayer={this.toggleLayer}
          layers={this.bgLayers}
        />
      </div>
    );
  }
}

MapFilter.propTypes = {
  json: PropTypes.object,
  slice: PropTypes.object,
  setControlValue: PropTypes.function,
};


/* mapFilter(slice, json, setControlValue)
 *
 * This is the hook called by superset to render the visualisation.  We are
 * given data associated with the slice and the JSON returned from the backend.
 * For simplicity all this data is passed to the MapFilter component.
 */
function mapFilter(slice, json, setControlValue) {

  const div = d3.select(slice.selector);
  div.selectAll('*').remove();

  ReactDOM.render(
    <MapFilter
      json={json}
      slice={slice}
      setControlValue={setControlValue || NOOP}
    />,
    div.node(),
  );
}

module.exports = mapFilter;
