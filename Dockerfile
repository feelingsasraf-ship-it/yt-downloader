FROM node:18-slim

# পাইথন ইনস্টল করার পাশাপাশি পাইথনকে 'python' নামে লিংক (symlink) করে দেওয়া
RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg && \
    ln -s /usr/bin/python3 /usr/bin/python && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]