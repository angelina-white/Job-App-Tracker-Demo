import { useState, useEffect } from "react"
import JobItem from "./JobItem"
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';
import PulseLoader from "react-spinners/PulseLoader";
import { gsap } from "gsap";

function Home({ currentUserId, jobList, handleAddJob, handleAddInterview, deleteJob, handleJobPatch, handleAddOffer, handleUserInput })
{
    //loads table
    const [loading, setLoading] = useState(false);

    useEffect(() =>
    {
      setLoading(true)
      setTimeout(() =>
      {
        setLoading(false)
        gsap.from("#loadedTable", {duration: 1, opacity: 0, y: 10});
      }, 2500)
    }, [])

    //gets today's date
    const current = new Date();
    const currentDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`

    //gets user input for new job
    const [jobAppInput, setJobAppInput] = useState(
        {
            dateApplied: currentDate,
            description: "",
            applicationLink: "",
            status: "Pending",
            user_id: currentUserId,
            company: ""
        }
    )

    function handleChangeJobApp(e)
    {
        setJobAppInput({...jobAppInput, [e.target.name]: e.target.value})
    }

    //adds new job to job list
    function handleSubmitJobApp(e)
    {
        fetch("/jobs", 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobAppInput)
        })
        .then(resp => resp.json())
        .then(data => handleAddJob(data)) 
    }

    //selects job
    const [selectedJobId, setSelectedJobId] = useState("")
    const [isSelected, setIsSelected] = useState(false)
    function getJobId(id)
    {
        setSelectedJobId(id)
        setIsSelected(true)
    }

    //displays job list in table
    const displayList = jobList.map((item) =>
    {
      return (
        <JobItem item={ item } deleteJob={ deleteJob } handleJobPatch={ handleJobPatch } getJobId={ getJobId }/>
      )
    })

    //handles adding interview to interview list
    const [showInterview, setShowInterview] = useState(false);
    const handleCloseInterview = () => setShowInterview(false);
    const handleShowInterview = () => setShowInterview(true);

    const [interview, setInterview] = useState(
    {
        month: "",
        day: "",
        year: "",
        hour: "",
        minute: ""
    })
    
    function handleChangeInterview(e)
    {
        setInterview({...interview, [e.target.name]: e.target.value})
    }

    function handleSubmitInterview(e)
    {
        e.preventDefault()

        const data = 
        {
            month: interview.month,
            day: interview.day,
            year: interview.year,
            hour: interview.hour,
            minute: interview.minute,
            job_id: selectedJobId
        }

        fetch("/interviews", 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(data => 
        {
            handleAddInterview(data)
            setShowInterview(false)
        }) 
    }

    //handles adding offer list
    const [showOffer, setShowOffer] = useState(false);
    const handleCloseOffer = () => setShowOffer(false);
    const handleShowOffer = () => setShowOffer(true);
    const [offer, setOffer] = useState({salary:0, medical:"", pto:0, sickLeave:0, bonus:0, positionType:""})
    
    function handleChangeOffer(e)
    {
        setOffer({...offer, [e.target.name]: e.target.value})
    }

    // const [newJobPatch, setNewJobPatch] = useState("")
    function handleSubmitOffer(e)
    {
        e.preventDefault()

        const offerData = 
        {
            salary: offer.salary,
            medical: offer.medical,
            pto: offer.pto,
            sickLeave: offer.sickLeave,
            bonus: offer.bonus,
            positionType: offer.positionType,
            job_id: selectedJobId
        }

        fetch("/offers", 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(offerData)
        })
        .then(resp => resp.json())
        .then(data => 
        {
            handleAddOffer(data)
            setShowOffer(false)
        }) 
    }

    //handles searched input
    function handleSearchInput(e)
    {
        handleUserInput(e.target.value)
    }

    return(
        <div className="home">
            {loading ?
            <div id="loading">
                <PulseLoader font-size={"500px"} color={'#E0E9FC'} loading={ loading }/>
            </div>
            :
            <div id="loadedTable">
                <div>
                    <div id="intButton">
                        {isSelected ? 
                            <Button variant="primary" id="addIOButton" onClick={handleShowInterview}>
                                Add Interview
                            </Button>
                        :
                            <Button variant="primary" id="addIOButtonGrey">
                                Add Interview
                            </Button>
                        }
                        <Modal show={showInterview} onHide={handleCloseInterview}>
                            <Modal.Header closeButton>
                                <Modal.Title id="addInterviewTitle">Add Interview</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div className="addDate">
                                        <label className="addInterviewInputContainer">
                                            Enter:
                                            <input className="addInterviewInput" id="monthInput" name="month" type="text" placeholder="mm" onChange={handleChangeInterview}/>
                                        </label>
                                        <input className="addInterviewInput" id="dayInput" name="day" type="text" placeholder="dd" onChange={handleChangeInterview}/>
                                        <input className="addInterviewInput" id="yearInput" name="year" type="text" placeholder="yyyy" onChange={handleChangeInterview}/>
                                    </div>
                                    <div className="addTime">
                                        <label className="addInterviewInputContainer">
                                            Enter:
                                            <input className="addInterviewInput" id="hourInput" name="hour" type="text" placeholder="hh" onChange={handleChangeInterview}/>
                                        </label>
                                        <input className="addInterviewInput" id="minuteInput" name="minute" type="text" placeholder="mm" onChange={handleChangeInterview}/>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseInterview}>
                                Close
                            </Button>
                            <Button id="addIOadd" variant="primary" onClick={handleSubmitInterview}>
                                Add
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div id="offerButton">
                        {isSelected ?
                            <Button id="addIOButton" variant="primary" onClick={handleShowOffer}>
                                Add Offer
                            </Button>
                        :
                            <Button id="addIOButtonGrey" variant="primary">
                                Add Offer
                            </Button>
                        }
                        <Modal show={showOffer} onHide={handleCloseOffer}>
                            <Modal.Header closeButton>
                                <Modal.Title id="addOfferTitle">Add Offer</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <label className="addOfferInputContainer" id="addOfferSalary">
                                        Salary:
                                        <input className="addOfferInput" name="salary" type="text" placeholder="Enter..." onChange={handleChangeOffer}/>
                                    </label>
                                    <label className="addOfferInputContainer">
                                        Medical:
                                        <input className="addOfferInput" name="medical" type="text" placeholder="Enter..." onChange={handleChangeOffer}/>
                                    </label>
                                    <label className="addOfferInputContainer">
                                        Vacation days:
                                        <input className="addOfferInput" name="pto" type="text" placeholder="Enter..." onChange={handleChangeOffer}/>
                                    </label>
                                    <label className="addOfferInputContainer">
                                        Sick leave:
                                        <input className="addOfferInput" name="sickLeave" type="text" placeholder="Enter..." onChange={handleChangeOffer}/>
                                    </label>
                                    <label className="addOfferInputContainer">
                                        Bonus:
                                        <input className="addOfferInput" name="bonus" type="text" placeholder="Enter..." onChange={handleChangeOffer}/>
                                    </label>
                                    <label className="addOfferInputContainer">
                                        Position type:
                                        <input className="addOfferInput" name="positionType" type="text" placeholder="Enter..." onChange={handleChangeOffer}/>
                                    </label>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseOffer}>
                                    Close
                                </Button>
                                <Button id="addIOadd" variant="primary" onClick={handleSubmitOffer}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <p id="searchIcon"><FaSearch /></p>
                    <input className="searchBar" id="searchBarInput" type="text" placeholder="Search company..." onChange={ handleSearchInput }/>

                </div>
                    <div className="jobTableBackground" >
                        <Table striped bordered hover id="jobsTable" >
                            <thead id="jobsTableHeader">
                                <tr>
                                    <th className="idCol">Select</th>
                                    <th className="dateCol">Date</th>
                                    <th className="companyCol">Company</th>
                                    <th className="descriptionCol">Job Title</th>
                                    <th className="applicationCol">Application Link</th>
                                    <th className="statusCol">Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="jobsTableBody" id="jobScroll">
                                <tr>
                                    <td className="idCol"></td>
                                    <td className="dateCol">
                                        { currentDate }
                                    </td>
                                    <td className="companyCol">
                                        <input id="companyInput" name="company" type="text" placeholder="Enter..." onChange={handleChangeJobApp}/>
                                    </td>
                                    <td className="descriptionCol">
                                        <input id="descriptionInput" name="description" type="textarea" placeholder="Enter..." onChange={handleChangeJobApp}/>
                                    </td>
                                    <td className="applicationCol">
                                        <input id="applicationInput" name="applicationLink" type="text" placeholder="Enter..." onChange={handleChangeJobApp}/>
                                    </td>
                                    <td className="statusCol">Status</td>
                                    <td>
                                        <Button onClick={handleSubmitJobApp} variant="secondary">Submit</Button>
                                    </td>
                                </tr>
                                { displayList }
                            </tbody>
                        </Table>
                    </div>       
                </div>
                }
        </div>
    )
}
export default Home