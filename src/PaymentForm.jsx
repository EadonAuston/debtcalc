import React from "react";
import PaymentHistory from "./PaymentHistory";

class PaymentForm extends React.Component {
   constructor() {
      super();
    
      this.state = {
         items : [], text : "",

      };
      
      this.years = 0;
      
   }
   
   handleInterest = ( {target: { value }}) => {
      this.setState({ text2: value});
   }
   handleExpenditure = ( {target: { value }}) => {
      this.setState({ text3: value});
      this.setState({months : value / 12});
      
   
   }

   handleMonths = ( {target : {value}}) => {
      this.setState({months : value});
      this.setState({text3 : value * 12});
     
   
   }

   handleChange = ( {target: { value }}) => {
      this.setState({ principal: value});
      console.log(this.state.text);
   }
   
   handleSubmit = (e) => {
      if (this.state.text3 >= ((this.state.principal * this.state.text2 * 0.01) + .01 * this.state.principal)) {

      e.preventDefault();

      
      
      const newItem = {
          text : `You paid $${this.state.text3} on a loan of 
          $${Math.round(((Number(this.state.principal) + Number(this.state.text3))
             / (Number(this.state.text2 / 100))) / ((1 / (Number(this.state.text2 / 100))) + 1))}
           with an interest rate of ${this.state.text2}% and ended up paying
           $${Math.round((((Number(this.state.principal) + Number(this.state.text3))
            / (Number(this.state.text2 / 100))) / ((1 / (Number(this.state.text2 / 100))) + 1)) - 
            (((((Number(this.state.principal) + Number(this.state.text3))
            / (Number(this.state.text2 / 100))) / ((1 / (Number(this.state.text2 / 100))) + 1)) +
            ((Number(this.state.principal) + Number(this.state.text3))
            / (Number(this.state.text2 / 100))) / ((1 / (Number(this.state.text2 / 100))) + 1) * Number((this.state.text2)) / 100)
             - Number(this.state.text3)))} on the principal.`,
          id : Date.now(),
      } 

     
      

      this.setState((state) => ({ 
          items: [...state.items, newItem],
          text: '',
      
      }));
   

  
      e.preventDefault();
     let button =  document.querySelector('.increment-years');
     button.style.border = "5px solid red";
   
     
  }  else if (this.state.principal <= 100 && this.state.principal > 0 && this.state.text3 >= this.state.principal + (this.state.principal * this.state.text2 * 0.01)) {
   alert("You are debt free!");
  } else {
 

}
   }
   


   // handle = ( name, {target: { value }}) => this.setState({ name : value});
  

 
   render() {
     
    


      setInterval(() => {
         if (this.state.text3 >= ((this.state.principal * this.state.text2 * 0.01) + .01 * this.state.principal)) {
            let button =  document.querySelector('.increment-years');
         button.style.border = "5px solid aqua";
      } else {
         let button =  document.querySelector('.increment-years');
         button.style.border = "5px solid red";
      }

      
      },100);
      const incrementYears = () => {
       if (this.state.principal <= 100 && this.state.principal > 0 ) {
         if (this.state.text3 >= this.state.principal + (this.state.principal * this.state.text2 * 0.01)) {
            alert("You are debt free!");
           
          
         
        } else {console.log("no can do")}
      } else if (this.state.text3 >= (rate + .01 * this.state.principal)) {
   
         this.years++;
         const p = document.querySelector('.years-passed');
         p.innerHTML = `Years Passed: ${this.years}`;

         const prin = document.querySelector('.principal');
         prin.value = `${Math.floor(Number(this.state.principal) - Number(this.state.text3) + (Number(this.state.text2)/100) * (Number(this.state.principal)))}`;


         this.setState({ principal : Math.floor((Number(this.state.principal) - Number(this.state.text3) + (Number(this.state.text2)/100) * (Number(this.state.principal)))).toString()});
      } else {
       
         alert(`You must pay at least ${Number(this.state.principal) * Number(this.state.text2) * 0.01 + (.01 * Number(this.state.principal))}`);
       }
   }
      
   

      const rate = this.state.principal * this.state.text2 / 100;
      

      return (
         <div className='flexbox'>
         <form onSubmit={this.handleSubmit}>
            <label htmlFor="principal">Principal: (Total Amt)</label><input className="principal" type="number" onChange={this.handleChange}/>
            <label htmlFor="interestRate">Interest Rate: (% / year) </label><input type="text" onChange={this.handleInterest}/>
            <br />
            <p className="yrlyRate">This will come out to: {Number(this.state.principal) && Number(this.state.text2) ? rate : 0} every year
             or {Number(this.state.principal) && Number(this.state.text2) ? Math.round(rate / 12) : 0} every month on interest.
            </p>
            <label htmlFor="expenditure">Amount paid off this year</label><input className= "timeFrame" type="number" onChange={this.handleExpenditure}/>
            {/* <label htmlFor="expenditureMonths">Amount paid off this month</label><input className= "timeFrameMonths" type="number" onChange={this.handleMonths}/> */}
            <p className="timeAmount">
               Time until fully paid off at current rate: &nbsp; 
                {Number(this.state.principal) 
               && Number(this.state.text2) 
               && this.state.text3 >= (this.state.principal * (this.state.text2 / 100) + this.state.principal * 0.01) 
               ? `${this.state.principal / (this.state.principal - (this.state.principal - this.state.text3 + rate))} years more` : 
               `Please set a payment that is greater than the interest and 1% of the principal combined. This would be at least ${rate + .01 * this.state.principal}`}
            </p>
            
            <button className="increment-years" onClick={incrementYears}>Pay off {this.state.text3} this year</button>
            <p className="years-passed">Years Passed: {this.years}</p>
           
         </form>
         <PaymentHistory items = {this.state.items}/>
         </div>
         
      );
   }
}




export default PaymentForm;