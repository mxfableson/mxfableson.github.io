import React, { useState, useEffect } from "react";
import BarChart2 from "../components/BarChart2.jsx";
import Tour from '../components/Tour'
import FoodEnergyTwo from '../services/FoodEnergyTwo';
import ComboBox2 from "../components/ComboBox2.jsx";
const FoodEnergyIntakePerCapita = () => {



 
  const [state, setState] = useState({
    select: {
      Year: '2000',
      scenathon_id: '6',
      Iteration: '4',
    }
   
  });

  const [json, setJson] = useState([{
    labels: [],
    datasets: []
  }]);



  useEffect(() => {
    FoodEnergyTwo(state).then(setJson);
  }, [state]);









  const handleChange = e => {
    var year = state.select.Year;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.Iteration;
  
    if(e.target.name==="scenathon_id"){
      switch (e.target.value) {
        case '6':
          iteration=state.select.Iteration==="1"? "3":"4";
          scenathon="6";
          break;
        case '5':
          scenathon="5";
          iteration=state.select.Iteration==="3"? "1":"2";
        break;    
        default:  iteration=state.select.Iteration==="1"? "3":"4";
      }
    }
    else{ 
      year= e.target.name==="Year"? e.target.value: state.select.Year;
      iteration=e.target.name==="Iteration"?scenathon==="6" ? e.target.value==="after"? "4":"3" : e.target.value==="after"? "2":"1":state.select.Iteration;
    }
    setState({
      select: {
        Year: year,
        scenathon_id:scenathon,
        Iteration:iteration,
      }
    });
  }
  


  const steps = [
    {
      target: ".graph",
      content: "Average grams per day of feasible fats and proteins by country and selected year per capita.",
      title: "Food energy intake per capita 2",
      styles: {
        //this styles override the styles in the props  
        options: {
          textColor: "black"
        }
      },
      locale: {
        next: <span>End</span>,
      },
      placement: "top"
    }
  ]

  return (

    <div className="graph">
      <Tour stepsP={steps} />

      <div>
      <ComboBox2 onChange={handleChange} />

      </div>

      <div style={{ height: "60vh", width: "70vw" }}>
        <BarChart2 data={json}
          aspectRatio={false}
          labelposition="top"
          labelwidth={50}
          labelSize={24}
          TitleSize={45}
          labelString='Kcal per capita/day'
          title="Food energy intake per capita" />
      </div>

    </div>
  )


}
export default FoodEnergyIntakePerCapita;

