const CountryInfo = (props) => {
    const {country} = props;

    if (!country) {
        return null;
    }

    return (
        <div>
            <h2>
                {country.name.official}
            </h2>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([code, language]) => (
                    <li key={code}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png}/>
        </div>
    )
};

export default CountryInfo;