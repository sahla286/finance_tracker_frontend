// import { useState } from "react";

// const AddIncome = ({ sources }) => {
//   const [formData, setFormData] = useState({
//     amount: "",
//     description: "",
//     source: "",
//     income_date: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting form data: ", formData);
//     // Add API call or form submission logic here
//   };

//   return (
//     <div className="container mt-4">
//       <nav aria-label="breadcrumb">
//         <ol className="breadcrumb">
//           <li className="breadcrumb-item">
//             <a href="/income">Income</a>
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//             Add Income
//           </li>
//         </ol>
//       </nav>

//       <div className="card">
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Amount</label>
//               <input
//                 type="text"
//                 className="form-control form-control-sm"
//                 name="amount"
//                 value={formData.amount}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Description</label>
//               <input
//                 type="text"
//                 className="form-control form-control-sm"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Sources</label>
//               <select
//                 className="form-control"
//                 name="source"
//                 value={formData.source}
//                 onChange={handleChange}
//               >
//                 <option value="">Select a source</option>
//                 {sources.map((source, index) => (
//                   <option key={index} value={source.name}>
//                     {source.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Date of Income</label>
//               <input
//                 type="date"
//                 className="form-control form-control-sm"
//                 name="income_date"
//                 value={formData.income_date}
//                 onChange={handleChange}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary btn-primary-sm">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddIncome;



import { useState } from "react";

const AddIncome = ({ sources = [] }) => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    source: "",
    income_date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data: ", formData);
    // Add API call or form submission logic here
  };

  return (
    <div className="container mt-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light p-3 rounded">
          <li className="breadcrumb-item">
            <a href="/income">Income</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Income
          </li>
        </ol>
      </nav>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            {/* <div className="card-header bg-primary text-white">
              <h5 className="mb-0 text-center">Add Income</h5>
            </div> */}
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Amount Input */}
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    required
                  />
                </div>

                {/* Description Input */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    rows="2"
                    required
                  />
                </div>

                {/* Sources Dropdown */}
                <div className="mb-3">
                  <label className="form-label">Source</label>
                  <select
                    className="form-select"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a source</option>
                    {sources.length > 0 ? (
                      sources.map((source, index) => (
                        <option key={index} value={source.name}>
                          {source.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No sources available</option>
                    )}
                  </select>
                </div>

                {/* Date Picker */}
                <div className="mb-3">
                  <label className="form-label">Date of Income</label>
                  <input
                    type="date"
                    className="form-control"
                    name="income_date"
                    value={formData.income_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">
                    Submit Income
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Back to Income List Button */}
          {/* <div className="text-center mt-3">
            <a href="/income" className="btn btn-secondary">
              Back to Income List
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddIncome;
