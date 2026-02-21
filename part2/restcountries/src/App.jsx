import {useEffect, useState} from "react";
import axios from "axios";
import CountriesList from "./components/CountriesList.jsx";
import CountryInfo from "./components/CountryInfo.jsx";

const App = () => {

    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null)

    const apiUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

    useEffect(() => {
        const getAllCountries = async () => {
            const res = await axios.get(`${apiUrl}all`);
            if (res.status !== 200) {
                console.error(`Error fetching countries ${res.status}`);
            }

            setCountries(res.data);
        };

        getAllCountries();
    }, []);

    const handleSearchTermInput = (e) => {
        setSearchTerm(e.target.value);
        if(selectedCountry) {
            setSelectedCountry(null);
        }
    }

    const handleShowCountryInfo = (countryCode) => {
        setSelectedCountry(countries.find((country) => country.cca3 === countryCode));
    }

    const countriesToShow = searchTerm
        ? countries.filter(country => country.name.official.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

    return (
        <>
            <div>
                find countries <input onInput={handleSearchTermInput}/>
            </div>
            {selectedCountry ? (
                <CountryInfo country={selectedCountry} />
            ) : (
                <CountriesList countries={countriesToShow} onShowCountryInfoClick={handleShowCountryInfo}/>
            )}
        </>
    )
};

export default App;