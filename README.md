# Next.js Blog

This is a modern blog platform built with Next.js. It includes features such as article creation, editing, and listing, user authentication, dark mode support, and more.

## Features

- **Article Creation and Editing**: Users can create and edit articles using a rich text editor.
- **Article Listing**: Articles are displayed on the home page with proper formatting and image optimization.
- **User Authentication**: Users can sign up, sign in, and manage their profiles.
- **Dark Mode Support**: The application supports both light and dark modes.
- **Responsive Design**: The application is fully responsive and works on all devices.
- **Sample Data Generation**: A script is provided to generate sample data for testing.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/next-blog.git
cd next-blog
```

2. Install dependencies:

```bash
npm install
```

3. Generate sample data:

```bash
npm run generate-data
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `src/app`: Contains the main application pages and API routes.
- `src/components`: Contains reusable components such as `ArticleForm`, `ArticleCard`, `AuthForm`, etc.
- `src/lib`: Contains utility functions, context providers, and data access functions.
- `src/types`: Contains TypeScript type definitions.
- `scripts`: Contains utility scripts such as the sample data generation script.

## Configuration

### Image Optimization

The application uses Next.js Image component for image optimization. The `next.config.js` file is configured to allow images from `images.unsplash.com`.

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run generate-data`: Generates sample data for testing.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
