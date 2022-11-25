import React from "react";
import PaymentHistory from "./PaymentHistory";

class PaymentForm extends React.Component {
   constructor() {
      super();
    
      this.state = {
         items : [],
         text : "",
         principal : 0,
         interest : 0,
         payment : 0,
      }; 
   }


   // I have tried using the DRY principle with 
   //handleInputChange = ({ target: { name, value }}) => {
  // this.setState({ [`${name}`]: value})
//   } But it does not work
  
 handleChangePrincipal = ({ target : { value }}) => {
   this.setState({ principal : value})
 }

 handleChangeInterest = ({ target : { value }}) => {
   this.setState({ interest : value})
 }

 handleChangePayment = ({ target : { value }}) => {
   this.setState({ payment : value})
 }

 submitLoan = () => {
   const {principal , interest} = this.state;
   let minPayment = document.querySelector('.minimum-payment');
   let interestPayment = document.querySelector('.interest-payment');
   let minimumPrincipal = document.querySelector('.minimum-principal');

   minPayment.innerHTML = (0.01 * principal + interest / 1200 * principal).toFixed(2);
   interestPayment.innerHTML = (interest / 1200 * principal).toFixed(2);
   minimumPrincipal.innerHTML = (0.01 * principal).toFixed(2);
 }

 submitPayment = () => {
   const {principal , interest } = this.state;
   let payment = document.querySelector('.payment-amt');
   
   let minPayment = document.querySelector('.minimum-payment');
   console.log(Number(minPayment.innerHTML));
   
   if (payment.value >= Number(minPayment.innerHTML) && Number(principal) > 100) {
      console.log(true);
      this.setState({
         principal : (this.state.principal - payment.value + (interest / 1200 * this.state.principal)).toFixed(2),
         interest : parseFloat(interest).toFixed(2),
         payment : parseFloat(this.state.payment).toFixed(2)
      }, () => {
         let principalNode = document.querySelectorAll('input');
         principalNode[0].value = this.state.principal;

         this.submitLoan();
         this.calculatePayments();
         this.totalInterest();

      })
      this.makePayment();
   } else if (this.state.principal <= 100 &&
              this.state.principal >= 0 &&
              payment.value >= (Number(this.state.principal) + (0.01 * Number(this.state.principal)))) {
         this.setState({
            principal : (this.state.principal - payment.value + (interest / 1200 * this.state.principal)).toFixed(2),
            interest : parseFloat(interest).toFixed(2),
            payment : parseFloat(this.state.payment).toFixed(2)
         }, () => {
            let principal = document.querySelectorAll('input');
            principal[0].value = this.state.principal;

            this.submitLoan();
            this.calculatePayments();
            this.totalInterest();
        
         })
         this.makePayment();
      } else {
         let secondButton = document.querySelectorAll('button');
         secondButton[1].addEventListener('mouseover', function () {
          secondButton[1].style.boxShadow = '0 5px 20px 5px red';
         })
         secondButton[1].addEventListener('mouseout', function () {
            secondButton[1].style.boxShadow = 'none';
         })
      }
   }

 calculatePayments = () => {
   let interestRate = this.state.interest / 1200;
   let paymentAmt = document.querySelector('.payment-amt');
   let payment = this.state.principal / paymentAmt.value;
  
   let monthlyInterest = payment * interestRate;
   let calc = 1 - monthlyInterest;
   let percentInterest = interestRate + 1;
   
   let calcLog = Math.log10(calc);
   let percentInterestLog = Math.log10(percentInterest);
  
   let answer = calcLog / percentInterestLog * -1;
  
   let payments = document.querySelector('.minimum-payments');
   payments.innerHTML = answer;
 }

 totalInterest = () => {
   let paymentAmt = document.querySelector('.payment-amt');
   let payments = document.querySelector('.minimum-payments');

   let interest = paymentAmt.value * payments.innerHTML;
   let totalInterest = this.state.principal - interest;

   let answer = document.querySelector('.total-interest');
   answer.innerHTML = totalInterest * -1;
 }

makePayment = () => {
      const {principal, interest, payment} = this.state;
      const newItem = {
         text : 
         `You paid $${payment} on a loan of $${principal} 
         with an interest rate of ${interest}% and actually paid 
         $${(payment - (interest / 1200 * principal)).toFixed(2)} on the principal`,

         id : Date.now(),
      } 

      this.setState((state) => ({ 
          items: [...state.items, newItem],
          text: '',
      }));
}
 
   render() {
      return (
         <div className='grid'>
            <div className="box">
               <div className="title">Enter Amount</div>
               <div className="flexbox">
                  <div className="input">Enter Loan Amount</div>
                     <input type="text" placeholder="ie: 10000" onChange = {this.handleChangePrincipal}/>&nbsp;$
               </div>
               <div className="flexbox">
                  <div className="input">Enter Interest Rate</div>
                  <input type="text" placeholder="ie: 2.5" onChange = {this.handleChangeInterest}/>&nbsp;%
               </div>
               <div className="button">
                  <button onClick={this.submitLoan}>Submit</button>
               </div>
            </div>

            <div className="box center">
               <div className="title">Payments Remaining</div>
               <div className="minimum-payments">0</div>
               <div>Monthly <br /> Payments Left</div>
               <div>At this rate the total interest remaining is: </div>
               <div className="total-interest">0</div>
            </div>

            <div className="box">
               <div className="title">Make A Payment</div>
               <div className="flexbox space-between center">
                  <div>
               <div className="flexbox">
                  <div className="input">Interest Payment:</div>$<div className="interest-payment input">0</div>
               </div>
               <div className="flexbox">
                  <div className="input">Minimum Principal:</div>$<div className="minimum-principal input">0</div>
               </div>
               </div>
               <div>
                  <div className="minimum-payment">0.00</div>
                  <div>Minimum Monthly Payment</div>
               </div>
               </div>
               <div className="flexbox">
                  <div className="input">Enter Payment Amount</div>
                  <input type="text" onChange = {this.handleChangePayment} className = "payment-amt"/>&nbsp;$
               </div>
               <div className="button">
                  <button onClick={this.submitPayment}>Submit Payment</button>
               </div>
            </div>

            <PaymentHistory items = {this.state.items}/>
        
         </div>
      );
   }
}

export default PaymentForm;