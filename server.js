const express = require('express');
const path = require('path');
const fs = require('fs');
const youtubedl = require('yt-dlp-exec');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ফোল্ডার না থাকলে তৈরি করে নেবে
if (!fs.existsSync('./downloads')) {
    fs.mkdirSync('./downloads');
}

app.post('/download', async (req, res) => {
    const videoUrl = req.body.url;
    const outputPath = path.join(__dirname, 'downloads', '%(title)s.%(ext)s');

    try {
        console.log('ভিডিও ডাউনলোড শুরু হচ্ছে...');
        await youtubedl(videoUrl, {
            format: 'bestvideo[height<=2160]+bestaudio/best[height<=2160]',
            output: outputPath,
            noCheckCertificates: true,
            preferFreeFormats: true,
        });
        res.send('✅ ভিডিও ডাউনলোড সফল হয়েছে! আপনার downloads ফোল্ডার চেক করুন।');
    } catch (error) {
        console.error(error);
        res.send('❌ ডাউনলোড করতে সমস্যা হয়েছে!');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});