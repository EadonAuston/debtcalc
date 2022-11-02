import React from "react";


class PaymentHistory extends React.Component {
  
   constructor () {
      super();
     
   }


 
   render() {
      const { items } = this.props;

     
     
      return (
         <div className="payment-history">
            <h1>Payment History</h1>
            <p>This is a list of all of the payments that you have made over the years:</p>
            <ul className="ul">
             {items.map((item) => (
               <li key={item.id}>{item.text}</li>
             ))}
             
              
              
            </ul>





         </div>
         
      );
   }

}



export default PaymentHistory;