# Fraudlr AI

<p align="center">
  <img src="images/Fraudlr Icon logo red.png" alt="Fraudlr Logo" width="120" />
</p>

<p align="center">
  <strong>AI-Powered Fraud Detection Platform</strong>
</p>

<p align="center">
  Detect, analyze, and prevent financial fraud with cutting-edge AI technology.
</p>

---

## 📋 Overview

Fraudlr is a comprehensive fintech platform that leverages artificial intelligence to detect anomalies and potential fraud in financial data. Upload your transaction data via CSV or connect to external databases, and let our AI analyze patterns to identify suspicious activities.

### Key Features

- 🤖 **AI-Powered Detection** - Advanced machine learning models for fraud detection
- 📊 **Data Analysis** - Upload CSV files or connect to external databases
- 🔐 **Secure** - Enterprise-grade security with encrypted data handling
- 📈 **Real-time Insights** - Get immediate anomaly detection results
- 🔗 **Integrations** - Connect via API or SQL databases
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **PostgreSQL** 14.x or higher
- **Git**

### Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-org/fraudlr-ai.git
cd fraudlr-ai
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fraudlr"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Optional: AI/ML API (if using external AI service)
AI_API_KEY="your-ai-api-key"
AI_API_URL="https://api.your-ai-service.com"
```

4. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

5. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
fraudlr-ai/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                     # Static assets
├── images/                     # Logo and brand assets
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes
│   │   │   └── auth/           # Authentication endpoints
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── cases/          # Case history
│   │   │   ├── integration/    # Data integrations
│   │   │   ├── new-case/       # Create new case
│   │   │   ├── profile/        # User profile
│   │   │   └── settings/       # User settings
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── dashboard/          # Dashboard components
│   │   ├── landing/            # Landing page components
│   │   └── ui/                 # Reusable UI components (shadcn/ui)
│   └── lib/                    # Utility functions and configs
│       ├── auth.ts             # Authentication utilities
│       ├── prisma.ts           # Prisma client
│       └── utils.ts            # General utilities
├── components.json             # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT (jose library) |
| Password Hashing | bcryptjs |
| Theming | next-themes |

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create a new user account |
| POST | `/api/auth/login` | Authenticate user |
| POST | `/api/auth/logout` | Clear session |
| GET | `/api/auth/me` | Get current user info |

### Cases Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cases` | List all cases (paginated) |
| POST | `/api/cases` | Create a new fraud analysis case |
| GET | `/api/cases/[id]` | Get a single case by ID |
| PATCH | `/api/cases/[id]` | Update a case |
| DELETE | `/api/cases/[id]` | Delete a case |

### Contact Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit a contact form message |

### Example: Create Account

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Example: Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Example: Create a Case

```bash
curl -X POST http://localhost:3000/api/cases \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=your-jwt-token" \
  -d '{
    "title": "Transaction Analysis - Q4 2024",
    "description": "Analyze transactions for potential fraud patterns",
    "message": "Please check for unusual patterns in these transactions"
  }'
```

### Example: Get Cases

```bash
curl -X GET "http://localhost:3000/api/cases?page=1&limit=10" \
  -H "Cookie: auth_token=your-jwt-token"
```

## ☁️ AWS Deployment Guide

This guide covers deploying Fraudlr to AWS Ubuntu 24.04 with Nginx.

### Server Requirements

- **OS**: Ubuntu 24.04 LTS
- **RAM**: 2GB minimum (4GB recommended)
- **CPU**: 2 vCPUs minimum
- **Storage**: 20GB minimum

### Step 1: Launch EC2 Instance

1. Log in to AWS Console
2. Navigate to EC2 → Launch Instance
3. Select **Ubuntu Server 24.04 LTS** AMI
4. Choose instance type (t3.small or larger recommended)
5. Configure security group:
   - SSH (22) - Your IP only
   - HTTP (80) - Anywhere
   - HTTPS (443) - Anywhere
6. Launch and save your key pair

### Step 2: Connect to Server

```bash
# Connect via SSH
ssh -i your-key.pem ubuntu@your-server-ip
```

### Step 3: Install System Dependencies

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib
```

### Step 4: Configure PostgreSQL

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE fraudlr;
CREATE USER fraudlr_user WITH ENCRYPTED PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE fraudlr TO fraudlr_user;
\q
```

### Step 5: Clone and Configure Application

```bash
# Navigate to web directory
cd /var/www

# Clone repository
sudo git clone https://github.com/your-org/fraudlr-ai.git
sudo chown -R ubuntu:ubuntu fraudlr-ai
cd fraudlr-ai

# Install dependencies
npm install

# Create environment file
nano .env
```

Add the following to `.env`:

```env
DATABASE_URL="postgresql://fraudlr_user:your-secure-password@localhost:5432/fraudlr"
JWT_SECRET="your-production-secret-key-at-least-32-characters"
JWT_EXPIRES_IN="7d"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"
```

### Step 6: Build and Start Application

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "fraudlr" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

### Step 7: Configure Nginx

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/fraudlr
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/fraudlr /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 8: Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is configured automatically
# Test renewal with:
sudo certbot renew --dry-run
```

### Step 9: Configure Firewall

```bash
# Enable UFW firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Step 10: Verify Deployment

```bash
# Check PM2 status
pm2 status

# Check Nginx status
sudo systemctl status nginx

# View application logs
pm2 logs fraudlr
```

## 🔧 Useful Commands

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Database

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration-name

# Deploy migrations (production)
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

### Create and commit Prisma migrations (local dev)

If you haven't generated migrations yet, run the following on your development machine (not the production server). The repository includes helper scripts in `scripts/` for convenience.

Linux/macOS:

```bash
./scripts/create-migration.sh init
```

Windows (PowerShell):

```powershell
.
\scripts\create-migration.ps1 -Name init
```

Alternatively, run the commands manually:

```bash
npx prisma migrate dev --name init
git add prisma/migrations
git commit -m "prisma: add initial migrations"
git push origin main
```

After pushing migrations, on the server run:

```bash
cd /var/www/fraudlr-ai
git pull origin main
npx prisma migrate deploy
```


### PM2 (Production)

```bash
# Start application
pm2 start npm --name "fraudlr" -- start

# Stop application
pm2 stop fraudlr

# Restart application
pm2 restart fraudlr

# View logs
pm2 logs fraudlr

# Monitor processes
pm2 monit
```

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` files to version control
2. **JWT Secret**: Use a strong, random secret (at least 32 characters)
3. **Database**: Use strong passwords and limit network access
4. **HTTPS**: Always use SSL/TLS in production
5. **Updates**: Regularly update dependencies (`npm audit fix`)
6. **Firewall**: Only expose necessary ports
7. **Backups**: Implement regular database backups

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For support, please contact:
- Email: support@fraudlr.com
- Documentation: https://docs.fraudlr.com

---

<p align="center">
  Built with ❤️ by the Fraudlr Team
</p>
