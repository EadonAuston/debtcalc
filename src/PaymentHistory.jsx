import React from "react";

class PaymentHistory extends React.Component {
   render() {
      const { items } = this.props;

      return (
         <div className="box payment-history">
            <div className="title">Payment History</div>
            <ul className="payment-history-text">
               {items.map((item) => (
               <li key={item.id}>{item.text}</li>
               ))}
            </ul>
         </div>
      );
   }
}

export default PaymentHistory;