/*import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Chip, Box, Grid,  Avatar } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Expanded dummy news data with categories
const dummyNews = [
  {
    id: 1,
    title: 'TCS Reports Strong Q3 Earnings, Stock Surges',
    summary: 'Tata Consultancy Services (TCS) has reported robust Q3 earnings, beating analyst expectations. The stock jumped 5% in early trading.',
    category: 'Market News',
    sentiment: 'positive',
    date: '2023-10-01',
    time: '10:30 AM',
    icon: <TrendingUpIcon />,
  },
  {
    id: 2,
    title: 'Market Volatility Hits Infosys Shares',
    summary: 'Infosys shares faced volatility due to global economic concerns. Analysts suggest a short-term dip but long-term stability.',
    category: 'Company Updates',
    sentiment: 'negative',
    date: '2023-10-02',
    time: '2:15 PM',
    icon: <BusinessIcon />,
  },
  {
    id: 3,
    title: 'HDFC Bank Announces Dividend Increase',
    summary: 'HDFC Bank has declared a higher dividend for shareholders, boosting investor confidence in the banking sector.',
    category: 'Market News',
    sentiment: 'positive',
    date: '2023-10-03',
    time: '11:45 AM',
    icon: <TrendingUpIcon />,
  },
  {
    id: 4,
    title: 'Reliance Industries Faces Regulatory Scrutiny',
    summary: 'Reliance Industries is under regulatory review for recent acquisitions. No major impact expected on operations.',
    category: 'Company Updates',
    sentiment: 'neutral',
    date: '2023-10-04',
    time: '4:20 PM',
    icon: <BusinessIcon />,
  },
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(dummyNews.map(news => news.category))];
  const filteredNews = selectedCategory === 'All' ? dummyNews : dummyNews.filter(news => news.category === selectedCategory);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'success';
      case 'negative': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <NewspaperIcon sx={{ mr: 2, color: 'primary.main', fontSize: 40 }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Financial News
        </Typography>
      </Box>

      /* Category Filter */
      /*
      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory(category)}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Grid container spacing={3}>
        {filteredNews.map(news => (
          <Grid item xs={12} md={6} key={news.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>{news.icon}</Avatar>
                  <Chip label={news.category} color="primary" size="small" />
                  <Chip
                    label={news.sentiment}
                    color={getSentimentColor(news.sentiment)}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  {news.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  {news.summary}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <AccessTimeIcon sx={{ mr: 0.5, fontSize: 16 }} />
                  <Typography variant="caption">{news.date} at {news.time}</Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                  size="small"
                  sx={{
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'primary.light', color: 'white' },
                  }}
                >
                  Read More
                </Button>
                <Button size="small" color="secondary">
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
  */
