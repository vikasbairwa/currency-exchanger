import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import '../App.css'
import Signin from './Signin'
function Home() {
    const [countries, setCountries] = useState({})
    const [base, setBase] = useState('EUR')
    const [targetCountries, setTargetCountries] = useState("")
    const [val, setValue] = useState(1)
    const [exchangeRates, setExchangeRates] = useState({})
    useEffect(() => {
        const fetchdata = async () => {
            const data = await fetch('http://data.fixer.io/api/latest?access_key=1e2dc73f919dabada2f7ad807596c4c0')
            const jsonData = await data.json()
            const rate = jsonData.rates
            setCountries(rate)
        }
        fetchdata()
    }, [])
    // console.log(countries)

    const handleClick = (e) => {
        setBase(e.target.id)
    }
    const handleClickTarget = (e) => {
        setTargetCountries(prevText => targetCountries === "" ? e.target.id : prevText + ',' + e.target.id)
    }
    const onChange = (e) => {
        setValue(e.target.value)
    }
    const onExchange = async (e) => {
        console.log(`http://data.fixer.io/api/latest?access_key=1e2dc73f919dabada2f7ad807596c4c0&symbols=${targetCountries}`)
        const data = await fetch(`http://data.fixer.io/api/latest?access_key=1e2dc73f919dabada2f7ad807596c4c0&symbols=${targetCountries}`)
        const jsonData = await data.json()
        const rate = jsonData.rates
        setExchangeRates(rate)
        console.log(exchangeRates)
    }
    const onClear=()=>{
        setTargetCountries("")
    }



    return (
        <>
            <Header />
            <div className="d-flex justify-content-between mx-5">
                <div className="card mx-5 bg-light" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Select base currency</h5>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown button
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {Object.keys(countries).map((country, index) => {
                                    return <li key={index}><a id={country} className="dropdown-item " onClick={handleClick}>{country}</a></li>
                                })}
                            </ul>
                            <h3 className='mb-2'>Base country: {base}</h3>
                            <h4 className='mb-2'>Set value:</h4>
                            <input type="number" id='value' value={val} onChange={onChange} />
                        </div>
                    </div>
                </div>
                <div className="card mx-5 bg-light" style={{ width: "18rem" }}>
                    <div className="card-body align-items-center">
                        <h5 className="card-title">Select base currency</h5>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown button
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {Object.keys(countries).map((country, index) => {
                                    return <li key={index}><a id={country} className="dropdown-item " onClick={handleClickTarget}>{country}</a></li>
                                })}
                            </ul>
                            <h3>Selected countries:</h3>
                            {/* <div className='fs-3'>{targetCountries}</div> */}
                            <button type="button" disabled={true} className="btn btn-light mb-2">{targetCountries}</button>


                        </div>
                        <span className='d-flex justify-content-between'>

                        <button type='button' className='btn btn-dark' onClick={onExchange}>Exchange</button>
                        <button type='button' className='btn btn-dark' onClick={onClear}>clear</button>
                        </span>
                    </div>
                </div>
            </div>
            <div className="container flex-column align-items-center my-5">
                <h1>Exchange rates</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Country</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exchangeRates && Object.keys(exchangeRates).map((item, index) => {
                            return (
                                <tr>
                                    <th scope="row" key={index}>{index+1}</th>
                                    <td>{item}</td>
                                    <td>{val * exchangeRates[item] / countries[base]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
            {}
            <Signin/>
        </>
    )
}

export default Home