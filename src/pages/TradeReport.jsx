
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import BarChart from "../componentes/BarChart";
import ComboBoxTradeReportersImporters from "../componentes/ComboBoxTradeReporters";
import CountryCharacteristics from '../data/CountryCharacteristics.json';
import DashboardTradeReport from '../componentes/DashboardTradeReport'


const SustainableImporters =()=>
 {
  
  const [state,setState]=useState({select: {
  Product: 'abaca',
 iteration: "4",
 scenathon_id :"6",
 column:"Export_quantity"
 }});

  //const [state,setState]=useState([]);
  const [json,setJson]=useState([]);
  var dataAux = null;

 const handleChange = e => {
var scenathon_id=state.select.scenathon_id;
var columnAux=state.select.column;
var Product =state.select.Product;
var iteration=state.select.iteration;

 
  if(e.target.name=="dashboard-tradeReport"){
  switch (e.target.value) {
    case 'Sustainable_next_exporters':
       // this.dash = <SustainableImporters scenathon_id={"6"} column={"Export_quantity"} iteration={"4"}/>;
       scenathon_id="6";
       columnAux="Export_quantity";
      iteration=state.select.iteration=="1"? "3":"4";
       
        break;
    case 'Sustainable_next_importers':
     //   this.dash = <SustainableImporters scenathon_id={"5"} column={"Import_quantity"} iteration={"4"}/>;
     scenathon_id="6";
     columnAux="Import_quantity";
     iteration=state.select.iteration=="1"? "3":"4";
        break;
    case 'Current_trend_next_exporters':
      //  this.dash = <h1>Current_trend_next_exporters</h1>
      scenathon_id="5";
      columnAux="Export_quantity";
     iteration=state.select.iteration=="3"? "1":"2";
//iteration="2";
        break;
    case 'Current_trend_next_importers':
      scenathon_id="5";
      columnAux="Import_quantity";
      iteration=state.select.iteration=="3"? "1":"2";
      //  this.dash = <h1>Current_trend_next_importers</h1>
        break;

        
}
}else{
  
  Product= e.target.name=="Product"? e.target.value: state.select.Product;
  iteration=e.target.name=="iteration"?scenathon_id==="6" ? e.target.value==="after"? "4":"3" : e.target.value==="after"? "2":"1":state.select.iteration;
}

setState({
      select: {
        Product: Product,
        iteration: iteration,
        scenathon_id :scenathon_id,
        column:columnAux
        
      }

});



  }

  

  useEffect(() => 
  {
    
  getNettrade();
  }, [state]);

 

  const getNettrade = async() => {
    try {
   
      const body =state;
      
   
      const response = await fetch("http://localhost:5000/net/"+JSON.stringify(body));
     const  jsonAux =  await response.json();
    
    setJson(jsonAux);

    } catch (error) {
      console.error(error)
    }



  }

  function Pais(CountryCharacteristics,data) {
    this.data=data;
    this.type=CountryCharacteristics[0]["type"];
    this.label=CountryCharacteristics[0]["label"];
    this.borderColor=CountryCharacteristics[0]["borderColor"];
    this.backgroundColor=CountryCharacteristics[0]["backgroundColor"];
    
  }

const getImportQuantity=()=>
{
  var contador=0;
var data=[];
var paises=[];
var labels=[];

  if (json != null) {
    json.map((item) => {
      if (!labels.includes(item.Year)) 
      {
        labels.push(item.Year);
      }
      data.push(item.Import_quantity);
      contador=contador+1;
      if (contador==11) {
        var pais = new Pais(CountryCharacteristics[item.name], data);
          paises.push(pais);
          contador=0;
        data=[];
      }
    });


  }
  data = {
    labels:labels,
    datasets:paises
};
 dataAux=data;
}

const getExportQuantity=()=>
{
  var contador=0;
var data=[];
var paises=[];
var labels=[];

  if (json != null) {
    json.map((item) => {
      if (!labels.includes(item.Year)) 
      {
        labels.push(item.Year);
      }
      data.push(item.Export_quantity);
      contador=contador+1;
      if (contador==11) {
        var pais = new Pais(CountryCharacteristics[item.name], data);
          paises.push(pais);
          contador=0;
        data=[];
      }
    });


  }
  data = {
    labels:labels,
    datasets:paises
};
 dataAux=data;
}



const converter=()=>{


if(state.select.column=="Export_quantity")
{
  getExportQuantity();
}else{
 
  getImportQuantity();
}

  }   

 
    return (
      <div>
        {converter()}
       
        <div>
        <DashboardTradeReport metodo={handleChange} />
           <ComboBoxTradeReportersImporters metodo={handleChange} />
        
        </div>

        {/*this.selectDashboard()*/}
       

        <div>
          <BarChart data={dataAux} title="Sustainable - net exporters" />
        </div>


      </div>
    )
  
}



export default SustainableImporters;