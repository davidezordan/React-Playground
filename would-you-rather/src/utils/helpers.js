const formatDate = (timestamp) => {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return `${time.substr(0, 5) + time.slice(-2)} | ${d.toLocaleDateString()}`;
};

const getActionDelay = () => 1000;

export { formatDate as default, getActionDelay };
