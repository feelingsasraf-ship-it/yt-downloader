const express = require('express');
const path = require('path');
const ytDlp = require('yt-dlp-exec');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/download', (req, res) => {
    const videoUrl = req.body.url;
    if (!videoUrl) {
        return res.status(400).send('দয়া করে একটি ইউটিউব ভিডিওর লিংক দিন!');
    }

    console.log('ভিডিও ডাউনলোড শুরু হচ্ছে...');
    
    ytDlp(videoUrl, {
        format: 'best',
        output: path.join(__dirname, 'downloads', '%(title)s.%(ext)s'),
        noCheckCertificates: true,
        preferFreeFormats: true,
        cookies: path.join(__dirname, 'cookies.txt'), // কুকিজ ফাইল যুক্ত করা হলো
        extractorArgs: 'youtube:player_client=web', // 'n challenge' ও বট সিকিউরিটি বাইপাস করার জন্য
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    })
    .then(() => {
        res.send('ডাউনলোড সফল হয়েছে!');
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('ডাউনলোড করতে সমস্যা হয়েছে!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});