# PostgreSQL Database Setup for S Cubed Landing Page

This guide explains how to set up PostgreSQL database for the S Cubed landing page project.

## Prerequisites

1. PostgreSQL Server installed (version 12 or higher)
2. Node.js and npm installed
3. Access to PostgreSQL superuser or admin privileges

## Quick Setup

### 1. Install PostgreSQL (if not already installed)

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download and install PostgreSQL from https://www.postgresql.org/download/windows/

### 2. Run the Setup Script

```bash
# From the project root directory
./setup-postgres.sh
```

This script will:
- Create a database named `scubed_cms`
- Create a database user with appropriate permissions
- Display the connection details

### 3. Manual Database Setup (Alternative)

If you prefer to set up the database manually:

```bash
# Switch to postgres user
sudo -u postgres psql

# Or on macOS
psql postgres
```

Then run these SQL commands:

```sql
-- Create user
CREATE USER scubed_user WITH PASSWORD 'your_secure_password';

-- Create database
CREATE DATABASE scubed_cms OWNER scubed_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE scubed_cms TO scubed_user;

-- Connect to the database
\c scubed_cms

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO scubed_user;

-- Exit PostgreSQL
\q
```

### 4. Configure Strapi CMS

Update the `.env` file in `apps/cms/`:

```env
# Database - PostgreSQL Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=scubed_cms
DATABASE_USERNAME=scubed_user
DATABASE_PASSWORD=your_secure_password
DATABASE_SSL=false
DATABASE_SCHEMA=public
```

### 5. Initialize Strapi Database

```bash
# Navigate to CMS directory
cd apps/cms

# Install dependencies (if not already done)
npm install

# Run Strapi in development mode
npm run develop
```

On first run, Strapi will:
- Create all necessary tables in the MySQL database
- Set up the admin panel at http://localhost:1337/admin
- Prompt you to create an admin user

### 6. Configure Web Application

Update the `.env.local` file in `apps/web/`:

```env
# Strapi CMS URL
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## Database Schema

The contact submissions table stores the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| first_name | VARCHAR(50) | Yes | Contact's first name |
| last_name | VARCHAR(50) | Yes | Contact's last name |
| email_id | VARCHAR(100) | Yes | Contact's email address |
| phone_number | VARCHAR | Yes | Contact's phone number |
| company_name | VARCHAR(200) | No | Company name |
| state | VARCHAR(50) | Yes | State/location |
| specialities | VARCHAR(100) | Yes | Area of specialization |
| staff | INTEGER | No | Number of staff members |
| other_software_experience | BOOLEAN | No | Has experience with other software |
| software_name | VARCHAR(200) | No | Name of other software used |
| comments | TEXT | No | Additional comments |
| submission_date | DATETIME | Yes | Date/time of submission |
| status | ENUM | Yes | Submission status (new/contacted/converted/closed) |

## API Endpoints

### Submit Contact Form
**Endpoint:** `POST /api/contact-submissions`

**Request Body:**
```json
{
  "data": {
    "first_name": "John",
    "last_name": "Doe",
    "email_id": "john@example.com",
    "phone_number": "+1234567890",
    "state": "California",
    "specialities": "Therapy",
    "company_name": "Example Clinic",
    "staff": 10,
    "other_software_experience": true,
    "software_name": "Previous Software",
    "comments": "Looking for a demo"
  }
}
```

**Response:**
```json
{
  "message": "Thank you for your interest in our services! Our team will be in touch shortly.",
  "data": {
    "id": 1,
    "attributes": {
      // ... submission data
    }
  }
}
```

## Testing the Integration

### 1. Test Database Connection

```bash
# Test PostgreSQL connection
psql -U scubed_user -h localhost -d scubed_cms -c "SELECT 1"
```

### 2. Test Strapi API

```bash
# Test if Strapi is running
curl http://localhost:1337/api

# Test contact submission endpoint
curl -X POST http://localhost:1337/api/contact-submissions \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "first_name": "Test",
      "last_name": "User",
      "email_id": "test@example.com",
      "phone_number": "1234567890",
      "state": "Test State",
      "specialities": "Testing"
    }
  }'
```

### 3. Test Form Submission

1. Start both applications:
   ```bash
   # Terminal 1 - Start Strapi
   cd apps/cms
   npm run develop
   
   # Terminal 2 - Start Next.js
   cd apps/web
   npm run dev
   ```

2. Open http://localhost:3000 in your browser
3. Click "BOOK A DEMO" button
4. Fill and submit the form
5. Check the database for the new submission:
   ```bash
   psql -U scubed_user -h localhost -d scubed_cms -c "SELECT * FROM contact_submissions"
   ```

## Troubleshooting

### PostgreSQL Connection Error

If you get a connection error:

1. Check PostgreSQL is running:
   ```bash
   sudo systemctl status postgresql  # Linux
   brew services list               # macOS
   ```

2. Verify credentials:
   ```bash
   psql -U scubed_user -h localhost -d scubed_cms
   ```

3. Check firewall/port settings (PostgreSQL default port: 5432)

4. Check pg_hba.conf for authentication settings:
   ```bash
   # Ubuntu/Debian
   sudo nano /etc/postgresql/*/main/pg_hba.conf
   # macOS
   nano /usr/local/var/postgres/pg_hba.conf
   ```
   Ensure it has:
   ```
   local   all   all                     md5
   host    all   all   127.0.0.1/32      md5
   ```

### Strapi Build Error

If Strapi fails to build:

1. Clear cache and rebuild:
   ```bash
   cd apps/cms
   npm run clean
   npm run build
   ```

2. Check Node version (requires Node 18-22)

### Form Submission Error

If form submission fails:

1. Check CORS settings in Strapi
2. Verify the API endpoint URL in web app `.env.local`
3. Check browser console for errors
4. Review Strapi logs for detailed error messages

## Production Deployment

For production deployment:

1. Use environment-specific `.env` files
2. Set up proper database backups
3. Use connection pooling for better performance
4. Implement proper security measures (SSL, firewall rules)
5. Consider using a managed database service (AWS RDS, Google Cloud SQL, etc.)

## Security Considerations

1. **Never commit `.env` files** to version control
2. Use strong passwords for database users
3. Limit database user permissions to only what's needed
4. Enable SSL for database connections in production
5. Regularly update PostgreSQL and all dependencies
6. Implement rate limiting on the API endpoints
7. Add input validation and sanitization

## Backup and Recovery

### Create Backup
```bash
pg_dump -U scubed_user -h localhost scubed_cms > backup_$(date +%Y%m%d).sql
```

### Restore Backup
```bash
psql -U scubed_user -h localhost scubed_cms < backup_20250811.sql
```

## Support

For issues or questions, please refer to:
- Strapi Documentation: https://docs.strapi.io
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Project Repository: [Your repository URL]