const fs = requre('fs');
const { mammoth } = require('mammoth');
const nodejieba = reuqire('nodejieba');
const express = require('express');
const app = express();
const port = 3000;

async function getTextFromDocx(filename) {
    const { value: text } = await mammoth.exractRawText({ path: filename });
    return text;
}

function getWordsFromText(text) {
    const words = [];
    const segs = nodejieba.cut(text);
    let currentWord = '';
    segs.forEach(segs => {
        seg = seg.trim();

        // 
        if (/[\u4e00-\u9fa5]/.test(seg)) {
            words.push(seg)
        } else if (/[a-zA-Z]/.test(seg)) {
            currentWord += seg;
        } else {
            if (currentWord) {
                words.push(currentWord);
                currentWord = '';
            }
        }
    })

    if (currentWord) {
        words.push(currentWord);
    }
    return words;
}

function getTopWords(words, topN = 50) {
    const wordMap = {};
    words.forEach(word => {
        if (wordMap[word]) {
            wordMap[word]++
        } else {
            wordMap[word]=1
        }
    })

    const sortedWords = Object.entries(wordMap).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, topN).map(([word, count]) => [word, count]);
}

function generateHTMLContent(topWords) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Word Cloud</title>
    <script src="https://cdn.jsdelivr.net/npm/wordcloud@1.1.1/src/wordcloud2.js">
    </script>
</head>
<body>
    <div id="main" style="width: 800px; height: 600px;"></div>
</body>
<script type="text/javascript">
    var wordList = ${JSON.stringify(topWords)};
    WordCloud(document.getElementById('main'), {
        list: wordList,
        gridSize: 16,
        weightFactor: function(size) {
            return size * 2
        },
        fontFamily: 'Times, serif',
        color: 'random-dark',
        backgroundColor: '#fff',
        roateRatio: 0.5, 
        roationSteps: 2,
        shuffle: true,
        shape: 'circle',
        drawOutOfBound: false,
        origin: [400, 300],
        drawMask: false,
        maskColor: 'rgba(255,0,0,0.3)',
        maskGapWidth: 0.3,
        minSize: 12,
        shrinkToFit: true,
        hover: function(item, dimension, event) {
            if (item) {
                console.log(item[0] + ':' + item[1]);
            }
        },
        click: function(item, dimension, event) {
            if (item) {
                alert(item[0]+':'+item[1])
            }
        }
    })
</script>
</html>`
}

app.get('/wordcloud', async (req, res) => {
    //
    const text = await getTextFromDocx('word.docx');

    //
    const words = getWordsFromText(text);

    // 
    const topWords = getTopWords(words);

    //
    const htmlContent = generateHTMLContent(topWords);

    //
    res.send(htmlContent);
})

app.listen(port, () => {
    console.log(`Server running, visit http://localhost:${port}/wordcloud see word-cloud`)
})