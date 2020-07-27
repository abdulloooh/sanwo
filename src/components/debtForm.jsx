import React from "react";
import { Form as FormWrapper, Container, Row, Col } from "react-bootstrap";
import Joi from "@hapi/joi";
import Form from "./common/form";
import { getDebt, saveDebt } from "../services/fakeDebtList";

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

  componentDidMount = () => {
    let { id } = this.props.match.params;
    const future = new Date();
    const debt =
      id === "new"
        ? {
            dateIncurred: new Date(Date.now()).toDateString(),
            dateDue: new Date(
              future.setDate(future.getDate() + 30)
            ).toDateString(),
            status: "cr",
          }
        : getDebt(id);
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

  doSubmit = () => {
    const { data } = this.state;
    saveDebt(data);
    this.props.history.push("/");
  };

  render() {
    return (
      <Container className="mt-5">
        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderInput("Name", "name")}
          {this.renderInput("Description", "description")}
          {this.renderInput("Amount", "amount", "tel")}

          <Row>
            <Col lg>{this.renderDate("Date Incurred", "dateIncurred")}</Col>
            <Col>{this.renderDate("Date Due", "dateDue")}</Col>
          </Row>
          {this.renderSelect("Owed by Who?", "status", this.owedByWho)}
          {this.renderButton("Submit")}
        </FormWrapper>
      </Container>
    );
  }
}

export default DebtForm;
