# Todo App Frontend

A beautiful, modern React frontend for the Todo application with user authentication and todo management.

## Features

### 🎨 Beautiful UI/UX

- Modern, clean design with Tailwind CSS
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive user interface

### 🔐 User Authentication

- User registration with form validation
- Secure login with JWT tokens
- Protected routes
- Automatic token management

### ✅ Todo Management

- Create, read, update, delete todos
- Real-time status toggling
- Search and filter functionality
- Beautiful todo cards with actions

### 📊 Dashboard

- Todo statistics and completion rates
- Visual progress indicators
- Quick actions and shortcuts

## Tech Stack

- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons
- **Vite** - Build tool

## Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── dashboard/
│   │   └── Dashboard.jsx
│   ├── todo/
│   │   ├── TodoItem.jsx
│   │   └── TodoForm.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Card.jsx
│       └── Input.jsx
├── contexts/
│   └── AuthContext.jsx
├── services/
│   └── api.js
├── utils/
│   └── cn.js
├── App.jsx
├── main.jsx
└── index.css
```

## Key Components

### Authentication

- **LoginForm**: Beautiful login form with validation
- **RegisterForm**: User registration with all required fields
- **AuthContext**: Global authentication state management

### Dashboard

- **Dashboard**: Main application interface with todo management
- **TodoItem**: Individual todo card with actions
- **TodoForm**: Modal form for creating/editing todos

### UI Components

- **Button**: Reusable button component with variants
- **Card**: Card layout component
- **Input**: Form input component

## Features in Detail

### User Authentication

- Secure JWT token-based authentication
- Automatic token refresh and management
- Protected routes for authenticated users
- Form validation and error handling

### Todo Management

- Create new todos with title, content, and status
- Edit existing todos inline
- Toggle todo completion status
- Delete todos with confirmation
- Search todos by title and content
- Filter todos by status (pending/completed)

### Dashboard Features

- Real-time todo statistics
- Completion rate visualization
- Quick add todo functionality
- Responsive design for all screen sizes

### UI/UX Features

- Smooth animations and transitions
- Loading states and error handling
- Toast notifications for user feedback
- Responsive design
- Beautiful color scheme and typography

## API Integration

The frontend integrates with the backend API through the `api.js` service:

- **Authentication**: Login, register, token management
- **Todos**: CRUD operations, search, filter, statistics
- **User Profile**: Profile management (can be extended)

## Styling

The application uses Tailwind CSS with custom components:

- Custom color palette with primary colors
- Responsive design utilities
- Animation classes for smooth transitions
- Custom component classes for consistency

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Make sure your backend is running on `http://localhost:5000` or update the API base URL in `src/services/api.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
