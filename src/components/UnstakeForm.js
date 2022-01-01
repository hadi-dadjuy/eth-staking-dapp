import "./Form.css";
import { Component } from "react";
import Timer from "./Timer";

class UnstakeForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="form-signin">
        <div className="paddings">
          <div className="form-group clearfix">
            <span className="h3 mb-3 fw-normal f-left balance-box">
              Staked ETH
            </span>
            <span className="h3 mb-3 fw-normal f-right balance-box">
              {this.props.valueStaked}
            </span>
          </div>
        </div>

        <Timer
          unstake={this.unstake}
          startDate={new Date().getTime() + this.props.timer * 1000}
        />
      </main>
    );
  }

  unstake = async () => {
    let value = await this.props.dapp.methods
      .unstake()
      .send({ from: this.props.account });
    let status = await this.props.dapp.methods
      .isStaked()
      .call({ from: this.props.account });
    console.log(status, value);
  };
}

export default UnstakeForm;
