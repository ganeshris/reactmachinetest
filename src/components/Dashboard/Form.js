import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function DynamicForm() {
  const [components, setComponents] = useState([
    {
      id: uuidv4(),
      label: "",
      type: "",
      mapping: "",
      readonly: false,
      values: "",
    },
  ]);
  const [formDetails, setFormDetails] = useState({
    formName: "",
    formDescription: "",
    relatedTo: "",
    pageEvent: "",
    buttonName: "",
  });
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleComponentChange = (index, field, value) => {
    const updatedComponents = components.map((component, i) =>
      i === index ? { ...component, [field]: value } : component
    );
    setComponents(updatedComponents);
  };

  const addComponent = () => {
    setComponents([
      ...components,
      {
        id: uuidv4(),
        label: "",
        type: "",
        mapping: "",
        readonly: false,
        values: "",
      },
    ]);
  };

  const removeComponent = (index) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { ...formDetails, components };
    navigate("/Dynamictable", { state: { formData } }); // Navigate to DynamicTable with formData
  };

  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-white bg-gray-400 mb-8 p-3">
        Dynamic Form Setup
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700">Form Name</label>
            <input
              type="text"
              name="formName"
              value={formDetails.formName}
              onChange={handleFormChange}
              className="mt-1 p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Form Description</label>
            <input
              type="text"
              name="formDescription"
              value={formDetails.formDescription}
              onChange={handleFormChange}
              className="mt-1 p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Related To</label>
            <select
              name="relatedTo"
              value={formDetails.relatedTo}
              onChange={handleFormChange}
              className="mt-1 p-2 border rounded"
            >
              <option value="">
                <em>None</em>
              </option>
              <option value="Menu">Menu</option>
              <option value="Related to">Related to</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700">Page Event</label>
            <select
              name="pageEvent"
              value={formDetails.pageEvent}
              onChange={handleFormChange}
              className="mt-1 p-2 border rounded"
            >
              <option value="Onclick">Onclick</option>
              <option value="Onblur">Onblur</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Button Name</label>
            <input
              type="text"
              name="buttonName"
              value={formDetails.buttonName}
              onChange={handleFormChange}
              className="mt-1 p-2 border rounded"
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mt-8">
          Component Details
        </h2>
        {components.map((component, index) => (
          <div
            key={component.id}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mt-4"
          >
            <input
              type="text"
              placeholder="Label"
              value={component.label}
              onChange={(e) =>
                handleComponentChange(index, "label", e.target.value)
              }
              className="p-2 border rounded col-span-1"
            />
            <select
              value={component.type}
              onChange={(e) =>
                handleComponentChange(index, "type", e.target.value)
              }
              className="p-2 border rounded col-span-1"
            >
              <option value="">
                <em>None</em>
              </option>
              <option value="textfield">TextField</option>
              <option value="checkbox">Checkbox</option>
              <option value="select">Select</option>
            </select>
            <input
              type="text"
              placeholder="Mapping"
              value={component.mapping}
              onChange={(e) =>
                handleComponentChange(index, "mapping", e.target.value)
              }
              className="p-2 border rounded col-span-1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={component.readonly}
                onChange={(e) =>
                  handleComponentChange(index, "readonly", e.target.checked)
                }
                className="mr-2"
              />
              <label>Readonly</label>
            </div>
            <input
              type="text"
              placeholder="Enter Values"
              value={component.values}
              onChange={(e) =>
                handleComponentChange(index, "values", e.target.value)
              }
              className="p-2 border rounded col-span-1"
            />
            <button
              type="button"
              onClick={() => removeComponent(index)}
              className="text-red-500 hover:text-red-700"
            >
              {/* <DeleteIcon /> */}
            </button>
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={addComponent}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Component
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DynamicForm;
