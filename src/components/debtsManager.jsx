import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { trackPromise } from "react-promise-tracker";
import { getDebts as getAllDebts } from "../services/debtService";
import { getIndividualSummary } from "../services/individualService";
import DebtsTable from "./debtsTable";
import { sortAndOrder, sortByDate } from "../utils/sorting";
import "../styles/body.scss";
import Filter from "./common/sortDropDown";
import { Row, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Loader from "react-loader-spinner";

class DebtsManager extends Component {
  state = { sortBy: "dateDue", orderBy: "asc", loading: true }; //default
  sort = [
    { label: "Date Due", value: "dateDue" },
    { label: "Date Incurred", value: "dateIncurred" },
    { label: "Amount", value: "amount" },
  ];

  order = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  specialVars = {
    individual: "Total Balance",
    credit: "Total",
    debit: "Total",
  };

  getDebts = (group) => {
    if (group._id !== "individual") {
      return this.state.debts && this.state.debts.filter((d) => d.status === group._id);
    }
    //if not
    return this.state.individual;
  };

  async componentDidMount() {
    try {
      let { data: debts } = await trackPromise(getAllDebts());
      let { data: individual } = await trackPromise(getIndividualSummary());
      //set color for total
      let totalValue = individual.filter((i) => i.name === `${this.specialVars.individual}`);
      let totalColor = Number(totalValue[0].balance) < 0 ? "red" : "green";

      this.setState({ debts, individual, category: "classified", totalColor, loading: false });
      
      // Notify parent component that data is loaded
      if (this.props.onDataLoaded) {
        this.props.onDataLoaded(debts, individual);
      }
      
      // Only sort if there are debts to sort
      if (debts && debts.length > 0) {
        this.sortAndUpdate(this.state.sortBy, this.state.orderBy, debts, individual);
      }
    } catch (ex) {
      this.setState({ loading: false });
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 401 || ex.response.status === 403)
      ) {
        localStorage.removeItem("username");
        toast.error(ex.response.data || "Invalid request");
        setTimeout(() => {
          window.location = "/login";
        }, 300);
      }
    }
  }

  // componentDidUpdate(prevProps) {
  //   const { sortBy, orderBy } = this.props;
  //   let { debts, individual } = this.state;
  //   if (prevProps.orderBy !== orderBy || prevProps.sortBy !== sortBy) {
  //     console.log("sd");
  //     this.sortAndUpdate(debts, individual);
  //   }
  // }

  sortAndUpdate = (sortBy, orderBy, unsortedDebts, unsortedIndividual) => {
    if (unsortedDebts && unsortedIndividual) {
      var debts = unsortedDebts,
        individual = unsortedIndividual;
    } else {
      debts = this.state.debts;
      individual = this.state.individual;
    }
    debts =
      sortBy === "dateIncurred" || sortBy === "dateDue"
        ? sortByDate(debts, sortBy, orderBy, "desc") // "desc" passed here is just label for desc, asc is default
        : sortAndOrder(debts, sortBy, orderBy, "desc");
    individual = sortAndOrder(individual, "balance", "asc", "desc");

    let removeD = debts.filter((i) => i.common === "total");
    for (let item of removeD) {
      debts.splice(debts.indexOf(item), 1);
      debts.unshift(item);
    }

    let removeI = individual.filter((i) => i.name === `${this.specialVars.individual}`);
    individual.splice(individual.indexOf(removeI[0]), 1);
    individual.unshift(removeI[0]);

    this.setState({ debts, individual });
  };

  render() {
    const { selectedGroup } = this.props;
    const { sortBy, orderBy, totalColor, loading } = this.state;
    
    // Show loading state first
    if (loading) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '300px',
          width: '100%'
        }}>
          <Loader
            type="ThreeDots"
            color="var(--primary)"
            height={80}
            width={80}
          />
        </div>
      );
    }
    
    // Show welcome screen when no actual debt records exist (excluding summary data)
    const hasActualDebts = this.state.debts && this.state.debts.some(debt => debt.common !== "total");
    
    if (!hasActualDebts) {
      return (
        <div className="welcome-screen">
          <div className="welcome-content">
            <div className="welcome-header">
              <div className="welcome-icon">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 className="welcome-title">Welcome to Sanwo!</h1>
              <p className="welcome-subtitle">Your personal debt management assistant</p>
            </div>
            
            <div className="welcome-description">
              <p>
                Sanwo helps you keep track of all your financial obligations in one place. 
                Whether someone owes you money or you owe others, we've got you covered.
              </p>
            </div>
            
            <div className="welcome-features">
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h4>Track Debts</h4>
                <p>Record money owed to you and by you</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📅</div>
                <h4>Due Dates</h4>
                <p>Never miss a payment deadline</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h4>Summary</h4>
                <p>See your financial overview at a glance</p>
              </div>
            </div>
            
            <div className="welcome-actions">
              <Button 
                as={Link} 
                to="/debts/new" 
                variant="primary" 
                size="lg"
                className="welcome-cta"
              >
                <FaPlus className="mr-2" />
                Add Your First Debt
              </Button>
              <p className="welcome-note">
                Start by adding a debt record to see how Sanwo works
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    // Show normal interface when debts exist
    return (
      <>
        {localStorage.getItem("nextOfKins") !== "true" && (
          <div>
            <hr />
            <h6>
              Add next of kin and backup emails here <a href="/nextofkin">here</a>
            </h6>
            <hr />
          </div>
        )}
        {selectedGroup._id !== "individual" && (
          <div className="filter" style={{ textAlign: "center" }}>
            <Row style={{ textAlign: "center" }}>
              <Filter data={this.sort} activeItem={sortBy} onClick={this.handleSort} />
              <Filter data={this.order} activeItem={orderBy} onClick={this.handleOrder} />
            </Row>
          </div>
        )}
        <DebtsTable
          debts={this.getDebts(selectedGroup)}
          category={selectedGroup._id === "individual" ? "individual" : "classified"}
          specialCol={{
            totalSummaryAmount: {
              name: `${this.specialVars.individual}`,
              content: (item) => (
                <span style={{ color: `${totalColor}`, fontWeight: "bold" }}>{item}</span>
              ),
            },
            totalsLabel: {
              content: (item) => (
                <span style={{ color: "#007bff", fontWeight: "bold" }}>{item}</span>
              ),
            },
          }}
        />
      </>
    );
  }

  handleSort = (selected) => {
    const sortBy = selected.value;
    let { orderBy } = this.state;
    this.sortAndUpdate(sortBy, orderBy);
    this.setState({ sortBy });
  };

  handleOrder = (selected) => {
    const orderBy = selected.value;
    let { sortBy } = this.state;
    this.sortAndUpdate(sortBy, orderBy);
    this.setState({ orderBy });
  };
}

export default DebtsManager;
