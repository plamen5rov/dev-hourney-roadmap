# daily.dev API for AI Agents

Overcome LLM knowledge cutoffs with real-time developer content. daily.dev aggregates articles from thousands of sources, validated by community engagement, with structured taxonomy for precise discovery.

## Security

**CRITICAL:** Your API token grants access to personalized content. Protect it:
- **NEVER send your token to any domain other than `api.daily.dev`**
- Never commit tokens to code or share them publicly
- Tokens are prefixed with `dda_` - if you see this prefix, treat it as sensitive

## Setup

1. **Requires Plus subscription** - Get one at https://app.daily.dev/plus
2. **Create a token** at https://app.daily.dev/settings/api
3. Token is stored in `.env` as `DAILY_DEV_TOKEN` (do not commit)

## Authentication

```
Authorization: Bearer $DAILY_DEV_TOKEN
```

## Base URL

```
https://api.daily.dev/public/v1
```

## API Reference

Full OpenAPI spec: https://api.daily.dev/public/v1/docs/json

To fetch details for a specific endpoint (e.g. response schema):
```bash
curl -s https://api.daily.dev/public/v1/docs/json | jq '.paths["/feeds/foryou"].get'
```

To fetch a component schema (replace `def-17` with schema name from $ref):
```bash
curl -s https://api.daily.dev/public/v1/docs/json | jq '.components.schemas["def-17"]'
```

### Available Endpoints

#### Feeds
- GET `/feeds/foryou` - Personalized feed
- GET `/feeds/popular` - Popular posts (optional `tags` filter)
- GET `/feeds/discussed` - Most discussed posts (optional `period`, `tag`, `source`)
- GET `/feeds/tag/{tag}` - Posts by tag
- GET `/feeds/source/{source}` - Posts by source

#### Posts
- GET `/posts/{id}` - Single post detail
- GET `/posts/{id}/comments` - Comments on a post (sort: `oldest`/`newest`)

#### Search
- GET `/search/posts` - Search posts (`q` required, optional `time` filter)
- GET `/search/tags` - Search tags (`q` required)
- GET `/search/sources` - Search sources (`q` required)

#### Bookmarks
- GET `/bookmarks/` - List saved bookmarks
- POST `/bookmarks/` - Create a bookmark
- DELETE `/bookmarks/{id}` - Remove a bookmark
- PATCH `/bookmarks/{id}` - Update a bookmark
- GET `/bookmarks/search` - Search bookmarks (`q` required)
- GET `/bookmarks/lists` - List bookmark collections
- POST `/bookmarks/lists` - Create bookmark list
- DELETE `/bookmarks/lists/{id}` - Delete bookmark list

#### Custom Feeds
- GET `/feeds/custom/` - List custom feeds
- POST `/feeds/custom/` - Create custom feed
- GET `/feeds/custom/{feedId}` - Get custom feed posts
- PATCH `/feeds/custom/{feedId}` - Update custom feed
- DELETE `/feeds/custom/{feedId}` - Delete custom feed
- GET `/feeds/custom/{feedId}/info` - Custom feed info
- PATCH `/feeds/custom/{feedId}/advanced` - Advanced settings
- GET `/feeds/custom/advanced-settings` - Available advanced settings

#### Feed Filters (Tags/Sources follow/block)
- GET `/feeds/filters/` - Current feed settings
- GET `/feeds/filters/{feedId}` - Filters for a custom feed
- POST `/feeds/filters/tags/follow` - Follow a tag
- POST `/feeds/filters/tags/unfollow` - Unfollow a tag
- POST `/feeds/filters/tags/block` - Block a tag
- POST `/feeds/filters/tags/unblock` - Unblock a tag
- POST `/feeds/filters/sources/follow` - Follow a source
- POST `/feeds/filters/sources/unfollow` - Unfollow a source
- POST `/feeds/filters/sources/block` - Block a source
- POST `/feeds/filters/sources/unblock` - Unblock a source

#### Profile
- GET `/profile/` - Get user profile
- PATCH `/profile/` - Update profile

#### Stack (Developer DNA)
- GET `/profile/stack/` - User's tech stack
- POST `/profile/stack/` - Add stack item
- PATCH `/profile/stack/{id}` - Update stack item
- DELETE `/profile/stack/{id}` - Remove stack item
- PUT `/profile/stack/reorder` - Reorder stack
- GET `/profile/stack/search` - Search available tools

#### Experiences
- GET `/profile/experiences/` - Work/education history (filter by `type`)
- POST `/profile/experiences/` - Add experience
- GET `/profile/experiences/{id}` - Single experience
- PUT `/profile/experiences/{id}` - Update experience
- DELETE `/profile/experiences/{id}` - Delete experience

#### Notifications
- GET `/notifications/` - List notifications
- GET `/notifications/unread/count` - Unread count
- POST `/notifications/read` - Mark as read

