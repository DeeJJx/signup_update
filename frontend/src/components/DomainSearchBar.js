import React, { useState } from "react";


const DomainSearchBar = () => {
    const [domainName, setDomainName] = useState('');
    const [searchResult, setSearchResult] = useState(false);

    const handleInputChange = (e) => {
        setDomainName(e.target.value);
    }



    async function handleSubmit(e) {
        e.preventDefault();

        const sanitizedDomain = domainName.replace(/^(https?:\/\/)?(www\.)?/i, '');

        // const whois = require('whois-json');
        const url = `https://domaination.p.rapidapi.com/domains/${sanitizedDomain}`;
        // const url = domainName;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9951feb9f2msha1a48e515443097p1872dcjsn25903bbc04dc',
                'X-RapidAPI-Host': 'domaination.p.rapidapi.com'
            }
        };

        if(domainName){
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                setSearchResult(result);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="domain-search-bar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a domain name"
                    value={domainName}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>
            {searchResult && <div>{searchResult.domain.isAvailable ? (`Congrats Your domain ${searchResult.domain.name} is available`) : (`Sorry Your domain ${searchResult.domain.name} is already taken`)}</div>}
        </div>
    )
}
export default DomainSearchBar;