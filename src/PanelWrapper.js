import React from 'react';


class PanelWrapper extends React.Component{
   render(){
     return(
       <section>
         <div className="container">
           <div className="row">
             <div className="col-md-12">
               {this.props.children}
             </div>
           </div>
         </div>
       </section>
     )
   }
 }

 export default PanelWrapper;
