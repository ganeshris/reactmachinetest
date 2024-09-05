import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    test: [
      { t1: '', t2: '' } // Initial test2
    ]
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setFormData({ ...formData, [name]: value });
    } else {
      const updatedTests = [...formData.test];
      updatedTests[index][name] = value;
      setFormData({ ...formData, test: updatedTests });
    }
  };

  const handleAddTest = () => {
    setFormData({
      ...formData,
      test: [...formData.test, { t1: '', t2: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <hr />
        <h2>Test 2</h2>
        {formData.test.map((test, index) => (
          <div key={index}>
            <div className="form-group">
              <label htmlFor={`t1-${index}`}>Name:</label>
              <input type="text" id={`t1-${index}`} name={`t1-${index}`} value={test.t1} onChange={(e) => handleChange(e, index)} required />
            </div>
            <div className="form-group">
              <label htmlFor={`t2-${index}`}>Description:</label>
              <input type="text" id={`t2-${index}`} name={`t2-${index}`} value={test.t2} onChange={(e) => handleChange(e, index)} required />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddTest}>Add Test</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
