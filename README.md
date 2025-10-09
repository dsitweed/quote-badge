# Quote Badge for GitHub README

A beautiful, dynamic quote badge generator for your GitHub profile or project README. Displays random inspirational quotes with author attribution and tags, powered by the [Quotable API](http://api.quotable.io).

![Quote Badge Example](https://your-domain.vercel.app/)

## Features

- 🎨 Clean, modern SVG design with dark theme
- 📝 Automatic text wrapping for long quotes
- 👤 Author attribution
- 🏷️ Tag display
- 🔄 Random quote on each page load
- 📱 Responsive and lightweight
- ⚡ Built with Next.js API Routes

## Usage

### Embed in Your GitHub README

Simply add this markdown to your `README.md`:

```markdown
![Daily Quote](https://your-domain.vercel.app/)
```

Or use HTML for more control:

```html
<div align="center">
  <img src="https://your-domain.vercel.app/" alt="Random Quote" />
</div>
```

### Get Random Quotes by Category

Use the slug route to get quotes from specific categories:

```markdown
![Inspirational Quote](https://your-domain.vercel.app/inspirational)
```

Available categories include: `wisdom`, `inspirational`, `life`, `success`, `motivational`, `happiness`, `technology`, and more.

## Examples

### In Your Profile README

```markdown
# Hi there 👋

![Quote of the Day](https://your-domain.vercel.app/)

I'm a developer passionate about...
```

### In Project Documentation

```markdown
## Project Name

> ![Quote](https://your-domain.vercel.app/technology)

A revolutionary project that...
```

## API Endpoints

### `GET /`

Returns a random quote as an SVG image.

**Response:**
- Content-Type: `image/svg+xml`
- Returns: SVG badge with quote, author, and tag

### `GET /[slug]`

Returns a random quote from a specific category.

**Parameters:**
- `slug` (string): Category or tag name (e.g., `wisdom`, `technology`)

**Response:**
- Content-Type: `image/svg+xml`
- Returns: SVG badge with categorized quote

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Deploy on Vercel

The easiest way to deploy your own quote badge API:

1. Push this repository to GitHub
2. Import it to [Vercel](https://vercel.com/new)
3. Deploy with one click
4. Use your deployment URL in your README: `https://your-deployment.vercel.app/`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/quote-badge)

## Technical Details

- **Framework:** Next.js 15+ with App Router
- **API Source:** [Quotable API](http://api.quotable.io)
- **Output Format:** SVG (Scalable Vector Graphics)
- **Cache:** 60 seconds with stale-while-revalidate

## Customization

You can customize the badge by editing `src/app/route.ts`:

- **Colors:** Change background, text, and tag colors
- **Font Size:** Adjust `fontSize` variable
- **Dimensions:** Modify `width` and `height` calculations
- **Line Wrapping:** Change `maxCharsPerLine` value

## Credits

- Quotes provided by [Quotable API](https://github.com/lukePeavey/quotable)
- Built with [Next.js](https://nextjs.org)

## License

MIT

---

**Note:** Replace `https://your-domain.vercel.app/` with your actual deployment URL after deploying to Vercel or other hosting platforms.
