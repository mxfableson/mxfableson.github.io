import React from 'react';
import './css/App.css';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About1 from "./components/About1";
import About2 from "./components/About2";
import About3 from "./components/About3";
import Tour from "./components/Tour";
import About from './pages/About';
import Jumbotron from './components/Jumbotron'
//import Jumbotron2  from './components/Jumbotron2'
import JumbotronFin from './components/JumbotronFin'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css';
import Scenathon from './pages/Scenathon';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import BackgroundBlue from '../src/assets/background.jpg';
import steps from './components/TOUR_STEPS';
import Sidebar from './components/Sidebar';
import NewSidemenu from './components/NewSidemenu';

{/*import SwipeableDrawe from './components/SwipeableDrawer';*/}

const ReactHint = ReactHintFactory(React)

const App = (props) => {

  const [currentValue, setCurrentValue] = React.useState("")
  
  const handleChangeAside = (value) => {
    setCurrentValue(value)
  }
    console.groupEnd();
  
    const references = {
    fable: React.createRef(),
    scenathon2020: React.createRef(),
    scenathon: React.createRef(),
    home: React.createRef()
  }

    

    return (
        <React.Fragment>
        <div>
          <Tour stepsP={steps}/>
        </div>

        <div className="Nav">
          <Navbar references={references}/>
        </div>

            <Jumbotron/>

        <div className="About1" id="About1">
          <About1 aboutRef={references.fable}/>
        </div>
        <div id="Jumbotron_2" >
          {/*<Jumbotron_2 />*/}
        </div>


        <NewSidemenu/>
        <div className="Scenathon2020">
          <Scenathon fableRef={references.scenathon2020} className="Scenathon2020" id="Scenathon2020"/>
        </div>

        <div className="scenathon-info">
          <About2 fableRef={references.scenathon}/>
        </div>

        <div id="JumbotronFin" data-rh="Copyright" data-rh-at="top" id="final">
          <JumbotronFin/>
        </div>

        {/*<div>
          <SwipeableDrawe/>
          <Sidebar/>
        </div>*/}




    </React.Fragment>
  )
};
export default App;