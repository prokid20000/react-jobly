import { useEffect, useState, useContext } from "react";
import JoblyApi from "./api";
import Company from "./Company"
import SearchBar from "./SearchBar";
import "./Companies.css"
import UserContext from "./userContext";

/** Companies, list of companies with search bar
 * 
 * State:
 * - companies: array of companies
 * 
 * Routes -> Companies -> {SearchBar, Company}
 */

function Companies() {
  const [companies, setCompanies] = useState(null);
  const { user } = useContext(UserContext);

  // Get companies based on searching word user typed in
  async function fetchCompanies(formData) {
    const searchTerm = formData?.search;
    const newCompanies = await JoblyApi.getCompanies(searchTerm);
    setCompanies(newCompanies);
  }


  useEffect(function fetchCompaniesWhenMounted() {
    if (user) fetchCompanies();
  }, [user]);

  if (companies === null) {
    return <p className="Companies">Loading...</p>
  }

  return (
    <div className="Companies">
      <SearchBar performSearch={fetchCompanies} />
      <ul>
        {companies.length === 0 && <h2>Sorry... No companies found</h2>}
        {companies.map(company => {
          return <li key={company.handle}><Company company={company} /></li>
        })}
      </ul>

    </div>
  );
}

export default Companies;