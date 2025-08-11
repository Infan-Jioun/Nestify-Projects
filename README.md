
# Nestify - Real Estate Platform

![Nestify Logo](https://i.ibb.co/RpTRch3g/Nestify.png)

Nestify is a modern real estate platform built with Next.js, providing users with property listings, agent profiles, and various real estate services.

## Features

- Property listings by city and type
- Featured agents section
- Property search functionality
- User authentication (Google, GitHub, email/password)
- Responsive design for all devices
- Interactive property browsing experience

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: React hooks, React Hook Form
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **UI Components**: ShadCN UI, Radix UI
- **Animation**: Framer Motion
- **Other Libraries**: Swiper.js, React Fast Marquee, React Helmet Async

## Project Structure

```
nestify/
├── app/                   # App router directory
│   ├── About/             # About page
│   ├── AddProperty/       # Property submission page
│   ├── Contact/           # Contact page
│   ├── Footer/            # Global footer component
│   ├── Home/              # Homepage sections
│   ├── Hooks/             # Custom hooks
│   ├── LoginPage/         # Login page
│   ├── NavbarPage/        # Navigation component
│   ├── Properties/        # Property listings
│   ├── RegisterPage/      # User registration
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   └── models/            # Database models
├── components/            # UI components
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account or local MongoDB instance
- Google/GitHub OAuth credentials (for social login)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nestify.git
   cd nestify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URL=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_secret_key
   GOOGLE_ID=your_google_client_id
   GOOGLE_SECRET=your_google_client_secret
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm start`: Starts the production server
- `npm run lint`: Runs ESLint

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This README provides a comprehensive overview of your project, including:
1. Project description and features
2. Technology stack
3. Directory structure
4. Installation instructions
5. Environment variables needed
6. Available scripts
7. Deployment information
8. Contribution guidelines

You can customize it further by adding screenshots, demo links, or more detailed documentation about specific features.
