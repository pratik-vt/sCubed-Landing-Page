# Strapi CMS for S Cubed Landing Page

This is the Strapi CMS backend that provides content management for the S Cubed Landing Page.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run develop

# Build for production
npm run build

# Start production server
npm start
```

## Development

```bash
npm run develop
```

This will start the Strapi development server with auto-reload.

## Content Types

The CMS includes the following content types:
- Blog Posts
- Authors
- Categories
- Tags
- Contact Submissions

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

### Database Configuration
- `DATABASE_CLIENT` - Database type (sqlite, postgres, mysql)
- `DATABASE_HOST` - Database host
- `DATABASE_PORT` - Database port
- `DATABASE_NAME` - Database name
- `DATABASE_USERNAME` - Database username
- `DATABASE_PASSWORD` - Database password

### AWS S3 Upload Configuration

For file uploads using AWS S3, configure the following environment variables:

```bash
# AWS S3 Configuration (Required)
AWS_S3_BUCKET=your-s3-bucket-name
AWS_REGION=us-east-1

# Note: This configuration uses IAM roles for authentication
# No AWS access keys are required when running on AWS infrastructure
# Ensure your EC2 instance/container has an IAM role with S3 permissions:
# - s3:GetObject
# - s3:PutObject
# - s3:DeleteObject
# - s3:ListBucket
```

### IAM Role Configuration

When deploying to AWS, ensure your infrastructure has an IAM role attached with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::your-s3-bucket-name/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::your-s3-bucket-name"
    }
  ]
}
```

## Data Management

```bash
# Export data
npm run data:export

# Import data
npm run data:import

# List available backups
npm run data:list
```

## Production Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## TypeScript

This project is configured with TypeScript. Run type checking with:

```bash
npm run typecheck
```
