import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [portfolio, setPortfolio] = useState({
    balance: 100000,  // ₹1,00,000
    stocks: {},  // { 'TCS': { qty: 10, avgPrice: 3500, currentPrice: 3600 } }
  });
  const [transactions, setTransactions] = useState(JSON.parse(localStorage.getItem('transactions')) || []);
  const [stocks, setStocks] = useState([
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3560, change: 0.5 },
    { symbol: 'INFY', name: 'Infosys', price: 1523, change: -0.2 },
    // Add more mock stocks
  ]);

  // Simulate price updates every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 10,
        change: (Math.random() - 0.5) * 2,
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Persist data
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [user, transactions]);

  const login = (email, password) => {
    // Mock login
    setUser({ email, name: 'John Doe' });
  };

  const logout = () => {
    setUser(null);
    setPortfolio({ balance: 100000, stocks: {} });
    setTransactions([]);
  };

  const buyStock = (symbol, qty, price) => {
    const cost = qty * price;
    if (portfolio.balance < cost) return alert('Insufficient balance');
    setPortfolio(prev => ({
      ...prev,
      balance: prev.balance - cost,
      stocks: { ...prev.stocks, [symbol]: { qty: (prev.stocks[symbol]?.qty || 0) + qty, avgPrice: price } },
    }));
    setTransactions(prev => [...prev, { date: new Date(), symbol, action: 'Buy', qty, price, balance: portfolio.balance - cost }]);
  };

  const sellStock = (symbol, qty, price) => {
    if (!portfolio.stocks[symbol] || portfolio.stocks[symbol].qty < qty) return alert('Not enough shares');
    const revenue = qty * price;
    setPortfolio(prev => ({
      ...prev,
      balance: prev.balance + revenue,
      stocks: { ...prev.stocks, [symbol]: { ...prev.stocks[symbol], qty: prev.stocks[symbol].qty - qty } },
    }));
    setTransactions(prev => [...prev, { date: new Date(), symbol, action: 'Sell', qty, price, balance: portfolio.balance + revenue }]);
  };

  return (
    <AppContext.Provider value={{ user, portfolio, transactions, stocks, login, logout, buyStock, sellStock }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);