import React, { useState } from "react";


const DomainSearchBar = () => {
    const [domainName, setDomainName] = useState('');

    const handleInputChange = (e) => {
        setDomainName(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // const whois = require('whois-json');

        if(domainName){
            // var results = await whois(domainName);
            // console.log(JSON.stringify(results, null, 2));
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
        </div>
    )
}
export default DomainSearchBar;