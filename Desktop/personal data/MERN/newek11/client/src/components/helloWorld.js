import React, { useState, useEffect ,useRef} from 'react';
import logo from '../assets/logo.png';
import cricboy from '../assets/9.png';
import grppic1 from '../assets/grouppic.png';
import firebase from 'firebase/compat/app'; // import firebase compat module
import 'firebase/compat/firestore'; // import firestore compat module
import Letterize from "https://cdn.skypack.dev/letterizejs@2.0.0";
import anime from "animejs"







const firebaseConfig = {
  apiKey: "AIzaSyBAVcShVkQdAIcNMEdOZwEhkGaDXQAk5ZY",
  authDomain: "ek11-4608b.firebaseapp.com",
  projectId: "ek11-4608b",
  storageBucket: "ek11-4608b.appspot.com",
  messagingSenderId: "1011327013122",
  appId: "1:1011327013122:web:2841478a7fce9080b5f21b",
  measurementId: "G-80DXZZ6395"
};




// initialize Firebase app
firebase.initializeApp(firebaseConfig);

const db2 = firebase.firestore();

// reference the achievements collection
const achievementsRef = db2.collection('acheivments');



function Helloworld() {
  const [matchnum, setMatchNum] = useState(null);
  const [lost, setLost] = useState(null);
  const [tie, setTie] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [won, setWon] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [players, setPlayers] = useState([]);



  useEffect(() => {
    // retrieve all documents in the achievements collection
    achievementsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((careers) => {
        // log the data of each document to the console
        const data = careers.data();
        setMatchNum(data.matches);
        setLost(data.lost);
        setTie(data.tie);
        setUpcoming(data.upcoming);
        setWon(data.won);
        setPercentage(data.won / data.matches * 100);

        //image component
        const fetchPlayers = async () => {

          const playersCollection = db2.collection("players");
          const snapshot = await playersCollection.get();
          const playersData = snapshot.docs.map((doc) => doc.data());
          setPlayers(playersData);
        };
        fetchPlayers();
      });
    });
  }, []);

  function handleToggleDisplay(id) {
    var element = document.getElementById(id);
    if (element.style.display === "block") {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  }


  useEffect(() => {
    const test = new Letterize({
      targets: '.animate-me',
    });

    const animation = anime.timeline({
      targets: test.listAll,
      delay: anime.stagger(100, {
        grid: [test.list[0].length, test.list.length],
        from: 'center',
      }),
      loop: true,
    });

    animation
      .add({
        scale: 0.5,
      })
      .add({
        letterSpacing: '10px',
      })
      .add({
        scale: 1,
      })
      .add({
        letterSpacing: '6px',
      });
  }, []);

  function AnimationComponent() {
    const animationRef = useRef(null);

    useEffect(() => {
      animationRef.current = anime.timeline({ loop: true })
        .add({
          targets: '.ml15 .word',
          scale: [14, 1],
          opacity: [0, 1],
          easing: 'easeOutCirc',
          duration: 800,
          delay: (el, i) => 800 * i,
        }).add({
          targets: '.ml15',
          opacity: 0,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 1000,
        });

      return () => {
        animationRef.current.pause();
      };
    }, []);

    return null; // Render nothing, as this component only manages the animation
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3 logohead">
          <img className="logoimg" src={logo} alt="not found" />
        </div>
        <div className=" headwithbg col-sm-12 col-md-12 col-lg-9 col-xl-9">
          <div className="ek11">
            <h1 class="ml15">
              <span class="word">EK</span>
              <span class="word">11</span>
              <AnimationComponent />
            </h1>
            <h3>Cricket club</h3>
          </div>
          <div className="connect">
            Inspiring and nurturing the next generation of cricket players
            <br />
            <a href="https://wa.me/7559054755"><button type="button" className="btn btn-light connectbutton">
              Connect
            </button></a>
          </div>
        </div>
      </div>
      <div className="row menudivision">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <a className="links" href="#grouppic">
            Intro
          </a>
          <a className="links" href="#score">
            Score Board
          </a>
          <a className="links" href="#player">
            Players
          </a>

        </div>
      </div>
      <div className="row" id="grouppic">
        <div className="groupphoto col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <img className="grppic" src={grppic1} alt="not found" />
        </div>
      </div>
      <div className="row greenquote">
        <div id="textgame" className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <div class="animate-me">
            "Bringing together individuals with a shared passion for cricket, and creating a sense of belonging through teamwork, respect, and dedication"
          </div>

        </div>
        <div className="greenimage col-sm-0 col-md-0 col-lg-6 col-xl-6">


          <img className="cricboyimg" src={cricboy} alt="not found" />
        </div>
      </div>
      <div className="row ourimpact" id="score">
        <div className="ourimpact col-sm-10 col-md-10 col-lg-4 col-xl-4">
          <h3>Our Impact</h3>
          <h6 className='impact'>Our impact goes beyond the scoreboard, as we strive to empower and inspire individuals both on and off the cricket field.</h6>


        </div>
        <div className="impactnumbers col-sm-10 col-md-10 col-lg-8 col-xl-8 grid-container">
          <div className="grid-item"><h1>{matchnum}</h1><h3>Matches</h3></div>
          <div className="grid-item"><h1>{won}</h1><h3>Won</h3></div>
          <div className="grid-item"><h1>{percentage}%</h1><h3>Won percentage</h3></div>
          <div className="grid-item"><h1>{lost}</h1><h3>Lost</h3></div>
          <div className="grid-item"><h1>{tie}</h1><h3>Tie</h3></div>
          <div className="grid-item"><h1>{upcoming}</h1><h3>Upcoming</h3></div>

        </div>

      </div>


      <div id="player">
        {players.map((player) => (
          <div key={player.name} className='row playerdata players details' onClick={() => handleToggleDisplay(player.name)} >
            <div className=" col-sm-12 col-md-12 col-lg-4 col-xl-4">
              <img className='playerimage' src={player.urlofimg} alt="Database" />
            </div>
            <div className=" col-sm-12 col-md-12 col-lg-8 col-xl-8">
              <h2>{player.name}</h2>
              <h5>{player.designation}</h5>
              <h6>{player.quote}</h6>
            </div>
            <div className="content" id={player.name} >
              <div className="card" >
                <div className="card-body">
                  <h5 className="card-title">{player.name}</h5>
                  <p className="card-text">{player.designation}</p>
                </div>
                <ul className="list-group list-group-flush">
                  
                  <li className="list-group-item"> {player.bat}</li>
                  <li className="list-group-item"> {player.ball}</li>
                </ul>

              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="connectwithdeveloper">
        <a href="https://www.linkedin.com/in/aiswarya-c-b-09aa71200">Connect with the developer.</a>
      </div>
    </div>

  );
}

export default Helloworld;

//cd server && yarn dev and cd client && yarn start
// <div id="quotes"  >

//</div>