import React, { useState, Component as C } from "react";
export const withColor = (Component) => (props) => {
  const color = { color: "red" };
  return <Component {...color} {...props}></Component>;
};

export const withLoading = (Component) => (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
        <div style={{display: loading ? 'none' : 'block'}}>
            <Component setLoading={setLoading} {...props}></Component>
        </div>
        { loading && (<div>正在加载...</div>)}
    </div>
  );
};


export const logProps = Component => {
  class LogProps extends C {
    componentDidMount() {
      console.log('now props', this.props);
    }

    render() {
      const { forwardRef } = this.props;
      return <Component ref={forwardRef} {...this.props}></Component>
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps forwardRef={ref} {...props} ></LogProps>
  })
}

