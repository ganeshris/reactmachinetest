import React, { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    test2: { name: '', description: '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTest2Change = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      test2: {
        ...formData.test2,
        [name]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // we can send this data to our server
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <hr />
      <h2>Test 2</h2>
      <div>
        <label htmlFor="test2Name">Name:</label>
        <input
          type="text"
          id="test2Name"
          name="name"
          value={formData.test2.name}
          onChange={handleTest2Change}
        />
      </div>
      <div>
        <label htmlFor="test2Description">Description:</label>
        <input
          type="text"
          id="test2Description"
          name="description"
          value={formData.test2.description}
          onChange={handleTest2Change}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
