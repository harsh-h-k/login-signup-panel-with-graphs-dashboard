import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import axios from 'axios'
import {Bar , Pie} from 'react-chartjs-2'

import './styles/dashboard.css'



function Dashboard({ location }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userDataArr, setUserDataArr] = useState([])

    useEffect(() => {
        const { email } = queryString.parse(location.search)
        setEmail(email)
        axios.get('/getUserData/' + email)
            .then((jsonRes) => setUserDataArr(jsonRes.data))
            .catch((err) => console.log(err))
    }, [])

    // userDataArr.map((item)=>{
    //     console.log(item.email)
    //     console.log(item.growth)
    //     console.log(item.loss)
    //     console.log(item.india)
    //     console.log(item.us)
    //     console.log(item.oman)
    //     console.log(item.name)
    // })

   
    return (
        <div className="dashboard">

            {userDataArr.map((item, i) => {
                return (
                    <>
                        <div key={i} className="dashboard__head">
                            <p className="dashboard__heading"> Welcome , <span>{item.name}</span>
                            </p>
                        </div>
                        <div className="dashboard__data">
                            <div className="dashboard__charts">
                                <div className="dashboard__column__chart">
                                <Bar height={400}
                                    width={400} data={{
                                    labels : ['India', 'Oman','US'],
                                    datasets :[{
                                        label : 'India',
                                        data : [item.india, item.oman , item.us],
                                        backgroundColor :[
                                            '#86b6f6',
                                        '#ffcb15',
                                        '#ff8130'],
                                        borderWidth : 1 ,

                                    },
                                    {label : 'Oman' ,
                                    backgroundColor : '#ffcb15'},
                                    {label: 'US',
                                    backgroundColor:'#ff8130' }]
                                }}  

                                options={{
                                    maintainAspectRatio : false
                                }}
                                />
                                </div>
                                <div className="dashboard__pie__chart">
                                <Pie height={400}
                                    width={400} data={{
                                    labels : ['India', 'Oman','US'],
                                    datasets :[{
                                        label : '',
                                        data : [item.india, item.oman , item.us],
                                        backgroundColor :[
                                            '#86b6f6',
                                        '#ffcb15',
                                        '#ff8130']
                                    }]
                                }}  
                                />
                                </div>
                            </div>
                        </div>

                        <div className="dashboard__growth__loss">
                            <div className="growth">
                                <p className="dashboard__text">Growth</p>
                                <h1 className="dashboard__heading_h growth-txt">{item.growth}<span>%</span></h1>
                            </div>
                            <div className="loss">
                                <p className="dashboard__text">Loss</p>
                                <h1 className="dashboard__heading_h loss-txt">{item.loss}<span>%</span></h1>
                            </div>
                        </div>

                    </>
    )
})

            }


        </div >
    )
}

export default Dashboard
