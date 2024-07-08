import React, { useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setPreviewUrl(URL.createObjectURL(e.target.files[0])); // Create preview URL for the selected file
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    const email = localStorage.getItem('userEmail'); // Retrieve the email from local storage
    formData.append('email', email); // Include the email in the form data

    axios.post('http://localhost:3001/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      setUploadSuccess(response.data);
      setSelectedFile(null);
      setPreviewUrl('');
    })
    .catch(error => {
      console.error('There was an error uploading the file!', error);
    });
  };

  return (
    <div className='dashboard-container'>
      <div className="preview-container">
        {previewUrl ? (
          selectedFile.type.startsWith('image') ? (
            <Zoom>
              <img src={previewUrl} alt="Preview" className="preview-image" />
            </Zoom>
          ) : selectedFile.type.startsWith('video') ? (
            <video controls className="preview-video">
              <source src={previewUrl} type={selectedFile.type} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>No preview available for this file type.</p>
          )
        ) : (
          <div className="no-preview">No file preview</div>
        )}
      </div>

      <div className='wrapper'>
        <form onSubmit={handleFileUpload}>
          <label className="choose-file">
            Choose File
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit">Upload File</button>
        </form>
        {uploadSuccess && <p>{uploadSuccess}</p>}
      </div>
    </div>
  );
}

export default Dashboard;
