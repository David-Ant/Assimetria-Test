#!/bin/bash

set -e  # stop on errors
echo "===== EC2 Initialization Started ====="

###############################################
# 1. SYSTEM UPDATE
###############################################

echo "[1/6] Updating system packages..."
sudo yum update -y


###############################################
# 2. INSTALL DOCKER
###############################################

echo "[2/6] Installing Docker..."
sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user  # allow ec2-user to use Docker without sudo


###############################################
# 3. INSTALL DOCKER COMPOSE
###############################################

echo "[3/6] Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version


###############################################
# 4. INSTALL GIT
###############################################

echo "[4/6] Installing Git..."
sudo yum install git -y


###############################################
# 5. CLONE YOUR REPO
###############################################

echo "[5/6] Cloning repository..."
cd /home/ec2-user

if [ ! -d "Assimetria-Test" ]; then
  git clone https://github.com/David-Ant/Assimetria-Test.git
else
  echo "Repository already exists. Pulling latest changes..."
  cd Assimetria-Test
  git pull
  cd ..
fi

cd Assimetria-Test/infra


###############################################
# 6. LOGIN TO ECR + START DOCKER COMPOSE
###############################################

echo "[6/6] Logging into ECR and starting Docker Compose..."

# Fetch AWS ACCOUNT and REGION automatically
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
REGION=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/dynamic/instance-identity/document | grep region | awk -F\" '{print $4}')
ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)

echo "Using REGION: $REGION"
echo "Using ACCOUNT_ID: $ACCOUNT_ID"

aws ecr get-login-password --region $REGION \
  | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

echo "Pulling latest images from ECR..."
docker-compose pull

echo "Starting Docker containers..."
docker-compose up -d


###############################################
# DONE
###############################################

echo "===== EC2 Initialization Completed ====="
echo "Backend and Frontend should now be running!"
echo "------------------------------------------"
echo "Backend: http://ec2-51-21-127-8.eu-north-1.compute.amazonaws.com:4000"
echo "Frontend: http://ec2-51-21-127-8.eu-north-1.compute.amazonaws.com:5173"
echo "------------------------------------------"
