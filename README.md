A professional Discord server manager bot for your portfolio.

A scalable, modular, and production-ready Discord bot for server management and moderation. Built with Node.js, Discord.js v14, and MongoDB (Mongoose).

## Features
- **Automated Moderation**: Anti-spam, anti-link, anti-raid detection, auto-mute/ban for repeated offenses
- **Role Management**: `/role-assign`, `/role-audit`
- **Channel Control**: `/lock`, `/unlock`, `/archive`
- **Logging System**: All actions stored in MongoDB
- **Scheduled Tasks**: `/remind`, `/purge`
- **Permission Audit**: `/audit-permissions`
- **Custom Welcome/Leave**: Configurable with `/welcome-config`
- **Slash Commands, Embeds, Buttons, Modals**
- **Per-Guild Configuration**
- **Extensible Architecture**: Add new features easily

## Setup
1. **Clone the repo**
2. **Copy `.env.example` to `.env` and fill in your credentials**
3. **Install dependencies**
	```sh
	npm install
	```
4. **Start the bot**
	```sh
	npm run dev
	# or
	node .
	```

## Usage
- Use `/welcome-config` to set up welcome messages per server
- All moderation and management features are enabled by default
- Extend by adding new commands to `src/commands/`

## Contributing
Pull requests and suggestions are welcome! For major changes, please open an issue first.

## Demo
![Modulus Demo](https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif)

## License
MIT

## Portfolio Highlights
- Clean, scalable architecture
- Well-documented code
- Modern Discord UI features
- Easy to extend and maintain

**Modulus** is designed to showcase your skills and attract freelance or contract work. Fork, extend, and make it your own!

A scalable, modular, and production-ready Discord bot for server management and moderation. Built with Node.js, Discord.js v14, Prisma ORM, and PostgreSQL.

## Features
- Role management: `/role assign`, `/role audit`
- Channel control: `/lock`, `/unlock`, `/archive`
- Logging system: joins, bans, deletions stored in DB
- Scheduled tasks: `/remind`, `/purge`
- Permission audit: `/audit permissions`
- Interactive UI: slash commands, embeds, buttons, modals

## Architecture
- Clean, modular structure for scalability
- Prisma ORM for database access
- Easy to extend and integrate with dashboards

## Setup
1. Clone the repo
2. Install dependencies: `npm install`
3. Configure `.env` for Discord token and PostgreSQL
4. Run Prisma migrations: `npx prisma migrate dev`
5. Start the bot: `npm run dev`

## Documentation
- Inline comments and JSDoc for best practices
- Modular code for easy feature addition

## Portfolio Ready
- Designed for freelance and contract showcase
- Visually impressive with Discord UI components

---
Replace placeholders with your actual credentials and customize features as needed.