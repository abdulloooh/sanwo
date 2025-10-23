import React from "react";
import { Form as FormWrapper, Container, Row, Col } from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getDebt,
  saveDebt,
  updateDebt,
  deleteDebt,
} from "../services/debtService";
import { toast } from "react-toastify";

class DebtForm extends Form {
  state = { data: {}, errors: {} };

  owedByWho = [
    { _id: "cr", name: "Owed to Me" },
    { _id: "dr", name: "Owed by Me" },
  ];

  // whichDate = undefined;

  schema = {
    _id: Joi.string().alphanum(),
    name: Joi.string().min(1).max(128).required().label("Name"),
    description: Joi.string().min(3).max(1024).label("Description"),
    amount: Joi.number().integer().required().label("Amount"),
    dateIncurred: Joi.date().min(2000).label("Date Incurred"),
    dateDue: Joi.date().min(2020).label("Date Due"),
    status: Joi.string().min(2).max(2).required(),
  };

  componentDidMount = async () => {
    let { id } = this.props.match.params;
    const future = new Date();
    let debt = {};
    if (id === "new") {
      debt = {
        dateIncurred: new Date(Date.now()).toDateString(),
        dateDue: new Date(future.setDate(future.getDate() + 30)).toDateString(),
        status: "cr",
      };
    } else {
      try {
        const { data } = await trackPromise(getDebt(id));
        debt = { ...data };
      } catch (ex) {
        if (
          ex.response &&
          (ex.response.status === 400 ||
            ex.response.status === 401 ||
            ex.response.status === 403)
        )
          this.handleException(ex);
      }
    }

    //set default value for new
    this.setState({ data: debt });

    //disable triggering of touch screen (mobile) keyboard on react date picker
    const datePickers = document.getElementsByClassName(
      "react-datepicker__input-container"
    );
    for (let i = 0; i < datePickers.length; i++) {
      datePickers[i].childNodes[0].setAttribute("readonly", true);
    }
  };

  doSubmit = async () => {
    // Check validity of dates
    const { dateIncurred, dateDue, status } = this.state.data;
    let errors = this.isDatesValid(dateIncurred, dateDue);

    this.setState({ errors: errors || {} });
    if (errors) return false;

    try {
      if (!this.state.data._id) await trackPromise(saveDebt(this.state.data));
      else await trackPromise(updateDebt(this.state.data));
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 ||
          ex.response.status === 401 ||
          ex.response.status === 403)
      )
        this.handleException(ex);
    }

    this.props.history.push(`/?tab=${status}`);
  };

  deleteConcern = async () => {
    try {
      await trackPromise(deleteDebt(this.state.data._id));
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 ||
          ex.response.status === 401 ||
          ex.response.status === 403)
      )
        this.handleException(ex);
    }
    this.props.history.replace("/");
  };

  handleException(err) {
    if (err.response.data === "Please log in again") {
      toast.error(err.response.data);
      localStorage.removeItem("username");
      setTimeout(() => {
        window.location = "/login";
      }, 300);
      return;
    }

    toast.error(err.response.data);
    setTimeout(() => {
      window.location = "/";
    }, 300);
  }

  render() {
    const isNewDebt = this.props.match.params.id === "new";
    
    return (
      <Container className="mt-5">
        <div className="debt-form-header">
          <h2 className="debt-form-title">
            {isNewDebt ? "Add New Debt" : "Edit Debt Record"}
          </h2>
          <p className="debt-form-description">
            {isNewDebt 
              ? "Record a new debt to track money owed to you or by you"
              : "Update the details of this debt record"
            }
          </p>
        </div>
        
        <div className="debt-form-container">
          <FormWrapper onSubmit={this.handleSubmit} className="debt-form">
            <div className="form-section">
              <h5 className="form-section-title">Basic Information</h5>
              {this.renderInput("Name", "name", "Name of Debtor/Creditor")}
              {this.renderInput(
                "Description",
                "description",
                "Optional description or notes"
              )}
            </div>
            
            <div className="form-section">
              <h5 className="form-section-title">Amount & Dates</h5>
              {this.renderInput("Amount", "amount", "Amount in your currency", "tel")}
              <Row>
                <Col lg>{this.renderDate("Date Incurred", "dateIncurred")}</Col>
                <Col>{this.renderDate("Date Due", "dateDue")}</Col>
              </Row>
            </div>

            <div className="form-section">
              <h5 className="form-section-title">Debt Type</h5>
              {this.renderSelect("Who owes whom?", "status", this.owedByWho)}
              <div className="form-help">
                <small>
                  <strong>Owed to Me:</strong> Someone owes you money<br/>
                  <strong>Owed by Me:</strong> You owe someone money
                </small>
              </div>
            </div>

            <div className="form-actions">
              {this.renderButton(isNewDebt ? "Add Debt" : "Update Debt")}
            </div>
          </FormWrapper>
          
          {this.props.match.params &&
            this.props.match.params.id !== "new" && (
            <div className="delete-section">
              <hr />
              <div className="delete-button-container">
                <h6 className="delete-section-title">Danger Zone</h6>
                <p className="delete-section-description">
                  Permanently delete this debt record. This action cannot be undone.
                </p>
                {this.renderClickButton("Delete Debt Record", "danger")}
              </div>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default DebtForm;
