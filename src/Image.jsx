import React, { useState } from 'react';

const ImageUploadForm = () => {
  const [image, setImage] = useState({});
  
  const handleChange = e => {
    e.persist();
    setImage(e.target.files[0]);
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('image', image);

    fetch('http://localhost:3000/items', {
      method: 'POST',
      body: data,
    });
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Image upload</label>
        <input type="file" name="image" onChange={handleChange} />
    
        <input type="submit" />
      </form>
    </div>
  )
};

export default ImageUploadForm;
