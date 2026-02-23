// ============================================
// API Client for ViBe Workers
// ============================================

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const CORE_URL = import.meta.env.VITE_CORE_URL || 'http://localhost:3002';
const PAYMENT_URL = import.meta.env.VITE_PAYMENT_URL || 'http://localhost:3003';
const CHAT_URL = import.meta.env.VITE_CHAT_URL || 'http://localhost:3004';
const NOTIFICATION_URL = import.meta.env.VITE_NOTIFICATION_URL || 'http://localhost:3005';
const FILE_URL = import.meta.env.VITE_FILE_URL || 'http://localhost:3006';
const SEARCH_URL = import.meta.env.VITE_SEARCH_URL || 'http://localhost:3007';

let accessToken: string | null = localStorage.getItem('accessToken');

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem('accessToken', token);
  } else {
    localStorage.removeItem('accessToken');
  }
}

export function getAccessToken(): string | null {
  return accessToken;
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  // Handle token refresh on 401
  if (response.status === 401 && accessToken) {
    const refreshed = await refreshToken();
    if (refreshed) {
      headers['Authorization'] = `Bearer ${accessToken}`;
      const retryResponse = await fetch(url, { ...options, headers, credentials: 'include' });
      if (!retryResponse.ok) {
        const error = await retryResponse.json().catch(() => ({ error: 'Ошибка запроса' }));
        throw new ApiError(error.error || 'Ошибка запроса', retryResponse.status);
      }
      return retryResponse.json();
    }
    // Refresh failed, clear auth
    setAccessToken(null);
    window.location.href = '/auth';
    throw new ApiError('Сессия истекла', 401);
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Ошибка запроса' }));
    throw new ApiError(error.error || 'Ошибка запроса', response.status, error.errors);
  }

  return response.json();
}

async function refreshToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.data.tokens.accessToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

// ============================================
// Auth API
// ============================================

export const authApi = {
  register: (data: { email: string; password: string; username: string; role: string; displayName?: string }) =>
    request<any>(`${API_URL}/api/v1/auth/register`, { method: 'POST', body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    request<any>(`${API_URL}/api/v1/auth/login`, { method: 'POST', body: JSON.stringify(data) }),

  logout: () =>
    request<any>(`${API_URL}/api/v1/auth/logout`, { method: 'POST' }),

  me: () =>
    request<any>(`${API_URL}/api/v1/auth/me`),

  forgotPassword: (email: string) =>
    request<any>(`${API_URL}/api/v1/auth/forgot-password`, { method: 'POST', body: JSON.stringify({ email }) }),
};

// ============================================
// Users API
// ============================================

export const usersApi = {
  getMe: () => request<any>(`${CORE_URL}/api/v1/users/me`),

  updateMe: (data: any) =>
    request<any>(`${CORE_URL}/api/v1/users/me`, { method: 'PATCH', body: JSON.stringify(data) }),

  getProfile: (username: string) =>
    request<any>(`${CORE_URL}/api/v1/users/${username}`),

  getUserGigs: (userId: string, page = 1) =>
    request<any>(`${CORE_URL}/api/v1/users/${userId}/gigs?page=${page}`),

  getUserReviews: (userId: string, page = 1) =>
    request<any>(`${CORE_URL}/api/v1/users/${userId}/reviews?page=${page}`),

  follow: (userId: string) =>
    request<any>(`${CORE_URL}/api/v1/users/${userId}/follow`, { method: 'POST' }),

  unfollow: (userId: string) =>
    request<any>(`${CORE_URL}/api/v1/users/${userId}/follow`, { method: 'DELETE' }),
};

// ============================================
// Categories API
// ============================================

export const categoriesApi = {
  getTree: () => request<any>(`${CORE_URL}/api/v1/categories`),

  getBySlug: (slug: string) =>
    request<any>(`${CORE_URL}/api/v1/categories/${slug}`),

  getGigs: (slug: string, params?: Record<string, any>) => {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query.set(key, String(value));
        }
      });
    }
    return request<any>(`${CORE_URL}/api/v1/categories/${slug}/gigs?${query}`);
  },
};

// ============================================
// Gigs API
// ============================================

export const gigsApi = {
  list: (params?: Record<string, any>) => {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query.set(key, String(value));
        }
      });
    }
    return request<any>(`${CORE_URL}/api/v1/gigs?${query}`);
  },

  getById: (gigId: string) =>
    request<any>(`${CORE_URL}/api/v1/gigs/${gigId}`),

  getFeatured: () =>
    request<any>(`${CORE_URL}/api/v1/gigs/featured`),

  create: (data: any) =>
    request<any>(`${CORE_URL}/api/v1/gigs`, { method: 'POST', body: JSON.stringify(data) }),

  update: (gigId: string, data: any) =>
    request<any>(`${CORE_URL}/api/v1/gigs/${gigId}`, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (gigId: string) =>
    request<any>(`${CORE_URL}/api/v1/gigs/${gigId}`, { method: 'DELETE' }),

  toggleFavorite: (gigId: string) =>
    request<any>(`${CORE_URL}/api/v1/gigs/${gigId}/favorite`, { method: 'POST' }),

  getFavorites: (page = 1) =>
    request<any>(`${CORE_URL}/api/v1/gigs/favorites?page=${page}`),
};

// ============================================
// Orders API
// ============================================

