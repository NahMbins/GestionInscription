import React, { useState, useEffect } from "react";
import { Line,Doughnut } from "react-chartjs-2";
import "chart.js/auto";
// import axios from "axios";
import { ExpressAxios } from "./baseUrl";

const Chart = () => {
    const [nombreInscrit, setnombreInscrit] = useState([])
    const [nombreNiveau, setnombreNiveau] = useState([])
    const [nombreTotalNiveau, setnombreTotalNiveau] = useState([])
    const [nombreAdmin, setnombreAdmin] = useState([])
    const [nombreCyber, SetnombreCyber] = useState([])
    const [nombreDevOps, setnombreDevOps] = useState([])
    const [nombreML, setnombreML] = useState([])

    useEffect(() => {
        getnombreInscrit();
        getnombreAdmin();
        getnombreCyber();
        getnombreDevOps();
        getnombreML();
        getnombreNiveau();
        getnombreTotalNiveau();
    }, []);
    const getnombreInscrit = async () => {
        const response = await ExpressAxios.get("/nombreInscrit");
        if (response.status === 200) {
            setnombreInscrit(response.data);
        }
    };
    
    const getnombreDevOps= async () => {
        const response = await ExpressAxios.get("/nombreDevOps");
        if (response.status === 200) {
            setnombreDevOps(response.data);
        }
    };

    const getnombreAdmin= async () => {
        const response = await ExpressAxios.get("/nombreAdmin");
        if (response.status === 200) {
            setnombreAdmin(response.data);
        }
    };

    const getnombreML= async () => {
        const response = await ExpressAxios.get("/nombreML");
        if (response.status === 200) {
            setnombreML(response.data);
        }
    };

    const getnombreCyber= async () => {
        const response = await ExpressAxios.get("/nombreCyber");
        if (response.status === 200) {
            SetnombreCyber(response.data);
        }
    };

    const getnombreNiveau= async () => {
        const response = await ExpressAxios.get("/frequence");
        if (response.status === 200) {
            setnombreNiveau(response.data);
            
        }
    };

    const getnombreTotalNiveau= async () => {
        const response = await ExpressAxios.get("/counttotalniveau");
        if (response.status === 200) {
            setnombreTotalNiveau(response.data);
            
        }
    };

    //------------------Linechart---------------------
    var Linelabels = nombreNiveau.map(function(e){return e._id});
    var Linedata = nombreNiveau.map(function(e){return e.total});
    
    const data = {  
        labels: Linelabels,
        datasets: [{   
            label: "Nombre d'inscription",
            data: Linedata,
            backgroundColor: ["#a5cbb3"],
            fill:false,
            borderColor: 'rgb(75,192,192',
            tension: 0.1,
            pointBackgroundColor: ["#b0e0e6"],
            pointRadius: 8,
            responsive: true,
            pointStyle:'circle'
        }]  
    };
    
    //-------------------Pie-------------------------------
    var Pielabels = nombreTotalNiveau.map(function(e){return e._id});
    var Piedata = nombreTotalNiveau.map(function(e){return e.total});
    const data1 = {    
        labels: Pielabels,
        datasets: [{ 
           
            data: Piedata,
            backgroundColor: [
                "#b0e0e6",
                "#cccccc",
                "#fff68f",
                "#f7e2fd",
                "#b6a38f",
            ]
        }],
        
    };
    
    return (
        <>
            <div className="container-fluid pt-3 pb-3 row row-cols-6 row-cols-md-6  mb-4 text-center d-flex justify-content-around" style={{ width: "1300px" }}>
                

                <div className="p2">
                    <div className="card col text-bg-success shadow-sm border-success">
                        <div className="card-body">
                            <h5 className="card-title">Total Inscrit</h5>
                            <h5 className="">{nombreInscrit}</h5>
                        </div>
                    </div>
                </div>

                <div className="p2">
                    <div className="card col  shadow-sm border-secondary">
                        <div className="card-body">
                            <h5 className="card-title">Total Cyber-secu</h5>
                            <h5 className="">{nombreCyber}</h5>
                        </div>
                    </div>
                </div>

                <div className="p2">
                    <div className="card col  shadow-sm border-danger">
                        <div className="card-body">
                            <h5 className="card-title">Total Machine L</h5>
                            <h5 className="">{nombreML}</h5>
                        </div>
                    </div>
                </div>

                <div className="p2">
                    <div className="card col   shadow-sm border-warning ">
                        <div className="card-body">
                            <h5 className="card-title">Total DevOps</h5>
                            <h5 className="">{nombreDevOps}</h5>
                        </div>
                    </div>
                </div>

                <div className="p2">
                    <div className="card col   shadow-sm border-info">
                        <div className="card-body">
                            <h5 className="card-title">Total Linux</h5>
                            <h5 className="">{nombreAdmin}</h5>
                        </div>
                    </div>
                </div>



            </div>
            <div className="d-inline container">
                <div style={{float:"left" ,width: "800px", margin: "0" }}>
                    <Line data={data}/>
                  
                </div>
                 <div style={{float:"right", width: "400px", margin: "0 auto" }}>
                   <Doughnut data={data1} />
                </div> 
            </div>
        </>
    )
}
export default Chart;