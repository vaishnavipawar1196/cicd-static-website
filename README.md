# AWS CI/CD Static Website

## Overview

This project demonstrates an automated CI/CD pipeline that deploys a static website to Amazon S3 using GitHub Actions. CloudFront is used to deliver the website globally.

---

## AWS Services Used

- Amazon S3
- Amazon CloudFront
- AWS IAM
- GitHub Actions

---

## Architecture

GitHub
    ↓
GitHub Actions
    ↓
Amazon S3
    ↓
CloudFront
    ↓
Users

---

## Features

- Automatic deployment on every push to the main branch
- Secure AWS authentication using GitHub Secrets
- CloudFront cache invalidation
- Static website hosting

---

## Deployment Steps

1. Create an S3 bucket
2. Enable Static Website Hosting
3. Create CloudFront Distribution
4. Configure IAM User
5. Add GitHub Secrets
6. Push code to GitHub

---

## GitHub Secrets

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

S3_BUCKET_NAME

CLOUDFRONT_DISTRIBUTION_ID

---

## Technologies

- HTML
- CSS
- JavaScript
- GitHub Actions
- AWS CLI
- Amazon S3
- Amazon CloudFront

---

## Author

Vaishnavi Pawar
