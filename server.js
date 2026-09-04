const express = require('express');
const path = require('path');
const ytDlp = require('yt-dlp-exec');

const app = express();

// মিডলওয়্যার ও স্ট্যাটিক ফোল্ডার সেটআপ
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// হোম পেজ রাউট
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ডাউনলোড রাউট (POST মেথড)
app.post('/download', async (req, res) => {
    const videoUrl = req.body.url;
    if (!videoUrl) {
        return res.status(400).send('দয়া করে একটি ইউটিউব ভিডিওর লিংক দিন!');
    }

    try {
        console.log('ভিডিও ডাউনলোড শুরু হচ্ছে...');
        
        await ytDlp(videoUrl, {
            format: 'best',
            output: path.join(__dirname, 'downloads', '%(title)s.%(ext)s'),
            noCheckCertificates: true,
            preferFreeFormats: true,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });

        res.send('ডাউনলোড সফল হয়েছে!');
    } catch (error) {
        console.error(error);
        res.status(500).send('ডাউনলোড করতে সমস্যা হয়েছে!');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

await ytDlp(videoUrl, {
    format: 'best',
    output: path.join(__dirname, 'downloads', '%(title)s.%(ext)s'),
    noCheckCertificates: true,
    preferFreeFormats: true,
    extractorArgs: 'youtube:player_client=android', // বটের ঝামেলা এড়াতে অ্যান্ড্রয়েড ক্লায়েন্ট ব্যবহার করা
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
});