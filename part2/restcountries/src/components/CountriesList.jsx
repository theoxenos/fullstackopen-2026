const CountriesList = (props) => {
    const { countries, onShowCountryInfoClick } = props;

    if (countries.length === 0) {
        return null;
    }



    return (
        <div>
            {countries.map(country => (
                <p key={country.cca3}>
                    {country.name.official}
                    <button onClick={() => onShowCountryInfoClick(country.cca3)}>Show</button>
                </p>
            ))}
        </div>
    )
}

export default CountriesList;