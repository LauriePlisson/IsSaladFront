# IsSalad Frontend

A modern React Native (Expo) mobile application built with TypeScript for the IsSalad social platform. Features AI-powered functionality, seamless image handling, and intuitive user experience for salad enthusiasts.

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development](#development)
- [Building & Deployment](#building--deployment)
- [Backend Integration](#backend-integration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🎨 User Interface
- **Modern Design** - Clean and intuitive React Native UI
- **Cross-Platform** - iOS and Android compatibility via Expo
- **Responsive** - Optimized for various screen sizes
- **Dark/Light Mode** - Adaptive theming support

### 🤖 AI-Powered Features
- **Image Recognition** - AI-powered salad identification using OpenAI
- **Smart Recommendations** - Personalized content suggestions
- **Automated Tagging** - Intelligent content categorization

### 📸 Media Management
- **Photo Capture** - Built-in camera integration
- **Image Upload** - Cloudinary-powered file handling
- **Image Processing** - Automatic optimization and filtering

### 👥 Social Features
- **User Profiles** - Customizable user accounts
- **Social Feed** - Share and discover salad creations
- **Team Management** - Group functionality and collaboration
- **Search & Discovery** - Find users, salads, and content

### 🔧 Technical Features
- **TypeScript** - Full type safety and developer experience
- **Redux State Management** - Predictable state container
- **Offline Support** - Works without internet connection
- **Push Notifications** - Real-time updates and alerts

## 📱 Screenshots

> *Screenshots coming soon...*

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have:

- **Node.js** (v16+ recommended) - [Download here](https://nodejs.org/)
- **Yarn** or **npm** package manager
- **Expo CLI** - Install globally: `npm install -g @expo/cli`
- **Mobile device** or emulator for testing
- **Backend service** - IsSalad Backend running locally or deployed

### Development Tools (Recommended)

- **VS Code** with React Native extensions
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Expo Go** app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LauriePlisson/IsSaladFront.git
   cd IsSalad_frontend
   ```

2. **Install dependencies**
   ```bash
   # Using yarn (recommended)
   yarn install
   
   # Or using npm
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration values.

4. **Start the development server**
   ```bash
   expo start
   ```

5. **Run on device/emulator**
   - Scan the QR code with Expo Go app (mobile)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

## 🏗️ Project Structure

```
IsSalad_frontend/
├── android/                    # Android-specific files
├── assets/                     # Static assets (images, fonts)
│   ├── img/                   # Application images
│   └── adaptive-icon.png      # App icons
├── components/                 # Reusable UI components
│   ├── changeAvatar.tsx       # Avatar change component
│   ├── checkBtn.tsx          # Check button component
│   ├── comment.tsx           # Comment component
│   ├── formContainer.tsx     # Form wrapper
│   ├── InputElem.tsx         # Input element
│   ├── photoBtn.tsx          # Photo button
│   ├── postContainer.tsx     # Post display
│   ├── tabBar.tsx            # Bottom navigation
│   └── userBlock.tsx         # User info block
├── reducers/                   # Redux state management
│   ├── search.ts             # Search state
│   └── user.ts               # User state
├── screens/                    # Screen components
│   ├── CameraScreen.tsx      # Camera functionality
│   ├── HomeScreen.tsx        # Main feed
│   ├── ProfileScreen.tsx     # User profile
│   ├── SearchScreen.tsx      # Search interface
│   ├── SettingsScreen.tsx    # App settings
│   ├── SignUpScreen.tsx      # User registration
│   └── WelcomeScreen.tsx     # Onboarding
├── App.tsx                     # Main app component
├── app.json                    # Expo configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

### Key Directories

- **`components/`** - Reusable UI components
- **`screens/`** - Full-screen views and navigation
- **`reducers/`** - Redux state management logic
- **`assets/`** - Images, fonts, and static files
- **`android/`** - Android-specific configurations

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend Configuration
EXPO_PUBLIC_BACKEND_URL=http://localhost:3000
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api

# External Services
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
EXPO_PUBLIC_CLOUDINARY_API_KEY=your_api_key
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_key

# App Configuration
EXPO_PUBLIC_APP_NAME=IsSalad
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### Expo Configuration

The `app.json` file contains Expo-specific settings:

```json
{
  "expo": {
    "name": "IsSalad",
    "slug": "issalad",
    "version": "1.0.0",
    "platforms": ["ios", "android"],
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash-icon.png"
    }
  }
}
```

## 🔧 Development

### Development Scripts

```bash
# Start development server
yarn start
# or
expo start

# Run on specific platforms
yarn android          # Android emulator
yarn ios              # iOS simulator
yarn web              # Web browser

# Development tools
yarn lint             # Run ESLint
yarn type-check       # TypeScript checking
yarn test             # Run tests
```

### Development Workflow

1. **Start the backend server** (see backend README)
2. **Start Expo development server**
3. **Connect device/emulator**
4. **Make changes** - Hot reload automatically updates
5. **Test features** on both platforms

### Code Quality

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Husky** for git hooks (if configured)

## 📦 Building & Deployment

### Development Build

```bash
# Build for development
expo build:android
expo build:ios
```

### Production Build

```bash
# Build for production
eas build --platform android
eas build --platform ios
```

### App Store Deployment

1. **Configure app signing** in `app.json`
2. **Build production version** with EAS Build
3. **Submit to app stores**:
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

### Over-the-Air Updates

Deploy updates without app store review:

```bash
expo publish
```

## 🔗 Backend Integration

This frontend requires the **IsSalad Backend** service to function properly.

### API Endpoints Used

- `POST /users/SignUp` - User registration
- `POST /users/SignIn` - User authentication
- `GET /teams/salads` - Fetch salads
- `POST /posts` - Create new posts
- `GET /users/profile` - User profile data

### Authentication Flow

1. User signs up/in through the app
2. Backend returns JWT token
3. Token stored securely in app
4. All API requests include Authorization header

### Error Handling

The app handles common scenarios:
- Network connectivity issues
- API timeouts
- Authentication failures
- Invalid responses

## 🐛 Troubleshooting

### Common Issues

**Metro bundler issues:**
```bash
expo start --clear
```

**Dependencies conflicts:**
```bash
rm -rf node_modules yarn.lock
yarn install
```

**iOS simulator not working:**
```bash
sudo xcode-select --switch /Applications/Xcode.app
```

**Android emulator issues:**
- Ensure Android Studio is properly installed
- Check AVD (Android Virtual Device) configuration
- Verify Android SDK path in system variables

### Debug Mode

Enable debugging:
1. Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
2. Select "Debug" from the menu
3. Use Chrome DevTools for debugging

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly on both platforms
5. Commit with clear messages
6. Push and create a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add comments for complex logic
- Ensure responsive design

### Testing

Before submitting:
- [ ] Test on both iOS and Android
- [ ] Verify all features work offline
- [ ] Check performance on older devices
- [ ] Validate with different screen sizes

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React Native, Expo, and TypeScript**

*For backend setup and API documentation, see the [IsSalad Backend](../IsSalad_Backend/README.md) repository.*