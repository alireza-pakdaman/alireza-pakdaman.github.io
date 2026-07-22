---
title: 'Stock Forecast App'
tagline: 'Time-series forecasting on market data with an interactive front end'
year: '2025'
role: 'Personal project'
stack: ['Python', 'pandas', 'Time-series ML', 'Streamlit']
featured: true
order: 3
repo: 'https://github.com/alireza-pakdaman/stock-forecast-app'
hue: 150
---

An end-to-end forecasting tool: pull historical market data, engineer features,
fit time-series models, and serve predictions through an interactive UI.

## The pipeline

- **Data** — automated retrieval and cleaning of historical price series.
- **Modeling** — classical and ML-based forecasting, evaluated against naive
  baselines (the honest test most forecast demos skip).
- **Interface** — an interactive app where a user picks a ticker and horizon
  and sees the forecast with its uncertainty.

Built as a learning project in applied ML — the emphasis is on a clean
pipeline and honest evaluation, not on beating the market.

<!-- TODO(Alireza): confirm the framework (Streamlit? Flask?), the models used
     (Prophet? LSTM? ARIMA?), and add a screenshot to /src/assets/images. -->
