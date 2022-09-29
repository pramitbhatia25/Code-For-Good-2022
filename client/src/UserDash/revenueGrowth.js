import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function RevenueGrowth() {
    const state = {
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Revenue Growth Rate',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#87CEEB',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
          }
        ]
      }
    return (
    
        

      <div className='bg-light mx-auto mt-5' style={{ background: "linear-gradient(#ADD8E6, #9198e5)" }}>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Revenue Growth Rate',
              fontSize:20
            
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
    </div>


       

  );
}

export default RevenueGrowth;