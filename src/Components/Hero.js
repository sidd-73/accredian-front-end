// src/components/HeroSection.js

import React, { useState } from 'react';
import { Button, Container, Typography, Modal, Box, TextField } from '@mui/material';
import axios from 'axios';
import Image from './www.refersnfearn.com.png';

const HeroSection = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: '',
  });
  const [error, setError] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/referrals', formData);
      console.log('Referral submitted:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error submitting referral:', error);
      setError('Failed to submit the referral. Please try again.');
    }
  };

  return (
    <Container maxWidth="false" style={{ height: '100vh', padding: 0, margin: 0, background: `url(${Image}) no-repeat center center fixed`, backgroundSize: 'cover', color: 'white', textAlign: 'center' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          transform: 'translateY(-50%)',
          padding: 2,
          textAlign: 'left',
          width: '100%',
          maxWidth: 600,
          color: 'white',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          <p> Join the Win-Win Experience!</p>
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} >
          Refer Now
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Referral Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Your Name"
              name="referrerName"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.referrerName}
              onChange={handleChange}
            />
            <TextField
              label="Your Email"
              name="referrerEmail"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              required
              value={formData.referrerEmail}
              onChange={handleChange}
            />
            <TextField
              label="Referee Name"
              name="refereeName"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.refereeName}
              onChange={handleChange}
            />
            <TextField
              label="Referee Email"
              name="refereeEmail"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              required
              value={formData.refereeEmail}
              onChange={handleChange}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default HeroSection;
