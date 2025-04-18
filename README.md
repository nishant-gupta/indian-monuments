# Indian Monuments

A comprehensive web application showcasing India's magnificent monuments, their history, and visitor information.

## Functional Documentation

### Overview

Indian Monuments is a web application designed to provide users with detailed information about various monuments across India. The application serves as a digital guide for tourists, history enthusiasts, and anyone interested in exploring India's rich cultural heritage.

### Key Features

1. **Monument Browsing**
   - Users can browse through a collection of monuments from across India
   - Each monument is displayed with a featured image, name, location, and brief description
   - Monuments are categorized and tagged for easy filtering and discovery

2. **Detailed Monument Information**
   - Comprehensive details about each monument including:
     - Historical background
     - Location and address
     - Entry fees and visiting hours
     - Best time to visit
     - How to reach
     - Available facilities
   - Image gallery showcasing multiple views of the monument

3. **Categorization and Tagging**
   - Monuments are categorized (e.g., Historical, Architectural, Religious)
   - Additional tags provide more specific information (e.g., UNESCO World Heritage, Mughal Architecture)

4. **User Features** (Planned/Future Implementation)
   - User authentication and profiles
   - Ability to save favorite monuments
   - Leave reviews and ratings
   - Share monuments on social media

### User Interface

The application features a clean, modern interface with:
- Responsive design that works on desktop, tablet, and mobile devices
- Intuitive navigation
- High-quality images of monuments
- Well-organized information sections
- Dark mode support

## Technical Documentation

### Technology Stack

- **Frontend**: Next.js 15.3.1 with React 19
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (planned)
- **Deployment**: Vercel (recommended)

### Project Structure

```
indian-monuments/
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma        # Prisma schema definition
│   ├── seed-new.ts          # Database seeding script
│   └── migrations/          # Database migrations
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── monuments/       # Monuments pages
│   │   │   ├── [slug]/      # Individual monument pages
│   │   │   └── page.tsx     # Monuments listing page
│   │   ├── api/             # API routes
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility libraries
│   │   └── prisma.ts        # Prisma client configuration
│   ├── config/              # Application configuration
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── public/                  # Static assets
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
└── tsconfig.json            # TypeScript configuration
```

### Database Schema

The application uses a PostgreSQL database with the following main entities:

1. **Monument**
   - Core entity containing information about each monument
   - Fields include name, description, history, location, entry fees, etc.
   - Relationships with categories, tags, images, reviews, and favorites

2. **Category**
   - Represents broad classifications of monuments (e.g., Historical, Architectural)
   - Many-to-many relationship with monuments

3. **Tag**
   - Provides additional classification for monuments (e.g., UNESCO, Mughal)
   - Many-to-many relationship with monuments

4. **Image**
   - Stores images associated with monuments
   - Contains URL, alt text, and relationship to a monument

5. **User** (Planned)
   - Will store user information for authentication
   - Will have relationships with reviews and favorites

6. **Review** (Planned)
   - Will allow users to leave reviews for monuments
   - Will contain rating, comment, and relationships to user and monument

7. **Favorite** (Planned)
   - Will allow users to save monuments to their favorites
   - Will contain relationships to user and monument

### API Routes

The application uses Next.js API routes for server-side functionality:

- `/api/monuments` - Get all monuments or create a new one
- `/api/monuments/[slug]` - Get, update, or delete a specific monument
- `/api/categories` - Get all categories
- `/api/tags` - Get all tags
- `/api/images` - Upload and manage monument images

### Authentication (Planned)

The application will use NextAuth.js for authentication with the following features:
- Email/password authentication
- OAuth providers (Google, GitHub)
- Protected routes for authenticated users
- User profile management

### Deployment

The application can be deployed on Vercel with the following steps:
1. Connect the GitHub repository to Vercel
2. Configure environment variables (DATABASE_URL, etc.)
3. Deploy the application

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/indian-monuments.git
   cd indian-monuments
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/indian_monuments"
   ```

4. Set up the database:
   ```bash
   npm run prisma:push
   npm run db:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Troubleshooting

### Common Issues

1. **Port 3000 is in use**
   - The application will automatically use an available port (3001, 3002, etc.)
   - You can access the application at the URL shown in the terminal

2. **Image loading errors**
   - Make sure the `next.config.js` file includes the correct image domains:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     images: {
       domains: ['images.unsplash.com'],
     },
   };
   
   module.exports = nextConfig;
   ```

3. **Database connection issues**
   - Verify that PostgreSQL is running
   - Check that the DATABASE_URL in your .env file is correct
   - Run `npx prisma studio` to verify database connectivity

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
