#!/bin/bash

# PostgreSQL Database Setup Script for S Cubed Landing Page
# This script creates the PostgreSQL database and user for the Strapi CMS

echo "================================"
echo "S Cubed PostgreSQL Database Setup"
echo "================================"
echo ""

# Database configuration
DB_NAME="scubed_cms"
DB_USER="scubed_user"
DB_HOST="localhost"
DB_PORT="5432"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ Error: PostgreSQL is not installed or not in PATH"
    echo ""
    echo "Please install PostgreSQL first:"
    echo "  Ubuntu/Debian: sudo apt install postgresql postgresql-contrib"
    echo "  macOS: brew install postgresql"
    echo "  Windows: Download from https://www.postgresql.org/download/windows/"
    exit 1
fi

# Prompt for new database user password
echo "Please enter a password for the database user '$DB_USER':"
read -s DB_PASSWORD
echo ""

# Create database and user
echo "Creating database and user..."
sudo -u postgres psql <<EOF
-- Create user if not exists
DO \$\$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_user WHERE usename = '$DB_USER') THEN
      CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
   ELSE
      ALTER USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
   END IF;
END
\$\$;

-- Create database if not exists
SELECT 'CREATE DATABASE $DB_NAME OWNER $DB_USER'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;

-- Connect to the database and grant schema privileges
\c $DB_NAME
GRANT ALL ON SCHEMA public TO $DB_USER;

-- Show confirmation
\l $DB_NAME
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database setup completed successfully!"
    echo ""
    echo "Database Details:"
    echo "=================="
    echo "Database Name: $DB_NAME"
    echo "Database User: $DB_USER"
    echo "Database Host: $DB_HOST"
    echo "Database Port: $DB_PORT"
    echo ""
    echo "Next Steps:"
    echo "==========="
    echo "1. Update the .env file in apps/cms/ with these credentials:"
    echo "   DATABASE_CLIENT=postgres"
    echo "   DATABASE_HOST=$DB_HOST"
    echo "   DATABASE_PORT=$DB_PORT"
    echo "   DATABASE_NAME=$DB_NAME"
    echo "   DATABASE_USERNAME=$DB_USER"
    echo "   DATABASE_PASSWORD=[your_password]"
    echo "   DATABASE_SSL=false"
    echo "   DATABASE_SCHEMA=public"
    echo ""
    echo "2. Run Strapi to initialize the database tables:"
    echo "   cd apps/cms"
    echo "   npm run develop"
    echo ""
else
    echo ""
    echo "❌ Error: Failed to setup database. Please check your PostgreSQL installation and credentials."
    echo ""
    echo "If you get permission errors, try:"
    echo "1. Switch to postgres user: sudo su - postgres"
    echo "2. Run psql and execute the commands manually"
    exit 1
fi