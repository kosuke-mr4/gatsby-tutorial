import * as React from "react";
import "./mystyles.scss";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date(),
    });
    //console.log(this.state.date.toLocaleTimeString());
  }
  render() {
    return (
      <div>
        <h1 className="has-background-success">Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const RenderClock = () => {
  return <Clock />;
};

export default RenderClock;
