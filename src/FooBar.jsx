import React, { PropTypes } from 'react';


export default class FooBar extends React.Component {
  render() {
        return (
        <div className="foo-bar">
          <h3>Foo Bar</h3>
          <p>{this.props.contents}</p>
        </div>
      );
  }
}


FooBar.propTypes = {
  contents: PropTypes.string,
};

FooBar.defaultProps = {
  contents: 'Default contents.',
};
