import React from "react";
import { Form as FormWrapper, Container, Row, Col } from "react-bootstrap";
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
    name: Joi.string().min(3).max(30).required().label("Name"),
    description: Joi.string().min(3).max(100).label("Description"),
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
        const { data } = await getDebt(id);
        debt = { ...data };
      } catch (ex) {
        if (
          ex.response &&
          (ex.response.status === 400 ||
            ex.response.status === 401 ||
            ex.response.status === 403)
        )
          this.handleException();
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
    //check validity of dates
    const { dateIncurred, dateDue } = this.state.data;
    let errors = this.isDatesValid(dateIncurred, dateDue);

    this.setState({ errors: errors || {} });
    if (errors) return false;

    if (!this.state.data._id) await saveDebt(this.state.data);
    else
      try {
        await updateDebt(this.state.data);
      } catch (ex) {
        if (
          ex.response &&
          (ex.response.status === 400 ||
            ex.response.status === 401 ||
            ex.response.status === 403)
        )
          this.handleException();
      }

    this.props.history.push("/");
  };

  deleteConcern = async () => {
    try {
      await deleteDebt(this.state.data._id);
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 ||
          ex.response.status === 401 ||
          ex.response.status === 403)
      )
        this.handleException();
    }

    this.props.history.replace("/");
  };

  handleException() {
    toast.error("Invalid request");
    setTimeout(() => {
      window.location = "/";
    }, 500);
  }

  render() {
    return (
      <Container className="mt-5">
        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderInput("Name", "name", "Name of Debtor/Creditor")}
          {this.renderInput(
            "Description",
            "description",
            "optional description"
          )}
          {this.renderInput("Amount", "amount", "Amount", "tel")}
          <Row>
            <Col lg>{this.renderDate("Date Incurred", "dateIncurred")}</Col>
            <Col>{this.renderDate("Date Due", "dateDue")}</Col>
          </Row>
          {this.renderSelect("Owed by Who?", "status", this.owedByWho)}
          {this.renderButton("Submit")}
        </FormWrapper>
        {this.props.match.params &&
          this.props.match.params.id !== "new" &&
          this.renderClickButton("Delete record")}
      </Container>
    );
  }
}

export default DebtForm;
