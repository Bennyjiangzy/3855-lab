import React, { useEffect, useState } from 'react'
import '../App.css';

export default function EndpointAudit(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [log, setLog] = useState(null);
    const [error, setError] = useState(null)
	const rand_val = Math.floor(Math.random() * 100); // Get a random event from the event store  asdad
    const [index, setIndex] = useState(null);
    const getAudit = () => {
        fetch(`http://benny-3855-lab.westeurope.cloudapp.azure.com/audit_log/${props.endpoint}?index=${rand_val}`)
            .then(res => res.json().then(data => ({status: res.status, body: data})))
            .then((result)=>{
				console.log("Received Audit Results for " + props.endpoint)
                setIndex(rand_val)
                setLog(result.body);
                setIsLoaded(true);
            },(error) =>{
                console.log(error)
                setError(error)
                setIsLoaded(true);
            })
    }
	useEffect(() => {
		const interval = setInterval(() => getAudit(), 4000); // Update every 4 seconds
		return() => clearInterval(interval);
    }, [getAudit]);

    if (error){
        return (<div className={"error"}>Error found when fetching from API</div>)
    } else if (isLoaded === false){
        return(<div>Loading...</div>)
    } else if (isLoaded === true){
        console.log("test")
        return (
            <div>
                <h3>{props.endpoint}-{index}</h3>
                {JSON.stringify(log)}
            </div>
        )
    }
}
