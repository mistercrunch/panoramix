import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { SupersetClient } from '@superset-ui/core';
import { t } from '../locales';

const propTypes = {
  dataEndpoint: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  mutator: PropTypes.func.isRequired,
  onAsyncError: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  valueRenderer: PropTypes.func,
  placeholder: PropTypes.string,
  autoSelect: PropTypes.bool,
};

const defaultProps = {
  placeholder: t('Select ...'),
  valueRenderer: o => (<div>{o.label}</div>),
  onAsyncError: () => {},
};

class AsyncSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      options: [],
    };
  }

  componentDidMount() {
    this.fetchOptions();
  }

  onChange(opt) {
    this.props.onChange(opt);
  }

  fetchOptions() {
    this.setState(() => ({ isLoading: true }));
    const { mutator, dataEndpoint } = this.props;

    SupersetClient.get({ endpoint: dataEndpoint })
      .then(({ json }) => {
        const options = mutator ? mutator(json) : json;

        this.setState(() => ({
          options,
          isLoading: false,
        }));

        if (!this.props.value && this.props.autoSelect && options.length > 0) {
          this.onChange(options[0]);
        }
      })
      .catch((response) => {
        this.props.onAsyncError(response.responseText);
        this.setState(() => ({ isLoading: false }));
      });
  }

  render() {
    return (
      <div>
        <Select
          placeholder={this.props.placeholder}
          options={this.state.options}
          value={this.props.value}
          isLoading={this.state.isLoading}
          onChange={this.onChange.bind(this)}
          valueRenderer={this.props.valueRenderer}
          {...this.props}
        />
      </div>
    );
  }
}

AsyncSelect.propTypes = propTypes;
AsyncSelect.defaultProps = defaultProps;

export default AsyncSelect;
