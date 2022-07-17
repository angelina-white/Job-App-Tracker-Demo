import './App.css';
import Home from './Components/Home';
import HomeLogin from './Components/HomeLogin';
import Interview from './Components/Interview';
import Offer from './Components/Offer';
import Stats from './Components/Stats';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

function App() {

  const [currentUser, setCurrentUser] = useState("");
  const [jobList, setJobList] = useState([]);
  const [interviewList, setInterviewList] = useState([]);
  const [offerList, setOfferList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [homeSelected, setHomeSelected] = useState(true);
  const [interviewSelected, setInterviewSelected] = useState(false);
  const [offerSelected, setOfferSelected] = useState(false);
  const [statsSelected, setStatsSelected] = useState(false);

  //fetches job list, interview list, and offers
  function fetchData()
  {
    fetch('/auth')
    .then(res => 
    {
      if(res.ok)
      {
        res.json().then(user => 
        {
          setCurrentUser(user)

          fetch(`/users/${user.id}/jobs`)
          .then(resp => resp.json())
          .then(data => setJobList(data))

          fetch(`/users/${user.id}/interviews`)
          .then(resp => resp.json())
          .then(data => setInterviewList(data))

          fetch(`/users/${user.id}/offers`)
          .then(resp => resp.json())
          .then(data => setOfferList(data))

          gsap.from(".App", {duration: 1, opacity: 0});
        })
      }
    })
  }

  //fetches data after user changes
  useEffect(() =>
  {
    fetchData()
  }, [])

  if(!currentUser) return <HomeLogin setCurrentUser = {setCurrentUser} renderLists={ renderLists }/>

  function renderLists()
  {
    console.log("ahh")
    fetchData()
  }

  //logs user out
  function handleLogout() 
  {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => 
    {
      setCurrentUser("")
      setJobList([])
      setInterviewList([])
      setOfferList([])
    })
  }

  //adds new job to job list
  function handleAddJob(item)
  {
    setJobList([item, ...jobList])
  }

  //adds new interview to interview list
  function handleAddInterview(item)
  {
    setInterviewList([...interviewList, item])
  }

  //deletes job from job list
  function deleteJob(jobId)
  {
    const filteredJobList = jobList.filter(item => item.id !== jobId)
    setJobList(filteredJobList)

    const filteredInterviewList = interviewList.filter(item => item.job.id !== jobId)
    setInterviewList(filteredInterviewList)
  }

  //updates job list with new job information
  function handleJobPatch(job)
  {
    const newListing = jobList.map((item) =>
    {
      if (item.id === job.id)
        return job
      else
        return item
    })
    setJobList(newListing)
  }

  //adds offer to offer list
  function handleAddOffer(job)
  {
    setOfferList([...offerList, job])
  }

  //list for searched term
  const listingToDisplay = jobList.filter((item) =>
  {
    return (
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  function handleSelectHome()
  {
    setHomeSelected(true)
    setInterviewSelected(false)
    setOfferSelected(false)
    setStatsSelected(false)
  }

  function handleSelectInterviews()
  {
    setHomeSelected(false)
    setInterviewSelected(true)
    setOfferSelected(false)
    setStatsSelected(false)
  }

  function handleSelectOffers()
  {
    setHomeSelected(false)
    setInterviewSelected(false)
    setOfferSelected(true)
    setStatsSelected(false)
  }

  function handleSelectStats()
  {
    setHomeSelected(false)
    setInterviewSelected(false)
    setOfferSelected(false)
    setStatsSelected(true)
  }

  return (
    <div className="App">
      <div className="titleContainer">
        <h1 id="title">Job Application Tracker</h1>
      </div>
      <Router>
        <div>
          <nav>
            <ul className="linksNavBar">
              { homeSelected ?
                <li className="linkSelected">
                  <Link className="navText" id="homeLinkText" to="/">Home</Link>
                </li>
              :
                <li className="links">
                  <Link onClick={ handleSelectHome } className="navText" id="homeLinkText" to="/">Home</Link>
                </li>
              }
              { interviewSelected ?
                <li className="linkSelected">
                  <Link className="navText" id="interviewLinkText" to="/interview">Interviews</Link>
                </li>
                :
                <li className="links">
                  <Link onClick={ handleSelectInterviews } className="navText" id="interviewLinkText" to="/interview">Interviews</Link>
                </li>
              }
              { offerSelected ?
                <li className="linkSelected">
                  <Link className="navText" id="offerLinkText" to="/offer">Offers</Link>
                </li>
              :
                <li className="links">
                  <Link onClick={ handleSelectOffers } className="navText" id="offerLinkText" to="/offer">Offers</Link>
                </li>
              }
              { statsSelected ?
                <li className="linkSelected">
                  <Link className="navText" id="statsLinkText" to="/stats">Stats</Link>
                </li>
              :
              <li className="links">
                <Link onClick={ handleSelectStats } className="navText" id="statsLinkText" to="/stats">Stats</Link>
              </li>
              }
              <li id="loggedInUsername">
                <h5>{ currentUser.username }</h5>
              </li>
              <li>
                <button id="logoutButton" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/interview">
              <Interview interviewList={ interviewList } />
            </Route>
            <Route path="/offer">
              <Offer offerList={ offerList }/>
            </Route>
            <Route path="/stats">
              <Stats jobList={ jobList }/>
            </Route>
            <Route path="/">
              <Home currentUserId={ currentUser.id } jobList={ listingToDisplay } handleAddJob={ handleAddJob } handleAddInterview={ handleAddInterview } deleteJob={ deleteJob } handleJobPatch={ handleJobPatch } handleAddOffer={ handleAddOffer } handleUserInput={ setSearchTerm } />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;