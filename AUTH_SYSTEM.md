# Authentication System Documentation

## Overview
This document describes the authentication system for the FE-MENO application. It handles user login, token management, and role-based routing.

## Files Created/Modified

### New Files

#### 1. **[src/pages/Login.tsx](src/pages/Login.tsx)**
Main login page component with:
- Email and password input fields
- Form validation
- Loading state during authentication
- Error message display (for failed login attempts)
- Responsive design using shadcn/ui components

#### 2. **[src/services/authService.ts](src/services/authService.ts)**
Core authentication service providing:
- `login(email, password)` - Authenticates user against backend
- `logout()` - Clears all stored auth data
- `getRedirectPath(roles)` - Returns redirect URL based on user roles

**Login Flow:**
```
User submits credentials → POST /auth/login → Backend validates
→ Returns accessToken, userId, email, roles
→ Stores in localStorage → Redirects to role-based page
```

#### 3. **[src/lib/authClient.ts](src/lib/authClient.ts)**
Axios instance configured with:
- Automatic Bearer token injection in all requests
- Request/response interceptors
- Auto-logout on 401 (unauthorized) responses

#### 4. **[src/lib/authHelpers.ts](src/lib/authHelpers.ts)**
Utility functions:
- `getAuthHeader()` - Returns Authorization header with Bearer token
- `getStoredAuth()` - Retrieves all stored auth data
- `clearAuth()` - Clears all auth data
- `isAuthenticated()` - Checks if user is logged in
- `getUserRoles()` - Gets user's roles from localStorage

#### 5. **[src/components/ProtectedRoute.tsx](src/components/ProtectedRoute.tsx)**
Route protection component:
- Redirects unauthenticated users to `/login`
- Optional role-based access control
- Usage: Wrap components that require authentication

### Modified Files

#### **[src/App.tsx](src/App.tsx)**
Updated with:
- New `/login` route (public)
- Protected `/dashboard` route
- Template for protecting `/admin` and `/kitchen` routes

## Data Storage

### localStorage Keys
| Key | Value | Type |
|-----|-------|------|
| `accessToken` | JWT token from backend | string |
| `userId` | User's unique identifier | string (GUID) |
| `email` | User's email address | string |
| `roles` | User's roles (serialized) | JSON string |

## Usage Examples

### Using Protected Routes
```tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRoles={['ADMIN']}>
      <AdminPage />
    </ProtectedRoute>
  }
/>
```

### Getting Auth Header
```tsx
import { getAuthHeader } from '@/lib/authHelpers';

// For manual fetch calls
const response = await fetch(url, {
  headers: getAuthHeader(),
});

// Or use the pre-configured authClient
import authClient from '@/lib/authClient';
authClient.post('/some-endpoint', data);
```

### Checking Authentication
```tsx
import { isAuthenticated, getUserRoles } from '@/lib/authHelpers';

if (isAuthenticated()) {
  const roles = getUserRoles();
  if (roles.includes('ADMIN')) {
    // Show admin features
  }
}
```

### Manual Logout
```tsx
import { logout } from '@/services/authService';

logout();
navigate('/login');
```

## Role-Based Routing

Login response roles determine redirect:
- **ADMIN** → `/admin`
- **KITCHEN** → `/kitchen`
- **Other/None** → `/dashboard`

## Error Handling

### Login Errors
- 400/401 (Invalid Credentials) - Error message displayed in UI
- Network errors - Displayed as "An unexpected error occurred"

### API Errors
- 401 (Unauthorized) - Automatic logout and redirect to `/login`
- Other errors - Propagated to calling code via authClient interceptors

## Backend Integration

### Endpoint: POST /auth/login
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGc...",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "roles": ["ADMIN", "KITCHEN"]
}
```

**Error Response (400/401):**
```json
{
  "message": "Invalid credentials"
}
```

## Security Considerations

1. **HTTPS Only** - All API calls use HTTPS (localhost:7292)
2. **Token Storage** - Tokens stored in localStorage (accessible to JavaScript)
   - Consider using HttpOnly cookies for enhanced security in production
3. **Token Expiration** - Backend should implement token expiration
   - Frontend auto-logout on 401 handles expired tokens
4. **CORS** - Ensure backend allows requests from frontend origin

## Next Steps (Optional)

### Add Token Refresh Logic
```tsx
// In authClient.ts - Add refresh token interceptor
authClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Call refresh endpoint
      // Update accessToken
      // Retry request
    }
  }
);
```

### Add Protected Admin/Kitchen Routes
```tsx
<Route path="/admin" element={<ProtectedRoute requiredRoles={['ADMIN']}><AdminPage /></ProtectedRoute>} />
<Route path="/kitchen" element={<ProtectedRoute requiredRoles={['KITCHEN']}><KitchenPage /></ProtectedRoute>} />
```

### Add Logout Button to Navigation
```tsx
import { logout } from '@/services/authService';

<Button onClick={() => { logout(); navigate('/login'); }}>
  Logout
</Button>
```

## Testing

### Test Login
1. Navigate to `http://localhost:5173/login`
2. Enter valid credentials from your backend
3. Should redirect to `/dashboard`, `/admin`, or `/kitchen` based on roles
4. Check browser DevTools → Storage → localStorage to verify tokens

### Test Protected Routes
1. Try accessing `/dashboard` without logging in
2. Should redirect to `/login`

### Test 401 Handling
1. Login successfully
2. Manually expire token in backend
3. Make API call
4. Should auto-logout and redirect to `/login`
