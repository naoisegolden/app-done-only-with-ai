# Restaurant Menu QR Scanner App

A React Native mobile application that allows users to scan restaurant QR codes and view menus digitally.

## Features

- QR Code scanning for restaurant menus
- Digital menu display with categories and items
- Modern and intuitive UI with React Native
- Type safety with TypeScript
- State management with Redux Toolkit
- Real-time menu updates with Supabase
- Offline menu caching
- Search and filter menu items
- Multiple language support

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- React Native development environment setup
- Supabase account and project
- Physical device or emulator with camera support

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd restaurant-menu-scanner
```

2. Install dependencies:
```bash
npm install
```

3. Configure Supabase:
   - Create a new project in Supabase
   - Copy your project URL and anon key
   - Update `src/services/supabase.ts` with your credentials
   - Set up the menu tables in Supabase (see Database Schema below)

4. Start the development server:
```bash
npm start
```

5. Run on iOS or Android:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Database Schema

```sql
-- Restaurants table
create table restaurants (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Menu Categories table
create table menu_categories (
  id uuid primary key default uuid_generate_v4(),
  restaurant_id uuid references restaurants(id),
  name text not null,
  description text,
  sort_order integer,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Menu Items table
create table menu_items (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references menu_categories(id),
  name text not null,
  description text,
  price decimal(10,2) not null,
  image_url text,
  allergens text[],
  is_available boolean default true,
  sort_order integer,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── screens/        # Screen components
  │   ├── ScannerScreen.tsx    # QR code scanner
  │   ├── MenuScreen.tsx       # Restaurant menu display
  │   └── ItemDetailScreen.tsx # Detailed item view
  ├── store/          # Redux store and slices
  ├── services/       # API and external services
  └── utils/          # Utility functions
```

## Features in Development

- [ ] Favorite menu items
- [ ] Dietary preferences filter
- [ ] Price range filter
- [ ] Share menu items
- [ ] Dark mode support
- [ ] Order history
- [ ] Restaurant ratings and reviews

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 