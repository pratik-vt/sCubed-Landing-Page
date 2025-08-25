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
