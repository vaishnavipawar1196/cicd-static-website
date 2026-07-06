# AWS CI/CD Static Website Deployment

A simple static website hosted on Amazon S3 with an automated CI/CD pipeline using GitHub Actions. Every push to the `main` branch automatically deploys the latest website files to the S3 bucket.

---

## Architecture

```
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ▼
Amazon S3 Static Website Hosting
    │
    ▼
Users
```

---

## AWS Services Used

- Amazon S3
- AWS IAM
- GitHub Actions
- AWS CLI

---

## Features

- Static website hosting using Amazon S3
- Automated deployment with GitHub Actions
- Secure authentication using GitHub Secrets
- Automatic synchronization of website files
- Deletes outdated files from the S3 bucket during deployment

---

## Project Structure

```
cicd-static-website/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

---

## Prerequisites

- AWS Account (Free Tier)
- Amazon S3 Bucket
- GitHub Repository
- AWS IAM User with Programmatic Access
- AWS CLI (optional for local testing)

---

## AWS Setup

### 1. Create an S3 Bucket

- Open Amazon S3
- Create a bucket with a globally unique name
- Enable **Static Website Hosting**
- Set:

```
Index document:
index.html
```

---

### 2. Configure Bucket Policy

Allow public read access to website files if using the S3 website endpoint.

---

### 3. Create an IAM User

Grant permissions:

- AmazonS3FullAccess

*(For production, create a least-privilege custom IAM policy instead.)*

---

## GitHub Secrets

Navigate to:

```
Repository
→ Settings
→ Secrets and variables
→ Actions
```

Create the following secrets:

| Secret | Description |
|---------|-------------|
| AWS_ACCESS_KEY_ID | AWS Access Key |
| AWS_SECRET_ACCESS_KEY | AWS Secret Key |
| S3_BUCKET_NAME | Amazon S3 Bucket Name |

---

## Deployment Workflow

1. Developer pushes code to GitHub.
2. GitHub Actions workflow starts automatically.
3. AWS credentials are loaded from GitHub Secrets.
4. Website files are synchronized to Amazon S3.
5. Updated website is available through the S3 Static Website endpoint.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Git
- GitHub Actions
- Amazon S3
- AWS IAM

---

## Skills Demonstrated

- CI/CD Pipeline
- AWS S3 Static Website Hosting
- GitHub Actions
- AWS IAM
- Infrastructure Automation
- Version Control

---

## Future Improvements

- Deploy with AWS CloudFront
- Configure a custom domain using Amazon Route 53
- Provision infrastructure using AWS CloudFormation or Terraform
- Add automated testing before deployment

---

## Cleanup

To avoid unnecessary AWS usage:

- Delete the S3 bucket if the project is no longer required.
- Remove IAM access keys if they are no longer in use.
- Delete GitHub Secrets if the repository becomes public.

---

## Author

**Vaishnavi Pawar**

Web Developer | AWS Developer Associate Certified
