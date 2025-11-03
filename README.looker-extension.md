# Nordstrom Looker Hub - Looker Extension

This is a Looker Extension built with React, TypeScript, Vite, and the Looker Extension SDK.

## Prerequisites

- Node.js 18+ or Yarn
- Access to a Looker instance with admin privileges
- Looker Extension Framework enabled

## Local Development Setup

### 1. Install Dependencies

```bash
yarn install
# or
npm install
```

### 2. Start Development Server

```bash
yarn dev
# or
npm run dev
```

The app will run at `https://localhost:8080`

### 3. Install Extension in Looker

1. Log in to your Looker instance as an admin
2. Navigate to **Admin > Platform > Extensions**
3. Click **Add New Extension**
4. Paste the contents of `manifest.lkml`
5. Click **Save**
6. The extension will appear in your Looker browse menu

### 4. Trust Local Development Certificate

When accessing the extension for the first time:
1. Open `https://localhost:8080` in your browser
2. Accept the self-signed certificate warning
3. Refresh the Looker extension page

## Production Build

### Build for Production

```bash
yarn build
# or
npm run build
```

This creates a `dist/bundle.js` file.

### Deploy to Production

1. Upload `dist/bundle.js` to your CDN or web server
2. Update `manifest.lkml` with the production URL:
   ```lkml
   url: "https://your-cdn.com/bundle.js"
   ```
3. Redeploy the manifest to Looker

## Project Structure

```
src/
  ├── hooks/
  │   ├── useLookerSDK.ts          # Access Looker SDK
  │   ├── useLookerUser.ts         # Get current user
  │   └── useFavorites.ts          # Favorite management
  ├── types/
  │   └── looker.ts                # TypeScript types
  ├── pages/
  │   └── V8.tsx                   # Main app page
  ├── components/
  │   ├── AllDashboardsExplores.tsx
  │   ├── FinanceDomainV8.tsx
  │   └── ...                      # Domain components
  └── App.tsx                      # Entry point with ExtensionProvider
```

## Looker SDK Integration

All components use the Looker SDK via custom hooks:

```typescript
import { useLookerSDK } from '@/hooks/useLookerSDK';

const MyComponent = () => {
  const sdk = useLookerSDK();
  
  const fetchData = async () => {
    const dashboards = await sdk.ok(sdk.all_dashboards());
    console.log(dashboards);
  };
};
```

## API Methods Used

See `manifest.lkml` for the complete list of Looker API methods this extension uses.

## Troubleshooting

### Extension won't load
- Ensure dev server is running on `https://localhost:8080`
- Check browser console for CORS or certificate errors
- Verify manifest is correctly installed in Looker

### API calls failing
- Check that API methods are listed in `manifest.lkml` entitlements
- Verify user has appropriate Looker permissions

### Data not appearing
- Verify your Looker instance has dashboards/looks in the expected folders
- Check browser console for API errors

## Development Notes

- This app runs as a Looker Extension within the Looker UI
- No React Router is used - navigation is handled by state
- All data is fetched from Looker APIs in real-time
- Vite provides fast development with hot module replacement
