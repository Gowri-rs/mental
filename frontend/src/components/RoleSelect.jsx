import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
} from '@mui/material';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ROLES = [
  {
    id: 'user',
    title: 'I Need Support',
    subtitle: 'User',
    icon: <PersonOutlineIcon />,
    color: '#4A7C6F',
    description: 'Take wellness assessments and connect with support.',
  },
  {
    id: 'volunteer',
    title: 'I Want to Help',
    subtitle: 'Volunteer',
    icon: <VolunteerActivismOutlinedIcon />,
    color: '#5B85A8',
    description: 'Offer peer support to people in need.',
  },
  {
    id: 'therapist',
    title: 'I’m a Professional',
    subtitle: 'Therapist',
    icon: <MedicalServicesOutlinedIcon />,
    color: '#C9847A',
    description: 'Join as a licensed mental health professional.',
  },
  {
    id: 'admin',
    title: 'Platform Admin',
    subtitle: 'Admin',
    icon: <AdminPanelSettingsOutlinedIcon />,
    color: '#6B4E9E',
    description: 'Manage platform activities.',
  },
];

const RoleSelect = () => {
  const [selected, setSelected] = useState('');
  const [action, setAction] = useState('');
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!selected || !action) return;

    if (action === 'login') navigate(`/login`);
    else if (action === 'register') navigate(`/register?role=${selected}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eef5f3 0%, #f7fbfa 50%, #dfeee9 100%)',
      }}
    >
      <Navbar />

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" textAlign="center" mb={4} fontWeight="bold">
          Select Your Role
        </Typography>

        <Grid container spacing={3}>
          {ROLES.map((role) => (
            <Grid item xs={12} sm={6} md={3} key={role.id}>
              <Card
                onClick={() => {
                  setSelected(role.id);
                  setAction('');
                }}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 4,
                  boxShadow:
                    selected === role.id
                      ? `0 8px 24px rgba(0,0,0,0.12)`
                      : '0 4px 12px rgba(0,0,0,0.06)',
                  border: selected === role.id ? `2px solid ${role.color}` : '1px solid #ddd',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{ bgcolor: role.color, mx: 'auto', mb: 2, width: 56, height: 56 }}
                  >
                    {role.icon}
                  </Avatar>

                  <Chip
                    label={role.subtitle}
                    size="small"
                    sx={{
                      mb: 1,
                      bgcolor: role.color + '33',
                      color: role.color,
                      fontWeight: 700,
                    }}
                  />

                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {role.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {role.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selected && (
          <Box textAlign="center" mt={5}>
            {/* Register button only for non-admin */}
            {selected !== 'admin' && (
              <Button
                variant={action === 'register' ? 'contained' : 'outlined'}
                onClick={() => setAction('register')}
                sx={{
                  mr: 2,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 700,
                  py: 1.2,
                  px: 4,
                  bgcolor: action === 'register' ? ROLES.find(r => r.id===selected).color : 'transparent',
                  color: action === 'register' ? '#fff' : ROLES.find(r => r.id===selected).color,
                  '&:hover': {
                    bgcolor: action === 'register' ? ROLES.find(r => r.id===selected).color : '#f0f0f0',
                  },
                }}
              >
                Register
              </Button>
            )}

            <Button
              variant={action === 'login' ? 'contained' : 'outlined'}
              onClick={() => setAction('login')}
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 700,
                py: 1.2,
                px: 4,
                bgcolor: action === 'login' ? ROLES.find(r => r.id===selected).color : 'transparent',
                color: action === 'login' ? '#fff' : ROLES.find(r => r.id===selected).color,
                '&:hover': {
                  bgcolor: action === 'login' ? ROLES.find(r => r.id===selected).color : '#f0f0f0',
                },
              }}
            >
              Login
            </Button>

            {action && (
              <Box mt={4}>
                <Button
                  variant="contained"
                  onClick={handleProceed}
                  sx={{
                    py: 1.4,
                    px: 5,
                    borderRadius: 3,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    bgcolor: ROLES.find(r => r.id===selected).color,
                    '&:hover': {
                      bgcolor: ROLES.find(r => r.id===selected).color,
                    },
                  }}
                >
                  Continue
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default RoleSelect;