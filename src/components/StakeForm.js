import "./Form.css";
import { Component } from "react";
import Timer from "./Timer";

class StakeForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="form-signin">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div>
            <div className="form-group clearfix ">
              <span className="h3 mb-3 fw-normal f-left balance-box">ETH</span>
              <span className="h3 mb-3 fw-normal f-right balance-box">
                {this.props.ethBalance}
              </span>
            </div>
          </div>

          <div className="form-group">
            <input
              type="number"
              step="any"
              className="form-control rounded-pill"
              id="inputbox"
              placeholder="Amount to stake"
            />
            <button
              onClick={this.stake}
              className="w-100 b tn btn-lg btn-danger rounded-pill"
            >
              Stake
            </button>
          </div>
        </form>
      </main>
    );
  }

  stake = async () => {
    const value = document.getElementById("inputbox").value;
    const number = parseFloat(value);
    if (number > parseFloat(this.props.ethBalance)) {
      alert("Enter a valid number!");
    }
    await this.props.dapp.methods
      .stake()
      .send({ from: this.props.account, value: number * 10 ** 18 });
  };
}

export default StakeForm;