export const ordersApi = {
  list: (params?: Record<string, any>) => {
    const query = new URLSearchParams();
    if (params) Object.entries(params).forEach(([k, v]) => v != null && query.set(k, String(v)));
    return request<any>(`${CORE_URL}/api/v1/orders?${query}`);
  },

  getById: (orderId: string) =>
    request<any>(`${CORE_URL}/api/v1/orders/${orderId}`),

  create: (data: { gigId: string; packageType: string; requirements?: string }) =>
    request<any>(`${CORE_URL}/api/v1/orders`, { method: 'POST', body: JSON.stringify(data) }),

  deliver: (orderId: string, data: { message?: string; files?: any }) =>
    request<any>(`${CORE_URL}/api/v1/orders/${orderId}/deliver`, { method: 'PATCH', body: JSON.stringify(data) }),

  complete: (orderId: string) =>
    request<any>(`${CORE_URL}/api/v1/orders/${orderId}/complete`, { method: 'PATCH' }),

  cancel: (orderId: string, reason?: string) =>
    request<any>(`${CORE_URL}/api/v1/orders/${orderId}/cancel`, { method: 'PATCH', body: JSON.stringify({ reason }) }),

  requestRevision: (orderId: string, message?: string) =>
    request<any>(`${CORE_URL}/api/v1/orders/${orderId}/revision`, { method: 'POST', body: JSON.stringify({ message }) }),
};

// ============================================
// Reviews API
// ============================================

export const reviewsApi = {
  create: (data: any) =>
    request<any>(`${CORE_URL}/api/v1/reviews`, { method: 'POST', body: JSON.stringify(data) }),

  getGigReviews: (gigId: string, page = 1) =>
    request<any>(`${CORE_URL}/api/v1/reviews/${gigId}?page=${page}`),
};

// ============================================
// Payments API
// ============================================

export const paymentsApi = {
  checkout: (orderId: string) =>
    request<any>(`${PAYMENT_URL}/api/v1/payments/checkout`, { method: 'POST', body: JSON.stringify({ orderId }) }),

  getTransactions: (page = 1) =>
    request<any>(`${PAYMENT_URL}/api/v1/payments/transactions?page=${page}`),

  getBalance: () =>
    request<any>(`${PAYMENT_URL}/api/v1/payments/balance`),

  requestWithdrawal: (data: { amount: number; method: string; accountDetails: any }) =>
    request<any>(`${PAYMENT_URL}/api/v1/payments/withdrawal`, { method: 'POST', body: JSON.stringify(data) }),
};

// ============================================
// Chat API
// ============================================

export const chatApi = {
  getConversations: () =>
    request<any>(`${CHAT_URL}/api/v1/messages/conversations`),

  getMessages: (conversationId: string, page = 1) =>
    request<any>(`${CHAT_URL}/api/v1/messages/conversations/${conversationId}?page=${page}`),

  sendMessage: (conversationId: string, data: { content: string; type?: string }) =>
    request<any>(`${CHAT_URL}/api/v1/messages/conversations/${conversationId}`, { method: 'POST', body: JSON.stringify(data) }),

  markAsRead: (conversationId: string) =>
    request<any>(`${CHAT_URL}/api/v1/messages/conversations/${conversationId}/read`, { method: 'PATCH' }),

  createConversation: (participantId: string, orderId?: string) =>
    request<any>(`${CHAT_URL}/api/v1/messages/conversations`, { method: 'POST', body: JSON.stringify({ participantId, orderId }) }),
};

// ============================================
// Notifications API
// ============================================

export const notificationsApi = {
  list: (page = 1) =>
    request<any>(`${NOTIFICATION_URL}/api/v1/notifications?page=${page}`),

  getUnreadCount: () =>
    request<any>(`${NOTIFICATION_URL}/api/v1/notifications/unread-count`),

  markAsRead: (id: string) =>
    request<any>(`${NOTIFICATION_URL}/api/v1/notifications/${id}/read`, { method: 'PATCH' }),

  markAllAsRead: () =>
    request<any>(`${NOTIFICATION_URL}/api/v1/notifications/read-all`, { method: 'PATCH' }),
};

// ============================================
// Files API
// ============================================

export const filesApi = {
  upload: async (file: File, folder = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const headers: Record<string, string> = {};
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

    const response = await fetch(`${FILE_URL}/api/v1/files/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) throw new ApiError('Ошибка загрузки файла', response.status);
    return response.json();
  },
};

// ============================================
// Search API
// ============================================

export const searchApi = {
  search: (query: string, params?: Record<string, any>) => {
    const searchParams = new URLSearchParams({ q: query });
    if (params) Object.entries(params).forEach(([k, v]) => v != null && searchParams.set(k, String(v)));
    return request<any>(`${SEARCH_URL}/api/v1/search/gigs?${searchParams}`);
  },

  suggest: (query: string) =>
    request<any>(`${SEARCH_URL}/api/v1/search/suggest?q=${encodeURIComponent(query)}`),
};

// ============================================
// Portfolio API
// ============================================

export const portfolioApi = {
  getByUser: (userId: string) =>
    request<any>(`${CORE_URL}/api/v1/portfolio/${userId}`),

  create: (data: any) =>
    request<any>(`${CORE_URL}/api/v1/portfolio`, { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: any) =>
    request<any>(`${CORE_URL}/api/v1/portfolio/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (id: string) =>
    request<any>(`${CORE_URL}/api/v1/portfolio/${id}`, { method: 'DELETE' }),
};
