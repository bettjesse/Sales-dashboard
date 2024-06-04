import { useParams } from 'react-router-dom';
import { useGetSchoolByIdQuery } from '../../redux/api/schoolApiSlice';
import { Link } from 'react-router-dom';
function SchoolDetails() {
  const { schoolId } = useParams();
  const { data: schoolData, isLoading, isError } = useGetSchoolByIdQuery(schoolId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching school data</div>;

  const { name, type, product, county, registrationDate, contactInformation, balance } = schoolData.school;
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5">
      <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-2xl mb-4">{name}</h2>
      <div className="mb-4">
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Product:</strong> {product}</p>
        <p><strong>County:</strong> {county}</p>
        <p><strong>Registration Date:</strong> {formatDate(registrationDate)}</p>
        {contactInformation && (
          <>
            <p><strong>Contact:</strong> {contactInformation.phone} / {contactInformation.email}</p>
          </>
        )}
        <p><strong>Balance:</strong> {balance}</p>
      </div>
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-xl mb-2">Invoices</h3>
      {/* Add code to display invoices here */}
      <div className="mt-4">
        <Link to="/schools" className="text-sm text-white bg-slate-400 hover:bg-slate-600 rounded px-4 py-2">Back to Schools</Link>
      </div>
    </div>
  );
}
export default SchoolDetails