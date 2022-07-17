import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

function JobItem({ item, deleteJob, handleJobPatch, getJobId })
{
    const {id, offer, user, company, dateApplied, applicationLink, description, status } = item

    //deletes job from job list
    function handleDelete(e)
    {
        const jobId = parseInt(e.target.value)

        fetch(`/jobs/${jobId}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => deleteJob(data));
    }

    //edits job and sends patch to job list
    const [isEdit, setIsEdit] = useState(false)

    function handleEdit(e)
    {
        setIsEdit((isEdit) => isEdit = !isEdit)
    }

    function handleSubmit(e)
    {
        const jobPatchData = 
        {
            dateApplied: newDateApplied,
            description: newDescription,
            applicationLink: newApplicationLink,
            status: newStatus,
            user_id: user.id,
            company: newCompany
        }

        fetch(`/jobs/${id}`,
        {
            method: "PATCH",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jobPatchData)
        })
        .then(resp => resp.json())
        .then(data => handleJobPatch(data))

        setIsEdit((isEdit) => isEdit = !isEdit)
    }

    const [newDateApplied, setNewDateApplied] = useState(dateApplied)
    function handleId(e)
    {
        setNewDateApplied(e.target.value)
    }

    const [newCompany, setNewCompany] = useState(company)
    function handleCompany(e)
    {
        setNewCompany(e.target.value)
    }

    const [newApplicationLink, setNewApplicationLink] = useState(applicationLink)
    function handleApplicationLink(e)
    {
        setNewApplicationLink(e.target.value)
    }

    const [newDescription, setNewDescription] = useState(description)
    function handleDescription(e)
    {
        setNewDescription(e.target.value)
    }

    const [newStatus, setNewStatus] = useState(status)
    function handleStatus(e)
    {
        setNewStatus(e.target.value)
        console.log(newStatus)
    }

    function selectJob()
    {
        getJobId(id)
    }

    //opens link in new window
    const openLink = () => 
    {
        window.open(`${applicationLink}`);
    };

    return (
        <tr>
            <td className="idCol">
                <Form.Check
                    inline
                    name="group1"
                    type="radio"
                    id="idRadio"
                    onClick={ selectJob }
                />
            </td>
            <td className="dateCol">
                { isEdit ? <input id="jobDateInput" value={ newDateApplied } onChange={ handleId }/> : dateApplied }
            </td>
            <td className="companyCol">
                { isEdit ? <input id="companyInput" value={ newCompany } onChange={ handleCompany }/> : company }
            </td>
            <td className="descriptionCol">
                { isEdit ? <input id="descriptionInput" value={ newDescription } onChange={ handleDescription }/> : description }
            </td>
            <td className="applicationCol">
                { isEdit ? 
                    <input id="applicationInput" value={ newApplicationLink } onChange={ handleApplicationLink }/> 
                : 
                    <a className="applicationLink" onClick={openLink}>{ applicationLink }</a> 
                }
            </td>
            <td className="statusCol">
                { isEdit ? 
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="statusButton" >
                            { newStatus }
                        </Dropdown.Toggle>
                
                        <Dropdown.Menu>
                            <Dropdown.Item as="button" value="Pending" onClick={ handleStatus }>Pending</Dropdown.Item>
                            <Dropdown.Item as="button" value="Offer" onClick={ handleStatus }>Offer</Dropdown.Item>
                            <Dropdown.Item as="button" value="Rejected" onClick={ handleStatus }>Rejected</Dropdown.Item>
                            <Dropdown.Item as="button" value="Ghosted" onClick={ handleStatus }>Ghosted</Dropdown.Item>
                        </Dropdown.Menu>
                  </Dropdown>
                : status }
            </td>
            <td>
                { isEdit ? 
                    <div>
                        <Button variant="secondary" id="jobActionButtonSmall" onClick={ handleSubmit }>Submit</Button>
                        <Button variant="secondary" id="jobActionButtonSmall" value={ id } onClick={ handleEdit }>Unedit</Button>      
                        <Button variant="secondary" id="jobActionButtonSmall" value={ id } onClick={ handleDelete }>Delete</Button>     
                    </div> :
                    <div>
                        <Button variant="secondary" id="jobActionButton" value={ id } onClick={ handleEdit }>Edit</Button> 
                        <Button variant="secondary" id="jobActionButton" value={ id } onClick={ handleDelete }>Delete</Button>
                    </div>
                }
            </td>
        </tr>
    )
}

export default JobItem