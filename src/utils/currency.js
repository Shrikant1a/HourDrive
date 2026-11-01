// Currency and Indian localization formatting utility

export const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
};

export const formatLakhsCrores = (amount) => {
  if (amount >= 10000000) {
    return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
  }
  if (amount >= 100000) {
    return '₹' + (amount / 100000).toFixed(2) + ' Lakh';
  }
  return formatINR(amount);
};
