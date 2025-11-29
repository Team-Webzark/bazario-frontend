// config/userRoles.js

// Predefined user roles and their associated emails
// These emails will automatically route to their respective dashboards

export const PREDEFINED_USERS = {
  admin: [
    'admin@bazario.com',
    'admin1@bazario.com',
    'administrator@bazario.com',
  ],
  delivery: [
    'delivery@bazario.com',
    'delivery1@bazario.com',
    'driver@bazario.com',
    'deliverypartner@bazario.com',
  ],
  // Development-only predefined customers (skip registration)
  customer: [
    'customer@bazario.com',
    'testcustomer@bazario.com',
    'user@bazario.com',
  ],
};

/**
 * Detect user role based on email
 * @param {string} email - User's email address
 * @returns {string} - 'admin', 'delivery', 'customer', or 'new_customer'
 */
export function detectUserRole(email) {
  if (!email) return 'new_customer';
  
  const normalizedEmail = email.toLowerCase().trim();
  
  if (PREDEFINED_USERS.admin.includes(normalizedEmail)) {
    return 'admin';
  }
  
  if (PREDEFINED_USERS.delivery.includes(normalizedEmail)) {
    return 'delivery';
  }
  
  // Check if predefined customer (for development/testing - skip registration)
  if (PREDEFINED_USERS.customer.includes(normalizedEmail)) {
    return 'customer';
  }
  
  // New/unknown users need registration
  return 'new_customer';
}

/**
 * Check if email is a predefined user (admin, delivery, or test customer)
 * @param {string} email - User's email address
 * @returns {boolean}
 */
export function isPredefinedUser(email) {
  const role = detectUserRole(email);
  return role === 'admin' || role === 'delivery' || role === 'customer';
}

/**
 * Check if user needs registration
 * @param {string} email - User's email address
 * @returns {boolean}
 */
export function needsRegistration(email) {
  return detectUserRole(email) === 'new_customer';
}
