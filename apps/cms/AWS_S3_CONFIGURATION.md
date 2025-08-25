# AWS S3 Upload Configuration for Strapi CMS

This document describes how to configure AWS S3 file uploads for the Strapi CMS backend using IAM roles for authentication.

## Overview

The CMS is configured to use the `@strapi/provider-upload-aws-s3` plugin for handling file uploads to Amazon S3. This setup uses IAM roles for authentication instead of access keys, which is more secure and follows AWS best practices.

## Package Installation

The required package has been installed:

```bash
npm install @strapi/provider-upload-aws-s3
```

## Configuration

### Plugin Configuration (`config/plugins.ts`)

```typescript
export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        region: env('AWS_REGION'),
        bucket: env('AWS_S3_BUCKET'),
        // Use IAM roles instead of access keys for authentication
        // This is more secure and follows AWS best practices
        s3Options: {
          // The AWS SDK will automatically use IAM roles if available
          // No need to specify accessKeyId or secretAccessKey
          region: env('AWS_REGION'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
```

### Environment Variables

Add these environment variables to your deployment configuration:

```bash
# Required AWS S3 Configuration
AWS_S3_BUCKET=your-s3-bucket-name
AWS_REGION=us-east-1
```

**Note:** No AWS access keys (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) are required when using IAM roles.

## AWS Infrastructure Setup

### 1. S3 Bucket Configuration

Create an S3 bucket with the following settings:

- **Bucket Name**: Set to match your `AWS_S3_BUCKET` environment variable
- **Region**: Set to match your `AWS_REGION` environment variable
- **Public Access**: Configure based on your needs (typically block public access for security)
- **Versioning**: Enable if you want file version history
- **Encryption**: Enable server-side encryption (recommended)

### 2. IAM Role Configuration

Create an IAM role with the following permissions policy:

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

### 3. Attach IAM Role to Infrastructure

- **EC2 Instance**: Attach the IAM role to your EC2 instance
- **ECS Task**: Attach the IAM role to your ECS task definition
- **Lambda Function**: Attach the IAM role to your Lambda function
- **Kubernetes**: Use IAM roles for service accounts (IRSA)

## Security Benefits

Using IAM roles instead of access keys provides several security advantages:

1. **No Long-term Credentials**: No need to manage static access keys
2. **Automatic Credential Rotation**: AWS automatically handles credential rotation
3. **Principle of Least Privilege**: Fine-grained permissions specific to S3 bucket
4. **No Credential Exposure**: No risk of accidentally committing access keys to version control
5. **Audit Trail**: Better CloudTrail logging and monitoring

## Deployment Considerations

### Development Environment

For local development, you can:

1. Use AWS CLI profiles with temporary credentials
2. Use AWS SSO
3. Use IAM roles if running on AWS infrastructure

### Production Environment

Ensure your deployment platform supports IAM roles:

- **AWS EC2**: Native IAM role support
- **AWS ECS/Fargate**: Task role support
- **AWS Lambda**: Execution role support
- **Kubernetes on AWS**: Use IAM roles for service accounts (IRSA)

## Testing the Configuration

1. Start your Strapi application
2. Access the admin panel
3. Try uploading a file through the media library
4. Verify the file is stored in your S3 bucket
5. Check that the file URL points to your S3 bucket

## Troubleshooting

### Common Issues

1. **Permission Denied**: Verify IAM role has correct S3 permissions
2. **Bucket Not Found**: Check AWS_S3_BUCKET environment variable
3. **Region Mismatch**: Ensure AWS_REGION matches your S3 bucket region
4. **Role Not Attached**: Verify IAM role is properly attached to your infrastructure

### Debugging

Enable AWS SDK debugging by setting:

```bash
AWS_SDK_LOAD_CONFIG=1
AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE=1
```

## Migration from Access Keys

If migrating from access key-based authentication:

1. Remove `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables
2. Ensure IAM role is properly configured and attached
3. Test file upload functionality
4. Remove any hardcoded credentials from configuration files

## References

- [Strapi Upload Plugin Documentation](https://docs.strapi.io/cms/configurations/plugins#upload)
- [AWS S3 Upload Provider Documentation](https://www.npmjs.com/package/@strapi/provider-upload-aws-s3)
- [AWS IAM Roles Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [Strapi Preview Mode Implementation](https://strapi.io/blog/implementing-previews-with-next-applications-using-a-strapi-backend) 