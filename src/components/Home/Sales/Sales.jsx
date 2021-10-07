import './Sales.css';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const Sales = () => {
    const [data, setData] = useState(null);
    const [dataX, setDataX] = useState([]);

    useEffect(() => {
        fetch('https://6155a05293e3550017b08b11.mockapi.io/sales')
            .then(res => {
                return res.json();
            })
            .then(datas => {
                datas.sort((a,b) => { 
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                   });
                // console.log(datas);
                const trimTime = (dateTime) => dateTime.substr(0,10) + ' ' + new Date(dateTime.slice(0,-1)).toLocaleString('en-US', { hour: 'numeric',hour12: true});
                const sumSales = datas.reduce((acc,rec) => {
                    const salesInAcc = acc.filter(datas=>datas.createdAt === trimTime(rec.createdAt))
                    if (salesInAcc.length > 0) {
                      salesInAcc[0].price = (+salesInAcc[0].price) + (+rec.price)
                    }
                    else {
                      acc = [...acc, {...rec, createdAt: trimTime(rec.createdAt)}]
                    }
                    return acc;                 
                  }, []);
                // console.log(sumSales);                
                sumSales.forEach((oneTime, i) => {
                    if(i % 3 === 0){setDataX(dataX => [...dataX, oneTime.createdAt.substr(11)])}
                    else{setDataX(dataX => [...dataX,''])}
                });
                setData(sumSales);
            })
    },[])

    return (  
        <div className="sales">
            <h3>Total Sales</h3>
            {data && dataX.length > 0 ? 
            <div className="chartContainer">
            <Line 
                data={{
                    labels: dataX,
                    datasets: [{
                        label: '# of Sales',
                        data: data.map(oneData => oneData.price),
                        borderColor: ['rgba(54, 162, 235, 0.2'],
                        backgroundColor: ['rgba(54, 162, 235, 0.2'],
                        pointBackgroundColor: ['rgba(54, 162, 235, 0.2'],
                        pointBorderColor: ['rgba(54, 162, 235, 0.2'],
                    }]
                }}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }}
                }
            /></div> : 
            <div>Trying to access the data...</div>}
        </div>
    );
}
 
export default Sales;