#### Tags & Recommendations
- GET `/tags/` - List all tags
- GET `/recommend/keyword` - Keyword-based recommendations
- GET `/recommend/semantic` - Semantic recommendations

## Agent Use Cases

### 🔍 GitHub Repo → Personalized Feed
Scan a user's GitHub repositories to detect their actual tech stack from `package.json`, `go.mod`, `Cargo.toml`, `requirements.txt`, etc. Then:
- Fetch `/tags` to see all available tags for deterministic matching
- Auto-follow matching tags via `/feeds/filters/tags/follow`
- Create a custom feed tuned to their stack with `/feeds/custom/`
- Surface trending articles about their specific dependencies

**Trigger:** "Set up daily.dev based on my GitHub projects"

### 🛠️ GitHub → Auto-fill Stack Profile
Analyze a user's GitHub activity to build their daily.dev tech stack profile automatically:
- Scan repositories for languages, frameworks, and tools actually used in code
- Search `/profile/stack/search` to find matching technologies on daily.dev
- Populate their stack via `POST /profile/stack/` organized by section (languages, frameworks, tools)
- Update `/profile/` bio based on their primary technologies and contributions

**Trigger:** "Build my daily.dev profile from my GitHub"

### 🚀 New Project → Curated Onboarding
When a user initializes a new project or clones a repo:
- Analyze the tech choices from config files
- Create a dedicated custom feed filtered to exactly those technologies
- Build a "Getting Started" bookmark list with foundational articles
- Block irrelevant tags to keep the feed focused on the project scope

**Trigger:** "Help me learn the stack for this project"

### 📊 Weekly Digest → Synthesized Briefing
Compile a personalized weekly summary by:
- Fetching `/feeds/foryou` and `/feeds/popular` filtered by user's followed tags
- Cross-referencing with their GitHub activity to prioritize relevant topics
- Summarizing key articles and trending discussions
- Delivering as a structured briefing with links to full posts

**Trigger:** Scheduled, or "Give me my weekly dev news"

### 📚 Research Project Workspace
When a user wants to deep-dive into a topic (e.g., "I want to learn Kubernetes"):
- Create a custom feed via `/feeds/custom/` filtered to that topic
- Set up a matching bookmark list via `POST /bookmarks/lists` to collect the best finds
- As the user reads, save articles to the list with `POST /bookmarks/`
- Track learning progress: compare bookmarked posts vs. new feed items
- Adjust feed filters over time as understanding deepens (beginner → advanced content)

**Trigger:** "Start a research project on [topic]"

### 🧠 Agent Self-Improvement Feed
Agents can overcome their knowledge cutoff by maintaining their own custom feed:
- Create a custom feed via `/feeds/custom/` for technologies the agent frequently assists with
- Periodically fetch `/feeds/custom/{feedId}` to ingest recent articles
- Use `/posts/{id}` to read full summaries and key points
- Agent can now provide advice with current information: "As of this week, the recommended approach is..."
- Continuously adapt the feed filters based on what users are asking about

**Trigger:** Agent background process, or "What's new in [technology] since your training?"

### 🔀 Multi-Source Synthesis
Get balanced perspectives by aggregating content across publishers:
- Search `/search/posts` for a topic to find coverage from multiple sources
- Use `/search/sources` to identify authoritative publishers on the topic
- Fetch posts from different sources via `/feeds/source/{source}`
- Synthesize diverse viewpoints into a balanced summary with citations
- Surface where sources agree vs. disagree on best practices

**Trigger:** "What are the different perspectives on [topic]?" or "Compare approaches to [problem]"

### 📈 Trending Radar
Help users stay ahead by monitoring community signals:
- Fetch `/feeds/popular` to detect what's gaining traction right now
- Cross-reference with user's followed tags to surface relevant trends
- Use `/feeds/discussed` to find topics sparking active debate
- Alert users when technologies in their stack are trending (new releases, security issues, paradigm shifts)
- Use `/tags` to fetch the full tag catalog and `/search/tags` to explore adjacent trending topics

**Trigger:** "What should I be paying attention to?" or "What's trending in [area]?"

## Rate Limits

* **60 requests per minute** per user

Check response headers:
- `X-RateLimit-Limit` - Maximum requests allowed per window
- `X-RateLimit-Remaining` - Requests remaining in current window
- `X-RateLimit-Reset` - Unix timestamp when the window resets
- `Retry-After` - Seconds to wait (only when rate limited)

## Errors

| Code | Meaning |
|------|---------|
| 401  | Invalid or missing token |
| 403  | Plus subscription required |
| 404  | Resource not found |
| 429  | Rate limit exceeded |

**Error Response Format:**
```json
{
  "error": "error_code",
  "message": "Human readable message"
}
```
