import AutocompleteField from './AutocompleteField'

import { useState, useEffect } from 'react';

function App() {

  // Parent Component
  const [countries, setCountries] = useState<Array<string>>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch sorted data
      await new Promise(resolve => setTimeout(resolve, 1000))

      // https://gist.github.com/keeguon/2310008
      setCountries(["Saint Helena", "Saint Kitts and Nevis",
        "Saint Lucia", "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines", "Samoa", "San Marino",
        "Sao Tome and Principe", "Saudi Arabia", "Senegal",
        "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore",
        "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
        "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka",
        "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden",
        "Switzerland", "Syrian Arab Republic"]); 

      setCountriesLoading(false);
    }

    fetchData();
  }, []);

  return <AutocompleteField 
    name="country"
    verbose="Country starting with 'S'"
    isLoading={countriesLoading}
    suggestionsFlat={countries}
  />
    
}

export default App
