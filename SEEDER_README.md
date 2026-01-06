# Database Seeder Documentation

## Overview
The collection seeder system for the MUB Voting app allows you to populate Firestore with king and queen selection data from the JSON file and manage voting data.

## Files Created

### 1. API Route: `/src/app/api/seed/route.ts`
- **POST /api/seed** - Seeds the database with selection data
- **POST /api/seed?action=reset-votes** - Resets all voting data
- **GET /api/seed** - Retrieves all selections
- **GET /api/seed?gender=male|female** - Retrieves selections by gender

### 2. Utility Class: `/src/lib/seeder.ts`
Contains the `SelectionSeeder` class with methods:
- `seedSelections()` - Seeds database with fresh data
- `clearCollection()` - Clears existing data
- `getSelections()` - Fetches all selections
- `getSelectionsByGender()` - Fetches by gender
- `resetVotes()` - Resets voting data only

### 3. Admin Component: `/src/components/SeedManager.tsx`
React component providing UI for:
- Database seeding operations
- Vote reset functionality
- Real-time statistics display
- Operation status feedback

### 4. Admin Page: `/src/app/admin/seed/page.tsx`
Admin interface accessible at `/admin/seed`

## Usage

### Via Admin Interface
1. Navigate to `/admin/seed`
2. Click "Seed Selections" to populate database
3. Click "Reset All Votes" to clear voting data
4. View statistics and operation results

### Via API Endpoints

#### Seed Database
```bash
curl -X POST http://localhost:3000/api/seed
```

#### Reset Votes
```bash
curl -X POST http://localhost:3000/api/seed?action=reset-votes
```

#### Get All Selections
```bash
curl http://localhost:3000/api/seed
```

#### Get Male Candidates
```bash
curl http://localhost:3000/api/seed?gender=male
```

#### Get Female Candidates
```bash
curl http://localhost:3000/api/seed?gender=female
```

## Data Structure

Each selection document contains:
```typescript
{
  name: string;
  profile: string;
  age: number;
  selection_no: number;
  gender: 'male' | 'female';
  section: string;
  address: string;
  gallery: string[];
  kingVotes: string[];
  queenVotes: string[];
  popularVotes: string[];
  innocentVotes: string[];
  kingVotesCount: number;
  queenVotesCount: number;
  popularVotesCount: number;
  innocentVotesCount: number;
  isKing: boolean;
  isQueen: boolean;
  isPopular: boolean;
  isInnocent: boolean;
  selected: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Features

- **Batch Operations**: Uses Firestore batch writes for efficiency
- **Data Validation**: Ensures data integrity during seeding
- **Error Handling**: Comprehensive error reporting
- **Statistics**: Real-time database statistics
- **Reset Functionality**: Selective data reset options
- **Gender Filtering**: Query selections by gender
- **Admin Interface**: User-friendly management UI

## Security Considerations

- Ensure proper authentication before allowing access to `/admin/seed`
- Consider rate limiting for API endpoints
- Validate user permissions for destructive operations
- Monitor seeding operations in production

## Troubleshooting

### Common Issues
1. **Firebase Connection**: Ensure Firebase config is correct
2. **Permissions**: Check Firestore security rules
3. **Data Format**: Verify JSON data structure matches interface
4. **Network**: Check API endpoint accessibility

### Error Messages
- "Failed to seed data" - Check Firebase connection and permissions
- "Network error occurred" - Verify API endpoint is accessible
- "Failed to fetch stats" - Check Firestore read permissions