import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, LineElement} from 'chart.js'
import "bootstrap/dist/css/bootstrap.min.css";
Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, BarElement, LineElement);

function SearchForm() {
  // const [author, setAuthor] = useState('');
  // const [year, setYear] = useState('');
  // const [domain, setDomain] = useState('');
  // const [publicationType, setPublicationType] = useState('');
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState({});
  const [domainData, setDomainData] = useState([]);
  const [yearlyPublicationData, setYearlyPublicationData] = useState([]);
  const [publicationTrendData, setPublicationTrendData] = useState([]);

  useEffect(() => {
    const fetchDomainData = async () => {
      try {
        const response = await axios.get('/api/domain-distribution');
        console.log(response.status)
        setDomainData(response.data);
        console.log(domainData)
      } catch (error) {
        console.error('Error fetching domain distribution data:', error);
      }
    };

    const fetchYearlyPublicationData = async () => {
      try {
        const response = await axios.get('/api/yearly-publication-count');
        console.log(response.status)
        setYearlyPublicationData(response.data);
        console.log(domainData)
      } catch (error) {
        console.error('Error fetching yearly publication count data:', error);
      }
    };

    const fetchPublicationTrendData = async () => {
      try {
        const response = await axios.get('/api/publication-trend');
        console.log(response.status)
        setPublicationTrendData(response.data);
        console.log(domainData)
      } catch (error) {
        console.error('Error fetching publication trend data data:', error);
      }
    };

    fetchDomainData();
    fetchPublicationTrendData();
    fetchYearlyPublicationData();
  }, [filter]);

  const domainChartOptions = {
    responsive: true,
    // maintainAspectRatio: false,
    cutoutPercentage: 50,
    // circumference: 1.5 * Math.PI,
    rotation: -0.5 * Math.PI,
    legend: {
      display: true,
      position: 'right',
      // labels: {
      //   generateLabels: function (chart) {
      //     const data = chart.data;
      //     if (data.labels.length && data.datasets.length) {
      //       return data.labels.map((label, i) => {
      //         const dataset = data.datasets[0];
      //         const value = dataset.data[i];
      //         const color = dataset.backgroundColor[i];
      //         return {
      //           text: `${label}: ${value}`,
      //           fillStyle: color,
      //           strokeStyle: color,
      //           hidden: false,
      //           lineWidth: 2,
      //           textColor: '#fff'
      //         };
      //       });
      //     }
      //     return [];
      //   },
      // },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[0];
          const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = Math.floor((currentValue / total) * 100 + 0.5);
          return `${data.labels[tooltipItem.index]}: ${currentValue} (${percentage}%)`;
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'blue', // Legend text color
        },
      },
    },
  };

  const yearlyPublicationChartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          color: 'blue',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
      },
      y: {
        title: {
          display: true,
          text: 'Publication Count',
          color: 'blue',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
      },
    },
    elements: {
      bar: {
        tension: 0.2,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth:1,
      }
    },
    plugins: {
      legend:{
        display: false,
      },
    },
    responsive: true,
    // legend: {
    //   display: true,
    //   position: 'right',},
  };

  const publicationTrendChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          color: 'blue',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
      },
      y: {
        title: {
          display: true,
          text: 'Publication Count',
          color: 'blue',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
      },
    },
    elements: {
      point: {
        radius: 5,
        borderWidth: 3,
        hoverRadius: 7,
        hoverborderWidth: 3,
      },
      line: {
        tension: 0.2,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    },
    // legend: {
    //   display: true,
    //   position: 'bottom',}
  };

  const randomColors = Array.from({ length: domainData.length }, () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`);

  const labels = domainData.map((item) => item.domain);
  const counts = domainData.map((item) => item.count);

  const domainChartData = {
    labels: labels,
    datasets: [{
      data: counts,
      backgroundColor: randomColors,
      hoverBackgroundColor: randomColors.map(color => `${color}AA`),
    },
    ],
  };

  const handleSearch = async () => {
    // e.preventDefault();
    console.log(filter)
    try {
      const response = await axios.get('/api/research', {
        params: filter
      });
      console.log(response.status)
      setResults(response.data);
      console.log(results)
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div  style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div className='p-5' style={{ display: 'flex', flexDirection: 'column' }}>
        <form onSubmit={handleSearch}>
          <div className="row mb-3">
            <label htmlFor="author" className="col-sm-2 col-form-label">Author :</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="author" onChange={(e) => setFilter({ ...filter, author: e.target.value })} />
              {/* <input type="text" className="form-control" id="author" value={author} onChange={(e) => setFilter({ ...filter, author: e.target.value })} /> */}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="domain" className="col-sm-2 col-form-label">Domain :</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="domain" onChange={(e) => setFilter({ ...filter, domain: e.target.value })} />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="year" className="col-sm-2 col-form-label">Year :</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="year" onChange={(e) => setFilter({ ...filter, year: e.target.value })} />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="publication_type" className="col-sm-2 col-form-label">Publication Type :</label>
            <div className="col-sm-10">
              <select className="form-control" id="publication_type" onChange={(e) => setFilter({ ...filter, publication_type: e.target.value })} >
                <option value="">All</option>
                <option value="Journal">Journal</option>
                <option value="Conference">Conference</option>
                <option value="Book">Book</option>
              </select>
            </div>
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
        </form>
      
        {/* Display search results */}
        {/* <div className='p-5'> */}
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Author</th>
              <th>Publication</th>
              <th>Domain</th>
              <th>Title</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(results) && results.length > 0 ? (
              results.map((result) => (
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.author}</td>
                  <td>{result.publication_type}</td>
                  <td>{result.domain}</td>
                  <td>{result.title}</td>
                  <td>{result.year}</td>
                </tr>
              ))
            ) : (<tr>
              <td colSpan="5">No Data Found</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <h2>Domian Distribution</h2>
            <Doughnut data={domainChartData} options={domainChartOptions} />
          </div>
          <div>
            <h2>Year-wise Publication Count</h2>
            <Bar data={{ labels: yearlyPublicationData.map((item) => item.year),
            datasets: [{data: yearlyPublicationData.map((item) => item.count) }] }} 
            options={yearlyPublicationChartOptions} />
          </div>
          <div>
            <h2>Domian Distribution</h2>
            <Line data={{ labels: publicationTrendData.map((item) => item.year),
            datasets: [{data: publicationTrendData.map((item) => item.count) }] }} 
            options={publicationTrendChartOptions} />
          </div>
        </div>
    </div>
  );
}

export default SearchForm;
