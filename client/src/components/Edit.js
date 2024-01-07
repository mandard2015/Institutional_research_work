import React, { useState } from 'react';

function Edit(){

    const [id, setId] = useState('');
    const[title,setTitle]= useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [domain, setDomain] = useState('');
    const [publicationType, setPublicationType] = useState('');

    const handleEdit = async()=>{
        console.log(id)
        try{
            const response = await fetch('/edit',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body:
                   JSON.stringify({
                    id,
                    title,
                    author,
                    year,
                    domain,
                    publicationType
                  }),
            })
        }
        catch (error) {
            console.error('Error during search:', error);
        }
    }

    return(
        <div className='p-5'>
            {/* <h1>Edit data here</h1>
            <label htmlFor="id">Enter the Id:</label>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} /><br></br>
            <h3>Enter new data below</h3>
            <label htmlFor="title">Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br></br>
            <label htmlFor="author">Author:</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /><br></br>
            <label htmlFor="year">Year:</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} /><br></br>
            <label htmlFor="domain">Domain:</label>
            <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} /><br></br>
            <label htmlFor="publication_type">Publication Type:</label>
            <input type="text" value={publicationType} onChange={(e) => setPublicationType(e.target.value)} /><br></br>

            <button onClick={handleEdit} color='red'>Edit</button> */}

            <form onSubmit={handleEdit}>
                <h3>Enter Id to be edited:</h3>
                <div className="row mb-3">
                    <label htmlFor="id" className="col-sm-2 col-form-label">Id :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="id" placeholder='Enter the Id to edit data' value={id} onChange={(e) => setId(e.target.value)}/>
                    </div>
                </div>
                <h3>Enter new data below:</h3>
                <div className="row mb-3">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="domain" className="col-sm-2 col-form-label">Domain :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="domain" value={domain} onChange={(e) => setDomain(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="year" className="col-sm-2 col-form-label">Year :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="year" value={year} onChange={(e) => setYear(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="author" className="col-sm-2 col-form-label">Author :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="publicationtype" className="col-sm-2 col-form-label">Publication Type :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="publicationtype" value={publicationType} onChange={(e) => setPublicationType(e.target.value)}/>
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary" onClick={handleEdit}>Edit</button>
                </div>
                
            </form>
            <br />
            <a href="/">Back to Search</a>
        </div>
    );
}

export default Edit;