/**
 * Format number as currency in millions
 */
export const formatMoney = (value, decimals = 0) => {
  if (value === null || value === undefined) return 'N/A';
  return `$${(value / 1).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}M`;
};

/**
 * Format number as percentage
 */
export const formatPercent = (value, decimals = 1) => {
  if (value === null || value === undefined) return 'N/A';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format number with commas
 */
export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined) return 'N/A';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format number as multiple (e.g., 12.5x)
 */
export const formatMultiple = (value, decimals = 1) => {
  if (value === null || value === undefined || value === 0) return 'N/A';
  return `${value.toFixed(decimals)}x`;
};

/**
 * Format large money values
 */
export const formatLargeMoney = (value, decimals = 1) => {
  if (value === null || value === undefined) return 'N/A';
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(decimals)}B`;
  }
  return formatMoney(value, decimals);
};
