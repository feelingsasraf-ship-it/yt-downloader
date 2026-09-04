FROM node:18-slim

# yt-dlp চালানোর জন্য পাইথন এবং প্রয়োজনীয় টুলস ইনস্টল করা
RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]