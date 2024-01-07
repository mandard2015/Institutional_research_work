import React, { useState } from 'react';

function Delete() {

    const [id, setId] = useState('');

    const handleDel = async () => {
        console.log(id)
        console.log(typeof (id))
        try {
            const response = await fetch('/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify({
                        id
                    }),
            })
        }
        catch (error) {
            console.error('Error during search:', error);
        }
    }

    return (
        <div>

            {/* <h1>Delete data here</h1>
            <label htmlFor="id">Id:</label>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} /><br></br>

            <button onClick={handleDel} color='red'>Delete</button> */}

            <div className="row mb-3 p-4">
                <label htmlFor="id" className="col-sm-1 col-form-label">Id :</label>
                <div className="col-sm-2">
                    <input type="text" className="form-control" id="id" placeholder='Enter the Id to delete' value={id} onChange={(e) => setId(e.target.value)} />
                    <div className='pt-2'>
                        <button type="button" className="btn btn-outline-danger" onClick={handleDel}>Delete</button>
                    </div>
                </div>

            </div>
            <br />
            <a href="/">Back to Search</a>
            {/* <div className='ps-5'>
                <button type="submit" className="btn btn-outline-danger" onClick={handleDel}>Delete</button>
            </div> */}
        </div>
    );
}

export default Delete;