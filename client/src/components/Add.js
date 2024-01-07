import React, { useState } from 'react';

function AddNew() {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [domain, setDomain] = useState('');
    const [publicationType, setPublicationType] = useState('');

    const handleAdd = async () => {
        console.log(title)
        console.log(author)
        console.log(year)
        console.log(domain)
        console.log(publicationType)
        try {
            const response = await fetch('/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify({
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

    return (
        <div className='p-5'>
            {/* <h1>Add new data here</h1>
            <label htmlFor="title">Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br></br>

            <label htmlFor="domain">Domain:</label>
            <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} /><br></br>

            <label htmlFor="year">Year:</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} /><br></br>

            <label htmlFor="author">Author:</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /><br></br>

            <label htmlFor="publication_type">Publication Type:</label>
            <input type="text" value={publicationType} onChange={(e) => setPublicationType(e.target.value)} /><br></br>

            <button onClick={handleAdd}>Add</button> */}
            <form onSubmit={handleAdd}>
                <div className="row mb-3">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="domain" className="col-sm-2 col-form-label">Domain :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="year" className="col-sm-2 col-form-label">Year :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="author" className="col-sm-2 col-form-label">Author :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="publicationType" className="col-sm-2 col-form-label">Publication Type :</label>
                    <div className="col-sm-10">
                        <select className="form-control" id="publication_type" onChange={(e) => setPublicationType(e.target.value)} >
                            <option value="">Select one</option>
                            <option value="Journal">Journal</option>
                            <option value="Conference">Conference</option>
                            <option value="Book">Book</option>
                        </select>
                        {/* <input type="text" className="form-control" id="publication_type" value={publicationType} onChange={(e) => setPublicationType(e.target.value)}/> */}
                    </div>
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-primary" onClick={handleAdd}>Add</button>
                </div>

            </form>
            <br />
            <a href="/">Back to Search</a>
        </div>
    );
}

export default AddNew;